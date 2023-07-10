import React, {
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
  MoreFilterProps,
  AnnotationProps
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
  blur,
  zoom,
  rotate,
  brightness,
  currentCropped,
  flipHorizontal,
  flipVertical
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
        flipHorizontal,
        flipVertical
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
        blur,
        zoom,
        rotate,
        brightness,
        setDeleteTextTag,
        currentCropped,
        flipHorizontal,
        flipVertical
      })}
      onMouseDown={(textOnImageMouseDownEvent: React.MouseEvent<HTMLCanvasElement>) => handleMouseDown({
        textOnImageMouseDownEvent,
        setIsDraggingText,
        setDraggingText,
        canvasRef,
        allTextTags,
        setCurrentClicked,
        flipVertical,
        flipHorizontal
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
        setDeleteTextTag,
        flipHorizontal,
        flipVertical
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
  allTextTags,
  setHoverTag,
  setHoverPos,
  setShowH
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
          allTextTags,
          setHoverTag,
          setHoverPos,
          setShowH
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

export const FlipCanvas = ({
  canvasRef,
  handleTagMouseMove
}: FlipCanvasProps) => {
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
  imgSrc,
  hoverPos,
  annotations,
  setHoverTag,
  setHoverPos,
  setShowH
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
    image.src = imgSrc;
    if (!isDrawing) return;

    const mouseX = penMouseMoveEvent.nativeEvent.offsetX;
    const mouseY = penMouseMoveEvent.nativeEvent.offsetY;

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
  handleTagMouseMove
}: MoreFilterProps) => {
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