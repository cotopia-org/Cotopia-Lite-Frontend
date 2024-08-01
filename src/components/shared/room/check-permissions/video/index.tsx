import CotopiaButton from "@/components/shared-ui/c-button";
import FullLoading from "@/components/shared/full-loading";
import useLoading from "@/hooks/use-loading";
import React, { useEffect, useRef, useState } from "react";
import AllowVideoBtn from "./allow-video-btn";
import { useRoomContext } from "../../room-context";

export default function Video() {
  const { videoState } = useRoomContext();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPermission, setVideoPermission] = useState<boolean>(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const { startLoading, stopLoading, isLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const getPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setVideoPermission(true);
        setVideoStream(stream);
        stopLoading();
      } catch (err) {
        stopLoading();
        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError") {
            setVideoPermission(false);
          }
        }
      }
    };

    getPermissions();
  }, []);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream, videoState]);

  let content = (
    <>
      <video
        ref={videoRef}
        autoPlay
        className='mirror-video h-auto w-full max-h-[300px] object-cover'
      />
    </>
  );

  if (videoPermission === false)
    content = (
      <div className='flex flex-col gap-y-2 items-center justify-center'>
        <strong className='text-xl'>
          Do you want people to see you in the meeting?
        </strong>
        <AllowVideoBtn />
      </div>
    );

  if (videoState === false)
    content = (
      <div className='flex flex-col gap-y-2 items-center justify-center'>
        <strong className='text-xl'>Camera is off</strong>
      </div>
    );

  if (isLoading) content = <FullLoading />;

  return (
    <div>
      <div className='w-full relative min-h-[300px] flex flex-col items-center justify-center bg-black/10  rounded-lg overflow-hidden'>
        {content}
      </div>
    </div>
  );
}
