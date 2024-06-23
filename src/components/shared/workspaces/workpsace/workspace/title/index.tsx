type Props = {
  title: string;
};
export default function WorkspaceTitle({ title }: Props) {
  return <strong className='font-medium text-lg text-gray-800'>{title}</strong>;
}
