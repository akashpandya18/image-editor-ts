import React  from "react";
import {
  HandleCanvasMouseMoveProps,
  AnnotationProps,
  HandleCanvasClickProps,
  HandleInputChangeProps,
  HandleSubmitTagProps,
  HandleClearSingleTagProps,
  HideTagsProps,
  ShowTagsProps,
  CanvasRefProps
} from "../../types";
import { AllTextTags } from "../../utils/AllTextTags";

export const handleCanvasMouseMove = ({
  tagHoverEvent,
  canvasRef,
  annotations,
  setHoverTag,
  setHoverPos,
  setShowH
}: HandleCanvasMouseMoveProps) => {
  tagHoverEvent.preventDefault();
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  const mouseX = tagHoverEvent.nativeEvent.offsetX;
  const mouseY = tagHoverEvent.nativeEvent.offsetY;

  // Check if the mouse is hovering over the white dot
  const hoveredDot = annotations.find((annotation: AnnotationProps) => {
    context!.beginPath();
    context!.arc(annotation.currentAnnotationX, annotation.currentAnnotationY, 10, 0, 2 * Math.PI);
    return context!.isPointInPath(mouseX, mouseY);
  });
  if (hoveredDot) {
    canvas!.style.cursor = "pointer";
    let hoveredDotX = hoveredDot.currentAnnotationX;
    let hoveredDotY = hoveredDot.currentAnnotationY;
    let position = { hoveredDotX, hoveredDotY };
    setHoverTag(hoveredDot.tag);
    setHoverPos(position);
    setShowH(true);
  } else {
    canvas!.style.cursor = "default";
    setHoverTag("");
    setShowH(false);
  }
};

export const handleCanvasClick = ({
  tagCanvasClickEvent,
  canvasRef,
  annotations,
  setTempRedPrompt,
  setDeleteTag,
  setShowH,
  setDeleteTagId,
  setCurrentAnnotation,
  setTag,
  setDeletePos
}: HandleCanvasClickProps) => {
  setTempRedPrompt(true);
  setDeleteTag(false);
  setDeleteTagId("");

  const mouseX = tagCanvasClickEvent.nativeEvent.offsetX;
  const mouseY = tagCanvasClickEvent.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const rect = canvas!.getBoundingClientRect();
  const currentAnnotationX = tagCanvasClickEvent.clientX - rect!.left;
  const currentAnnotationY = tagCanvasClickEvent.clientY - rect!.top;
  const annotation = { currentAnnotationX, currentAnnotationY };

  setCurrentAnnotation(annotation);
  setTag("");
  // Check if the mouse click is on any of the tags
  const clickedDot = annotations.find((annotation: AnnotationProps) => {
    context!.beginPath();
    context!.arc(annotation.currentAnnotationX, annotation.currentAnnotationY, 10, 0, 2 * Math.PI);
    return context!.isPointInPath(mouseX, mouseY);
  });
  // Check if the click was within the bounds of the tags
  if (clickedDot) {
    setTempRedPrompt(false);
    setDeleteTag(true);
    setShowH(false);
    setDeleteTagId(clickedDot.id);
    const deletePositionX = clickedDot.currentAnnotationX;
    const deletePositionY = clickedDot.currentAnnotationY;
    const deleteAnnotation = { deletePositionX, deletePositionY };
    setDeletePos(deleteAnnotation);
  }
};

export const handleInputChange = ({ tagInputChangeEvent, setTag }: HandleInputChangeProps) => { setTag(tagInputChangeEvent.target.value); };

