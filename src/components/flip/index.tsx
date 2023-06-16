import React from "react";
import { annotationProps } from "../../types";
import {showTags} from "../TagAnnotation";

export const flipHorizontally = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imgSrc: string,
  annotations: annotationProps[],
  flipHorizontal: boolean,
  setFlipHorizontal: React.Dispatch<React.SetStateAction<boolean>>,
  drawing: string,
  showAllTags: boolean,
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  if (showAllTags) {
    showTags(setShowAllTags, imgSrc, canvasRef, annotations, drawing);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  setFlipHorizontal(!flipHorizontal);
  LoadImageFlip(context, canvasRef, imgSrc, annotations, drawing);
};

export const flipVertically = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imgSrc: string,
  annotations: annotationProps[],
  flipVertical: boolean,
  setFlipVertical: React.Dispatch<React.SetStateAction<boolean>>,
  drawing: string,
  showAllTags: boolean,
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  if (showAllTags) {
    showTags(setShowAllTags, imgSrc, canvasRef, annotations, drawing);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(0, canvas.height);
  context.scale(1, -1);
  setFlipVertical(!flipVertical);
  LoadImageFlip(context, canvasRef, imgSrc, annotations, drawing);
};

export const LoadImageFlip = (
  context: CanvasRenderingContext2D,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imgSrc: string,
  annotations: annotationProps[],
  drawing: string
) => {
  const img = new Image();
  img.onload = () => {
    context.drawImage(
      img,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
    annotations.forEach((annotationData: annotationProps) => {
      const { x, y } = annotationData;
      context!.beginPath();
      context!.fillStyle = "yellow";
      context!.arc(x, y, 10, 0, 2 * Math.PI);
      context!.fill();
    });
  };
  if (drawing !== "") {
    img.src = drawing;
  } else {
    img.src = imgSrc;
  }
};