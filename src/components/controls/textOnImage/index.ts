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
  textOnImageClickEvent,
  canvasRef,
  setTempPrompt,
  setCurrentClicked,
  imgSrc,
  allTextTags,
  setIsEditing,
  setFormData
}: TextOnImageClickHandlerProps) => {
  const currentClickedX = textOnImageClickEvent.nativeEvent.offsetX;
  const currentClickedY = textOnImageClickEvent.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  const clickRect = allTextTags.find((tags: TextTag) => {
    context!.font = tags.size + "px monospace";
    let textWidth = context!.measureText(tags.text).width;
    const textHeight = parseInt(context!.font, 10);
    const padding = 5;
    const rectHeight = textHeight + padding * 2;

    return (
      currentClickedX > tags.textPositionX + 10 &&
      currentClickedX < tags.textPositionX + 10 + textWidth &&
      currentClickedY > tags.textPositionY - rectHeight / 2 &&
      currentClickedY < tags.textPositionY - rectHeight / 2 + rectHeight
    );
  });

  if (!clickRect) {
    context!.setLineDash([10, 10]);
    context!.lineWidth = 2;

    const image = new Image();
    image.src = imgSrc;
    image.width = canvas!.width;
    image.height = canvas!.height;

    const clicked = { currentClickedX, currentClickedY };
    setTempPrompt(true);
    setIsEditing(false);
    setCurrentClicked(clicked);
    setFormData({ text: "", color: "#ffffff", size: 32, id: "" });
  } else {
    // @ts-ignore
    const { textPositionX: currentClickedX , textPositionY: currentClickedY, text, color, size, id } = allTextTags.find((obj: TextTag) => obj.id === clickRect.id);
    setFormData({ text: text, color: color, size: size, id: id });

    const clicked = { currentClickedX, currentClickedY };
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
  drawing,
  rotate
}: TextOnChangeHandlerProps) => {
  const { text, color, size } = textForm;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  context!.setLineDash([10, 10]);
  context!.lineWidth = 2;

  image.width = canvas!.width;
  image.height = canvas!.height;

  context!.fillStyle = color;
  context!.strokeStyle = "transparent";

  const textWidth: number = context!.measureText(text).width;
  const textHeight: number = parseInt(context!.font, 10);
  const padding: number = 10;
  const rectWidth: number = textWidth + padding * 2;
  const rectHeight: number = textHeight + padding * 2;

  context!.clearRect(currentClicked.currentClickedX,currentClicked.currentClickedY - textHeight, textWidth, textHeight);
  image.width = canvas!.width;
  image.height = canvas!.height;

  context!.font = `${size}px monospace`;

  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});

  if (image) {
    if (image.complete) {
      if (!isEditing) {
        // onChange validation for text input
        if (text.length > 0 && text.length <= 10) {
          setError("");
        }

        context!.strokeRect(
          currentClicked.currentClickedX,
          currentClicked.currentClickedY - rectHeight / 2,
          rectWidth,
          rectHeight
        );
        context!.textBaseline = "alphabetic";

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

        if (text.length === 0) {
          context!.clearRect(0, 0, canvas!.width, canvas!.height);
          context!.drawImage(image, 0, 0, image.width, image.height);
        } else {
          context!.fillText(text, currentClicked.currentClickedX + padding, currentClicked.currentClickedY);
        }

        allTextTags.forEach((textTags: TextTag) => {
          context!.textBaseline = "alphabetic";
          context!.fillStyle = textTags.color;
          context!.font = `${textTags.size}px monospace`;
          context!.fillText(textTags.text, textTags.textPositionX + padding, textTags.textPositionY);
        });
        annotations.forEach((annotationData: AnnotationProps) => {
          const { currentAnnotationX, currentAnnotationY } = annotationData;
          context!.beginPath();
          context!.fillStyle = "yellow";
          context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
          context!.fill();
        });
      }
    } else {
      image.onload = () => {
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        context!.drawImage(image, 0, 0, image.width, image.height);

        context!.strokeRect(
          currentClicked.currentClickedX,
          currentClicked.currentClickedY - rectHeight / 2,
          rectWidth,
          rectHeight
        );
        context!.textBaseline = "alphabetic";

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

        if (text.length === 0) {
          context!.clearRect(0, 0, canvas!.width, canvas!.height);
          context!.drawImage(image, 0, 0, image.width, image.height);
        } else {
          context!.fillText(text, currentClicked.currentClickedX + padding, currentClicked.currentClickedY);
        }

        allTextTags.forEach((textTags: TextTag) => {
          context!.textBaseline = "alphabetic";
          context!.fillStyle = textTags.color;
          context!.font = `${textTags.size}px monospace`;
          context!.fillText(textTags.text, textTags.textPositionX + padding, textTags.textPositionY);
        });
        annotations.forEach((annotationData: AnnotationProps) => {
          const { currentAnnotationX, currentAnnotationY } = annotationData;
          context!.beginPath();
          context!.fillStyle = "yellow";
          context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
          context!.fill();
        });

        showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
      }
    }
  }
};

