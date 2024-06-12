import { redirect } from "next/navigation";
import React from "react";

export default function HomePage() {
  return redirect(`/dashboard`);
  //   return <div>HomePage</div>;
}
