import React from "react";
import RoomSpatialWrapper from "./wrapper";
import { cookies } from "next/headers";
import { __VARS } from "@/app/const/vars";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Spatial Room",
};

export default async function SpacialRoomPage() {
  //Getting livekit token from cookies
  const token = cookies().get(__VARS.tokenCookieKey)?.value;

  //If user doesn't have tokenCookie, we should redirect their to the home page
  if (!token) return redirect("/?message=room_token_missmatch");

  return <RoomSpatialWrapper token={token} />;
}
