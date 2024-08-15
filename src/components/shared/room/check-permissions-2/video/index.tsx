import React, { ReactNode } from "react";
import AllowVideoBtn from "./allow-video-btn";

type Props = {
  hasVideoAccess: boolean;
  videoNode?: ReactNode;
  hasVideoStream?: boolean;
};
export default function Video({
  hasVideoAccess,
  hasVideoStream,
  videoNode,
}: Props) {
  let content = <>{videoNode}</>;

  if (hasVideoAccess === false)
    content = (
      <div className='flex flex-col gap-y-2 items-center justify-center'>
        <strong className='text-xl'>
          Do you want people to see you in the meeting?
        </strong>
        <AllowVideoBtn />
      </div>
    );

  if (!hasVideoStream)
    content = (
      <div className='flex flex-col gap-y-2 items-center justify-center'>
        <strong className='text-xl'>Camera is off</strong>
      </div>
    );

  return (
    <div className='w-full relative min-h-[300px] flex flex-col items-center justify-center bg-black/10 rounded-lg overflow-hidden'>
      {content}
    </div>
  );
}
