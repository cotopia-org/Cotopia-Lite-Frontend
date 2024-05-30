import {
  isTrackReference,
  isTrackReferencePlaceholder,
} from "@livekit/components-core";
import { TrackReferenceOrPlaceholder } from "@livekit/components-react";

const getTrackReferenceId = (
  trackReference: TrackReferenceOrPlaceholder | number
) => {
  if (
    typeof trackReference === "string" ||
    typeof trackReference === "number"
  ) {
    return `${trackReference}`;
  } else if (isTrackReferencePlaceholder(trackReference)) {
    return `${trackReference.participant.identity}_${trackReference.source}_placeholder`;
  } else if (isTrackReference(trackReference)) {
    return `${trackReference.participant.identity}_${trackReference.publication.source}_${trackReference.publication.trackSid}`;
  } else {
    throw new Error(
      `Can't generate a id for the given track reference: ${trackReference}`
    );
  }
};

export default getTrackReferenceId;
