import React, {
  useEffect,
  useState,
  useRef
} from "react";
import {
  clickHandler,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp
} from "../controls/textOnImage";
import {
  mouseDown,
  mouseLeave,
  mouseMove,
  mouseUP
} from "../crop";
import {
  CanvasRefProps,
  TagProps,
  TextOnImageProps,
  CropProps,
  FlipCanvasProps,
  PenProps,
  MoreFilterProps
} from "../../types";

export const RegularCanvas = ({ canvasRef }: CanvasRefProps) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "0.438rem",
        boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)"
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
        borderRadius: "0.438rem",
        boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)"
      }}
      onClick={handleTagClick}
      onMouseMove={handleTagMouseMove}
    />
  );
};

export const TextOnImageCanvas = ({
  canvasRef,
  setTempPrompt,
  currentClicked,
  setCurrentClicked,
  imgSrc,
  allTextTags,
  dimensions,
  setAllTextTags,
  setIsEditing,
  setFormData,
  setDeleteTextTag,
  annotations,
  handleTagMouseMove,
  showAllTags,
  setShowAllTags,
  drawing
}: TextOnImageProps) => {
  const [isDraggingText, setIsDraggingText] = useState<boolean>(false);
  const [draggingText, setDraggingText] = useState<string>("");

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "0.438rem",
        boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)"
      }}
      onClick={(event: React.MouseEvent<HTMLCanvasElement>) => {
        clickHandler({
          event,
          canvasRef,
          setTempPrompt,
          setCurrentClicked,
          imgSrc,
          allTextTags,
          setIsEditing,
          setFormData
        });
      }}
      onMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => {
        handleMouseMove({
          event,
          isDraggingText,
          draggingText,
          canvasRef,
          allTextTags,
          dimensions,
          imgSrc,
          currentClicked,
          annotations,
          handleTagMouseMove,
          showAllTags,
          setShowAllTags,
          drawing
        })
      }}
      onMouseDown={(event: React.MouseEvent<HTMLCanvasElement>) => {
        handleMouseDown({
          event,
          setIsDraggingText,
          setDraggingText,
          canvasRef,
          allTextTags,
          setCurrentClicked
        })
      }}
      onMouseUp={(event: React.MouseEvent<HTMLCanvasElement>) => {
        handleMouseUp({
          event,
          canvasRef,
          isDraggingText,
          setIsDraggingText,
          draggingText,
          setDraggingText,
          allTextTags,
          setAllTextTags,
          currentClicked,
          setDeleteTextTag
        })
      }}
    />
  );
};

export const CropCanvas = ({
  canvasRef,
  currentCropped,
  setCurrentCropped,
  dimensions,
  imgSrc,
  handleTagMouseMove
}: CropProps): JSX.Element => {
  const [difference, setDifference] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });
  const [croppingNode, setCroppingNode] = useState<number>(0);
  const [isResize, setIsResize] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startingNode, setStartingNode] = useState({ x: 0, y: 0 });

  const imgRef = useRef<HTMLImageElement>(null);
  let mouseUp = {
    difference,
    setDifference,
    currentCropped,
    setCurrentCropped,
    croppingNode,
    isResize,
    isDragging,
    startingNode,
    canvasRef,
    imgRef
  };

  return (
    <>
      <canvas
        style={{
          borderRadius: "0.438rem",
          boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)"
        }}
        ref={canvasRef}
        onMouseDown={(event: React.MouseEvent<HTMLCanvasElement>) => mouseDown({
          event,
          currentCropped,
          setCroppingNode,
          setIsResize,
          setIsDragging,
          setStartingNode
        })}
        onMouseMove={(event) => mouseMove({
          event,
          setDifference,
          currentCropped,
          croppingNode,
          isResize,
          isDragging,
          startingNode,
          canvasRef,
          dimensions,
          imgRef,
          imgSrc,
          handleTagMouseMove
        })}
        onMouseUp={(event) => mouseUP({
          event,
          difference,
          setDifference,
          currentCropped,
          setCurrentCropped,
          croppingNode,
          isResize,
          setIsResize,
          isDragging,
          setIsDragging,
          startingNode
        })}
        onMouseLeave={(event: React.MouseEvent<HTMLCanvasElement>) => mouseLeave({
          event,
          setIsDragging,
          setIsResize,
          mouseUp // mouseUp = mouseUp
        })}
      />
      <img
        src={imgSrc}
        alt={"uploaded"}
        height={dimensions.height}
        width={dimensions.width}
        ref={imgRef}
        style={{ display: "none" }}
      />
    </>
  );
};

export const FlipCanvas = ({ canvasRef, handleTagMouseMove }: FlipCanvasProps) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "0.438rem",
        boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)"
      }}
      onMouseMove={handleTagMouseMove}
    />
  );
};

export const PenCanvas = ({ canvasRef, handleTagMouseMove }: PenProps) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (context) {
      context.beginPath();
      context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!isDrawing) return;

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    if (context) {
      // handleTagMouseMove(event);
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clickDot = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (context) {
      context.beginPath();
      context.fillStyle = "#000";
      context.arc(
        event.nativeEvent.offsetX,
        event.nativeEvent.offsetY,
        1,
        0,
        2 * Math.PI
      );
      context.fill();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={(e: React.MouseEvent<HTMLCanvasElement>) => startDrawing(e)}
      onMouseMove={(e: React.MouseEvent<HTMLCanvasElement>) => draw(e)}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onClick={(event: React.MouseEvent<HTMLCanvasElement>) => clickDot(event)}
      style={{
        borderRadius: "0.438rem",
        boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)"
      }}
      className={"pen-canvas"}
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
  drawing,
  handleTagMouseMove
}: MoreFilterProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = imgSrc;

    image.width = canvas.width;
    image.height = canvas.height;

    if (canvas) {
      const { width, height } = canvas;

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Clear canvas and scale it
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      context.translate(centerX, centerY);
      context.scale(zoom, zoom);
      context.translate(-centerX, -centerY);
      context.clearRect(0, 0, width, height);
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }, [zoom, rotate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
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
      blur = blur / 16;
      context.filter = `blur(${blur}rem) brightness(${brightness})`;

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
        borderRadius: "0.438rem",
        boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)"
      }}
      onMouseMove={handleTagMouseMove}
    />
  );
};