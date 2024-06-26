type Props = {
  message: string;
};
export default function Message({ message }: Props) {
  return (
    <p
      className='text-wrap'
      style={{
        overflowWrap: "anywhere",
      }}
    >
      {message}
    </p>
  );
}
