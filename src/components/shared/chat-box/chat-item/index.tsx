import { ChatItemType } from "@/types/chat";
import MyMessage from "./my-message";
import TheirMessage from "./their-message";
import CotopiaContextMenu, {
  ContextItemType,
} from "@/components/shared-ui/c-context-menu";
import { Reply, Pencil, Trash2 } from "lucide-react";
import colors from "tailwindcss/colors";
import MessageBox from "./message/MessageBox";
import TargetMessageAction from "./TargetMessageAction";
import { _BUS } from "@/app/const/bus";
import { ReactNode, forwardRef, useState } from "react";
import DeleteMessageAction from "./my-message/DeleteMessageAction";
import {
  RoomEnvironmentType,
  useChatRoomCtx,
} from "@/context/chat-room-context";

type Props = {
  item: ChatItemType;
  observer_user_id?: number;
  user?: number;
  onFlagSelect?: () => void;
};
const ChatItem = forwardRef(
  ({ item, observer_user_id, onFlagSelect, user }: Props, ref: any) => {
    const { changeBulk, env } = useChatRoomCtx();

    const [deleteAnchor, setDeleteAnchor] = useState<boolean>(false);

    let targetMessage = item?.reply_to;

    const isMyMessage = item?.user?.id === observer_user_id;

    const isRoomEnv = env === RoomEnvironmentType.room;

    let replyedNode = undefined;

    if (!!targetMessage) {
      replyedNode = (
        <TargetMessageAction
          className='!m-0'
          onSelect={onFlagSelect}
          title={targetMessage?.user?.username}
          description={targetMessage.text}
        />
      );
    }

    let menuItems: ContextItemType[] = [
      {
        title: "reply",
        className: "cursor-pointer",
        onClick: () => changeBulk({ targetMessage: item, flag: "reply" }),
        icon: <Reply color={colors.black} size={14} />,
      },
    ];

    if (isMyMessage) {
      menuItems = [
        {
          title: "edit",
          onClick: () => changeBulk({ targetMessage: item, flag: "edit" }),
          className: "cursor-pointer",
          hasDivider: true,
          icon: <Pencil color={colors.black} size={14} />,
        },
        {
          title: "delete",
          className: "cursor-pointer text-red-700 hover:!text-red-700",
          linkEl: (el) => setDeleteAnchor(true),
          hasDivider: true,
          icon: <Trash2 color={colors.red[700]} size={14} />,
        },
        ...menuItems,
      ];
    }

    let content = (
      <CotopiaContextMenu
        width={150}
        items={menuItems}
        trigger={
          <MessageBox
            fullWidth={isRoomEnv}
            ref={ref}
            beforeNode={replyedNode}
            item={item}
            isMine={isMyMessage}
          />
        }
      />
    );

    if (!!item.deleted_at) {
      content = (
        <MessageBox
          fullWidth={isRoomEnv}
          ref={ref}
          beforeNode={replyedNode}
          item={item}
          isMine={isMyMessage}
        />
      );
    }

    let messageNode = isMyMessage ? (
      <>
        {(deleteAnchor && (
          <DeleteMessageAction
            onClose={() => setDeleteAnchor(false)}
            message={item}
          />
        )) ||
          null}
        {content}
      </>
    ) : (
      <>{content}</>
    );

    const directWrapper = (children: ReactNode) => {
      return isMyMessage ? (
        <MyMessage>{children}</MyMessage>
      ) : (
        <TheirMessage>{children}</TheirMessage>
      );
    };

    switch (env) {
      case RoomEnvironmentType.room:
        return messageNode;
      case RoomEnvironmentType.direct:
        return directWrapper(messageNode);
    }
  }
);
export default ChatItem;
