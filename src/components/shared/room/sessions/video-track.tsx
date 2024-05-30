import {
  ParticipantClickEvent,
  TrackReference,
  useEnsureParticipant,
  useMaybeTrackRefContext,
  useTrack,
} from "@livekit/components-react";
import { TrackPublication } from "livekit-client";
import { VideoHTMLAttributes, useRef } from "react";

interface CustomVideoTrackType extends VideoHTMLAttributes<HTMLVideoElement> {
  trackRef?: TrackReference;
  publication?: TrackPublication;
  onTrackClick?: (evt: ParticipantClickEvent) => void;
  onSubscriptionStatusChanged?: (subscribed: boolean) => void;
  manageSubscription?: boolean;
}

const CustomVideoTrack = ({
  trackRef,
  publication,
  onTrackClick,
  onSubscriptionStatusChanged,
  manageSubscription,
  ...props
}: CustomVideoTrackType) => {
  const mediaEl = useRef<HTMLVideoElement>(null);

  const maybeTrackRef = useMaybeTrackRefContext();

  const _source = trackRef?.source ?? maybeTrackRef?.source;
  const _publication = trackRef?.publication ?? maybeTrackRef?.publication;
  const _participant = trackRef?.participant ?? maybeTrackRef?.participant;

  const participant = useEnsureParticipant(_participant);

  const { elementProps } = useTrack(
    { participant, source: _source as any, publication: _publication },
    { element: mediaEl, props }
  );

  const isScreenShare = participant.isScreenShareEnabled;

  return (
    <video
      className='-scale-x-100 scale-y-100 h-auto w-full'
      ref={mediaEl}
      {...(isScreenShare && _source !== "camera" && elementProps)}
    />
  );
};

export default CustomVideoTrack;
