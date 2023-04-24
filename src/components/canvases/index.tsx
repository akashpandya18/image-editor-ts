import { useState } from "react";
import { DrawProps, TagProps } from "../../types";

export const TagCanvas = ({
  canvasRef,
  handleTagClick,
  handleTagMouseMove,
}: TagProps) => {
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleTagClick}
        onMouseMove={handleTagMouseMove}
      />
    </>
  );
};
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
export const RegularCanvas = ({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
      />
    </>
  );
};
