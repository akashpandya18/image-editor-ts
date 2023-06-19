import React from "react";
import { nanoid } from "nanoid";

export const clickHandler = (
  event: any,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  currentClicked: any,
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentClicked: any,
  imgSrc: string,
  allTextTags: any,
  isDraggingText: boolean,
  setIsDraggingText: React.Dispatch<React.SetStateAction<boolean>>,
  draggingText: string,
  setDraggingText: React.Dispatch<React.SetStateAction<string>>,
  isEditing: any,
  setIsEditing: any,
  setFormData: any
) => {
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  const clickRect = allTextTags.find((tags: any) => {
    tags.size = tags.size / 16;
    context!.font = tags.size + "rem monospace";
    let textWidth = context!.measureText(tags.text).width;
    const textHeight = parseInt(context!.font, 10);
    const padding = 5;
    const rectHeight = textHeight + padding * 2;

    return (
      x > tags.x + 10 &&
      x < tags.x + 10 + textWidth &&
      y > tags.y - rectHeight / 2 &&
      y < tags.y - rectHeight / 2 + rectHeight
    );
  });

  if (!clickRect) {
    context!.strokeStyle = "yellow";
    context!.setLineDash([10, 10]);
    context!.lineWidth = 2;

    const image = new Image();
    image.src = imgSrc;
    image.width = canvas!.width;
    image.height = canvas!.height;

    if (image) {
      if (image.complete) {
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        context!.drawImage(image, 0, 0, image.width, image.height);
      } else {
        image.onload = (): void => {
          context!.clearRect(0, 0, canvas!.width, canvas!.height);
          context!.drawImage(image, 0, 0, image.width, image.height);
        }
      }
    }

    const clicked = { x, y };
    setTempPrompt(true);
    setIsEditing(false);
    setCurrentClicked(clicked);
    setFormData({
      text: "",
      color: "#ffffff",
      size: 32
    });
  } else {
    const { text, color, size, x, y } = allTextTags.find((obj: any) => obj.id === clickRect.id); // id
    setFormData({
      text: text,
      color: color,
      size: size
    });

    const clicked = { x, y };
    setTempPrompt(true);
    setIsEditing(true);
    setCurrentClicked(clicked);
  }
};

export const textOnChangeHandler1 = (
  textForm: any,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  currentClicked: any,
  imgSrc: string,
  isEditing: boolean
) => {
  const { text, color, size } = textForm;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  context!.strokeStyle = "yellow";
  context!.setLineDash([10, 10]);
  context!.lineWidth = 2;

  const image = new Image();
  image.src = imgSrc;
  image.width = canvas!.width;
  image.height = canvas!.height;

  context!.fillStyle = color;
  context!.strokeStyle = "gray";
  context!.font = `${size || 22}px monospace`;

  const textWidth: number = context!.measureText(text).width;
  const textHeight: number = parseInt(context!.font, 10);

  const padding: number = 10;
  const rectWidth: number = textWidth + padding * 2;
  const rectHeight: number = textHeight + padding * 2;

  if (image) {
    if (image.complete) {
      if (isEditing) {
      } else {
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        context!.drawImage(image, 0, 0, image.width, image.height);
        text.length > 0 &&
          context!.strokeRect(
            currentClicked.x,
            currentClicked.y - rectHeight / 2,
            rectWidth,
            rectHeight,
          );
        context!.textBaseline = "middle";
        context!.fillText(text, currentClicked.x + padding, currentClicked.y);
      }
    } else {
      image.onload = () => {
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        context!.drawImage(image, 0, 0, image.width, image.height);
        text.length > 0 &&
          context!.strokeRect(
            currentClicked.x,
            currentClicked.y - rectHeight / 2,
            rectWidth,
            rectHeight,
          );
        context!.textBaseline = "middle";
        context!.fillText(text, currentClicked.x + padding, currentClicked.y);
      }
    }
  }
};

export const submitHandler = (
  e: any,
  allTextTags: any,
  setAllTextTags: any,
  currentClicked: any,
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  tempPrompt: boolean,
  setFormData: any
) => {
  e.preventDefault();

  setAllTextTags((prev: any) => [...prev, {
    id: nanoid(5),
    x: currentClicked?.x,
    y: currentClicked?.y,
    text: e.target.text.value,
    size: e.target.size.value,
    color: e.target.color.value
  }]);
  setFormData({
    text: "",
    size: 32,
    color: "#ffffff"
  });
  setTempPrompt(false);
};

