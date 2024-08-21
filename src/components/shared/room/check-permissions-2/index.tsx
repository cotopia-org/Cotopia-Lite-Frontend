import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Mic, Video as IconVideo } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useRoomContext } from "../room-context";
import { useRoomHolder } from "..";
import CotopiaButton from "@/components/shared-ui/c-button";
import Video from "./video";

interface MediaAccessProps {
  onChecked: () => void;
}

export const useMediaPermissions = () => {
  const [mediaPermissions, setMediaPermissions] = useState({
    audio: true,
    video: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getUserfromLocalStorage = localStorage.getItem("media-permission")
        ? JSON.parse(localStorage.getItem("media-permission") ?? "{}")
        : null;
      setMediaPermissions(getUserfromLocalStorage);
    }
  }, []);

  return mediaPermissions;
};

const CheckPermissions2: React.FC<MediaAccessProps> = ({ onChecked }) => {
  const mediaPermissions = useMediaPermissions();

  const { changeMediaPermission } = useRoomHolder();
  const { room_id, workspace_id } = useRoomContext();

  const [defaultVideoAccess, setDefaultVideoAccess] = useState<boolean | null>(
    false
  );
  const [defaultAudioAccess, setDefaultAudioAccess] = useState<boolean | null>(
    false
  );

  const [hasVideoAccess, setHasVideoAccess] = useState<boolean | null>(false);
  const [hasAudioAccess, setHasAudioAccess] = useState<boolean | null>(false);

  useEffect(() => {
    if (mediaPermissions) {
      if (mediaPermissions?.audio) {
        setDefaultAudioAccess(mediaPermissions?.audio ?? false);
        checkAudioAccess();
      }

      if (mediaPermissions?.video) {
        setDefaultVideoAccess(mediaPermissions?.video ?? false);
        checkVideoAccess();
      }
    }
  }, [mediaPermissions]);

  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  useEffect(() => {
    if (defaultAudioAccess) checkAudioAccess();
  }, [defaultAudioAccess]);

  const checkVideoAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setHasVideoAccess(true);
      setVideoStream(stream);
    } catch (err) {
      if (err instanceof DOMException) {
        if (err.message.includes("video")) {
          setHasVideoAccess(false);
        }
      }
    }
  };

  const checkAudioAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setHasAudioAccess(true);
      setAudioStream(stream);
    } catch (err) {
      if (err instanceof DOMException) {
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

      //Disable video
      changeMediaPermission({
        audio: !!(hasAudioAccess && audioStream),
        video: false,
      });
    } else {
      checkVideoAccess();
      //Enable video
      changeMediaPermission({
        audio: !!(hasAudioAccess && audioStream),
        video: true,
      });
    }
  };

  const handleToggleAudio = () => {
    if (audioStream) {
      const audioTracks = audioStream.getAudioTracks();
      audioTracks.forEach((track) => {
        if (track.enabled) {
          track.stop(); // Stop the track completely
          setAudioStream(null); // Clear the video stream state
        } else {
          // Restart the video stream
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((newStream) => {
              const newTrack = newStream.getAudioTracks()[0];
              setAudioStream(newStream);
            });
        }
      });
      //Disable audio
      changeMediaPermission({
        audio: false,
        video: !!(hasVideoAccess && videoStream),
      });
    } else {
      checkAudioAccess();
      //Enable audio
      changeMediaPermission({
        audio: true,
        video: !!(hasVideoAccess && videoStream),
      });
    }
  };

  const router = useRouter();
  const handleJoin = async () => {
    changeMediaPermission({
      audio: !!(hasAudioAccess && audioStream),
      video: !!(hasVideoAccess && videoStream),
    });

    router.push(`/workspaces/${workspace_id}/rooms/${room_id}`);
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
          variant={"default"}
          className={videoButtonClss}
          onClick={handleToggleVideo}
        >
          <IconVideo />
        </CotopiaIconButton>
        <CotopiaIconButton
          variant={"default"}
          className={audioButtonClss}
          onClick={handleToggleAudio}
        >
          <Mic />
        </CotopiaIconButton>
      </div>
      <div>
        <CotopiaButton
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
