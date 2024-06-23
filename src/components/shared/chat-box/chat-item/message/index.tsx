type Props = {
  message: string;
};
export default function Message({ message }: Props) {
  return <p>{message}</p>;
}
