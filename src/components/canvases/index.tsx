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
  MoreFilterProps, AnnotationProps
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

export const TagCanvas = ({ canvasRef, handleTagClick, handleTagMouseMove }: TagProps) => {
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
  drawing,
  blur,
  zoom,
  rotate,
  brightness,
  cropCanvas
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
      onClick={(textOnImageClickEvent: React.MouseEvent<HTMLCanvasElement>) => clickHandler({
        textOnImageClickEvent,
        canvasRef,
        setTempPrompt,
        setCurrentClicked,
        imgSrc,
        allTextTags,
        setIsEditing,
        setFormData,
        drawing,
        cropCanvas
      })}
      onMouseMove={(textOnImageMouseMoveEvent: React.MouseEvent<HTMLCanvasElement>) => handleMouseMove({
        textOnImageMouseMoveEvent,
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
        drawing,
        blur,
        zoom,
        rotate,
        brightness,
        setDeleteTextTag,
        cropCanvas
      })}
      onMouseDown={(textOnImageMouseDownEvent: React.MouseEvent<HTMLCanvasElement>) => handleMouseDown({
        textOnImageMouseDownEvent,
        setIsDraggingText,
        setDraggingText,
        canvasRef,
        allTextTags,
        setCurrentClicked
      })}
      onMouseUp={(textOnImageMouseUpEvent: React.MouseEvent<HTMLCanvasElement>) => handleMouseUp({
        textOnImageMouseUpEvent,
        canvasRef,
        isDraggingText,
        setIsDraggingText,
        draggingText,
        setDraggingText,
        allTextTags,
        setAllTextTags,
        currentClicked,
        setDeleteTextTag
      })}
    />
  );
};

