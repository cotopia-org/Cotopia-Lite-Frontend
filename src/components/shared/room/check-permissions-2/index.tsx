import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Mic, Video as IconVideo } from "lucide-react";
import React, { useEffect, useRef } from "react";
import CotopiaButton from "@/components/shared-ui/c-button";
import Video from "./video";
import { useRoomHolder } from "..";
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";

interface MediaAccessProps {
  onChecked: () => void;
}

const CheckPermissions2: React.FC<MediaAccessProps> = ({ onChecked }) => {
  const socket = useSocket();

  const {
    stream,
    stream_loading,
    enableVideoAccess,
    disableVideoAccess,
    enableAudioAccess,
    disableAudioAccess,
    changeStreamState,
  } = useRoomHolder();

  const permissions = stream.permissions;
  const hasVideoAccess = permissions.video;
  const hasAudioAccess = permissions.audio;
  const videoStream = stream.videoStream;
  const audioStream = stream.audioStream;

  const videoRef = useRef<HTMLVideoElement>(null);
  const firstAudRef = useRef<boolean>(true);
  const firstVidRef = useRef<boolean>(true);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  useEffect(() => {
    const audioStreaming = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      changeStreamState(stream, "audio");
      firstAudRef.current = false;
    };

    if (!!firstAudRef.current && hasAudioAccess) {
      audioStreaming();
    }
  }, [hasAudioAccess, firstAudRef]);

  useEffect(() => {
    const videoStreaming = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      changeStreamState(stream, "video");
      firstAudRef.current = false;
    };
    if (!!firstVidRef.current && hasVideoAccess) {
      videoStreaming();
      firstVidRef.current = false;
    }
  }, [hasVideoAccess, firstVidRef]);

  const handleToggleVideo = () => {
    if (videoStream) {
      disableVideoAccess();
    } else {
      enableVideoAccess();
    }
  };

  const handleToggleAudio = () => {
    if (audioStream) {
      disableAudioAccess();
    } else {
      enableAudioAccess();
    }
  };

  const handleJoin = async () => {
    if (onChecked) onChecked();
  };

  let videoButtonClss = "text-black border bg-white";

  if (hasVideoAccess && videoStream)
    videoButtonClss = "!bg-destructive !text-white";

  let audioButtonClss = "text-black border bg-white";

  if (hasAudioAccess && audioStream)
    audioButtonClss = "!bg-destructive !text-white";

  return (
    <div className='flex flex-col gap-y-4 items-center w-[400px] max-w-full mx-auto my-8'>
      <h2 className=' text-xl font-bold'>Media Access</h2>
      <Video
        hasVideoAccess={!!hasVideoAccess}
        hasVideoStream={videoStream !== null}
        videoNode={
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", maxWidth: "600px" }}
          />
        }
      />

      <div className='flex flex-row items-center gap-x-2'>
        <CotopiaIconButton
          disabled={stream_loading}
          variant={"default"}
          className={videoButtonClss}
          onClick={handleToggleVideo}
        >
          <IconVideo />
        </CotopiaIconButton>
        <CotopiaIconButton
          disabled={stream_loading}
          variant={"default"}
          className={audioButtonClss}
          onClick={handleToggleAudio}
        >
          <Mic />
        </CotopiaIconButton>
      </div>
      <div>
        <CotopiaButton
          loading={!!!socket}
          disabled={stream_loading}
          onClick={handleJoin}
          className='bg-blue-500 min-w-[100px]'
        >
          Join Now
        </CotopiaButton>
      </div>
    </div>
  );
};

export default CheckPermissions2;
