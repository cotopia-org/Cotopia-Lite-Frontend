import { Participant, Track, TrackPublication } from "livekit-client";

export type TrackReferenceType = {
  participant: Participant | undefined;
  source: Track.Source | undefined;
  publication: TrackPublication | undefined;
};
