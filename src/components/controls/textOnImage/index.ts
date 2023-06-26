import { nanoid } from "nanoid";
import {
  TextOnImageClickHandlerProps,
  TextOnChangeHandlerProps,
  SubmitHandlerProps,
  TextTag,
  HandleMouseMoveProps,
  AnnotationProps,
  HandleMouseDownProps,
  HandleMouseUpProps,
  HandleDeleteProps,
  HandleCrossProps,
  TextObjectProps
} from "../../../types";
import { showTags } from "../../TagAnnotation";

export const clickHandler = ({
  event,
  canvasRef,
  setTempPrompt,
  setCurrentClicked,
  imgSrc,
  allTextTags,
  setIsEditing,
  setFormData
}: TextOnImageClickHandlerProps) => {
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  const image = new Image();
  image.src = imgSrc;

  const clickRect = allTextTags.find((tags: TextTag) => {
    context.font = tags.size + "px monospace";
    let textWidth = context.measureText(tags.text).width;
    const textHeight = parseInt(context.font, 10);
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
    context.setLineDash([10, 10]);
    context.lineWidth = 2;

    const image = new Image();
    image.src = imgSrc;
    image.width = canvas.width;
    image.height = canvas.height;

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
    const { x, y, text, color, size, id } = allTextTags.find((obj: TextTag) => obj.id === clickRect.id);
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
  setError,
  allTextTags,
  annotations,
  showAllTags,
  setShowAllTags,
  drawing
}: TextOnChangeHandlerProps) => {
  const { text, color, size } = textForm;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  const image = new Image();
  image.src = imgSrc;

  context.setLineDash([10, 10]);
  context.lineWidth = 2;

  image.width = canvas.width;
  image.height = canvas.height;

  context.fillStyle = color;
  context.strokeStyle = "transparent";

  const textWidth: number = context.measureText(text).width;
  const textHeight: number = parseInt(context.font, 10);
  const padding: number = 10;
  const rectWidth: number = textWidth + padding * 2;
  const rectHeight: number = textHeight + padding * 2;

  context.clearRect(currentClicked.x,currentClicked.y - textHeight, textWidth, textHeight);
  context.drawImage(image, 0, 0, image.width, image.height);

  context.font = `${size}px monospace`;

  if (showAllTags) {
    showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
  }

  if (image) {
    if (image.complete) {
      if (!isEditing) {
        // onChange validation for text input
        if (text.length > 0 && text.length <= 10) {
          setError("");
        }

        context.strokeRect(
          currentClicked.x,
          currentClicked.y - rectHeight / 2,
          rectWidth,
          rectHeight
        );
        context.textBaseline = "alphabetic";

        if (text.length === 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, image.width, image.height);
        } else {
          context.fillText(text, currentClicked.x + padding, currentClicked.y);
        }

        allTextTags.forEach((textTags: TextTag) => {
          context.textBaseline = "alphabetic";
          context.fillStyle = textTags.color;
          context.font = `${textTags.size}px monospace`;
          context.fillText(textTags.text, textTags.x + padding, textTags.y);
        });
        annotations.forEach((annotationData: AnnotationProps) => {
          const { x, y } = annotationData;
          context.beginPath();
          context.fillStyle = "yellow";
          context.arc(x, y, 10, 0, 2 * Math.PI);
          context.fill();
        });

      }
    } else {
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, image.width, image.height);

        context.strokeRect(
          currentClicked.x,
          currentClicked.y - rectHeight / 2,
          rectWidth,
          rectHeight
        );
        context.textBaseline = "alphabetic";

        if (text.length === 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, image.width, image.height);
        } else {
          context.fillText(text, currentClicked.x + padding, currentClicked.y);
        }

        allTextTags.forEach((textTags: TextTag) => {
          context.textBaseline = "alphabetic";
          context.fillStyle = textTags.color;
          context.font = `${textTags.size}px monospace`;
          context.fillText(textTags.text, textTags.x + padding, textTags.y);
        });
        annotations.forEach((annotationData: AnnotationProps) => {
          const { x, y } = annotationData;
          context.beginPath();
          context.fillStyle = "yellow";
          context.arc(x, y, 10, 0, 2 * Math.PI);
          context.fill();
        });

        if (showAllTags) {
          showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
        }
      }
    }
  }
};

