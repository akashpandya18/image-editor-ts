import React from "react"

export interface controlsType {
  id: number
  name: string
  type: string
  icon: JSX.Element
}
export interface annotation {
  id: string
  x: number
  y: number
  tag: string
}
export interface controlsProps {
  imgSrc: string,
  setImgSrc: React.Dispatch<React.SetStateAction<string>>
}
export interface controlsType {
  id: number
  name: string
  type: string
}
export interface DrawProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
}
export interface CropProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  currentCropped: Cropped
  setCurrentCropped: React.Dispatch<React.SetStateAction<Cropped>>
  dimensions: { height: number; width: number }
  setDimensions: React.Dispatch<React.SetStateAction<{ height: number; width: number }>>
  imgSrc: string
}
export interface TagProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  handleTagClick: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleTagMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
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
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imgRef: any
}
export interface Cropped {
  startingX: number,
  startingY: number,
  height: number,
  width: number
}
export interface propsFlip {
  flipHorizontally: React.MouseEventHandler<HTMLButtonElement> | undefined
  flipVertically: React.MouseEventHandler<HTMLButtonElement> | undefined
}
export interface tagOnHoverProps {
  position: { x: number; y: number }
  tag: string
}
export interface submitTagsProps {
  position: { x: number; y: number }
}
export interface deleteTagProps {
  position: { xN: number; yN: number }
  setPromptOff: (e: any) => void
  deleteTagSubmit: (e: any) => void
}
export interface mainCanvasControlProps {
  clearFunction: (e: any) => void
  showHideFunction: () => void
  screenShotFunction: (e: any) => void
  iconTag: any
}

export interface onSelectFilePrps {
  target:
  {
    files:
    string | any[]
  }
}

export interface textFormProps {
  text: string,
  color: string,
  size: number
}

export interface TextOnImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  tempPrompt: boolean
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>
  currentClicked: {
    x: number,
    y: number
  }
  setCurrentClicked: React.Dispatch<React.SetStateAction<{
    x: number
    y: number
  } | null>>

  setTextForm: React.Dispatch<React.SetStateAction<{
    text: string
    color: string
    size: number
  }>>
  allTextTags: TextTag[]
  imgSrc: string,
  dimensions: {
    height: number,
    width: number
  }
}

interface TextTag {
  x: number,
  y: number,
  text: string,
  color: string,
  size: number,
  id: number
}

export interface TextObjectProps {
  x: number,
  y: number,
  text: string,
  color: string,
  size: number
}