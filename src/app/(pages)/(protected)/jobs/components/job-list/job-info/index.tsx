import JobCreator from "./creator";
import Duration from "./duration";
import Status from "./status";
import TimeStamp from "./time-stamp";

type Props = {
  date: Date;
  avatar?: string;
  roomName: string;
  username: string;
  status: string
};

function JobInfo({ status, date, avatar, roomName, username }: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3 mt-1">
        <TimeStamp date={date} />
        <Duration />
        {status === "paused" && <Status />}
      </div>
      <JobCreator avatar={avatar} username={username} roomName={roomName} />
    </div>
  );
}

export default JobInfo;
