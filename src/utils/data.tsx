import { SetStateAction } from "react"
import {
  Blur,
  BrightnessUp,
  Crop,
  Draw,
  Flip,
  More,
  RotateRight,
  Tag,
  TextOnImage,
  Zoom,
} from "../assets/icons"
import { controlsType } from "../types"

export const controls: controlsType[] = [
  { id: 1, name: "Blur", type: "blur", icon: <Blur /> },
  { id: 2, name: "Zoom", type: "zoom", icon: <Zoom /> },
  { id: 3, name: "Rotate", type: "rotate", icon: <RotateRight /> },
  { id: 4, name: "Brightness", type: "brightness", icon: <BrightnessUp /> },
]
export const tools: controlsType[] = [
  { id: 1, name: "Tag/Annot", type: "tag-annotation", icon: <Tag /> },
  {
    id: 2,
    name: "Text on Image",
    type: "text-on-image",
    icon: <TextOnImage />,
  },
  { id: 3, name: "Crop", type: "crop", icon: <Crop /> },
  { id: 4, name: "Flip", type: "flip", icon: <Flip /> },
  { id: 5, name: "Draw", type: "draw", icon: <Draw /> },
  { id: 6, name: "More", type: "more", icon: <More /> },
]
export function handleToolClick(
  key: string,
  index: number,
  setActiveIndex: {
    (value: SetStateAction<number>): void;
    (arg0: number): void
  },
  setCurrentControl: {
    (value: SetStateAction<string>): void;
    (arg0: string): void
  }
): void {
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
    case "draw":
      setCurrentControl("draw");
      break;
    case "more":
      setCurrentControl("more");
    default:
      break
  }
}
