import { useParticipants } from "@livekit/components-react";
import { useRoomContext } from "../../room-context";
import { UserMinimalType } from "@/types/user";
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";

const DEFAULT_TILE_POSITION = [0, 0];
const BOUNDRY_RADIUS = 50;
const BOUNDRY_CENTER_X = 500;
const BOUNDRY_CENTER_Y = 500;

const LiveKitAudioManager = () => {
  const participants = useParticipants();

  const { room } = useRoomContext();
  const users = room?.participants ?? [];

  const checkBoundaries = () => {
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        if (isOverlap(users[i], users[j])) {
          const volume1 = calculateVolume(users[i]);
          const volume2 = calculateVolume(users[j]);
          setVolume("" + users[i].username, volume1);
          setVolume("" + users[j].username, volume2);
        } else {
          setVolume("" + users[i].username, 0);
          setVolume("" + users[j].username, 0);
        }
      }
    }
  };

  const isOverlap = (
    user1: UserMinimalType,
    user2: UserMinimalType
  ): boolean => {
    const user1Coordinates = (
      user1?.coordinates
        ? user1?.coordinates?.split(",")
        : DEFAULT_TILE_POSITION
    )?.map((x) => +x);

    const user2Coordinates = (
      user2?.coordinates
        ? user2?.coordinates?.split(",")
        : DEFAULT_TILE_POSITION
    )?.map((x) => +x);

    const distance = Math.sqrt(
      Math.pow(user1Coordinates[0] - user2Coordinates[0], 2) +
        Math.pow(user1Coordinates[1] - user2Coordinates[1], 2)
    );
    return distance < 2 * BOUNDRY_RADIUS; //Because we have 2 users
  };

  const calculateVolume = (user: UserMinimalType): number => {
    const userCoordinates = (
      user?.coordinates ? user?.coordinates?.split(",") : DEFAULT_TILE_POSITION
    )?.map((x) => +x);

    const distanceFromCenter = Math.sqrt(
      Math.pow(userCoordinates[0] - BOUNDRY_CENTER_X, 2) +
        Math.pow(userCoordinates[1] - BOUNDRY_CENTER_Y, 2)
    );
    const maxDistance = BOUNDRY_RADIUS;
    const volume = distanceFromCenter / maxDistance; // Normalize volume between 0 and 1
    return Math.min(Math.max(volume, 0), 1); // Ensure volume is between 0 and 1
  };

  const setVolume = (userName: string, volume: number) => {
    if (room) {
      const participant = participants.find((x) => x.identity === userName);
      if (participant !== undefined) {
        participant.audioLevel = 100;
      }
    }
  };

  useSocket("updateCoordinates", (data) => {
    checkBoundaries();
  });

  // useEffect(() => {
  //   checkBoundaries();
  // }, [room?.participants]);

  return null;
};

export default LiveKitAudioManager;
