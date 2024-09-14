import Participants from "@/components/shared/participants";
import TitleEl from "@/components/shared/title-el";
import React from "react";

export default function ScheduledUsers() {
  const users = 0;

  return (
    <TitleEl title={`Scheduled (${users})`}>
      <Participants participants={[]} />
    </TitleEl>
  );
}
