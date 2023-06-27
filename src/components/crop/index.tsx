import React from "react";
import {
  MouseDownProps,
  SaveImageProps,
  MouseMoveProps,
  MouseUPProps,
  MouseLeaveProps,
  AnnotationProps,
  TextTag
} from "../../types";
import { showTags } from "../TagAnnotation";

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
    setIsResize(true);
    setCroppingNode(1);
  } else if (
    mouseX > currentCropped.startingX + currentCropped.width - 5 &&
    mouseX < currentCropped.startingX + currentCropped.width + 5 &&
    mouseY > currentCropped.startingY - 5 &&
    mouseY < currentCropped.startingY + 5
  ) {
    setIsResize(true);
    setCroppingNode(2);
  } else if (
    mouseX > currentCropped.startingX - 5 &&
    mouseX < currentCropped.startingX + 5 &&
    mouseY > currentCropped.startingY + currentCropped.height - 5 &&
    mouseY < currentCropped.startingY + currentCropped.height + 5
  ) {
    setIsResize(true);
    setCroppingNode(3);
  } else if (
    mouseX > currentCropped.startingX + currentCropped.width - 5 &&
    mouseX < currentCropped.startingX + currentCropped.width + 5 &&
    mouseY > currentCropped.startingY + currentCropped.height - 5 &&
    mouseY < currentCropped.startingY + currentCropped.height + 5
  ) {
    setIsResize(true);
    setCroppingNode(4);
  } else if (
    mouseX > currentCropped.startingX + 5 &&
    mouseX < currentCropped.startingX + currentCropped.width - 5 &&
    mouseY > currentCropped.startingY - 5 &&
    mouseY < currentCropped.startingY + 5
  ) {
    setIsResize(true);
    setCroppingNode(5);
  } else if (
    mouseX > currentCropped.startingX - 5 &&
    mouseX < currentCropped.startingX + 5 &&
    mouseY > currentCropped.startingY &&
    mouseY < currentCropped.height + currentCropped.startingY
  ) {
    setIsResize(true);
    setCroppingNode(6);
  } else if (
    mouseX > currentCropped.startingX + 5 &&
    mouseX < currentCropped.startingX + currentCropped.width - 5 &&
    mouseY > currentCropped.startingY + currentCropped.height - 5 &&
    mouseY < currentCropped.startingY + currentCropped.height + 5
  ) {
    setIsResize(true);
    setCroppingNode(7);
  } else if (
    mouseX > currentCropped.startingX + currentCropped.width - 5 &&
    mouseX < currentCropped.startingX + currentCropped.width + 5 &&
    mouseY > currentCropped.startingY &&
    mouseY < currentCropped.height + currentCropped.startingY
  ) {
    setIsResize(true);
    setCroppingNode(8);
  } else if (
    mouseX > currentCropped.startingX &&
    mouseX < currentCropped.width + currentCropped.startingX &&
    mouseY > currentCropped.startingY &&
    mouseY < currentCropped.height + currentCropped.startingY
  ) {
    setIsDragging(true);
  } else {
    setIsDragging(false);
    setIsResize(false);
  }

  setStartingNode({ startingNodeX: mouseX, startingNodeY: mouseY });
};

export const saveImage = ({ setImgSrc, canvasRef, currentCropped }: SaveImageProps) => {
  const canvas = canvasRef.current;
  const dummyCanvas = document.createElement("canvas");
  dummyCanvas.width = currentCropped.width;
  dummyCanvas.height = currentCropped.height;

  const dummyContext = dummyCanvas.getContext("2d");
  const image = new Image();
  image.src = canvas!.toDataURL();

  image.onload = () => {
    dummyContext!.drawImage(
      image,
      currentCropped.startingX + 2,
      currentCropped.startingY + 2,
      currentCropped.width - 3,
      currentCropped.height - 3,
      0,
      0,
      currentCropped.width,
      currentCropped.height
    );
    const croppedDataUrl = dummyCanvas.toDataURL();
    setImgSrc(croppedDataUrl);
  };
};

