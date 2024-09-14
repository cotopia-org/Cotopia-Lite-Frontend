import { UserMinimalType } from "@/types/user";
import { FullModalBox } from "../../modal-box";
import { ReactNode } from "react";
import Details from "./details";

type Props = {
  user: UserMinimalType;
  children: (open: () => void) => ReactNode;
};
export default function ParticipantDetails({ user, children }: Props) {
  return (
    <FullModalBox
      trigger={children}
      className='max-h-screen !rounded-none !p-0'
    >
      {(open, close) => <Details user={user} />}
    </FullModalBox>
  );
}
