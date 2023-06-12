import { SetStateAction } from "react";

export function handleToolClick(
  key: string,
  index: number,
  setActiveIndex: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  },
  setCurrentControl: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
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
      break;
    default:
      break;
  }
}