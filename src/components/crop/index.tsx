import React from "react";
import {
  MouseDownProps,
  SaveImageProps,
  MouseMoveProps,
  MouseUPProps,
  MouseLeaveProps,
  AnnotationProps
} from "../../types";
import { showTags } from "../TagAnnotation";
import { AllTextTags } from "../../utils/AllTextTags";

export const mouseDown = ({
  cropMouseDownEvent,
  currentCropped,
  setCroppingNode,
  setIsResize,
  setIsDragging,
  setStartingNode
}: MouseDownProps) => {
  const mouseX = cropMouseDownEvent.nativeEvent.offsetX;
  const mouseY = cropMouseDownEvent.nativeEvent.offsetY;

  if (
    mouseX > currentCropped.startingX - 5 &&
    mouseX < currentCropped.startingX + 5 &&
    mouseY > currentCropped.startingY - 5 &&
    mouseY < currentCropped.startingY + 5
  ) {
    setIsResize(true)
    setCroppingNode(1)
  } else if (
    mouseX > currentCropped.startingX + currentCropped.width - 5 &&
    mouseX < currentCropped.startingX + currentCropped.width + 5 &&
    mouseY > currentCropped.startingY - 5 &&
    mouseY < currentCropped.startingY + 5
  ) {
    setIsResize(true)
    setCroppingNode(2)
  } else if (
    mouseX > currentCropped.startingX - 5 &&
    mouseX < currentCropped.startingX + 5 &&
    mouseY > currentCropped.startingY + currentCropped.height - 5 &&
    mouseY < currentCropped.startingY + currentCropped.height + 5
  ) {
    setIsResize(true)
    setCroppingNode(3)
  } else if (
    mouseX > currentCropped.startingX + currentCropped.width - 5 &&
    mouseX < currentCropped.startingX + currentCropped.width + 5 &&
    mouseY > currentCropped.startingY + currentCropped.height - 5 &&
    mouseY < currentCropped.startingY + currentCropped.height + 5
  ) {
    setIsResize(true)
    setCroppingNode(4)
  } else if (
    mouseX > currentCropped.startingX + 5 &&
    mouseX < currentCropped.startingX + currentCropped.width - 5 &&
    mouseY > currentCropped.startingY - 5 &&
    mouseY < currentCropped.startingY + 5
  ) {
    setIsResize(true)
    setCroppingNode(5)
  } else if (
    mouseX > currentCropped.startingX - 5 &&
    mouseX < currentCropped.startingX + 5 &&
    mouseY > currentCropped.startingY &&
    mouseY < currentCropped.height + currentCropped.startingY
  ) {
    setIsResize(true)
    setCroppingNode(6)
  } else if (
    mouseX > currentCropped.startingX + 5 &&
    mouseX < currentCropped.startingX + currentCropped.width - 5 &&
    mouseY > currentCropped.startingY + currentCropped.height - 5 &&
    mouseY < currentCropped.startingY + currentCropped.height + 5
  ) {
    setIsResize(true)
    setCroppingNode(7)
  } else if (
    mouseX > currentCropped.startingX + currentCropped.width - 5 &&
    mouseX < currentCropped.startingX + currentCropped.width + 5 &&
    mouseY > currentCropped.startingY &&
    mouseY < currentCropped.height + currentCropped.startingY
  ) {
    setIsResize(true)
    setCroppingNode(8)
  } else if (
    mouseX > currentCropped.startingX &&
    mouseX < currentCropped.width + currentCropped.startingX &&
    mouseY > currentCropped.startingY &&
    mouseY < currentCropped.height + currentCropped.startingY
  ) {
    setIsDragging(true)
  } else {
    setIsDragging(false)
    setIsResize(false)
  }
  setStartingNode({ startingNodeX: mouseX, startingNodeY: mouseY });
};

