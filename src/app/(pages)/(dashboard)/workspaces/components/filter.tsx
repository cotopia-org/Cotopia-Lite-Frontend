import CotopiaButton from "@/components/shared-ui/c-button";
import useQueryParams from "@/hooks/use-query-params";
import { Filter } from "lucide-react";
import React from "react";

export default function FilterButton() {
  const { query } = useQueryParams();
  const typeOfFilter = query?.["filter"] ?? "Date";

  return (
    <CotopiaButton
      variant={"ghost"}
      startIcon={<Filter size={16} />}
      className='text-gray-500'
    >{`Filter by: ${typeOfFilter}`}</CotopiaButton>
  );
}
