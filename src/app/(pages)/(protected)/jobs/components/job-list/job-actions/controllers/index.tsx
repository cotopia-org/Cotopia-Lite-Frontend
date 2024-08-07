import PlayJob from "./play";
import PauseJob from "./pause";
import DoneJob from "./done";

type Props = {
  status: string;
};

function JobControllers({ status }: Props) {
  return (
    <div className=" flex justify-around gap-2">
      {status === "paused" && <PlayJob />}
      {status === "doing" && (
        <>
          <PauseJob />
          <DoneJob />
        </>
      )}
    </div>
  );
}

export default JobControllers;
