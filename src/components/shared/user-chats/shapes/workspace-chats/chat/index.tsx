import { ChatType } from "@/types/chat2";

type Props = {
  item: ChatType;
};
export default function Chat({ item }: Props) {
  return <div>{JSON.stringify(item)}</div>;
}
