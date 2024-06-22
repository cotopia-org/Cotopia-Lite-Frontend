type Props = {
  title: string;
};
export default function HeaderTitle({ title }: Props) {
  return <strong>{title}</strong>;
}
