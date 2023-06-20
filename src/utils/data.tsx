import React  from "react";
import {
  Tag,
  TextOnImage,
  Crop,
  Flip,
  Pen,
  More,
  Blur,
  Zoom,
  Rotate,
  Brightness
} from "../assets/icons";
import {
  FilterOptionsProps,
  ControlsType,
  HandleToolClickProps
} from "../types";

export const filterOptions: FilterOptionsProps[] = [
  { id: 1, name: "Tag/Annotation", checked: true },
  { id: 2, name: "Text on Image", checked: true },
  { id: 3, name: "Crop", checked: false },
  { id: 4, name: "Flip", checked: true },
  { id: 5, name: "Pen", checked: true },
  { id: 6, name: "More", checked: true }
];

export const controls: ControlsType[] = [
  { id: 1, name: "Blur", type: "blur", icon: <Blur /> },
  { id: 2, name: "Zoom", type: "zoom", icon: <Zoom /> },
  { id: 3, name: "Rotate", type: "rotate", icon: <Rotate /> },
  { id: 4, name: "Brightness", type: "brightness", icon: <Brightness /> }
];

export const tools: ControlsType[] = [
  { id: 1, name: "Tag/Annot", type: "tag-annotation", icon: <Tag /> },
  { id: 2, name: "Text on Image", type: "text-on-image", icon: <TextOnImage /> },
  { id: 3, name: "Crop", type: "crop", icon: <Crop /> },
  { id: 4, name: "Flip", type: "flip", icon: <Flip /> },
  { id: 5, name: "Pen", type: "pen", icon: <Pen /> },
  { id: 6, name: "More", type: "more", icon: <More /> }
];

export function handleToolClick({
  key,
  index,
  setActiveIndex,
  setCurrentControl
}: HandleToolClickProps) {
  setActiveIndex(index);
  switch (key) {
    case "tag-annotation":
      setCurrentControl("tag-annotation");
      break;
    case "text-on-image":
      setCurrentControl("text-on-image");
      break;
    case "crop":
      setCurrentControl("crop");
      break;
    case "flip":
      setCurrentControl("flip");
      break;
    case "pen":
      setCurrentControl("pen");
      break;
    case "more":
      setCurrentControl("more");
      break;
    default:
      break;
  }
}