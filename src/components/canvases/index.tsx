import React, {
  useEffect,
  useState
} from "react";
import {
  moreFilterProps,
  PenProps,
  TagProps
} from "../../types";

export const RegularCanvas = ({ canvasRef }: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "7px",
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
      }}
    />
  );
};

export const TagCanvas = ({
  canvasRef,
  handleTagClick,
  handleTagMouseMove
}: TagProps) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "7px",
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
      }}
      onClick={handleTagClick}
      onMouseMove={handleTagMouseMove}
    />
  );
};

export const PenCanvas = ({ canvasRef }: PenProps) => {
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
    <canvas
      ref={canvasRef}
      onMouseDown={(e) => startDrawing(e)}
      onMouseMove={(e) => draw(e)}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onClick={(event: React.MouseEvent<HTMLCanvasElement>) => clickDot(event)}
      style={{
        borderRadius: "7px",
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
      }}
    />
  );
};

export const MoreFilterCanvas = ({
  canvasRef,
  zoom,
  blur,
  rotate,
  brightness,
  imgSrc,
  drawing
}: moreFilterProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    context!.clearRect(0, 0, canvas!.width, canvas!.height);

    const image = new Image();
    image.src = imgSrc;

    image.width = canvas!.width;
    image.height = canvas!.height;

    if (canvas) {
      const { width, height } = canvas;

      // Set canvas dimensions
      canvas!.width = width;
      canvas!.height = height;

      // Clear canvas and scale it
      const centerX = canvas!.width / 2;
      const centerY = canvas!.height / 2;

      context!.translate(centerX, centerY);
      context!.scale(zoom, zoom);
      context!.translate(-centerX, -centerY);
      context!.clearRect(0, 0, width, height);
    }

    context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
  }, [zoom, rotate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas?.getContext("2d");
    if (!context) return;

    const image = new Image();
    if (drawing !== "") {
      image.src = drawing;
    } else {
      image.src = imgSrc;
    }

    image.width = canvas.width;
    image.height = canvas.height;
    const deg = Math.PI / 180;
    const degToRad = (rotate: number) => rotate * deg;

    image.onload = () => {
      context!.filter = `blur(${blur}px) brightness(${brightness})`;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(degToRad(rotate++ % 360));
      context.drawImage(
        image,
        image.width / -2,
        image.height / -2,
        image.width,
        image.height
      );
      context.restore();
    };
  },[blur, rotate, brightness]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "7px",
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
      }}
    />
  );
};