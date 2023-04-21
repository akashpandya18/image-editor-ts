import React from "react";

export interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: any;
}

export interface annotation {
  id: string;
  x: number;
  y: number;
  tag: string;
}

export interface flipProps {
  flipHorizontally: () => void;
  flipVertically: () => void;
}

export interface controlsProps {
  imgSrc: string;
}

export interface Point {
  x: number;
  y: number;
}

export type OnDrawFunction = (
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  prevPoint: Point | null
) => void;

export interface UseOnDrawResult {
  setCanvasRef: (ref: HTMLCanvasElement | null) => void;
  onCanvasMouseDown: () => void;
}

export interface FileUploadProps {
  onSelectFile: (e: any) => void;
}

export interface propsMore {
  blur: number;
  setBlur: Function;
  zoom: number;
  setZoom: Function;
  brightness: number;
  setBrightness: Function;
  rotate: number;
  setRotate: Function;
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

export interface ShowTagOnHoverProps {
  position: { x: number; y: number };
  tag: string;
}