export const submitHandler = ({
  textOnImageSubmitEvent,
  setAllTextTags,
  currentClicked,
  setTempPrompt,
  setError
}: SubmitHandlerProps) => {
  textOnImageSubmitEvent.preventDefault();
  // submit validation for text input
  if (textOnImageSubmitEvent.target.text.value.length === 0) {
    setError("Please enter text");
    setTempPrompt(true);
  } else if (textOnImageSubmitEvent.target.text.value.length > 10) {
    setError("You can enter maximum 10 words");
    setTempPrompt(true);
  } else {
    setAllTextTags((prev: TextObjectProps[]) => [...prev, {
      id: nanoid(5),
      textPositionX: currentClicked?.currentClickedX,
      textPositionY: currentClicked?.currentClickedY,
      text: textOnImageSubmitEvent.target?.text.value,
      size: textOnImageSubmitEvent.target?.size.value,
      color: textOnImageSubmitEvent.target?.color.value
    }]);
    setTempPrompt(false);
  }
};

export const handleMouseMove = ({
  textOnImageMouseMoveEvent,
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
  drawing,
  blur,
  zoom,
  rotate,
  brightness
}: HandleMouseMoveProps) => {
  const mouseX = textOnImageMouseMoveEvent.nativeEvent.offsetX;
  const mouseY = textOnImageMouseMoveEvent.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const { width, height } = dimensions;
  const image = new Image();
  image.src = imgSrc;

  handleTagMouseMove(textOnImageMouseMoveEvent);

  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});

  if (isDraggingText) {
    canvas!.width = width;
    canvas!.height = height;
    context!.strokeStyle = "gray";
    context!.setLineDash([10, 10]);
    context!.lineWidth = 2;
    // @ts-ignore
    const { text, id, textPositionX, textPositionY } = allTextTags.find((obj: TextTag) => obj.id === draggingText);
    const dragObject = allTextTags.find((obj: TextTag) => obj.id === id);
    const textWidth: number = context!.measureText(text).width;
    const textHeight: number = parseInt(context!.font, 10);
    const padding: number = 10;
    const degToRad = (rotate: number) => rotate * Math.PI / 180;
    let movedArea = {
      moveX: textPositionX + (mouseX - currentClicked.currentClickedX),
      moveY: textPositionY + (mouseY - currentClicked.currentClickedY)
    };

    if (image.complete) {
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.filter = `blur(${blur}px) brightness(${brightness})`;
      const centerX = canvas!.width / 2;
      const centerY = canvas!.height / 2;

      context!.translate(centerX, centerY);
      context!.scale(zoom, zoom);
      context!.translate(-centerX, -centerY);
      context!.clearRect(0, 0, width, height);

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

      allTextTags.forEach((texts: TextTag) => {
        const { textPositionX, textPositionY, text, color, size, id: currentId } = texts;
        context!.fillStyle = color;
        context!.font = `${size || 22}px monospace`;
        context!.beginPath();
        currentId !== id && context!.fillText(text, textPositionX + 10, textPositionY + (textHeight / 4));
      });
      annotations.forEach((annotationData: AnnotationProps) => {
        const { currentAnnotationX, currentAnnotationY } = annotationData;
        context!.beginPath();
        context!.fillStyle = "yellow";
        context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
        context!.fill();
      });

      const rectWidth: number = (context!.measureText(text).width) + padding * 2;
      const rectHeight: number = (parseInt(context!.font, 10));

      context!.fillStyle = dragObject!.color;
      context!.font = `${dragObject!.size || 22}px monospace`;
      context!.textBaseline = "alphabetic";
      context!.fillText(text, movedArea.moveX + 10, movedArea.moveY + (textHeight / 4));
      context!.strokeRect(
        movedArea.moveX,
        movedArea.moveY - rectHeight / 2 - 6,
        rectWidth,
        rectHeight
      );
    } else {
      image.onload = () => {
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        context!.filter = `blur(${blur}px) brightness(${brightness})`;
        const centerX = canvas!.width / 2;
        const centerY = canvas!.height / 2;

        context!.translate(centerX, centerY);
        context!.scale(zoom, zoom);
        context!.translate(-centerX, -centerY);
        context!.clearRect(0, 0, width, height);

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

        allTextTags.forEach((texts: TextTag) => {
          const { textPositionX, textPositionY, text, color, size, id: currentId } = texts;
          context!.fillStyle = color;
          context!.font = `${size || 22}px monospace`;
          context!.beginPath();
          currentId !== id && context!.fillText(text,  textPositionX + 10, textPositionY + (textHeight / 4));
        });
        annotations.forEach((annotationData: AnnotationProps) => {
          const { currentAnnotationX, currentAnnotationY } = annotationData;
          context!.beginPath();
          context!.fillStyle = "yellow";
          context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
          context!.fill();
        });

        const rectWidth: number = textWidth + padding * 2;
        const rectHeight: number = textHeight + padding;

        context!.fillStyle = dragObject!.color;
        context!.font = `${dragObject!.size || 22}px monospace`;
        context!.textBaseline = "alphabetic";
        context!.fillText(text, movedArea.moveX + 10, movedArea.moveY + (textHeight / 4));
        context!.strokeRect(movedArea.moveX, movedArea.moveY - rectHeight / 2, rectWidth, rectHeight);
      };
    }
  }
};