export const submitHandler = ({
  event,
  setAllTextTags,
  currentClicked,
  setTempPrompt,
  setError,
  canvasRef,
  imgSrc
}: SubmitHandlerProps) => {
  event.preventDefault();

  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  const image = new Image();
  image.src = imgSrc;

  // submit validation for text input
  if (event.target.text.value.length === 0) {
    setError("Please enter text");
    setTempPrompt(true);
  } else if (event.target.text.value.length > 10) {
    setError("You can enter maximum 10 words");
    setTempPrompt(true);
  } else {
    setAllTextTags((prev: TextObjectProps[]) => [...prev, {
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
  currentClicked,
  annotations,
  handleTagMouseMove,
  showAllTags,
  setShowAllTags,
  drawing
}: HandleMouseMoveProps) => {
  const mouseX = event.nativeEvent.offsetX;
  const mouseY = event.nativeEvent.offsetY;

  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  const image = new Image();
  image.src = imgSrc;
  const { width, height } = dimensions;

  handleTagMouseMove(event);

  if (showAllTags) {
    showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
  }

  if (isDraggingText) {
    canvas.width = width;
    canvas.height = height;
    context.strokeStyle = "gray";
    context.setLineDash([10, 10]);
    context.lineWidth = 2;

    // @ts-ignore
    const { text, id, x, y } = allTextTags.find((obj: TextTag) => obj.id === draggingText);
    const dragObject = allTextTags.find((obj: TextTag) => obj.id === id);

    const textWidth: number = context.measureText(text).width;
    const textHeight: number = parseInt(context.font, 10);
    const padding: number = 10;

    let movedArea = {
      xMoved: x + (mouseX - currentClicked.x),
      yMoved: y + (mouseY - currentClicked.y)
    };

    if (image.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, dimensions.width, dimensions.height);

      allTextTags.forEach((texts: TextTag) => {
        const { x, y, text, color, size, id: currentId } = texts;
        context.fillStyle = color;
        context.font = `${size || 22}px monospace`;
        context.beginPath();
        if (currentId !== id) {
          context.fillText(text, x + 10, y + (textHeight / 4));
        }
      });
      annotations.forEach((annotationData: AnnotationProps) => {
        const { x, y } = annotationData;
        context.beginPath();
        context.fillStyle = "yellow";
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.fill();
      });

      context.fillStyle = dragObject!.color;

      context.font = `${dragObject!.size || 22}px monospace`;
      context.textBaseline = "alphabetic";
      context.fillText(text, movedArea.xMoved + 10, movedArea.yMoved + (textHeight / 4));

      const rectWidth: number = (context.measureText(text).width) + padding * 2;
      const rectHeight: number = (parseInt(context!.font, 10));

      context.strokeRect(
        movedArea.xMoved,
        movedArea.yMoved - rectHeight / 2 - 6,
        rectWidth,
        rectHeight
      );
    } else {
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, dimensions.width, dimensions.height);

        const rectWidth: number = textWidth + padding * 2;
        const rectHeight: number = textHeight + padding;

        allTextTags.forEach((texts: TextTag) => {
          const { x, y, text, color, size, id: currentId } = texts;
          context.fillStyle = color;
          context.font = `${size || 22}px monospace`;
          context.beginPath();
          if (currentId !== id) {
            context.fillText(text, x + 10, y + (textHeight / 4));
          }
        });
        annotations.forEach((annotationData: AnnotationProps) => {
          const { x, y } = annotationData;
          context.beginPath();
          context.fillStyle = "yellow";
          context.arc(x, y, 10, 0, 2 * Math.PI);
          context.fill();
        });

        context.strokeRect(movedArea.xMoved, movedArea.yMoved - rectHeight / 2, rectWidth, rectHeight);
        context.fillStyle = dragObject!.color;
        context.font = `${dragObject!.size || 22}px monospace`;
        context.textBaseline = "alphabetic";
        context.fillText(text, movedArea.xMoved + 10, movedArea.yMoved + (textHeight / 4));
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
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const clickRect = allTextTags.find((tags: TextTag) => {
    context.font = tags.size + "px monospace";
    let textWidth = context.measureText(tags.text).width;
    const textHeight = parseInt(context.font, 10);
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
  canvasRef,
  isDraggingText,
  setIsDraggingText,
  draggingText,
  setDraggingText,
  allTextTags,
  setAllTextTags,
  currentClicked,
  setDeleteTextTag
}: HandleMouseUpProps) => {
  const mouseX = event.nativeEvent.offsetX;
  const mouseY = event.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  // @ts-ignore
  const { x, y } = allTextTags.length > 0 && draggingText && allTextTags?.find((obj: TextTag) => obj.id === draggingText);

  const clickRect = allTextTags.length > 0 && allTextTags.find((tags: TextTag) => {
    context.font = tags.size + "px monospace";
    let textWidth = context.measureText(tags.text).width;
    const textHeight = parseInt(context.font, 10);
    const padding = 5;
    const rectHeight = textHeight + padding * 2;

    return (
      mouseX > tags.x + 10 &&
      mouseX < tags.x + 10 + textWidth &&
      mouseY > tags.y - rectHeight / 2 &&
      mouseY < tags.y - rectHeight / 2 + rectHeight
    );
  });

  if (clickRect) {
    if (clickRect!.id === draggingText) {
      setDeleteTextTag(true);
    }
  } else {
    setDeleteTextTag(false);
  }

  if (isDraggingText) {
    setDraggingText("");
    setIsDraggingText(false);
  }

  let movedArea = {
    xMoved: x + (mouseX - currentClicked.x),
    yMoved: y + (mouseY - currentClicked.y)
  };

  if (isDraggingText) {
    setAllTextTags((prevTag: TextObjectProps[]) => {
      return prevTag.map((tag: TextTag) => {
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
  const value = allTextTags.filter((obj: TextTag) => obj.id !== formData.id);
  setAllTextTags(value);
  setDeleteTextTag(false);
  setTempPrompt(false);
};

export const handleCross = ({
  setTempPrompt,
  setError,
  canvasRef,
  allTextTags,
  imgSrc,
  annotations,
  showAllTags,
  setShowAllTags,
  drawing
}: HandleCrossProps) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  const image = new Image();
  image.src = imgSrc;

  setTempPrompt(false);
  setError("");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, image.width, image.height);

  allTextTags.forEach((textTags: TextTag) => {
    context.textBaseline = "alphabetic";
    context.font = `${textTags.size || 22}px monospace`;
    context.fillStyle = textTags.color;
    context.fillText(textTags.text, textTags.x + 10, textTags.y);
  });
  annotations.forEach((annotationData: AnnotationProps) => {
    const { x, y } = annotationData;
    context.beginPath();
    context.fillStyle = "yellow";
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fill();
  });

  if (showAllTags) {
    showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
  }
};