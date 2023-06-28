import React from "react";
import { showTags } from "../TagAnnotation";
import {
  SaveDrawingProps,
  ClearDrawingProps,
  AnnotationProps,
  TextTag
} from "../../types";

export const saveDrawing = ({ canvasRef, setDrawing, imgSrc }: SaveDrawingProps) => {
  const canvas = canvasRef.current;
  // const context = canvas!.getContext("2d");
  const image = new Image();
  imgSrc = canvas!.toDataURL();
  image.src = imgSrc;

  // context.drawImage(image, 0, 0, canvas.width, canvas.height);
  setDrawing(canvas!.toDataURL());
};

export const clearDrawing = ({
  canvasRef,
  imgSrc,
  annotations,
  setDrawing,
  showAllTags,
  setShowAllTags,
  drawing,
  allTextTags
}: ClearDrawingProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = imgSrc;

  const message = confirm("Do you want to clear the draw?");
  message &&
    setDrawing("");
    showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
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