export const handleSubmitTag = ({
  tagSubmitEvent,
  currentAnnotation,
  canvasRef,
  imgSrc,
  tag,
  annotations,
  id,
  setAnnotations,
  setTag,
  setCurrentAnnotation,
  setTempRedPrompt,
  showAllTags,
  allTextTags,
  rotate,
  cropCanvas,
  flipHorizontal,
  flipVertical
}: HandleSubmitTagProps) => {
  tagSubmitEvent.preventDefault();
  const currentAnnotationX = currentAnnotation.currentAnnotationX;
  const currentAnnotationY = currentAnnotation.currentAnnotationY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = cropCanvas !== "" ? cropCanvas : imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  image.width = canvas!.width;
  image.height = canvas!.height;

  if (tag !== "") {
    // dot
    context!.beginPath();
    context!.fillStyle = "yellow";
    context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
    context!.fill();
    const tempAnnotation = [...annotations, { id, currentAnnotationX, currentAnnotationY, tag }];
    setAnnotations(tempAnnotation);
    setTag("");
    setCurrentAnnotation({ currentAnnotationX: 0, currentAnnotationY: 0 });
    setTempRedPrompt(false);

    if (showAllTags) {
      setTimeout(() => {
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
        tempAnnotation.forEach((annotationData: {
          currentAnnotationX: number;
          currentAnnotationY: number;
          tag: string;
        }) => {
          const { currentAnnotationX, currentAnnotationY, tag } = annotationData;
          // tag
          context!.font = "1.5rem Arial";
          // Draw the background color rectangle
          let textWidth = context!.measureText(tag).width;
          // tags
          context!.beginPath();
          context!.fillStyle = "yellow";
          context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
          context!.fill();

          if (currentAnnotationX - image.width > -200 && currentAnnotationY - image.height < -100) {
            context!.fillStyle = "#2A2A2A";
            context!.fillRect(currentAnnotationX - textWidth - 20, currentAnnotationY, textWidth + 20, 40);
            context!.fillStyle = "#fff";
            context!.fillText(tag, currentAnnotationX - textWidth - 10, currentAnnotationY + 25);
          } else if (currentAnnotationX - image.width < -200 && currentAnnotationY - image.height > -100) {
            context!.fillStyle = "#2A2A2A";
            context!.fillRect(currentAnnotationX, currentAnnotationY - 40, textWidth + 20, 40);
            context!.fillStyle = "#fff";
            context!.fillText(tag, currentAnnotationX + 10, currentAnnotationY - 15);
          } else if (currentAnnotationX - image.width > -200 && currentAnnotationY - image.height > -100) {
            context!.fillStyle = "#2A2A2A";
            context!.fillRect(currentAnnotationX - textWidth - 20, currentAnnotationY - 40, textWidth + 20, 40);
            context!.fillStyle = "#fff";
            context!.fillText(tag, currentAnnotationX - textWidth - 10, currentAnnotationY - 15);
          } else {
            context!.fillStyle = "#2A2A2A";
            context!.fillRect(currentAnnotationX, currentAnnotationY, textWidth + 20, 40);
            context!.fillStyle = "#fff";
            context!.fillText(tag, currentAnnotationX + 10, currentAnnotationY + 25);
          }
        });
        AllTextTags({canvasRef, allTextTags, flipHorizontal, flipVertical});
      }, 10);
    }
  }

  setTag("");
  setCurrentAnnotation({ currentAnnotationX: 0, currentAnnotationY: 0 });
  setTempRedPrompt(false);
};

export const handleClearSingleTag = ({
  clearSingleTagEvent,
  setDeleteTagId,
  canvasRef,
  imgSrc,
  setDeleteTag,
  annotations,
  deleteTagId,
  setAnnotations,
  setTag,
  setCurrentAnnotation,
  setTempRedPrompt,
  setShowAllTags,
  allTextTags,
  rotate,
  cropCanvas,
  flipHorizontal,
  flipVertical
}: HandleClearSingleTagProps) => {
  clearSingleTagEvent.preventDefault();
  setShowAllTags(false);
  const filteredArray = annotations.filter((item: AnnotationProps) => item.id !== deleteTagId);
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = cropCanvas !== "" ? cropCanvas : imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  setTimeout(() => {
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    image.width = canvas!.width;
    image.height = canvas!.height;

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
    if (deleteTagId !== "") {
      // populate dots again
      filteredArray.forEach((annotationData: AnnotationProps) => {
        context!.beginPath();
        context!.fillStyle = "yellow";
        context!.arc(annotationData.currentAnnotationX, annotationData.currentAnnotationY, 10, 0, 2 * Math.PI);
        context!.fill();
      });
      AllTextTags({canvasRef, allTextTags, flipHorizontal, flipVertical});
      setAnnotations(filteredArray);
      setDeleteTag(false);
      setDeleteTagId("");
      setTag("");
      setCurrentAnnotation({ currentAnnotationX: 0, currentAnnotationY: 0 });
      setTempRedPrompt(false);
    }
  }, 10);
};

