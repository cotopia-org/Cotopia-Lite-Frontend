// soundManager.ts
import { Howl } from "howler";

export const sounds = {
  backgroundChanged: new Howl({
    src: ["/assets/sounds-effects/background-changed.mp3"],
  }),
  coordinateChanged: new Howl({
    src: ["/assets/sounds-effects/coordinate-changed.mp3"],
  }),
  newMessage: new Howl({ src: ["/assets/sounds-effects/new-message.mp3"] }),
  newMessage2: new Howl({ src: ["/assets/sounds-effects/new-message-2.wav"] }),
  userGotClosed: new Howl({
    src: ["/assets/sounds-effects/user-got-closed.mp3"],
  }),
  left: new Howl({
    src: ["/assets/sounds-effects/left.mp3"],
  }),
  joined: new Howl({
    src: ["/assets/sounds-effects/joined.mp3"],
  }),
  elseUserleft: new Howl({
    src: ["/assets/sounds-effects/else-user-left.mp3"],
  }),
  elseUserJoin: new Howl({
    src: ["/assets/sounds-effects/else-user-join.mp3"],
  }),
};

export const playSoundEffect = (soundName: keyof typeof sounds) => {
  if (sounds[soundName]) {
    sounds[soundName].play();
  }
};
