import React, { useEffect, useRef, useState } from "react";
import { ScreenShot } from "../../assets/icons";

interface Props {
  imageUrl: string;
  blur: number;
  zoom: number;
  rotate: number;
  brightness: number;
}

const Effects: React.FC<Props> = ({
  imageUrl,
  blur,
  zoom,
  // rotate,
  brightness
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [
    // dimensions
    , setDimensions] = useState({ width: 0, height: 0 });
  const [zoomWidth, setZoomWidth] = useState<number>(0);
  const [zoomHeight, setZoomHeight] = useState<number>(0);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const { width, height } = img;
      if (width > 1000) {
        const ratio = width / height;
        const newHeight = 1000 / ratio;
        const newWidth = 563 * ratio;
        setDimensions({ width: newWidth, height: newHeight });
      } else {
        setDimensions({ width, height });
      }
    };
  }, [imageUrl]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const { width, height } = dimensions;
  //   canvas!.width = width;
  //   canvas!.height = height;
  //   const ctx = canvas!.getContext("2d");
  //   const image = new Image();
  //   image.src = imageUrl;
  //   image.onload = () => {
  //     ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
  //   };
  // },[dimensions, imageUrl]);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    const { width, height } = img;

    setZoomWidth(Math.round(((width * ((zoom * 10) / 100)) + width) * 100) / 100);
    setZoomHeight(Math.round(((height * ((zoom * 10) / 100)) + height) * 100) / 100);
  },[zoom]);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    image.width = canvas!.width;
    image.height = canvas!.height;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);

    canvas!.width = zoomWidth;
    canvas!.height = zoomHeight;

    setTimeout(() => {
      context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
      context!.filter = `blur(${blur * 10}px) brightness(${brightness})`;
      // context!.rotate(rotate);
    });
  }, [zoomWidth, zoomHeight]);

  const handleScreenShot = (e: any) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const image = canvas!.toDataURL("image/png");

    // To download the image, you can create a link element and simulate a click
    const link = document.createElement("a");
    link.download = "canvas-screenshot.png";
    link.href = image;
    link.click();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
        }}
      />

      <div>
        <button
          style={{
            border: "none",
            borderRadius: "7px",
            padding: "10px",
            color: "#fff",
            cursor: "pointer",
            backgroundColor: "#2a2a2a",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)"
          }}
          onClick={(e: any) => handleScreenShot(e)}
        >
          <ScreenShot />
        </button>
      </div>
    </div>
  );
};

export default Effects;