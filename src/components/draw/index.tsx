import React from "react";
import { annotationProps } from "../../types";
import { showTags } from "../TagAnnotation";

export const saveDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  setDrawing: any
) => {
  const canvas = canvasRef.current;
  setDrawing(canvas?.toDataURL());
};

export const clearDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imgSrc: string,
  annotations: annotationProps[],
  setDrawing: any,
  showAllTags: boolean,
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  const image = new Image();
  image.src = imgSrc;

  const m = confirm("Want to clear");
  if (m) {
    setDrawing("");
    if (showAllTags) {
      showTags(setShowAllTags, imgSrc, canvasRef, annotations, "");
    }
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
    annotations.forEach((annotationData: annotationProps) => {
      const { x, y } = annotationData;
      context!.beginPath();
      context!.fillStyle = "yellow";
      context!.arc(x, y, 10, 0, 2 * Math.PI);
      context!.fill();
    });
  }
};