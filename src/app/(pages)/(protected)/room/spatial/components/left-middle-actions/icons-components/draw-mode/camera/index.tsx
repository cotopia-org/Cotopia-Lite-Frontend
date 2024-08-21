import React from "react";
import { toPng } from "html-to-image";
import { Camera } from "lucide-react";
import RoomIcon from "../../../room-icon";

function ScreenshotButton() {
  function handleScreenshot() {
    const targetElement = document.getElementById("room-spatial-canvas");

    if (targetElement) {
      toPng(targetElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "sketch.png";
          link.click();
        })
        .catch((error) => {
          console.error("Failed to capture screenshot:", error);
        });
    } else {
      console.error("Element not found:", "room-spatial-canvas");
    }
  }

  return <RoomIcon icon={<Camera size={20} onClick={handleScreenshot} />} />;
}

export default ScreenshotButton;