export const hideTags = ({
  setShowAllTags,
  imgSrc,
  canvasRef,
  annotations,
  allTextTags,
  rotate,
  cropCanvas,
  flipHorizontal,
  flipVertical
}: HideTagsProps) => {
  setShowAllTags(false);
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = cropCanvas !== "" ? cropCanvas : imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  setTimeout(() => {
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    image.width = canvas!.width;
    image.height = canvas!.height;

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

    annotations.forEach((annotationData: AnnotationProps) => {
      context!.beginPath();
      context!.fillStyle = "yellow";
      context!.arc(annotationData.currentAnnotationX, annotationData.currentAnnotationY, 10, 0, 2 * Math.PI);
      context!.fill();
    });
    AllTextTags({canvasRef, allTextTags, flipHorizontal, flipVertical});
  }, 10);
};

export const showTags = ({
  setShowAllTags,
  imgSrc,
  canvasRef,
  annotations,
  allTextTags,
  cropCanvas,
  flipHorizontal,
  flipVertical
}: ShowTagsProps) => {
  setShowAllTags(true);
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = cropCanvas !== "" ? cropCanvas : imgSrc;

  image.width = canvas!.width;
  image.height = canvas!.height;

  setTimeout(() => {
    annotations.forEach((annotationData: AnnotationProps) => {
      const { currentAnnotationX, currentAnnotationY, tag } = annotationData;
      // tag
      context!.font = "1.5rem Arial";
      // Draw the background color rectangle
      let textWidth = context!.measureText(tag).width;
      // tags
      context!.beginPath();
      context!.fillStyle = "yellow";
      context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
      context!.fill();
      // setting tags position
      if (currentAnnotationX - image.width > -200 && currentAnnotationY - image.height < -100) {
        context!.save();
        context!.textBaseline = "alphabetic";
        context!.fillStyle = "#2A2A2A";
        context!.fillRect(currentAnnotationX - textWidth - 20, currentAnnotationY, textWidth + 20, 35);
        context!.fillStyle = "#fff";
        if (flipHorizontal && !flipVertical) {
          context!.translate(textWidth, 0);
          context!.scale(-1, 1);
          context!.fillText(tag, -currentAnnotationX + textWidth + 10, currentAnnotationY + 25);
        } else if (flipVertical && !flipHorizontal) {
          context!.translate(0, currentAnnotationY + currentAnnotationY + 35);
          context!.scale(1, -1);
          context!.fillText(tag, currentAnnotationX - textWidth - 10, currentAnnotationY + 25);
        } else if (flipVertical && flipHorizontal) {
          context!.translate(textWidth, 0);
          context!.scale(-1, 1);
          context!.translate(0, currentAnnotationY + currentAnnotationY + 35);
          context!.scale(1, -1);
          context!.fillText(tag, -currentAnnotationX + textWidth + 10, currentAnnotationY + 25);
        } else {
          context!.fillText(tag, currentAnnotationX - textWidth - 10, currentAnnotationY + 25);
        }
        context!.restore();
      } else if (currentAnnotationX - image.width < -200 && currentAnnotationY - image.height > -100) {
        context!.save();
        context!.textBaseline = "alphabetic";
        context!.fillStyle = "#2A2A2A";
        context!.fillRect(currentAnnotationX, currentAnnotationY - 40, textWidth + 20, 35);
        context!.fillStyle = "#fff";
        if (flipHorizontal && !flipVertical) {
          context!.translate(currentAnnotationX, 0);
          context!.scale(-1, 1);
          context!.fillText(tag,  -textWidth - 10, currentAnnotationY - 15);
        } else if (flipVertical && !flipHorizontal) {
          context!.translate(0, currentAnnotationY + currentAnnotationY - 45);
          context!.scale(1, -1);
          context!.fillText(tag, currentAnnotationX + 10, currentAnnotationY - 15);
        } else if (flipVertical && flipHorizontal) {
          context!.translate(currentAnnotationX, 0);
          context!.scale(-1, 1);
          context!.translate(0, currentAnnotationY + currentAnnotationY - 45);
          context!.scale(1, -1);
          context!.fillText(tag,  -textWidth - 10, currentAnnotationY - 15);
        } else {
          context!.fillText(tag, currentAnnotationX + 10, currentAnnotationY - 15);
        }
        context!.restore();
      } else if (currentAnnotationX - image.width > -200 && currentAnnotationY - image.height > -100) {
        context!.save();
        context!.textBaseline = "alphabetic";
        context!.fillStyle = "#2A2A2A";
        context!.fillRect(currentAnnotationX - textWidth - 20, currentAnnotationY - 40, textWidth + 20, 35);
        context!.fillStyle = "#fff";
        if (flipHorizontal && !flipVertical) {
          context!.translate(textWidth, 0);
          context!.scale(-1, 1);
          context!.fillText(tag, -currentAnnotationX + textWidth + 10, currentAnnotationY - 15);
        } else if (flipVertical && !flipHorizontal) {
          context!.translate(0, currentAnnotationY + currentAnnotationY - 45);
          context!.scale(1, -1);
          context!.fillText(tag, currentAnnotationX - textWidth - 10, currentAnnotationY - 15);
        } else if (flipVertical && flipHorizontal) {
          context!.translate(textWidth, 0);
          context!.scale(-1, 1);
          context!.translate(0, currentAnnotationY + currentAnnotationY - 45);
          context!.scale(1, -1);
          context!.fillText(tag, -currentAnnotationX + textWidth + 10, currentAnnotationY - 15);
        } else {
          context!.fillText(tag, currentAnnotationX - textWidth - 10, currentAnnotationY - 15);
        }
        context!.restore();
      } else {
        context!.save();
        context!.textBaseline = "alphabetic";
        context!.fillStyle = "#2A2A2A";
        context!.fillRect(currentAnnotationX, currentAnnotationY, textWidth + 20, 35);
        context!.fillStyle = "#fff";
        if (flipHorizontal && !flipVertical) {
          context!.translate(currentAnnotationX, 0);
          context!.scale(-1, 1);
          context!.fillText(tag, -textWidth - 10, currentAnnotationY + 25);
        } else if (flipVertical && !flipHorizontal) {
          context!.translate(0, currentAnnotationY + currentAnnotationY + 35);
          context!.scale(1, -1);
          context!.fillText(tag, currentAnnotationX + 10, currentAnnotationY + 25);
        } else if (flipVertical && flipHorizontal) {
          context!.translate(currentAnnotationX, 0);
          context!.scale(-1, 1);
          context!.translate(0, currentAnnotationY + currentAnnotationY + 35);
          context!.scale(1, -1);
          context!.fillText(tag, -textWidth - 10, currentAnnotationY + 25);
        } else {
          context!.fillText(tag, currentAnnotationX + 10, currentAnnotationY + 25);
        }
        context!.restore();
      }
    });
    AllTextTags({canvasRef, allTextTags, flipHorizontal, flipVertical});
  }, 10);
};

export const handleScreenShot = ({ canvasRef }: CanvasRefProps) => {
  const canvas = canvasRef.current;
  const image = canvas!.toDataURL("image/png");
  // To download the image, you can create a link element and simulate a click
  const link = document.createElement("a");
  link.download = "canvas-screenshot.png";
  link.href = image;
  link.click();
};