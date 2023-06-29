import React from "react";
import { showTags } from "../TagAnnotation";
import {
  FlipHorizontallyProps,
  FlipVerticallyProps,
  AnnotationProps,
  TextTag
} from "../../types";

export const flipHorizontally = ({
  canvasRef,
  imgSrc,
  annotations,
  flipHorizontal,
  setFlipHorizontal,
  drawing,
  showAllTags,
  setShowAllTags,
  allTextTags,
  rotate
}: FlipHorizontallyProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  drawing !== "" ? image.src = drawing : image.src = imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});

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
};

export const flipVertically = ({
  canvasRef,
  imgSrc,
  annotations,
  flipVertical,
  setFlipVertical,
  drawing,
  showAllTags,
  setShowAllTags,
  allTextTags,
  rotate
}: FlipVerticallyProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  drawing !== "" ? image.src = drawing : image.src = imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});

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
};