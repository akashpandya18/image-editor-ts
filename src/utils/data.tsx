import { SetStateAction } from "react";

export function handleToolClick(
  key: string,
  index: number,
  setActiveIndex: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  },
  // setCurrentTool: {
  //   (value: SetStateAction<string>): void;
  //   (arg0: string): void;
  // }
  setCurrentControl: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  }
) {
  setActiveIndex(index);
  switch (key) {
    case "tag-annotation":
      // setCurrentTool("tag-annotation");
      setCurrentControl("tag-annotation");
      break;
    case "text-on-image":
      // setCurrentTool("text-on-image");
      setCurrentControl("text-on-image");
      break;
    case "crop":
      // setCurrentTool("crop");
      setCurrentControl("crop");
      break;
    case "flip":
      // setCurrentTool("flip");
      setCurrentControl("flip");
      break;
    case "draw":
      // setCurrentTool("draw");
      setCurrentControl("draw");
      break;
    case "more":
      // setCurrentTool("more");
      setCurrentControl("more");
      break;
    default:
      break;
  }
}