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
export interface TagProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  handleTagClick: (e: any) => void
  handleTagMouseMove: (e: any) => void
}

export interface CropProps {
  canvasRef : React.RefObject<HTMLCanvasElement>,

}

export interface CropImageProps {
  startingX: number
  startingY: number
  totalWidth: number
  totalHeight: number
}
export interface Cropped {
  startingX: number,
  startingY: number,
  height: number,
  width: number
}

export interface Props {
  imageUrl: string
}