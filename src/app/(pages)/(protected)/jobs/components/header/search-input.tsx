import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { useState } from "react";

function JobSearch() {
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);

  return (
    <>
      <CotopiaInput
        className={cn(
          `bg-gray-100 transition-all ${
            isSearchInputOpen ? "w-80" : "w-0 p-0 border-none"
          }`
        )}
        placeholder="Search Title, description, tags,..."
      />
      <CotopiaIconButton
        onClick={() => setIsSearchInputOpen(!isSearchInputOpen)}
        className="hover:!bg-transparent"
      >
        <Search size={28} className="text-gray-400" />
      </CotopiaIconButton>
    </>
  );
}

export default JobSearch;
