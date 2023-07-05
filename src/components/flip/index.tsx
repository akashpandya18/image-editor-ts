import React from "react";
import { showTags } from "../TagAnnotation";
import {
  FlipHorizontallyProps,
  FlipVerticallyProps,
  AnnotationProps
} from "../../types";
import { AllTextTags } from "../../utils/AllTextTags";

export const flipHorizontally = ({
  canvasRef,
  imgSrc,
  annotations,
  flipHorizontal,
  setFlipHorizontal,
  showAllTags,
  setShowAllTags,
  allTextTags,
  rotate,
  cropCanvas,
  flipVertical
}: FlipHorizontallyProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = cropCanvas !== "" ? cropCanvas : imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, allTextTags, cropCanvas, flipHorizontal, flipVertical});

  image.width = canvas!.width;
  image.height = canvas!.height;

  context!.clearRect(0, 0, canvas!.width, canvas!.height);
  context!.translate(canvas!.width, 0);
  context!.scale(-1, 1);
  setFlipHorizontal(!flipHorizontal);

  image.onload = () => {
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
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

    AllTextTags({canvasRef, allTextTags, flipHorizontal, flipVertical});
    annotations.forEach((annotationData: AnnotationProps) => {
      const { currentAnnotationX, currentAnnotationY } = annotationData;
      context!.beginPath();
      context!.fillStyle = "yellow";
      context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
      context!.fill();
    });
  };
};

export const flipVertically = ({
  canvasRef,
  imgSrc,
  annotations,
  flipVertical,
  setFlipVertical,
  showAllTags,
  setShowAllTags,
  allTextTags,
  rotate,
  cropCanvas,
  flipHorizontal
}: FlipVerticallyProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = cropCanvas !== "" ? cropCanvas : imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, allTextTags, cropCanvas, flipHorizontal, flipVertical});

  image.width = canvas!.width;
  image.height = canvas!.height;

  context!.clearRect(0, 0, canvas!.width, canvas!.height);
  context!.translate(0, canvas!.height);
  context!.scale(1, -1);
  setFlipVertical(!flipVertical);

  image.onload = () => {
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
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

    AllTextTags({canvasRef, allTextTags, flipHorizontal, flipVertical});
    annotations.forEach((annotationData: AnnotationProps) => {
      const { currentAnnotationX, currentAnnotationY } = annotationData;
      context!.beginPath();
      context!.fillStyle = "yellow";
      context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
      context!.fill();
    });
  };
};