export const saveImage = ({ canvasRef, imgSrc, currentCropped, setCropCanvas, setSelectCanvas, setCroppedImage, setCurrentCropped }: SaveImageProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = imgSrc;

  image.onload = () => {
    context!.drawImage(
      image,
      currentCropped.startingX + 2,
      currentCropped.startingY + 2,
      currentCropped.width - 3,
      currentCropped.height - 3,
      0,
      0,
      canvas!.width,
      canvas!.height
    );

    setCropCanvas(canvas!.toDataURL());
    setSelectCanvas(false);
    setCroppedImage("");
    setCurrentCropped({ startingX: 0, startingY: 0, height: 0, width: 0 });
  };
};

export const mouseMove = ({
  cropMouseMoveEvent,
  setDifference,
  currentCropped,
  croppingNode,
  isResize,
  isDragging,
  startingNode,
  canvasRef,
  dimensions,
  imgRef,
  imgSrc,
  annotations,
  showAllTags,
  setShowAllTags,
  allTextTags,
  setHoverTag,
  setHoverPos,
  setShowH,
  cropCanvas,
  flipHorizontal,
  flipVertical
}: MouseMoveProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const mouseX = cropMouseMoveEvent.nativeEvent.offsetX;
  const mouseY = cropMouseMoveEvent.nativeEvent.offsetY;

  // Check if the mouse is hovering over the white dot
  const hoveredDot = annotations.find((annotation: AnnotationProps) => {
    context!.beginPath();
    context!.arc(annotation.currentAnnotationX, annotation.currentAnnotationY, 10, 0, 2 * Math.PI);
    return context!.isPointInPath(mouseX, mouseY);
  });
  if (hoveredDot) {
    let hoveredDotX = hoveredDot.currentAnnotationX;
    let hoveredDotY = hoveredDot.currentAnnotationY;
    let position = { hoveredDotX, hoveredDotY };
    setHoverTag(hoveredDot.tag);
    setHoverPos(position);
    setShowH(true);
  } else {
    setHoverTag("");
    setShowH(false);
  }

  // set cursor of crop rectangle
  if (
    mouseX > currentCropped.startingX - 5 &&
    mouseX < currentCropped.startingX + 5 &&
    mouseY > currentCropped.startingY - 5 &&
    mouseY < currentCropped.startingY + 5
  ) {
    document.body.style.setProperty("cursor", "nwse-resize");
  } else if (
    mouseX > currentCropped.startingX + currentCropped.width - 5 &&
    mouseX < currentCropped.startingX + currentCropped.width + 5 &&
    mouseY > currentCropped.startingY - 5 &&
    mouseY < currentCropped.startingY + 5
  ) {
    document.body.style.setProperty("cursor", "nesw-resize");
  } else if (
    mouseX > currentCropped.startingX - 5 &&
    mouseX < currentCropped.startingX + 5 &&
    mouseY > currentCropped.startingY + currentCropped.height - 5 &&
    mouseY < currentCropped.startingY + currentCropped.height + 5
  ) {
    document.body.style.setProperty("cursor", "nesw-resize");
  } else if (
    mouseX > currentCropped.startingX + currentCropped.width - 5 &&
    mouseX < currentCropped.startingX + currentCropped.width + 5 &&
    mouseY > currentCropped.startingY + currentCropped.height - 5 &&
    mouseY < currentCropped.startingY + currentCropped.height + 5
  ) {
    document.body.style.setProperty("cursor", "nwse-resize");
  } else if (
    (mouseX > currentCropped.startingX + 5 &&
      mouseX < currentCropped.startingX + currentCropped.width - 5 &&
      mouseY > currentCropped.startingY - 5 &&
      mouseY < currentCropped.startingY + 5) ||
    (mouseX > currentCropped.startingX + 5 &&
      mouseX < currentCropped.startingX + currentCropped.width - 5 &&
      mouseY > currentCropped.startingY + currentCropped.height - 5 &&
      mouseY < currentCropped.startingY + currentCropped.height + 5)
  ) {
    document.body.style.setProperty("cursor", "ns-resize");
  } else if (
    (mouseX > currentCropped.startingX - 5 &&
      mouseX < currentCropped.startingX + 5 &&
      mouseY > currentCropped.startingY &&
      mouseY < currentCropped.height + currentCropped.startingY) ||
    (mouseX > currentCropped.startingX + currentCropped.width - 5 &&
      mouseX < currentCropped.startingX + currentCropped.width + 5 &&
      mouseY > currentCropped.startingY &&
      mouseY < currentCropped.height + currentCropped.startingY)
  ) {
    document.body.style.setProperty("cursor", "ew-resize");
  } else if (
    (mouseX > currentCropped.startingX &&
      mouseX < currentCropped.width + currentCropped.startingX &&
      mouseY > currentCropped.startingY &&
      mouseY < currentCropped.height + currentCropped.startingY) ||
    isDragging
  ) {
    document.body.style.setProperty("cursor", "grab");
  } else {
    document.body.style.setProperty("cursor", "default");
  }

  if (isDragging) {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = cropCanvas !== "" ? cropCanvas : imgSrc;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    context!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    context!.strokeStyle = "white";
    context!.setLineDash([5, 5]);
    context!.lineWidth = 2;

    let movedArea = {
      moveX: currentCropped.startingX + (mouseX - startingNode.startingNodeX),
      moveY: currentCropped.startingY + (mouseY - startingNode.startingNodeY)
    };

    movedArea.moveX <= 0 ? 10 : movedArea.moveX;
    movedArea.moveY <= 0 ? 10 : movedArea.moveY;

    if (movedArea.moveX <= 0) {
      movedArea.moveX = 0;
    }
    if (movedArea.moveY <= 0) {
      movedArea.moveY = 0;
    }
    if (movedArea.moveY + currentCropped.height >= dimensions.height) {
      movedArea.moveY = dimensions.height - currentCropped.height - 2;
    }
    if (movedArea.moveX + currentCropped.width >= dimensions.width) {
      movedArea.moveX = dimensions.width - currentCropped.width - 2;
    }

    context!.strokeRect(
      movedArea.moveX,
      movedArea.moveY,
      currentCropped.width,
      currentCropped.height
    );
    context!.setLineDash([0, 0]);
    // left top node
    context!.beginPath();
    context!.fillRect(movedArea.moveX - 2, movedArea.moveY - 4, 6, 6);
    context!.stroke();
    // right top node
    context!.beginPath();
    context!.fillRect(movedArea.moveX + currentCropped.width - 2, movedArea.moveY - 6, 6, 6);
    context!.fill();
    context!.stroke();
    // left bottom node
    context!.beginPath();
    context!.fillRect(movedArea.moveX - 4, movedArea.moveY + currentCropped.height - 3, 6, 6);
    context!.stroke();
    // right bottom node
    context!.beginPath();
    context!.fillRect(movedArea.moveX + currentCropped.width, movedArea.moveY + currentCropped.height - 4, 6, 6);
    context!.stroke();
  }

  if (isResize) {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const image = imgRef.current;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    context!.drawImage(image!, 0, 0, dimensions.width, dimensions.height);
    context!.strokeStyle = "white";
    context!.setLineDash([5, 5]);
    context!.lineWidth = 2;

    let widthDiff = 0;
    let heightDiff = 0;

    let movedArea = {
      moveX: currentCropped.startingX + (mouseX - startingNode.startingNodeX),
      moveY: currentCropped.startingY + (mouseY - startingNode.startingNodeY)
    };

    switch (croppingNode) {
      case 1:
        widthDiff = currentCropped.startingX - mouseX;
        heightDiff = currentCropped.startingY - mouseY;
        context!.strokeRect(mouseX, mouseY, currentCropped.width + widthDiff, currentCropped.height + heightDiff);
        // left top node
        context!.beginPath();
        context!.fillRect(movedArea.moveX - 2, movedArea.moveY - 4, 6, 6);
        context!.stroke();
        // right top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width - 2, movedArea.moveY - 6, 6, 6);
        context!.stroke();
        // left bottom node
        context!.beginPath();
        context!.fillRect(movedArea.moveX - 4, currentCropped.startingY + currentCropped.height - 3, 6, 6);
        context!.stroke();
        // right bottom node
        context!.fillRect(currentCropped.startingX + currentCropped.width, currentCropped.startingY + currentCropped.height - 4, 6, 6);
        context!.stroke();
        setDifference({
          width: currentCropped.width + widthDiff,
          height: currentCropped.height + heightDiff,
          differenceX: 0,
          differenceY: 0
        });
        break;
      case 2:
        widthDiff = mouseX - (currentCropped.startingX + currentCropped.width);
        context!.strokeRect(currentCropped.startingX, mouseY, currentCropped.width + widthDiff, currentCropped.height + currentCropped.startingY - mouseY);
        // left top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 2, movedArea.moveY - 4, 6, 6);
        context!.stroke();
        // right top node
        context!.beginPath();
        context!.fillRect(movedArea.moveX + currentCropped.width - 2, movedArea.moveY - 6, 6, 6);
        context!.stroke();
        // left bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 4, currentCropped.startingY + currentCropped.height - 3, 6, 6);
        context!.stroke();
        // right bottom node
        context!.beginPath();
        context!.fillRect(movedArea.moveX + currentCropped.width, currentCropped.startingY + currentCropped.height - 4, 6, 6);
        context!.stroke();
        setDifference({
          width: currentCropped.width + widthDiff,
          height: currentCropped.height + currentCropped.startingY - mouseY,
          differenceX: 0,
          differenceY: mouseY
        });
        break;
      case 3:
        context!.strokeRect(mouseX, currentCropped.startingY, currentCropped.startingX - mouseX + currentCropped.width, currentCropped.height + (mouseY - (currentCropped.startingY + currentCropped.height)));
        // left top node
        context!.beginPath();
        context!.fillRect(movedArea.moveX - 2, currentCropped.startingY - 4, 6, 6);
        context!.stroke();
        // right top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width - 2, currentCropped.startingY - 6, 6, 6);
        context!.stroke();
        // left bottom node
        context!.beginPath();
        context!.fillRect(movedArea.moveX - 4, movedArea.moveY + currentCropped.height - 3, 6, 6);
        context!.stroke();
        // right bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width, movedArea.moveY + currentCropped.height - 4, 6, 6);
        context!.stroke();
        setDifference({
          width: currentCropped.startingX - mouseX + currentCropped.width,
          height: currentCropped.height + (mouseY - (currentCropped.startingY + currentCropped.height)),
          differenceX: mouseX,
          differenceY: 0
        });
        break;
      case 4:
        context!.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width + (mouseX - (currentCropped.startingX + currentCropped.width)), currentCropped.height + (mouseY - (currentCropped.startingY + currentCropped.height)));
        // left top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 2, currentCropped.startingY - 4, 6, 6);
        context!.stroke();
        // right top node
        context!.beginPath();
        context!.fillRect(movedArea.moveX + currentCropped.width - 2, currentCropped.startingY - 6, 6, 6);
        context!.stroke();
        // left bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 4, movedArea.moveY + currentCropped.height - 3, 6, 6);
        context!.stroke();
        // right bottom node
        context!.beginPath();
        context!.fillRect(movedArea.moveX + currentCropped.width, movedArea.moveY + currentCropped.height - 4, 6, 6);
        context!.stroke();
        setDifference({
          width: currentCropped.width + (mouseX - (currentCropped.startingX + currentCropped.width)),
          height: currentCropped.height + (mouseY - (currentCropped.startingY + currentCropped.height)),
          differenceX: 0,
          differenceY: 0
        });
        break;
      case 5:
        heightDiff = currentCropped.startingY - mouseY;
        context!.strokeRect(currentCropped.startingX, mouseY, currentCropped.width, currentCropped.height + heightDiff);
        // left top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 2, movedArea.moveY - 4, 6, 6);
        context!.stroke();
        // right top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width - 2, movedArea.moveY - 6, 6, 6);
        context!.stroke();
        // left bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 4, currentCropped.startingY + currentCropped.height - 3, 6, 6);
        context!.stroke();
        // right bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width, currentCropped.startingY + currentCropped.height - 4, 6, 6);
        context!.stroke();
        setDifference({
          width: 0,
          height: currentCropped.height + heightDiff,
          differenceX: 0,
          differenceY: mouseY
        });
        break;
      case 6:
        widthDiff = currentCropped.startingX - mouseX;
        context!.strokeRect(mouseX, currentCropped.startingY, currentCropped.width + widthDiff, currentCropped.height);
        // left top node
        context!.beginPath();
        context!.fillRect(movedArea.moveX - 2, currentCropped.startingY - 4, 6, 6);
        context!.stroke();
        // right top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width - 2, currentCropped.startingY - 6, 6, 6);
        context!.stroke();
        // left bottom node
        context!.beginPath();
        context!.fillRect(movedArea.moveX - 4, currentCropped.startingY + currentCropped.height - 3, 6, 6);
        context!.stroke();
        // right bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width, currentCropped.startingY + currentCropped.height - 4, 6, 6);
        context!.stroke();
        setDifference({
          width: currentCropped.width + widthDiff,
          height: 0,
          differenceX: mouseX,
          differenceY: 0
        });
        break;
      case 7:
        heightDiff = mouseY - (currentCropped.startingY + currentCropped.height);
        context!.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width, currentCropped.height + heightDiff);
        // left top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 2, currentCropped.startingY - 4, 6, 6);
        context!.stroke();
        // right top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width - 2, currentCropped.startingY - 6, 6, 6);
        context!.stroke();
        // left bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 4, movedArea.moveY + currentCropped.height  - 3, 6, 6);
        context!.stroke();
        // right bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX + currentCropped.width, movedArea.moveY + currentCropped.height - 4, 6, 6);
        context!.stroke();
        setDifference({
          width: 0,
          height: currentCropped.height + heightDiff,
          differenceX: 0,
          differenceY: 0
        });
        break;
      case 8:
        widthDiff = mouseX - (currentCropped.startingX + currentCropped.width);
        context!.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width + widthDiff, currentCropped.height);
        // left top node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 2, currentCropped.startingY - 4, 6, 6);
        context!.stroke();
        // right top node
        context!.beginPath();
        context!.fillRect(movedArea.moveX + currentCropped.width - 2, currentCropped.startingY - 6, 6, 6);
        context!.stroke();
        // left bottom node
        context!.beginPath();
        context!.fillRect(currentCropped.startingX - 4, currentCropped.startingY + currentCropped.height - 3, 6, 6);
        context!.stroke();
        // right bottom node
        context!.beginPath();
        context!.fillRect(movedArea.moveX + currentCropped.width, currentCropped.startingY + currentCropped.height - 4, 6, 6);
        context!.stroke();
        setDifference({
          width: currentCropped.width + widthDiff,
          height: 0,
          differenceX: 0,
          differenceY: 0
        });
        break;
      default:
        break;
    }
  }
  annotations && annotations.forEach((annotationData: AnnotationProps) => {
    const { currentAnnotationX, currentAnnotationY } = annotationData;
    context!.beginPath();
    context!.fillStyle = "yellow";
    context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
    context!.fill();
  });
  AllTextTags({canvasRef, allTextTags, flipHorizontal, flipVertical});
  // if show all tag is true
  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, allTextTags, cropCanvas, flipHorizontal, flipVertical});
};

