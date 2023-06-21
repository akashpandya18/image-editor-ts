import { nanoid } from "nanoid";
import {
  TextOnImageClickHandlerProps,
  TextObjectProps,
  TextOnChangeHandlerProps,
  SubmitHandlerProps,
  HandleMouseMoveProps,
  HandleMouseDownProps,
  HandleMouseUpProps,
  HandleDeleteProps, TextTag
} from "../../../types";

export const clickHandler = ({
  event,
  canvasRef,
  setTempPrompt,
  setCurrentClicked,
  imgSrc,
  allTextTags,
  setIsEditing,
  setFormData,
  setDeleteTextTag
}: TextOnImageClickHandlerProps) => {
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  const clickRect = allTextTags.find((tags: TextTag) => {
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

  if (!clickRect) {
    context!.strokeStyle = "yellow";
    context!.setLineDash([10, 10]);
    context!.lineWidth = 2;

    const image = new Image();
    image.src = imgSrc;
    image.width = canvas!.width;
    image.height = canvas!.height;

    const clicked = { x, y };
    setTempPrompt(true);
    setIsEditing(false);
    setCurrentClicked(clicked);
    setFormData({
      text: "",
      color: "#ffffff",
      size: 32,
      id: ""
    });
  } else {
    // @ts-ignore
    const { x, y, text, color, size, id } = allTextTags.find((obj: TextObjectProps) => obj.id === clickRect.id);
    setDeleteTextTag(true);
    setFormData({
      text: text,
      color: color,
      size: size,
      id: id
    });

    const clicked = { x, y };
    setTempPrompt(true);
    setIsEditing(true);
    setCurrentClicked(clicked);
  }
};

export const textOnChangeHandler = ({
  textForm,
  canvasRef,
  currentClicked,
  imgSrc,
  isEditing,
  setError
}: TextOnChangeHandlerProps) => {
  const { text, color, size } = textForm;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  context!.setLineDash([10, 10]);
  context!.lineWidth = 2;

  const image = new Image();
  image.src = imgSrc;
  image.width = canvas!.width;
  image.height = canvas!.height;

  context!.fillStyle = color;
  context!.strokeStyle = "transparent";
  context!.font = `${size || 22}px monospace`;

  const textWidth: number = context!.measureText(text).width;
  const textHeight: number = parseInt(context!.font, 10);

  const padding: number = 10;
  const rectWidth: number = textWidth + padding * 2;
  const rectHeight: number = textHeight + padding * 2;

  if (image) {
    if (image.complete) {
      if (!isEditing) {
        // onChange validation for text input
        if (text.length > 0 && text.length <= 10) {
          setError("");
        }

        context!.strokeRect(
          currentClicked.x,
          currentClicked.y - rectHeight / 2,
          rectWidth,
          rectHeight
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
            rectHeight
          );
        context!.textBaseline = "middle";
        context!.fillText(text, currentClicked.x + padding, currentClicked.y);
      }
    }
  }
};

export const submitHandler = ({
  event,
  setAllTextTags,
  currentClicked,
  setTempPrompt,
  setError
}: SubmitHandlerProps) => {
  event.preventDefault();
  // submit validation for text input
  if (event.target.text.value.length === 0) {
    setError("Please enter text");
    setTempPrompt(true);
  } else if (event.target.text.value.length > 10) {
    setError("You can enter maximum 10 words");
    setTempPrompt(true);
  } else {
    setAllTextTags((prev: any) => [...prev, {
      id: nanoid(5),
      x: currentClicked?.x,
      y: currentClicked?.y,
      text: event.target?.text.value,
      size: event.target?.size.value,
      color: event.target?.color.value
    }]);
    setTempPrompt(false);
  }
};

export const handleMouseMove = ({
  event,
  isDraggingText,
  draggingText,
  canvasRef,
  allTextTags,
  dimensions,
  imgSrc,
  currentClicked
}: HandleMouseMoveProps) => {
  const mouseX = event.nativeEvent.offsetX;
  const mouseY = event.nativeEvent.offsetY;

  if (isDraggingText) {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;
    context!.strokeStyle = "gray";
    context!.setLineDash([10, 10]);
    context!.lineWidth = 2;
    // @ts-ignore
    const { text, id, x, y } = allTextTags.find((obj: any) => obj.id === draggingText);
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

      const rectWidth: number = (context!.measureText(text).width) + padding * 2;
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

export const handleMouseDown = ({
  event,
  setIsDraggingText,
  setDraggingText,
  canvasRef,
  allTextTags,
  setCurrentClicked
}: HandleMouseDownProps) => {
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
    setDraggingText(String(clickRect.id));
    setCurrentClicked({ x: x, y: y });
  } else {
    setIsDraggingText(false);
    setDraggingText("");
  }
};

export const handleMouseUp = ({
  event,
  isDraggingText,
  setIsDraggingText,
  draggingText,
  setDraggingText,
  allTextTags,
  setAllTextTags,
  currentClicked
}: HandleMouseUpProps) => {
  if (isDraggingText) {
    setDraggingText("");
    setIsDraggingText(false);
  }

  const mouseX = event.nativeEvent.offsetX;
  const mouseY = event.nativeEvent.offsetY;
  // @ts-ignore
  const { x, y } = allTextTags.length > 0 && draggingText && allTextTags?.find((obj: any) => obj.id === draggingText);
  let movedArea = {
    xMoved: x + (mouseX - currentClicked.x),
    yMoved: y + (mouseY - currentClicked.y)
  };

  if (isDraggingText) {
    setAllTextTags((prevTag: any) => {
      return prevTag.map((tag: any) => {
        if (tag.id === draggingText) {
          return { ...tag, x: movedArea.xMoved, y: movedArea.yMoved };
        }
        return tag;
      });
    });
    setIsDraggingText(false);
    setDraggingText("");
  }
};

export const handleDelete = ({
  allTextTags,
  setAllTextTags,
  formData,
  setDeleteTextTag,
  setTempPrompt
}: HandleDeleteProps) => {
  const value = allTextTags.filter((obj: TextObjectProps) => obj.id !== formData.id);
  setAllTextTags(value);
  setDeleteTextTag(false);
  setTempPrompt(false);
};