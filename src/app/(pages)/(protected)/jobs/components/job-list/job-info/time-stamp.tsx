import Badge from "../../badge";
import { format } from "date-fns";

type Props = {
  date: Date;
  size?: "sm" | undefined
};

function TimeStamp({ date, size }: Props) {
  const formattedDate = format(date, "d MMM, yyyy - hh:mm");

  return <Badge title={formattedDate} size={size} />;
}

export default TimeStamp;
