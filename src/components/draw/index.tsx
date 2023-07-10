import React from "react";
import { showTags } from "../TagAnnotation";
import {
  SaveDrawingProps,
  ClearDrawingProps,
  AnnotationProps,
  TextTag
} from "../../types";

export const saveDrawing = ({ canvasRef, /* setDrawing, imgSrc, */ drawingPen }: SaveDrawingProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = canvas!.toDataURL(); // imgSrc;

  // Draw each line
  drawingPen.forEach((line: any) => {
    const isArc = line.endY - line.startY < 5
    if (isArc) {
      context!.beginPath();
      context!.fillStyle = "#000";
      context!.arc(
        line.endX,
        line.endY,
        1,
        0,
        2 * Math.PI
      );
      context!.stroke();
    } else {
      context!.beginPath();
      context!.moveTo(line.startX, line.startY);
      context!.lineTo(line.endX, line.endY);
      // context!.quadraticCurveTo(line.startX, line.startY, line.endX, line.endY);
      // context!.fillStyle = "#000";
      // context!.arc(
      //   line.endX,
      //   line.endY,
      //   1,
      //   0,
      //   2 * Math.PI
      // );
      // context!.fill();
      context!.strokeStyle = "black";
      context!.lineWidth = 2;
      context!.stroke();
    }
  });

  // context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
  // setDrawing(canvas!.toDataURL());
};

export const clearDrawing = ({
  canvasRef,
  imgSrc,
  annotations,
  setDrawing,
  showAllTags,
  setShowAllTags,
  drawing,
  allTextTags,
  drawingPen,
  setDrawingPen,
  cropCanvas
}: ClearDrawingProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = imgSrc;

  const message = confirm("Do you want to undo the draw?");
  message &&
    setDrawing("");
    showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags, cropCanvas});

    if (drawingPen.length > 0) {
      const updatedArray = drawingPen.slice(0, drawingPen.length - 1);
      setDrawingPen(updatedArray);
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
    }

    allTextTags.forEach((textTags: TextTag) => {
      context!.textBaseline = "alphabetic";
      context!.font = `${textTags.size || 22}px monospace`;
      context!.fillStyle = textTags.color;
      context!.fillText(textTags.text, textTags.textPositionX + 10, textTags.textPositionY);
    });
    annotations.forEach((annotationData: AnnotationProps) => {
      const { currentAnnotationX, currentAnnotationY } = annotationData;
      context!.beginPath();
      context!.fillStyle = "yellow";
      context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
      context!.fill();
    });
};