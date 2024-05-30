export type ParticipantType = any;

const isMyParticipant = (
  participants: ParticipantType[],
  localParticipant: ParticipantType
) => {
  let isLocal = false;
  let localPart = null;

  for (let part of participants) {
    if (part?.identity === localParticipant?.identity) {
      isLocal = true;
      localPart = part;
    }
  }
  return { isLocal, localPart };
};

export default isMyParticipant;
