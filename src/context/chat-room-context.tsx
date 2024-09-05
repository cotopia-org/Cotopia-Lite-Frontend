import { _BUS } from "@/app/const/bus";
import { __VARS } from "@/app/const/vars";
import { useRef } from "react";
import { useChat } from "@/hooks/chat/use-chat";

import {
  RoomDetailsType,
  getInitMessages,
  getNextMessages,
  getPrevMessages,
  updateMessagesAction,
} from "@/store/redux/slices/room-slice";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import { ChatItemType } from "@/types/chat";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { dispatch as busDispatch } from "use-bus";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import { useChatSocket } from "@/hooks/chat/use-chat-socket";

export type FlagType = "edit" | "reply" | "pin";

export enum FetchMessageType {
  "Prev" = 1,
  "Next" = 2,
}

type InitCtxType = {
  env: RoomEnvironmentType;
  messages: ChatItemType[] | undefined;
  targetMessage: ChatItemType | undefined;
  originMessage: ChatItemType | undefined;
  roomId: number | undefined;
  flag: FlagType | undefined;
  loading: boolean;
  navigateLoading: boolean;
  upperLimit: number;
  downLimit: number;
  loadMoreMessages: (
    type: FetchMessageType,
    upLimit?: number,
    downLimit?: number
  ) => Promise<{ items: ChatItemType[] }>;
  onAddMessage: (text: string, userId?: number, hasLoading?: boolean) => void;
  onReplyMessage: (text: string, userId?: number) => void;
  onEditMessage: (text: string) => void;
  ref: any;
  changeKey: (value: { key: string; value: any }) => void;
  changeBulk: (values: { [key: string]: any }) => void;
};

export enum RoomEnvironmentType {
  "room" = "roomMessages",
  "direct" = "directMessages",
}
const initCtx: InitCtxType = {
  env: RoomEnvironmentType.room,
  messages: [],
  targetMessage: undefined,
  originMessage: undefined,
  loading: false,
  navigateLoading: false,
  ref: undefined,
  flag: undefined,
  roomId: undefined,
  onAddMessage: () => {},
  upperLimit: __VARS.pagesLimitDiff,
  downLimit: 1,
  onEditMessage: () => {},
  onReplyMessage: () => {},
  changeKey: (value) => {},
  changeBulk: (values) => {},
  loadMoreMessages: () =>
    new Promise<{ items: ChatItemType[] }>((resolve, reject) => []),
};

const ChatRoomCtx = createContext(initCtx);

type InitStateType = {
  targetMessage: ChatItemType | undefined;
  originMessage: ChatItemType | undefined;
  flag: FlagType | undefined;
  navigateLoading: boolean;
};

const initialState: InitStateType = {
  navigateLoading: false,
  targetMessage: undefined,
  originMessage: undefined,
  flag: undefined,
};

type ActionTypes =
  | {
      type: "CHANGE_KEY";
      payload: { key: string; value: any };
    }
  | {
      type: "CHANGE_BULK";
      payload: { [key: string]: any };
    };

