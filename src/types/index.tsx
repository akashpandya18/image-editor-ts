import React from "react"

export interface controlsType {
  id: number
  name: string
  type: string
  icon: any
}
export interface annotation {
  id: string
  x: number
  y: number
  tag: string
}
export interface flipProps {
  flipHorizontally: () => void
  flipVertically: () => void
}
export interface controlsProps {
  imgSrc: string
}
export interface controlsType {
  id: number
  name: string
  type: string
  icon: any
}
export interface DrawProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
}
export interface CropProps {
  canvasRef: React.RefObject<HTMLCanvasElement>, currentCropped: any, setCurrentCropped: any, dimensions: any, setDimensions: any, imgSrc: any, mouseLeave: any
}
export interface TagProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  handleTagClick: (e: any) => void
  handleTagMouseMove: (e: any) => void
}

export interface CropProps {
  canvasRef: React.RefObject<HTMLCanvasElement>,
}

export interface differenceProps {
  width: number,
  height: number,
  x: number,
  y: number,
}

export interface startingNodeProps {
  x: number,
  y: number
}
export interface CropImageProps {
  startingX: number
  startingY: number
  totalWidth: number
  totalHeight: number
  canvasRef: any,
  imgRef: any
}
export interface Cropped {
  startingX: number,
  startingY: number,
  height: number,
  width: number
}

export interface Props {
  canvasRef: any,
  imageUrl: any
}

export interface cropingImageProps {
  canvasRef: any,
  imgRef: any
}