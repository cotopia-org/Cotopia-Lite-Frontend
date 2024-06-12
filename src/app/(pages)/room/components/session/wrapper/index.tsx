import { ReactNode } from "react";
import VoiceEffects from "./voice-effects";

type Props = {
  children: ReactNode;
};
export default function SessionWrapper({ children }: Props) {
  return (
    <div className='relative'>
      <VoiceEffects />
      {children}
    </div>
  );
}
