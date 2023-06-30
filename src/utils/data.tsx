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
  // FilterOptionsProps,
  ControlsType,
  FontSizeOptionsProps,
  HandleToolClickProps
} from "../types";

// export const filterOptions: FilterOptionsProps[] = [
//   { id: 1, name: "Tag/Annotation", checked: true },
//   { id: 2, name: "Text on Image", checked: true },
//   { id: 3, name: "Crop", checked: false },
//   { id: 4, name: "Flip", checked: true },
//   { id: 5, name: "Pen", checked: true },
//   { id: 6, name: "More", checked: true }
// ];

export const MoreFilterControls: ControlsType[] = [
  { id: 1, name: "Blur", type: "blur", icon: <Blur /> },
  { id: 2, name: "Zoom", type: "zoom", icon: <Zoom /> },
  { id: 3, name: "Rotate", type: "rotate", icon: <Rotate /> },
  { id: 4, name: "Brightness", type: "brightness", icon: <Brightness /> }
];

export const OptionsTools: ControlsType[] = [
  { id: 1, name: "Tag/Annot", type: "tag-annotation", icon: <Tag /> },
  { id: 2, name: "Text on Image", type: "text-on-image", icon: <TextOnImage /> },
  { id: 3, name: "Crop", type: "crop", icon: <Crop /> },
  { id: 4, name: "Flip", type: "flip", icon: <Flip /> },
  { id: 5, name: "Pen", type: "pen", icon: <Pen /> },
  { id: 6, name: "More", type: "more", icon: <More /> }
];

export const FontSizeOptions: FontSizeOptionsProps[] = [
  { id: 1, value: "8", text: "8px" },
  { id: 2, value: "10", text: "10px" },
  { id: 3, value: "12", text: "12px" },
  { id: 4, value: "14", text: "14px" },
  { id: 5, value: "16", text: "16px" },
  { id: 6, value: "18", text: "18px" },
  { id: 7, value: "20", text: "20px" },
  { id: 8, value: "24", text: "24px" },
  { id: 9, value: "32", text: "32px" },
  { id: 10, value: "36", text: "36px" },
  { id: 11, value: "40", text: "40px" },
  { id: 12, value: "42", text: "42px" },
  { id: 13, value: "46", text: "46px" },
  { id: 14, value: "50", text: "50px" },
  { id: 15, value: "54", text: "54px" },
  { id: 16, value: "58", text: "58px" },
  { id: 17, value: "62", text: "62px" },
  { id: 18, value: "66", text: "66px" },
  { id: 19, value: "72", text: "72px" }
];

export function handleToolClick({ key, index, setActiveIndex, setCurrentControl }: HandleToolClickProps) {
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