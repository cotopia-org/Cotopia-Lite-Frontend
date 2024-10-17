import React from "react";
import Disconnected, { DisconnectLayoutProps } from "../disconnected";

type Props = DisconnectLayoutProps;

export default function LivekitDisconnected({ onReTry }: Props) {
  return <Disconnected onReTry={onReTry} />;
}
