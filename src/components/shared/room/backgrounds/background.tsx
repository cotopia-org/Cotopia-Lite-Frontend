import Image from "next/image";
import React from "react";

export default function Background() {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-cover bg-center'>
      <Image fill src={`/assets/backgrounds/bg-sample.webp`} alt='' />
    </div>
  );
}
