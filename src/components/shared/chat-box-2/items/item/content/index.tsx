import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import { Chat2ItemType } from "@/types/chat2";
import ChatDate from "./date";
import { useChatItem } from "..";
import Linkify from "linkify-react";

type Props = {
  chat: Chat2ItemType;
};
export default function ChatItemContent({ chat }: Props) {
  const { user: myAccount } = useProfile();

  const { getUser } = useChatItem();

  const user = getUser(chat.user);

  const isMyUser = myAccount.id === user?.id;

  const linkElement = (
    attributes: { [attr: string]: any },
    content: string,
    type: "mention" | "link"
  ) => {
    let clss = "text-blue-600 whitespace-pre-wrap";
    if (type === "link") {
      clss += " hover:underline";
    }

    let view = content;

    return (
      <a
        className={clss}
        style={{
          overflowWrap: "break-word",
        }}
        target={type === "link" ? "_blank" : "_self"}
        {...attributes}
      >
        {view}
      </a>
    );
  };

  return (
    <div className='flex flex-1 flex-col bg-black/5 rounded-xl rounded-bl-none p-2 max-w-full w-full'>
      {!!!isMyUser && <strong>{user?.name}</strong>}
      <p
        className='text-wrap mb-3 w-full'
        dir='auto'
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
      >
        {chat.text.split("\n").map((line: string, index) => (
          <Linkify
            options={{
              nl2br: true,
              render: {
                url: ({ attributes, content }) =>
                  linkElement(attributes, content, "link"),
                mention: ({ attributes, content }) =>
                  linkElement(attributes, content, "mention"),
              },
              formatHref: {
                mention: () => "#",
              },
            }}
          >
            <span key={index}>
              {line}
              <br />
            </span>
          </Linkify>
        ))}
      </p>
      <ChatDate chat={chat} />
    </div>
  );
}
