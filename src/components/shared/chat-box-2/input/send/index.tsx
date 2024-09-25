import MicButtonHandler from "./mic";
import TextButtonHandler from "./text";

type Props = {
  text: string;
};
export default function SendHandlerButton({ text }: Props) {
  let content = <MicButtonHandler />;

  if (text) content = <TextButtonHandler />;

  return <>{content}</>;
}
