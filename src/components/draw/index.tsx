import React from "react";
import { useOnDraw } from "../../hooks/useOnDraw";

interface CanvasProps {
  width: number;
  height: number;
}

const Draw: React.FC<CanvasProps> = ({ width, height }) => {
  const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);

  function onDraw(
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number },
    prevPoint: { x: number; y: number } | null
  ) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  }

  function drawLine(
    start: { x: number; y: number } | null,
    end: { x: number; y: number },
    ctx: CanvasRenderingContext2D,
    color: string,
    width: number
  ) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    if (start) {
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  return (
    <canvas
      width={width}
      height={height}
      onMouseDown={onCanvasMouseDown}
      style={canvasStyle}
      ref={(ref) => setCanvasRef(ref)}
    />
  );
};

export default Draw;

const canvasStyle = {
  border: "1px solid black",
};
