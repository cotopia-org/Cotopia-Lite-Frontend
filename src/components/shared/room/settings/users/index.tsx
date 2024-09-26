import OnlineUsers from "./online";
import WorkingUsers from "./working";
import OfflineUsers from "./offline";
import ScheduledUsers from "./scheduled";

export default function WorkspaceUsers() {
  return (
    <div className='flex flex-col gap-y-8 py-4'>
      <WorkingUsers />
      <OnlineUsers />
      <ScheduledUsers />
      <OfflineUsers />
    </div>
  );
}