export const mouseMove = ({
  event,
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
  drawing,
  allTextTags,
  setHoverTag,
  setHoverPos,
  setShowH
}: MouseMoveProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;

  // Check if the mouse is hovering over the white dot
  const hoveredDot = annotations.find((annotation: AnnotationProps) => {
    context!.beginPath();
    context!.arc(annotation.currentAnnotationX, annotation.currentAnnotationY, 10, 0, 2 * Math.PI);
    return context!.isPointInPath(x, y);
  });
  if (hoveredDot) {
    let hoveredDotX = hoveredDot.currentAnnotationX;
    let hoveredDotY = hoveredDot.currentAnnotationY;
    let pos = { hoveredDotX, hoveredDotY };
    setHoverTag(hoveredDot.tag);
    setHoverPos(pos);
    setShowH(true);
  } else {
    setHoverTag("");
    setShowH(false);
  }

  // set cursor of crop rectangle
  if (
    x > currentCropped.startingX - 5 &&
    x < currentCropped.startingX + 5 &&
    y > currentCropped.startingY - 5 &&
    y < currentCropped.startingY + 5
  ) {
    document.body.style.setProperty("cursor", "nwse-resize");
  } else if (
    x > currentCropped.startingX + currentCropped.width - 5 &&
    x < currentCropped.startingX + currentCropped.width + 5 &&
    y > currentCropped.startingY - 5 &&
    y < currentCropped.startingY + 5
  ) {
    document.body.style.setProperty("cursor", "nesw-resize");
  } else if (
    x > currentCropped.startingX - 5 &&
    x < currentCropped.startingX + 5 &&
    y > currentCropped.startingY + currentCropped.height - 5 &&
    y < currentCropped.startingY + currentCropped.height + 5
  ) {
    document.body.style.setProperty("cursor", "nesw-resize");
  } else if (
    x > currentCropped.startingX + currentCropped.width - 5 &&
    x < currentCropped.startingX + currentCropped.width + 5 &&
    y > currentCropped.startingY + currentCropped.height - 5 &&
    y < currentCropped.startingY + currentCropped.height + 5
  ) {
    document.body.style.setProperty("cursor", "nwse-resize");
  } else if (
    (x > currentCropped.startingX + 5 &&
      x < currentCropped.startingX + currentCropped.width - 5 &&
      y > currentCropped.startingY - 5 &&
      y < currentCropped.startingY + 5) ||
    (x > currentCropped.startingX + 5 &&
      x < currentCropped.startingX + currentCropped.width - 5 &&
      y > currentCropped.startingY + currentCropped.height - 5 &&
      y < currentCropped.startingY + currentCropped.height + 5)
  ) {
    document.body.style.setProperty("cursor", "ns-resize");
  } else if (
    (x > currentCropped.startingX - 5 &&
      x < currentCropped.startingX + 5 &&
      y > currentCropped.startingY &&
      y < currentCropped.height + currentCropped.startingY) ||
    (x > currentCropped.startingX + currentCropped.width - 5 &&
      x < currentCropped.startingX + currentCropped.width + 5 &&
      y > currentCropped.startingY &&
      y < currentCropped.height + currentCropped.startingY)
  ) {
    document.body.style.setProperty("cursor", "ew-resize");
  } else if (
    (x > currentCropped.startingX &&
      x < currentCropped.width + currentCropped.startingX &&
      y > currentCropped.startingY &&
      y < currentCropped.height + currentCropped.startingY) ||
    isDragging
  ) {
    document.body.style.setProperty("cursor", "grab");
  } else {
    document.body.style.setProperty("cursor", "default");
  }

  if (isDragging) {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    const image = new Image();
    image.src = imgSrc;

    context!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    context!.strokeStyle = "white";
    context!.setLineDash([5, 5]);
    context!.lineWidth = 2;
    let movedArea = {
      xMoved: currentCropped.startingX + (x - startingNode.startingNodeX),
      yMoved: currentCropped.startingY + (y - startingNode.startingNodeY)
    };

    movedArea.xMoved <= 0 ? 10 : movedArea.xMoved;
    movedArea.yMoved <= 0 ? 10 : movedArea.yMoved;

    if (movedArea.xMoved <= 0) {
      movedArea.xMoved = 0;
    }
    if (movedArea.yMoved <= 0) {
      movedArea.yMoved = 0;
    }
    if (movedArea.yMoved + currentCropped.height >= dimensions.height) {
      movedArea.yMoved = dimensions.height - currentCropped.height - 2;
    }
    if (movedArea.xMoved + currentCropped.width >= dimensions.width) {
      movedArea.xMoved = dimensions.width - currentCropped.width - 2;
    }

    console.log("currentCropped isDragging", currentCropped);

    context!.strokeRect(
      movedArea.xMoved,
      movedArea.yMoved,
      currentCropped.width,
      currentCropped.height
    );
    context!.setLineDash([0, 0]);
    // left top node
    context!.beginPath();
    context!.lineWidth = 3;
    context!.lineJoin = "round";
    context!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved - 5, 10, 0);
    context!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved - 5, 0, 10);
    context!.fillStyle = "white";
    context!.fill();
    context!.stroke();
    // right top node
    context!.beginPath();
    context!.lineWidth = 3;
    context!.lineJoin = "round";
    context!.strokeRect(movedArea.xMoved + currentCropped.width + 5, movedArea.yMoved - 5, -10, 0);
    context!.strokeRect(movedArea.xMoved + currentCropped.width + 5, movedArea.yMoved - 5, 0, 10);
    context!.fillStyle = "white";
    context!.fill();
    context!.stroke();
    // left bottom node
    context!.beginPath();
    context!.lineWidth = 3;
    context!.lineJoin = "round";
    context!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved + currentCropped.height + 5, 10, 0);
    context!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved + currentCropped.height + 5, 0, -10);
    context!.fillStyle = "white";
    context!.fill();
    context!.stroke();
    // right bottom node
    context!.beginPath();
    context!.lineWidth = 3;
    context!.lineJoin = "round";
    context!.strokeRect(movedArea.xMoved - 5 + currentCropped.width, movedArea.yMoved + currentCropped.height + 5, 10, 0);
    context!.strokeRect(movedArea.xMoved + 5 + currentCropped.width, movedArea.yMoved + currentCropped.height + 5, 0, -10);
    context!.fillStyle = "white";
    context!.fill();
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
      xMoved: currentCropped.startingX + (x - startingNode.startingNodeX),
      yMoved: currentCropped.startingY + (y - startingNode.startingNodeY)
    };

    console.log("currentCropped isResize", currentCropped);

    context!.setLineDash([5, 5]);
    // left top node
    context!.beginPath();
    context!.lineWidth = 3;
    context!.lineJoin = "round";
    context!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved - 5, 10, 0);
    context!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved - 5, 0, 10);
    context!.fillStyle = "white";
    context!.fill();
    context!.stroke();
    // right top node
    context!.beginPath();
    context!.lineWidth = 3;
    context!.lineJoin = "round";
    context!.strokeRect(movedArea.xMoved + currentCropped.width + 5, movedArea.yMoved - 5, -10, 0);
    context!.strokeRect(movedArea.xMoved + currentCropped.width + 5, movedArea.yMoved - 5, 0, 10);
    context!.fillStyle = "white";
    context!.fill();
    context!.stroke();
    // left bottom node
    context!.beginPath();
    context!.lineWidth = 3;
    context!.lineJoin = "round";
    context!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved + currentCropped.height + 5, 10, 0);
    context!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved + currentCropped.height + 5, 0, -10);
    context!.fillStyle = "white";
    context!.fill();
    context!.stroke();
    // right bottom node
    context!.beginPath();
    context!.lineWidth = 3;
    context!.lineJoin = "round";
    context!.strokeRect(movedArea.xMoved - 5 + currentCropped.width, movedArea.yMoved + currentCropped.height + 5, 10, 0);
    context!.strokeRect(movedArea.xMoved + 5 + currentCropped.width, movedArea.yMoved + currentCropped.height + 5, 0, -10);
    context!.fillStyle = "white";
    context!.fill();
    context!.stroke();

    switch (croppingNode) {
      case 1:
        widthDiff = currentCropped.startingX - x;
        heightDiff = currentCropped.startingY - y;
        context!.strokeRect(x, y, currentCropped.width + widthDiff, currentCropped.height + heightDiff);
        setDifference({
          width: currentCropped.width + widthDiff,
          height: currentCropped.height + heightDiff,
          x: 0,
          y: 0
        });
        break;
      case 2:
        widthDiff = x - (currentCropped.startingX + currentCropped.width);
        context!.strokeRect(currentCropped.startingX, y, currentCropped.width + widthDiff, currentCropped.height + currentCropped.startingY - y);
        setDifference({
          width: currentCropped.width + widthDiff,
          height: currentCropped.height + currentCropped.startingY - y,
          x: 0,
          y: y
        });
        break;
      case 3:
        context!.strokeRect(x, currentCropped.startingY, currentCropped.startingX - x + currentCropped.width, currentCropped.height + (y - (currentCropped.startingY + currentCropped.height)));
        setDifference({
          x: x,
          y: 0,
          width: currentCropped.startingX - x + currentCropped.width,
          height: currentCropped.height + (y - (currentCropped.startingY + currentCropped.height))
        });
        break;
      case 4:
        context!.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width + (x - (currentCropped.startingX + currentCropped.width)), currentCropped.height + (y - (currentCropped.startingY + currentCropped.height)));
        setDifference({
          x: 0,
          y: 0,
          width: currentCropped.width + (x - (currentCropped.startingX + currentCropped.width)),
          height: currentCropped.height + (y - (currentCropped.startingY + currentCropped.height))
        });
        break;
      case 5:
        heightDiff = currentCropped.startingY - y;
        context!.strokeRect(currentCropped.startingX, y, currentCropped.width, currentCropped.height + heightDiff);
        setDifference({
          x: 0,
          y: y,
          height: currentCropped.height + heightDiff,
          width: 0
        });
        break;
      case 6:
        widthDiff = currentCropped.startingX - x;
        context!.strokeRect(x, currentCropped.startingY, currentCropped.width + widthDiff, currentCropped.height);
        setDifference({
          x: x,
          y: 0,
          height: 0,
          width: currentCropped.width + widthDiff
        });
        break;
      case 7:
        heightDiff = y - (currentCropped.startingY + currentCropped.height);
        context!.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width, currentCropped.height + heightDiff);
        setDifference({
          x: 0,
          y: 0,
          height: currentCropped.height + heightDiff,
          width: 0
        });
        break;
      case 8:
        widthDiff = x - (currentCropped.startingX + currentCropped.width);
        context!.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width + widthDiff, currentCropped.height);
        setDifference({
          x: 0,
          y: 0,
          height: 0,
          width: currentCropped.width + widthDiff
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
  allTextTags && allTextTags.forEach((textTags: TextTag) => {
    context!.textBaseline = "alphabetic";
    context!.font = `${textTags.size || 22}px monospace`;
    context!.fillStyle = textTags.color;
    context!.fillText(textTags.text, textTags.x + 10, textTags.y);
  });

  // if show all tag is true
  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
};

export const mouseUP = ({
  event,
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
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;

  const distance = Math.sqrt(Math.pow(x - startingNode.startingNodeX, 2) + Math.pow(y - startingNode.startingNodeY, 2));

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
    startingX = currentCropped?.startingX + (event.nativeEvent.offsetX - startingNode.startingNodeX);
    startingY = currentCropped?.startingY + (event.nativeEvent.offsetY - startingNode.startingNodeY);
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
        startingX: x,
        startingY: y,
        width: difference.width,
        height: difference.height
      });
    } else if (croppingNode === 2) {
      setCurrentCropped({
        startingX: currentCropped.startingX,
        startingY: difference.y,
        width: difference.width,
        height: difference.height
      });
    } else if (croppingNode === 3) {
      setCurrentCropped({
        startingX: difference.x,
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
        startingY: difference.y,
        width: currentCropped.width,
        height: difference.height
      });
    } else if (croppingNode === 6) {
      setCurrentCropped({
        startingX: difference.x,
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
      height: 0,
      x: 0,
      width: 0,
      y: 0
    });
    setIsResize(false);
  }
};

export const mouseLeave = ({ event, setIsDragging, setIsResize, mouseUp }: MouseLeaveProps) => {
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
    event,
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