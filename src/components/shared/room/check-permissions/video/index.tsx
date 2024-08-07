import FullLoading from "@/components/shared/full-loading";
import useLoading from "@/hooks/use-loading";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AllowVideoBtn from "./allow-video-btn";
import { useRoomContext } from "../../room-context";
import PermissionControls from "../controls";

const VideoContext = createContext<{
  videoStream: MediaStream | null;
  getPermissions: () => void;
  stopVideoStream: () => void;
}>({
  videoStream: null,
  getPermissions: () => {},
  stopVideoStream: () => {},
});

export const useVideoContext = () => useContext(VideoContext);

export default function Video() {
  const { videoState, changePermissionState } = useRoomContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPermission, setVideoPermission] = useState<boolean>(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const { startLoading, stopLoading, isLoading } = useLoading();

  const getPermissions = async () => {
    startLoading();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setVideoPermission(true);
      console.log("stream", stream);
      setVideoStream(stream);
      changePermissionState("video", true);
    } catch (err) {
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError") {
          setVideoPermission(false);
        }
      }
    } finally {
      stopLoading();
    }
  };

  const stopVideoStream = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
      setVideoPermission(false);
      changePermissionState("video", false);
      console.log("Video stream stopped");
    } else {
      console.log("No video stream to stop");
    }
  };

  useEffect(() => {
    if (videoState === true) {
      getPermissions();
    } else {
      stopVideoStream();
    }
  }, [videoState]);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [videoStream]);

  let content = (
    <>
      <video
        ref={videoRef}
        autoPlay
        className='mirror-video h-auto w-full max-h-[300px] object-cover'
      />
    </>
  );

  if (videoPermission === false && videoState === true)
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
    <VideoContext.Provider
      value={{ videoStream, getPermissions, stopVideoStream }}
    >
      <div className='w-full relative min-h-[300px] flex flex-col items-center justify-center bg-black/10 rounded-lg overflow-hidden'>
        {content}
        <div className='absolute bottom-0'>
          <PermissionControls />
        </div>
      </div>
    </VideoContext.Provider>
  );
}