export const CropCanvas = ({
  canvasRef,
  currentCropped,
  setCurrentCropped,
  dimensions,
  imgSrc,
  annotations,
  showAllTags,
  setShowAllTags,
  drawing,
  allTextTags,
  setHoverTag,
  setHoverPos,
  setShowH,
  cropCanvas
}: CropProps): JSX.Element => {
  const [difference, setDifference] = useState({ width: 0, height: 0, differenceX: 0, differenceY: 0 });
  const [croppingNode, setCroppingNode] = useState<number>(0);
  const [isResize, setIsResize] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startingNode, setStartingNode] = useState({ startingNodeX: 0, startingNodeY: 0 });

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
        onMouseDown={(cropMouseDownEvent: React.MouseEvent<HTMLCanvasElement>) => mouseDown({
          cropMouseDownEvent,
          currentCropped,
          setCroppingNode,
          setIsResize,
          setIsDragging,
          setStartingNode
        })}
        onMouseMove={(cropMouseMoveEvent) => mouseMove({
          cropMouseMoveEvent,
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
          annotations,
          showAllTags,
          setShowAllTags,
          drawing,
          allTextTags,
          setHoverTag,
          setHoverPos,
          setShowH,
          cropCanvas
        })}
        onMouseUp={(cropMouseUpLeaveEvent) => mouseUP({
          cropMouseUpLeaveEvent,
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
        onMouseLeave={(cropMouseUpLeaveEvent: React.MouseEvent<HTMLCanvasElement>) => mouseLeave({
          cropMouseUpLeaveEvent,
          setIsDragging,
          setIsResize,
          mouseUp
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

export const FlipCanvas = ({ canvasRef, handleTagMouseMove, drawingPen, imgSrc, drawing, cropCanvas }: FlipCanvasProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = drawing !== "" ? drawing : cropCanvas !== "" ? cropCanvas : imgSrc;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);

    // Draw the lines connecting the points
    console.log("drawingPen in flip", drawingPen);
    drawingPen.forEach((point: any) => {
      const { clientX, clientY, endX, endY } = point;
    context!.beginPath();
      context!.moveTo(clientX, clientY);
      context!.lineTo(endX, endY);
    context!.stroke();
      // if (index === 0) {
      //   context!.moveTo(x, y);
      //   console.log("move to", x,y)
      // } else {
      //   context!.lineTo(x, y);
      //   console.log("line to", x,y)
      // }
    });
    context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
  }, [drawingPen]);

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

export const PenCanvas = ({
  canvasRef,
  setDrawingPen,
  imgSrc,
  drawing,
  hoverPos,
  annotations,
  setHoverTag,
  setHoverPos,
  setShowH,
  cropCanvas
}: PenProps) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (penMouseDownEvent: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    if (context) {
      context.beginPath();
      context.moveTo(penMouseDownEvent.nativeEvent.offsetX, penMouseDownEvent.nativeEvent.offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (penMouseMoveEvent: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = drawing !== "" ? drawing : cropCanvas !== "" ? cropCanvas : imgSrc;
    if (!isDrawing) return;

    const mouseX = penMouseMoveEvent.nativeEvent.offsetX;
    const mouseY = penMouseMoveEvent.nativeEvent.offsetY;
    const { clientX, clientY } = penMouseMoveEvent; // Assuming the event provides the coordinates

    if (context) {
      if (hoverPos.hoveredDotX === mouseX && hoverPos.hoveredDotY === mouseY) {
        // Check if the mouse is hovering over the white dot
        const hoveredDot = annotations.find((annotation: AnnotationProps) => {
          context!.beginPath();
          context!.arc(annotation.currentAnnotationX, annotation.currentAnnotationY, 10, 0, 2 * Math.PI);
          return context!.isPointInPath(mouseX, mouseY);
        });
        if (hoveredDot && hoverPos.hoveredDotX === mouseX && hoverPos.hoveredDotY === mouseY) {
          let hoveredDotX = hoveredDot.currentAnnotationX;
          let hoveredDotY = hoveredDot.currentAnnotationY;
          let position = { hoveredDotX, hoveredDotY };
          setHoverTag(hoveredDot.tag);
          setHoverPos(position);
          setShowH(true);
        } else {
          setHoverTag("");
          setShowH(false);
        }
      } else {
        setHoverTag("");
        setShowH(false);
      }
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }

    // Update the drawing state with the new point
    setDrawingPen((prevDrawing: ({ x: number; y: number; })[]) => [...prevDrawing, {clientX, clientY, endX: clientX, endY: clientY }]);
  };

  const stopDrawing = () => { setIsDrawing(false); };

  const clickDot = (penMouseClickEvent: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    if (context) {
      context.beginPath();
      context.fillStyle = "#000";
      context.arc(
        penMouseClickEvent.nativeEvent.offsetX,
        penMouseClickEvent.nativeEvent.offsetY,
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
      onMouseDown={(penMouseDownEvent: React.MouseEvent<HTMLCanvasElement>) => startDrawing(penMouseDownEvent)}
      onMouseMove={(penMouseMoveEvent: React.MouseEvent<HTMLCanvasElement>) => draw(penMouseMoveEvent)}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onClick={(penMouseClickEvent: React.MouseEvent<HTMLCanvasElement>) => clickDot(penMouseClickEvent)}
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
  handleTagMouseMove,
  cropCanvas
}: MoreFilterProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = drawing !== "" ? drawing : cropCanvas !== "" ? cropCanvas : imgSrc;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);

    image.width = canvas!.width;
    image.height = canvas!.height;

    if (canvas) {
      const { width, height } = canvas;
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      // Clear canvas and scale it
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      context!.translate(centerX, centerY);
      context!.scale(zoom, zoom);
      context!.translate(-centerX, -centerY);
      context!.clearRect(0, 0, width, height);
    }
    context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
  }, [zoom, rotate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = drawing !== "" ? drawing : cropCanvas !== "" ? cropCanvas : imgSrc;
    const degToRad = (rotate: number) => rotate * Math.PI / 180;

    image.onload = () => {
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.filter = `blur(${blur}px) brightness(${brightness})`;
      image.width = canvas!.width;
      image.height = canvas!.height;

      context!.save();
      context!.translate(canvas!.width / 2, canvas!.height / 2);
      context!.rotate(degToRad(rotate++ % 360));
      context!.drawImage(
        image,
        image.width / -2,
        image.height / -2,
        image.width,
        image.height
      );
      context!.restore();
    };
  },[blur, zoom, rotate, brightness]);

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