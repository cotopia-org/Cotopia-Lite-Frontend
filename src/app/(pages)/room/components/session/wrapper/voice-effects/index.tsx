import React, { useEffect, useState } from "react";
import Ping from "./ping";

import { useUserTile } from "../..";

const getNumberRandom = () => {
  return Math.random() * 10000000;
};

export default function VoiceEffects() {
  const { track } = useUserTile();

  const [pings, setPings] = useState<number[]>([]);

  if (track === undefined) return;

  useEffect(() => {
    if (track === undefined) return;

    const id = getNumberRandom();

    setPings((prev) => [...prev, id]);

    setTimeout(() => {
      setPings((prev) => prev.filter((x) => x !== id));
    }, 600);

    return () => {
      setPings([]);
    };
  }, [track?.participant?.audioLevel, track?.participant?.isSpeaking]);

  return (
    <>
      {pings.map((_, key) => (
        <Ping key={key} />
      ))}
    </>
  );
}
