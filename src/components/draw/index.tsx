import React from "react";
import { showTags } from "../TagAnnotation";
import {
  SaveDrawingProps,
  ClearDrawingProps,
  AnnotationProps,
  TextTag
} from "../../types";

export const saveDrawing = ({ canvasRef }: SaveDrawingProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = canvas!.toDataURL();

  context!.drawImage(image, 0, 0, canvas!.width + 3, canvas!.height + 3);
};

export const clearDrawing = ({
  canvasRef,
  imgSrc,
  annotations,
  showAllTags,
  setShowAllTags,
  allTextTags
}: ClearDrawingProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = imgSrc;

  const message = confirm("Do you want to undo the draw?");
  message &&
    showAllTags && showTags({canvasRef, imgSrc, setShowAllTags, annotations, allTextTags});

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