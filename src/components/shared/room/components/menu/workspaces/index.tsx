"use client";

import FullLoading from "@/components/shared/full-loading";
import Section from "@/components/shared/section";
import Workspaces from "@/components/shared/workspaces/workspaces";
import { useApi } from "@/hooks/swr";
import { FetchDataType } from "@/lib/axios";
import { WorkspaceType } from "@/types/workspace";

type Props = {
  className?: string;
};

export default function WorkspaceList({ className }: Props) {
  const { data, isLoading } =
    useApi<FetchDataType<WorkspaceType[]>>(`/workspaces`);
  const items: WorkspaceType[] = !!data ? data?.data : [];

  let content = <Workspaces items={items} />;

  if (isLoading) content = <FullLoading />;

  return (
    <div className='flex flex-col gap-y-4'>
      <div className={`flex flex-col gap-y-4 p-6 ${className ?? ""}`}>
        <Section title='Workspaces'>{content}</Section>
      </div>
    </div>
  );
}
