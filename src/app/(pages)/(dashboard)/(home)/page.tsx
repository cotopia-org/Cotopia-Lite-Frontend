import { cookies } from "next/headers";
import { __VARS } from "../../../const/vars";
import GetRoomToken from "./components/get-room-token";
import { redirect } from "next/navigation";

export default function HomePage() {
  //Storing token as cookie for further usings
  async function handleInsertRoomToken(token: string) {
    "use server";

    //If token is falsy return empty
    if (!!!token)
      throw Error(
        "Token is required and it seems handleInsertRoomToken called without passing token as argument"
      );

    cookies().set(__VARS.tokenCookieKey, token);

    redirect("/select-room");
  }

  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center'>
      <GetRoomToken onSetToken={handleInsertRoomToken} />
    </main>
  );
}
