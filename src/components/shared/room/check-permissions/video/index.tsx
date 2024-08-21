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
  const [hasVideoAccess, setHasVideoAccess] = useState<boolean | null>(null);
  const [hasAudioAccess, setHasAudioAccess] = useState<boolean | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  useEffect(() => {
    checkMediaAccess();
  }, []);

  const checkMediaAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setHasVideoAccess(true);
      setHasAudioAccess(true);
      setVideoStream(stream);
      setAudioStream(stream);
    } catch (err) {
      if (err instanceof DOMException) {
        if (err.message.includes("video")) {
          setHasVideoAccess(false);
        }
        if (err.message.includes("audio")) {
          setHasAudioAccess(false);
        }
      }
    }
  };

  const handleToggleVideo = () => {
    if (videoStream) {
      const videoTracks = videoStream.getVideoTracks();
      videoTracks.forEach((track) => {
        if (track.enabled) {
          track.stop(); // Stop the track completely
          setVideoStream(null); // Clear the video stream state
        } else {
          // Restart the video stream
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((newStream) => {
              const newTrack = newStream.getVideoTracks()[0];
              setVideoStream(newStream);
              if (videoRef.current) {
                videoRef.current.srcObject = newStream;
              }
            });
        }
      });
    } else {
      checkMediaAccess();
    }
  };

  const handleToggleAudio = () => {
    if (audioStream) {
      const audioTracks = audioStream.getAudioTracks();
      audioTracks.forEach((track) => (track.enabled = !track.enabled));
    }
  };

  let content = (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className='mirror-video h-auto w-full max-h-[300px] object-cover'
      />
    </>
  );

  if (hasVideoAccess === false)
    content = (
      <div className='flex flex-col gap-y-2 items-center justify-center'>
        <strong className='text-xl'>
          Do you want people to see you in the meeting?
        </strong>
        <AllowVideoBtn />
      </div>
    );

  if (videoStream === null)
    content = (
      <div className='flex flex-col gap-y-2 items-center justify-center'>
        <strong className='text-xl'>Camera is off</strong>
      </div>
    );

  // if (isLoading) content = <FullLoading />;

  return (
    <VideoContext.Provider
      value={{
        videoStream,
        getPermissions: checkMediaAccess,
        stopVideoStream: handleToggleVideo,
      }}
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
