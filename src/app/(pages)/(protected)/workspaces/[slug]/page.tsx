import React from "react";
import Wrapper from "./wrraper";

type Props = {
  params: {
    slug: string;
  };
};

export const metadata = {
  title: "Workspace",
};

export default function WorkspacePage({ params: { slug } }: Props) {
  return <Wrapper workspace_id={slug} />;
}
