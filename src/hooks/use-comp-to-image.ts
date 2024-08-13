import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

const useComponentToImage = (key: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        const img = new window.Image();
        img.src = canvas.toDataURL("image/png");

        img.onload = () => {
          setImage(img);
        };
      });
    }
  }, [key]); //Render whenever render key changed

  return { image, componentRef };
};

export default useComponentToImage;
