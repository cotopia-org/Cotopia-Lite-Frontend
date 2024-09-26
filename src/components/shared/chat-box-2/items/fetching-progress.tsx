import React from "react";
import FullLoading from "../../full-loading";

export default function FetchingProgress() {
  return (
    <div className='absolute top-0 flex items-center justify-center right-0 left-0'>
      <FullLoading />
    </div>
  );
}
