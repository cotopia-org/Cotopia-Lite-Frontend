type Props = {
  message: string;
};
export default function Message({ message }: Props) {
  return <p className='text-base text-black/60'>{message}</p>;
}
