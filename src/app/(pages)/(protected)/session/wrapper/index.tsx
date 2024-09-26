import { ReactNode } from "react";
import LiveKitVoiceFrequency from "./voice-effects/test";

type Props = {
  children: ReactNode;
};
export default function SessionWrapper({ children }: Props) {
  return (
    <div className='relative'>
      <LiveKitVoiceFrequency />
      {/* <VoiceEffects /> */}
      {children}
    </div>
  );
}