export const handleMouseMove = (
  event: any,
  isDraggingText: any,
  setIsDraggingText: any,
  draggingText: any,
  setDraggingText: any,
  canvasRef: any,
  allTextTags: any,
  dimensions: any,
  imgSrc: any,
  currentClicked: any
) => {
  const mouseX = event.nativeEvent.offsetX;
  const mouseY = event.nativeEvent.offsetY;

  if (isDraggingText) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;
    context!.strokeStyle = "gray";
    context!.setLineDash([10, 10]);
    context!.lineWidth = 2;

    const { text, id, x, y } = allTextTags.find((obj: any) => obj.id === draggingText); // color, size
    const textWidth: number = context!.measureText(text).width;
    const textHeight: number = parseInt(context!.font, 10);
    const padding: number = 10;
    const image = new Image();
    image.src = imgSrc;
    context!.fillStyle = "white";

    let movedArea = {
      xMoved: x + (mouseX - currentClicked.x),
      yMoved: y + (mouseY - currentClicked.y)
    };

    if (image.complete) {
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.drawImage(image, 0, 0, dimensions.width, dimensions.height);

      allTextTags.forEach((texts: any) => {
        const { x, y, text, color, size, id: currentId } = texts;
        context!.fillStyle = color;
        context!.font = `${size || 22}px monospace`;
        context!.beginPath();
        if (currentId !== id) {
          context!.fillText(text, x + 10, y + (textHeight / 4));
        }
      });

      context!.textBaseline = "middle";
      context!.fillText(text, movedArea.xMoved + 10, movedArea.yMoved + (textHeight / 4));

      const rectWidth: number = (context.measureText(text).width) + padding * 2;
      const rectHeight: number = (parseInt(context!.font, 10)) + padding * 2;

      context!.strokeRect(
        movedArea.xMoved,
        movedArea.yMoved - rectHeight / 2,
        rectWidth,
        rectHeight,
      );
    } else {
      image.onload = () => {
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        context!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
        const rectWidth: number = textWidth + padding * 2;
        const rectHeight: number = textHeight + padding * 2;
        allTextTags.forEach((texts: any) => {
          const { x, y, text, color, size, id: currentId } = texts;
          context!.fillStyle = color;
          context!.font = `${size || 22}px monospace`;
          context!.beginPath();
          if (currentId !== id) {
            context!.fillText(text, x + 10, y + (textHeight / 4));
          }
        });
        context!.strokeRect(
          movedArea.xMoved,
          movedArea.yMoved - rectHeight / 2,
          rectWidth,
          rectHeight,
        );
        context!.textBaseline = "middle";
        context!.fillText(text, movedArea.xMoved + 10, movedArea.yMoved + (textHeight / 4));
      };
    }
  }
};

export const handleMouseDown = (
  event: any,
  isDraggingText: any,
  setIsDraggingText: any,
  draggingText: any,
  setDraggingText: any,
  canvasRef: any,
  allTextTags: any,
  setCurrentClicked: any
) => {
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  const clickRect = allTextTags.find((tags: any) => {
    context!.font = tags.size + "px monospace";
    let textWidth = context!.measureText(tags.text).width;
    const textHeight = parseInt(context!.font, 10);
    const padding = 5;
    const rectHeight = textHeight + padding * 2;

    return (
      x > tags.x + 10 &&
      x < tags.x + 10 + textWidth &&
      y > tags.y - rectHeight / 2 &&
      y < tags.y - rectHeight / 2 + rectHeight
    );
  });

  if (clickRect) {
    setIsDraggingText(true);
    setDraggingText(clickRect?.id);
    setCurrentClicked({ x: x, y: y });
  } else {
    setIsDraggingText(false);
    setDraggingText("");
  }
};

export const handleMouseUp = (
  event: any,
  isDraggingText: any,
  setIsDraggingText: any,
  draggingText: any,
  setDraggingText: any,
  canvasRef: any,
  allTextTags: any,
  setAllTextTags: any,
  currentClicked: any
) => {
  console.log("allTextTags", allTextTags);
  const mouseX = event.nativeEvent.offsetX;
  const mouseY = event.nativeEvent.offsetY;
  const { x, y } = allTextTags?.find((obj: any) => obj.id === draggingText);
  let movedArea = {
    xMoved: x + (mouseX - currentClicked.x),
    yMoved: y + (mouseY - currentClicked.y)
  };

  if (isDraggingText) {
    setAllTextTags((prevTag: any) => {
      return prevTag.map((tag: any) => {
        if (tag.id === draggingText) {
          return {...tag, x: movedArea.xMoved, y: movedArea.yMoved};
        }
        console.log("tag", tag);
        return tag;
      });
    });
    setIsDraggingText(false);
    setDraggingText("");
  }
};