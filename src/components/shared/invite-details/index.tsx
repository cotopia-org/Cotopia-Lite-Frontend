import CotopiaButton from "@/components/shared-ui/c-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserFullname } from "@/lib/utils";
import { InviteType } from "@/types/invite";
import InviteDeclineButton from "./decline";
import JoinButton from "./join";

type Props = {
  item: InviteType;
  onJoined?: (type: "room" | "workspace") => void;
};
export default function InviteDetails({ item, onJoined }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite details</CardTitle>
        <CardDescription>
          You can see details of your invitation link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`${getUserFullname(item.owner)} invited you to the ${
          item?.workspace?.title
        }, do you want to continue?`}</p>
      </CardContent>
      <CardFooter>
        <div className='flex flex-row items-center gap-x-2'>
          <InviteDeclineButton invite={item} />
          <JoinButton invite={item} onJoined={onJoined} />
        </div>
      </CardFooter>
    </Card>
  );
}
