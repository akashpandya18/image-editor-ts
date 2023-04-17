import React, { useRef } from "react";

interface CanvasProps {
  width: number;
  height: number;
}

const canvasStyle = {
  border: "1px solid black"
};

const TextOnImage: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function setCanvasRef(ref: HTMLCanvasElement | null) {
    canvasRef.current = ref;
  }

  function onCanvasMouseDown() {

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

export default TextOnImage;