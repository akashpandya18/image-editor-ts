import React from "react";

export interface filterOptionsProps {
  id: number;
  name: string;
  checked: boolean;
}

export interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: JSX.Element;
}

export interface annotationProps {
  id: string;
  x: number;
  y: number;
  tag: string;
}

export interface controlsProps {
  imgSrc: string;
}

export interface PenProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface TagProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleTagClick: (e: any) => void;
  handleTagMouseMove: (e: any) => void;
}

export interface moreFilterProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  blur: number;
  zoom: number;
  rotate: number;
  brightness: number;
  imgSrc: string;
  drawing: string;
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