export const handleMouseDown = ({
  textOnImageMouseDownEvent,
  setIsDraggingText,
  setDraggingText,
  canvasRef,
  allTextTags,
  setCurrentClicked
}: HandleMouseDownProps) => {
  const mouseX = textOnImageMouseDownEvent.nativeEvent.offsetX;
  const mouseY = textOnImageMouseDownEvent.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  const clickRect = allTextTags.find((tags: TextTag) => {
    context!.font = tags.size + "px monospace";
    let textWidth = context!.measureText(tags.text).width;
    const textHeight = parseInt(context!.font, 10);
    const padding = 5;
    const rectHeight = textHeight + padding * 2;

    return (
      mouseX > tags.textPositionX + 10 &&
      mouseX < tags.textPositionX + 10 + textWidth &&
      mouseY > tags.textPositionY - rectHeight / 2 &&
      mouseY < tags.textPositionY - rectHeight / 2 + rectHeight
    );
  });

  if (clickRect) {
    setIsDraggingText(true);
    setDraggingText(String(clickRect.id));
    setCurrentClicked({ currentClickedX: mouseX, currentClickedY: mouseY });
  } else {
    setIsDraggingText(false);
    setDraggingText("");
  }
};

export const handleMouseUp = ({
  textOnImageMouseUpEvent,
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
  const mouseX = textOnImageMouseUpEvent.nativeEvent.offsetX;
  const mouseY = textOnImageMouseUpEvent.nativeEvent.offsetY;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  // @ts-ignore
  const { textPositionX, textPositionY } = allTextTags.length > 0 && draggingText && allTextTags?.find((obj: TextTag) => obj.id === draggingText);

  const clickRect = allTextTags.length > 0 && allTextTags.find((tags: TextTag) => {
    context!.font = tags.size + "px monospace";
    let textWidth = context!.measureText(tags.text).width;
    const textHeight = parseInt(context!.font, 10);
    const padding = 5;
    const rectHeight = textHeight + padding * 2;

    return (
      mouseX > tags.textPositionX + 10 &&
      mouseX < tags.textPositionX + 10 + textWidth &&
      mouseY > tags.textPositionY - rectHeight / 2 &&
      mouseY < tags.textPositionY - rectHeight / 2 + rectHeight
    );
  });

  if (clickRect) {
    if (clickRect!.id === draggingText) {
      setDeleteTextTag(true);
    } else {
      setDeleteTextTag(false);
    }
  }

  if (isDraggingText) {
    setDraggingText("");
    setIsDraggingText(false);
  }

  let movedArea = {
    moveX: textPositionX + (mouseX - currentClicked.currentClickedX),
    moveY: textPositionY + (mouseY - currentClicked.currentClickedY)
  };

  if (isDraggingText) {
    setAllTextTags((prevTag: TextObjectProps[]) => {
      return prevTag.map((tag: TextTag) => {
        if (tag.id === draggingText) {
          return {...tag, textPositionX: movedArea.moveX, textPositionY: movedArea.moveY};
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
  drawing,
  blur,
  rotate,
  brightness
}: HandleCrossProps) => {
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");
  const image = new Image();
  image.src = imgSrc;
  const degToRad = (rotate: number) => rotate * Math.PI / 180;

  setTempPrompt(false);
  setError("");

  context!.clearRect(0, 0, canvas!.width, canvas!.height);
  context!.filter = `blur(${blur}px) brightness(${brightness})`;

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

  showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
};