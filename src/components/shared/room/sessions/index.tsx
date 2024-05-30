import UserSession from "@/app/(pages)/room/components/session";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

type Props = {
  participants: (RemoteParticipant | LocalParticipant)[];
};
export default function UserSessions({ participants }: Props) {
  return participants.map((participant) => (
    <UserSession key={participant.identity} participant={participant} />
  ));
}
