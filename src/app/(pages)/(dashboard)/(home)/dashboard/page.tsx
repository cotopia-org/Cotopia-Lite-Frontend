import { __VARS } from "../../../../const/vars";
import CreateWorkspace from "../components/create-workspace";
import JoinWorkspaceWithLink from "../components/join-with-link";

export const metadata = {
  title: "Dashboard",
};

export default function HomePage() {
  //Storing token as cookie for further usings
  // async function handleInsertRoomToken(token: string) {
  //   "use server";

  //   //If token is falsy return empty
  //   if (!!!token)
  //     throw Error(
  //       "Token is required and it seems handleInsertRoomToken called without passing token as argument"
  //     );

  //   cookies().set(__VARS.tokenCookieKey, token);

  //   redirect("/select-room");
  // }

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-y-4 items-center'>
        <h1 className='font-medium text-black text-4xl text-center'>
          Welcome to CotopiaLite
        </h1>
        <p className='font-normal text-lg text-gray-700 text-center'>
          Connecting everyone through video conferencing with CotopiaLite.
        </p>
        <JoinWorkspaceWithLink />
        <CreateWorkspace />
      </div>
    </div>
  );
}