const reducer = (state: InitStateType, action: ActionTypes) => {
  switch (action.type) {
    case "CHANGE_KEY":
      const targetKey = action.payload.key;
      const targetVal = action.payload.value;
      return { ...state, [targetKey]: targetVal };
    case "CHANGE_BULK":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const UPPER_LIMIT_PAGE = __VARS.pagesLimitDiff;
export const DOWN_LIMIT_PAGE = 1;
const TEMP_MESSAGE: ChatItemType = {
  created_at: new Date().getTime() / 1000,
  deleted_at: null,
  files: [],
  id: Math.floor(Math.random() * 10000),
  is_edited: false,
  is_pinned: false,
  links: [],
  mentions: [],
  reply_to: null,
  room_id: 1,
  seen: false,
  text: "",
  is_sent: true,
  updated_at: null,
  user: null,
  nonce_id: null,
};

const ChatRoomCtxProvider = ({
  children,
  environment,
  room_id,
}: {
  children: ReactNode;
  environment: RoomEnvironmentType;
  room_id: number;
}) => {
  const chat = useChatSocket(room_id, environment);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { user } = useProfile();
  const ref = useRef<any>();

  const ctxType = environment;
  const appDispatch = useAppDispatch();

  const roomSlice = useAppSelector((state) => state.roomSlice);

  const chatRoom = roomSlice?.chatRoom ?? {};
  const loading = roomSlice?.loading ?? false;

  const { sendToRoom, editMessage, sendToDirect } = useChat();

  if (!room_id) return null;

  let selectedRoom: RoomDetailsType | undefined = undefined;

  //collect all chat room ids
  const roomIds = chatRoom ? Object.keys(chatRoom).map((x) => +x) : [];
  //check is room exist or not
  if (roomIds.includes(room_id)) {
    selectedRoom = chatRoom?.[room_id];
  }

  const upper_limit = selectedRoom?.upper_limit ?? UPPER_LIMIT_PAGE;

  const down_limit = selectedRoom?.down_limit ?? DOWN_LIMIT_PAGE;

  const isFirstFetch = selectedRoom === undefined;

  let messages = selectedRoom?.messages ?? [];

  //If we have queues please add it to end of the messages
  if (chat.queues.length > 0) {
    const currentRoomQueuesMessages = chat.queues.filter(
      (x) => x.room_id === room_id
    );
    messages = [...currentRoomQueuesMessages, ...messages];
  }

  useEffect(() => {
    const firstFetchMessages = async () => {
      if (!room_id || !isFirstFetch) return;
      appDispatch(
        getInitMessages({
          has_loading: true,
          room_id: room_id,
          upper_limit: UPPER_LIMIT_PAGE,
        })
      );
    };

    firstFetchMessages();
  }, [isFirstFetch, room_id]);

  const loadMoreMessages = useCallback(
    async (
      type: FetchMessageType,
      ul?: number,
      dl?: number
    ): Promise<{ items: ChatItemType[] }> => {
      let objToSend = { room_id, upper_limit, down_limit };
      if (!!ul) objToSend["upper_limit"] = ul;
      if (!!dl) objToSend["down_limit"] = dl;
      let res: any;
      switch (type) {
        case FetchMessageType.Next:
          res = await appDispatch(getNextMessages(objToSend));
          return { items: res.payload.messages ?? [] };
        case FetchMessageType.Prev:
          res = await appDispatch(getPrevMessages(objToSend));
          return { items: res.payload.messages ?? [] };
      }
    },
    [upper_limit, down_limit, messages, ctxType, room_id]
  );

  const addMessageHandler = useCallback(
    async (text: string, userId?: number, hasLoading?: boolean) => {
      if (!room_id) return;

      let temp = {
        ...TEMP_MESSAGE,
        is_sent: hasLoading ? false : true,
        text,
        room_id: +room_id,
        user: user,
        nonce_id: new Date().getTime(),
      };

      if (down_limit > 1) {
        await appDispatch(
          getInitMessages({
            has_loading: false,
            room_id: room_id,
            upper_limit: UPPER_LIMIT_PAGE,
          })
        );
        busDispatch(_BUS.scrollEndChatBox);
      } else {
        chat.send(text);

        // appDispatch(
        //   sendMessage({ message: temp, hasLoading: hasLoading, userId })
        // );
      }
    },
    [
      appDispatch,
      updateMessagesAction,
      room_id,
      ctxType,
      down_limit,
      state?.targetMessage,
    ]
  );

  const editMessageHandler = useCallback(
    async (text: string) => {
      if (state.targetMessage === undefined) return;
      dispatch({
        type: "CHANGE_BULK",
        payload: { targetMessage: undefined, flag: undefined },
      });
      try {
        const message = await editMessage(text, state.targetMessage?.id);
        if (message) {
          appDispatch(updateMessagesAction({ message }));
        }
      } catch (error) {}
    },
    [state.targetMessage]
  );

  const replyMessageHandler = useCallback(
    async (text: string, userId?: number) => {
      dispatch({
        type: "CHANGE_BULK",
        payload: { targetMessage: undefined, flag: undefined },
      });

      if (!state.targetMessage || !room_id) return;

      try {
        let message: ChatItemType | undefined = undefined;
        switch (ctxType) {
          case RoomEnvironmentType.room:
            message = await sendToRoom(text, room_id, state.targetMessage.id);
            break;
          case RoomEnvironmentType.direct:
            message = await sendToDirect(text, userId, state.targetMessage.id);
          default:
            break;
        }
        if (down_limit === 1 && message) {
          appDispatch(updateMessagesAction({ message }));
          busDispatch(_BUS.scrollEndChatBox);
        } else {
          await appDispatch(
            getInitMessages({
              has_loading: false,
              room_id: room_id,
              upper_limit: UPPER_LIMIT_PAGE,
            })
          );
          busDispatch(_BUS.scrollEndChatBox);
        }
      } catch (error) {}
    },
    [
      busDispatch,
      appDispatch,
      updateMessagesAction,
      room_id,
      ctxType,
      down_limit,
      state?.targetMessage,
    ]
  );

  const changeStateHandler = (value: { key: string; value: any }) => {
    dispatch({ type: "CHANGE_KEY", payload: value });
  };

  const changeBultHandler = (values: { [key: string]: any }) => {
    dispatch({ type: "CHANGE_BULK", payload: values });
  };

  // useEffect(() => {
  //   if (messages.length === 0) return

  //   //Simulate the seen action only on client
  //   const newMessages = JSON.parse(JSON.stringify(messages))

  //   if (newMessages[0].seen === false) {
  //     newMessages[0].seen = true

  //     appDispatch(
  //       changeRoomItemAction({
  //         roomId: +room_id,
  //         key: "messages",
  //         value: newMessages,
  //       })
  //     )
  //   }
  // }, [room_id, messages])

  return (
    <ChatRoomCtx.Provider
      value={{
        env: environment,
        loading: loading || chatRoom === undefined,
        flag: state.flag,
        ref,
        roomId: room_id,
        upperLimit: upper_limit,
        downLimit: down_limit,
        originMessage: state.originMessage,
        changeKey: changeStateHandler,
        navigateLoading: state.navigateLoading,
        changeBulk: changeBultHandler,
        messages,
        targetMessage: state.targetMessage,
        loadMoreMessages: loadMoreMessages,
        onAddMessage: addMessageHandler,
        onEditMessage: editMessageHandler,
        onReplyMessage: replyMessageHandler,
      }}
    >
      {children}
    </ChatRoomCtx.Provider>
  );
};

export const useChatRoomCtx = () => useContext(ChatRoomCtx);

export default ChatRoomCtxProvider;
