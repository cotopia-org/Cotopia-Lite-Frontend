import React, { useEffect, useState } from "react";
import Ping from "./ping";

import { useUserTile } from "../..";

const getNumberRandom = () => {
  return Math.random() * 10000000;
};

function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const minDelay = 600;
const maxDelay = 900;

const randomDelay = getRandomDelay(minDelay, maxDelay);

export default function VoiceEffects() {
  const { track } = useUserTile();

  const [pings, setPings] = useState<number[]>([]);

  if (track === undefined) return;

  const generateVoiceEffect = () => {
    const id = getNumberRandom();

    setPings((prev) => [...prev, id]);

    setTimeout(() => {
      setPings((prev) => prev.filter((x) => x !== id));
    }, randomDelay);
  };

  useEffect(() => {
    if (track === undefined) return;

    generateVoiceEffect();

    return () => {
      setPings([]);
    };
  }, [track?.participant?.audioLevel]);

  let interval: NodeJS.Timeout;
  useEffect(() => {
    function resetVoices() {
      clearInterval(interval);
      setPings([]);
    }

    if (track?.participant?.isSpeaking === false) {
      resetVoices();
    } else {
      interval = setInterval(() => {
        generateVoiceEffect();
      }, randomDelay);
    }
    return () => {
      resetVoices();
    };
  }, [track?.participant?.isSpeaking]);

  return (
    <>
      {pings.map((_, key) => (
        <Ping key={key} />
      ))}
    </>
  );
}