export const mouseUP = ({
  cropMouseUpLeaveEvent,
  difference,
  setDifference,
  currentCropped,
  setCurrentCropped,
  croppingNode,
  isResize,
  setIsResize,
  isDragging,
  setIsDragging,
  startingNode
}: MouseUPProps) => {
  const mouseX = cropMouseUpLeaveEvent.nativeEvent.offsetX;
  const mouseY = cropMouseUpLeaveEvent.nativeEvent.offsetY;

  const distance = Math.sqrt(Math.pow(mouseX - startingNode.startingNodeX, 2) + Math.pow(mouseY - startingNode.startingNodeY, 2));

  if (!isResize && !isDragging) return;

  if (distance < 10) {
    setIsResize(false);
    setIsDragging(false);
    return;
  }

  let startingX = 0,
    startingY = 0,
    totalWidth = 0,
    totalHeight = 0;

  if (isDragging) {
    startingX = currentCropped?.startingX + (mouseX - startingNode.startingNodeX);
    startingY = currentCropped?.startingY + (mouseY - startingNode.startingNodeY);
    totalWidth = currentCropped?.width;
    totalHeight = currentCropped?.height;
    setCurrentCropped({
      startingX: startingX,
      startingY: startingY,
      width: totalWidth,
      height: totalHeight
    });
    setIsDragging(false);
  }

  if (isResize) {
    if (croppingNode === 1) {
      setCurrentCropped({
        startingX: mouseX,
        startingY: mouseY,
        width: difference.width,
        height: difference.height
      });
    } else if (croppingNode === 2) {
      setCurrentCropped({
        startingX: currentCropped.startingX,
        startingY: difference.differenceY,
        width: difference.width,
        height: difference.height
      });
    } else if (croppingNode === 3) {
      setCurrentCropped({
        startingX: difference.differenceX,
        startingY: currentCropped.startingY,
        width: difference.width,
        height: difference.height
      });
    } else if (croppingNode === 4) {
      setCurrentCropped({
        startingX: currentCropped.startingX,
        startingY: currentCropped.startingY,
        width: difference.width,
        height: difference.height
      });
    } else if (croppingNode === 5) {
      setCurrentCropped({
        startingX: currentCropped.startingX,
        startingY: difference.differenceY,
        width: currentCropped.width,
        height: difference.height
      });
    } else if (croppingNode === 6) {
      setCurrentCropped({
        startingX: difference.differenceX,
        startingY: currentCropped.startingY,
        width: difference.width,
        height: currentCropped.height
      });
    } else if (croppingNode === 7) {
      setCurrentCropped({
        startingX: currentCropped.startingX,
        startingY: currentCropped.startingY,
        width: currentCropped.width,
        height: difference.height
      });
    } else if (croppingNode === 8) {
      setCurrentCropped({
        startingX: currentCropped.startingX,
        startingY: currentCropped.startingY,
        width: difference.width,
        height: currentCropped.height
      });
    }

    setDifference({
      width: 0,
      height: 0,
      differenceX: 0,
      differenceY: 0
    });
    setIsResize(false);
  }
};

export const mouseLeave = ({ cropMouseUpLeaveEvent, setIsDragging, setIsResize, mouseUp }: MouseLeaveProps) => {
  const {
    difference,
    setDifference,
    currentCropped,
    setCurrentCropped,
    croppingNode,
    isResize,
    isDragging,
    startingNode
  } = mouseUp;

  setIsDragging(false);
  setIsResize(false);
  document.body.style.setProperty("cursor", "default");
  mouseUP({
    cropMouseUpLeaveEvent,
    difference,
    setDifference,
    currentCropped,
    setCurrentCropped,
    croppingNode,
    isResize,
    setIsResize,
    isDragging,
    setIsDragging,
    startingNode
  });
};