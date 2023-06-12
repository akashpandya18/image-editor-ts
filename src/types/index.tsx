import React from "react";

export interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: JSX.Element;
}

export interface annotation {
  id: string;
  x: number;
  y: number;
  tag: string;
}
export interface controlsProps {
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

export interface propsTag {
  annotations: { id: string; x: number; y: number; tag: string }[];
}

export interface TagAnnotationFormProps {
  tags: string;
  handleInputChange: (e: any) => void;
  onSubmit: (e: any) => void;
  position: { x: number; y: number };
  refer: any;
  handleCloseInput: any;
}

export interface TempRedTagProps {
  position: { x: number; y: number };
}

export interface DeleteTagProps {
  position: { xN: number; yN: number };
  setPromptOff: (e: any) => void;
  deleteTagSubmit: (e: any) => void;
}

export interface DrawProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface TagProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleTagClick: (e: any) => void;
  handleTagMouseMove: (e: any) => void;
}

export interface propsMore {
  blur: number;
  setBlur: Function;
  brightness: number;
  setBrightness: Function;
  rotate: number;
  setRotate: Function;
}
export interface propsTag {
  annotations: { id: string; x: number; y: number; tag: string }[];
}
export interface propsFlip {
  flipHorizontally: React.MouseEventHandler<HTMLButtonElement> | undefined;
  flipVertically: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export interface tagOnHoverProps {
  position: { x: number; y: number };
  tag: string;
}
export interface submitTagsProps {
  position: { x: number; y: number };
}
export interface deleteTagProps {
  position: { xN: number; yN: number };
  setPromptOff: (e: any) => void;
  deleteTagSubmit: (e: any) => void;
}
export interface mainCanvasControlProps {
  clearFunction: (e: any) => void;
  showHideFunction: () => void;
  screenShotFunction: (e: any) => void;
  iconTag: any;
}

export interface ShowTagOnHoverProps {
  position: { x: number; y: number };
  tag: string;
}

export interface MainCanvasControlsProps {
  clearFunction: (e: any) => void;
  showHideFunction: any;
  screenShotFunction: (e: any) => void;
  iconTag: any;
}

export interface UniversalSliderProps {
  label: string;
  id: string;
  blur: number;
  setBlur: Function;
  zoom: number;
  setZoom: Function;
  rotate: number;
  setRotate: Function;
  brightness: number;
  setBrightness: Function;
}

export interface MoreOptionsCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}