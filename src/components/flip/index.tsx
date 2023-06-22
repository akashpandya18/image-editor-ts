import React from "react";
import { showTags } from "../TagAnnotation";
import {
  FlipHorizontallyProps,
  FlipVerticallyProps,
  LoadImageFlipProps,
  AnnotationProps
} from "../../types";

export const flipHorizontally = ({
  canvasRef,
  imgSrc,
  annotations,
  flipHorizontal,
  setFlipHorizontal,
  drawing,
  showAllTags,
  setShowAllTags
}: FlipHorizontallyProps) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  if (showAllTags) {
    showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing});
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  setFlipHorizontal(!flipHorizontal);
  LoadImageFlip({context, canvasRef, imgSrc, annotations, drawing});
};

export const flipVertically = ({
  canvasRef,
  imgSrc,
  annotations,
  flipVertical,
  setFlipVertical,
  drawing,
  showAllTags,
  setShowAllTags
}: FlipVerticallyProps) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  if (showAllTags) {
    showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing});
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(0, canvas.height);
  context.scale(1, -1);
  setFlipVertical(!flipVertical);
  LoadImageFlip({context, canvasRef, imgSrc, annotations, drawing});
};

export const LoadImageFlip = ({
  context,
  canvasRef,
  imgSrc,
  annotations,
  drawing
}: LoadImageFlipProps) => {
  const image = new Image();
  image.onload = () => {
    context.drawImage(
      image,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
    annotations.forEach((annotationData: AnnotationProps) => {
      const { x, y } = annotationData;
      context.beginPath();
      context.fillStyle = "yellow";
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fill();
    });
  };
  if (drawing !== "") {
    image.src = drawing;
  } else {
    image.src = imgSrc;
  }
};