"use client";

import DraggableComponent from "@/components/shared/draggable";
import ActionsRight from "./actions-right";
import ActionsLeft from "./actions-left";
import MicButton from "./actions-right/mic";
import UserButton from "./actions-left/user";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

type Props = {
  participant: RemoteParticipant | LocalParticipant;
};
export default function UserSession({ participant }: Props) {
  console.log("participant", participant);

  return (
    <DraggableComponent>
      <div className='relative rounded-full bg-primary w-[96px] h-[96px] flex flex-col items-center justify-center'>
        <div className='w-[86px] h-[86px] bg-white rounded-full flex flex-col items-center justify-center'>
          <div className='w-[82px] h-[82px] rounded-full bg-black'></div>
        </div>
        <ActionsRight>
          <MicButton />
        </ActionsRight>
        <ActionsLeft>
          <UserButton />
        </ActionsLeft>
      </div>
    </DraggableComponent>
  );
}
