import React from "react";
import { showTags } from "../TagAnnotation";
import {
  SaveDrawingProps,
  ClearDrawingProps,
  AnnotationProps
} from "../../types";

export const saveDrawing = ({
  canvasRef,
  setDrawing
}: SaveDrawingProps) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  setDrawing(canvas.toDataURL());
};

export const clearDrawing = ({
 canvasRef,
 imgSrc,
 annotations,
 setDrawing,
 showAllTags,
 setShowAllTags,
  drawing
}: ClearDrawingProps) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  const image = new Image();
  image.src = imgSrc;

  const m = confirm("Want to clear");
  if (m) {
    setDrawing("");
    if (showAllTags) {
      showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing});
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    annotations.forEach((annotationData: AnnotationProps) => {
      const { x, y } = annotationData;
      context.beginPath();
      context.fillStyle = "yellow";
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fill();
    });
  }
};