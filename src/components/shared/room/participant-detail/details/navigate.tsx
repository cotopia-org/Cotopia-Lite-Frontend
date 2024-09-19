"use client";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { LocateFixed } from "lucide-react";
import { useStoreApi, useReactFlow } from "@xyflow/react";
import { useUserDetail } from ".";
import { useCallback } from "react";
import { useRoomContext } from "../../room-context";
import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper";
import { dispatch } from "use-bus";
import { _BUS } from "@/app/const/bus";
import { __VARS } from "@/app/const/vars";
import useObjectSize from "@/hooks/use-object-size";

interface Props {}

const UserNavigate = (props: Props) => {
  const socket = useSocket();

  const { user } = useUserDetail();
  const { user: myAccount } = useProfile();
  const {
    objectSize: { width, height },
  } = useObjectSize("main-room-holder");

  const { room } = useRoomContext();
  const rf = useReactFlow();
  const nodes = rf.getNodes();

  const navOnUserHandler = useCallback(() => {
    if (!socket) return;
    if (!user) return;
    const targetUser = nodes.find((n) => n.id === user.username);

    const h = targetUser?.measured?.height;
    const w = targetUser?.measured?.width;
    const xdimension = targetUser?.position.x;
    const ydimension = targetUser?.position.y;

    if (h && w && xdimension && ydimension) {
      const x = xdimension + w / 2 + __VARS.teleportMargin;
      const y = ydimension + h / 2 + __VARS.teleportMargin;
      const zoom = rf.getZoom();

      rf.setCenter(x, y, { zoom, duration: 1000 });
      rf.setViewport(
        {
          x: x / 2,
          y: y / 2,
          zoom,
        },
        {
          duration: 1000,
        }
      );

      const newCoords = `${x},${y}`;

      const sendingObject = {
        room_id: room?.id,
        coordinates: newCoords,
        username: myAccount.username,
      };

      socket.emit("updateCoordinates", sendingObject);

      dispatch({
        type: _BUS.changeMyUserCoord,
        data: {
          ...myAccount,
          coordinates: `${x},${y}`,
        },
      });
    }

    // console.log(nodes, "Nodes")
  }, [user, nodes, myAccount.username]);

  return (
    <CotopiaTooltip title='User navigate'>
      <CotopiaIconButton
        onClick={navOnUserHandler}
        size={"icon"}
        className='text-black w-6 h-6'
      >
        <LocateFixed size={16} />
      </CotopiaIconButton>
    </CotopiaTooltip>
  );
};

export default UserNavigate;
