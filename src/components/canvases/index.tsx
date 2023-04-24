import React, { useState } from "react";
import {
  DrawProps,
  // MoreOptionsCanvasProps,
  // TagProps
} from "../../types";

// export const TagCanvas = ({
//   canvasRef,
//   handleTagClick,
//   handleTagMouseMove,
// }: TagProps) => {
//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         borderRadius: "7px",
//         boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
//       }}
//       onClick={handleTagClick}
//       onMouseMove={handleTagMouseMove}
//     />
//   );
// };

export const DrawCanvas = ({ canvasRef }: DrawProps) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      context.beginPath();
      context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!isDrawing) return;

    if (context) {
      context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clickDot = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context!.beginPath();
      context!.fillStyle = "#000";
      context!.arc(
        event.nativeEvent.offsetX,
        event.nativeEvent.offsetY,
        1,
        0,
        2 * Math.PI
      );
      context!.fill();
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => startDrawing(e)}
        onMouseMove={(e) => draw(e)}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onClick={(event: React.MouseEvent<HTMLCanvasElement>) =>
          clickDot(event)
        }
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
      />
    </>
  );
};

// export const MoreOptionsCanvas = ({ canvasRef }: MoreOptionsCanvasProps) => {
//
//   // const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
//   //   if (dragging && zoom > 1) {
//   //     const { x, y } = touch.current;
//   //     const { clientX, clientY } = event;
//   //     setOffset({
//   //       x: offset.x + (x - clientX),
//   //       y: offset.y + (y - clientY),
//   //     });
//   //     touch.current = { x: clientX, y: clientY };
//   //   }
//   // };
//   //
//   // const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
//   //   const { clientX, clientY } = event;
//   //   touch.current = { x: clientX, y: clientY };
//   //   setDragging(true);
//   // };
//   //
//   // const handleMouseUp = () => setDragging(false);
//   //
//   // const handleZoomEffect = () => {
//   //   const canvas = canvasRef.current;
//   //   const context = canvas?.getContext("2d");
//   //
//   //   const image = new Image();
//   //   image.src = imgSrc;
//   //
//   //   if (canvas) {
//   //     const { width, height } = canvas;
//   //
//   //     // Set canvas dimensions
//   //     canvas!.width = width;
//   //     canvas!.height = height;
//   //
//   //     // Clear canvas and scale it
//   //     const centerX = canvas!.width / 2;
//   //     const centerY = canvas!.height / 2;
//   //
//   //     // context!.translate(-offset.x, -offset.y);
//   //     context!.translate(centerX, centerY);
//   //     context!.scale(zoom, zoom);
//   //     context!.translate(-centerX, -centerY)
//   //     context!.clearRect(0, 0, width, height);
//   //
//   //     // Make sure we're zooming to the center
//   //     // const x = (context!.canvas.width / zoom - image.width) / 2;
//   //     // const y = (context!.canvas.height / zoom - image.height) / 2;
//   //
//   //     // Draw image
//   //     // context!.drawImage(image, x, y);
//   //   }
//   // };
//   //
//   // useEffect(() => {
//   //   handleZoomEffect();
//   // }, [zoom, offset]);
//   //
//   // useEffect(() => {
//   //   const image = new Image();
//   //   image.src = imgSrc;
//   //   const canvas = canvasRef.current;
//   //   const context = canvas!.getContext("2d");
//   //
//   //   image.width = canvas!.width;
//   //   image.height = canvas!.height;
//   //
//   //   context!.clearRect(0, 0, canvas!.width, canvas!.height);
//   //
//   //   setTimeout(() => {
//   //     context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
//   //   });
//   //   context!.filter = `blur(${blur}px) brightness(${brightness})`;
//   // }, [blur, brightness, zoom]);
//
//   return (
//     <canvas
//       ref={canvasRef}
//       // onMouseDown={(e) => startDrawing(e)}
//       // onMouseMove={(e) => draw(e)}
//       // onMouseUp={stopDrawing}
//       // onMouseLeave={stopDrawing}
//       style={{
//         borderRadius: "7px",
//         boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
//       }}
//     />
//   );
// };