import React, {
  FormEvent,
  SetStateAction
} from "react";

export interface OnSelectFileProps {
  target: { files: string | any[]; };
}

export interface FileUploadProps {
  onSelectFile: (selectFileEvent: any) => void;
}

export interface ButtonProps {
  children: JSX.Element;
  isActive: boolean;
  onClick: () => void;
  className: string;
}

// export interface FilterOptionsProps {
//   id: number;
//   name: string;
//   checked: boolean;
// }

export interface ControlsProps {
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  originalImage: string;
}

export interface MainCanvasControlProps {
  clearFunction: (clearCanvasEvent: React.MouseEvent<HTMLButtonElement>) => void;
  showHideFunction: () => void;
  screenShotFunction: (screenShotEvent: React.MouseEvent<HTMLButtonElement>) => void;
  iconTag: JSX.Element;
}

export interface ControlsMapProps {
  id: number;
  name: string;
  type: string;
  title: string;
  icon: JSX.Element;
}

export interface AnnotationProps {
  id: string;
  currentAnnotationX: number;
  currentAnnotationY: number;
  tag: string;
}

export interface PropsTag {
  annotations: AnnotationProps[];
}

export interface CanvasRefProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface TagProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleTagClick: (tagCanvasClickEvent: React.MouseEvent<HTMLCanvasElement>) => void;
  handleTagMouseMove: (tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface HandleCanvasMouseMoveProps {
  tagHoverEvent: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  annotations: AnnotationProps[];
  setHoverTag: React.Dispatch<React.SetStateAction<string>>;
  setHoverPos: React.Dispatch<React.SetStateAction<{ hoveredDotX: number; hoveredDotY: number; }>>;
  setShowH: React.Dispatch<React.SetStateAction<boolean>>;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface HandleCanvasClickProps {
  tagCanvasClickEvent: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  annotations: AnnotationProps[];
  setTempRedPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTag: React.Dispatch<React.SetStateAction<boolean>>;
  setShowH: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTagId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentAnnotation: React.Dispatch<React.SetStateAction<{ currentAnnotationX: number; currentAnnotationY: number; }>>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  setDeletePos: React.Dispatch<React.SetStateAction<{ deletePositionX: number; deletePositionY: number; }>>
}

export interface HandleInputChangeProps {
  tagInputChangeEvent: React.ChangeEvent<HTMLInputElement>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

export interface HandleSubmitTagProps {
  tagSubmitEvent: FormEvent<HTMLFormElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  id: string;
  annotations: AnnotationProps[];
  setAnnotations: React.Dispatch<React.SetStateAction<AnnotationProps[]>>;
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  currentAnnotation: { currentAnnotationX: number; currentAnnotationY: number; }
  setCurrentAnnotation: React.Dispatch<React.SetStateAction<{ currentAnnotationX: number; currentAnnotationY: number; }>>;
  setTempRedPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  showAllTags: boolean;
  allTextTags: TextTag[];
  rotate: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface HandleClearSingleTagProps {
  clearSingleTagEvent: React.MouseEvent<HTMLButtonElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  deleteTagId: string;
  setDeleteTagId: React.Dispatch<React.SetStateAction<string>>;
  setDeleteTag: React.Dispatch<React.SetStateAction<boolean>>;
  annotations: AnnotationProps[];
  setAnnotations: React.Dispatch<React.SetStateAction<AnnotationProps[]>>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  setCurrentAnnotation: React.Dispatch<React.SetStateAction<{ currentAnnotationX: number; currentAnnotationY: number; }>>;
  setTempRedPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  allTextTags: TextTag[];
  rotate: number;
}

export interface HideTagsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  annotations: AnnotationProps[];
  allTextTags: TextTag[];
  rotate: number;
}

export interface ShowTagsProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  annotations: AnnotationProps[];
  allTextTags: TextTag[];
}

export interface TagAnnotationFormProps {
  refer: React.MutableRefObject<null>;
  tags: string;
  handleCloseInput: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (tagInputChangeEvent: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (tagSubmitEvent: React.FormEvent<HTMLFormElement>) => void;
  position: { currentAnnotationX: number; currentAnnotationY: number };
}

export interface TagOnHoverProps {
  position: { hoveredDotX: number; hoveredDotY: number; };
  tag: string;
}

export interface SubmitTagsProps {
  position: { currentAnnotationX: number; currentAnnotationY: number; };
}

export interface DeleteTagProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  position: { deletePositionX: number; deletePositionY: number; }
  setPromptOff: (promptOffEvent: React.MouseEvent<HTMLButtonElement>) => void;
  deleteTagSubmit: (clearSingleTagEvent: React.MouseEvent<HTMLButtonElement>) => void;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface TextOnImageControlProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  tempPrompt: boolean;
  textOnChangeHandler: (textForm: TextFormProps) => void;
  onSubmit: (textOnImageSubmitEvent: FormEvent<HTMLFormElement>) => void;
  formData: { text: string; size: number; color: string; id: string; };
  setFormData: React.Dispatch<React.SetStateAction<{ text: string; size: number; color: string; id: string; }>>;
  error: string;
  annotations: AnnotationProps[];
  allTextTags: TextTag[];
  handleCross: () => void;
}

export interface FontSizeOptionsProps {
  id: number;
  value: string;
  text: string;
}

export interface TextOnChangeHandlerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  textForm: TextFormProps;
  currentClicked: { currentClickedX: number; currentClickedY: number; };
  isEditing: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  allTextTags: TextTag[];
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  rotate: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface TextOnImageClickHandlerProps {
  textOnImageClickEvent: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentClicked: React.Dispatch<React.SetStateAction<{ currentClickedX: number; currentClickedY: number; }>>;
  allTextTags: TextTag[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<{ text: string; size: number; color: string; id: string; }>>;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface TextFormProps {
  text: string;
  color: string;
  size: number;
}

export interface TextTag {
  id: string;
  textPositionX: number;
  textPositionY: number;
  text: string;
  size: number;
  color: string;
}

export interface TextOnImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  currentClicked: { currentClickedX: number; currentClickedY: number; };
  setCurrentClicked: React.Dispatch<React.SetStateAction<{ currentClickedX: number; currentClickedY: number; }>>;
  allTextTags: TextTag[];
  setAllTextTags: React.Dispatch<React.SetStateAction<TextTag[] | any | never[]>>;
  dimensions: { height: number; width: number; };
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<{ text: string; size: number; color: string; id: string; }>>;
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
  annotations: AnnotationProps[];
  handleTagMouseMove: (tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => void;
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  blur: number;
  zoom: number;
  rotate: number;
  brightness: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface TextObjectProps {
  id: string;
  textPositionX: number;
  textPositionY: number;
  text: string;
  size: number;
  color: string;
}[]

export interface SubmitHandlerProps {
  textOnImageSubmitEvent: any;
  setAllTextTags: React.Dispatch<React.SetStateAction<TextTag[] | any | never[]>>;
  currentClicked: { currentClickedX: number; currentClickedY: number; };
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export interface HandleMouseMoveProps {
  textOnImageMouseMoveEvent: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  isDraggingText: boolean;
  draggingText: string;
  allTextTags: TextTag[];
  dimensions: { height: number; width: number; };
  currentClicked: { currentClickedX: number; currentClickedY: number; };
  annotations: AnnotationProps[];
  handleTagMouseMove: (tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => void;
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  blur: number;
  zoom: number;
  rotate: number;
  brightness: number;
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface HandleMouseDownProps {
  textOnImageMouseDownEvent: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setIsDraggingText: React.Dispatch<React.SetStateAction<boolean>>;
  setDraggingText: React.Dispatch<React.SetStateAction<string>>;
  allTextTags: TextTag[];
  setCurrentClicked: React.Dispatch<React.SetStateAction<{ currentClickedX: number; currentClickedY: number; }>>;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface HandleMouseUpProps {
  textOnImageMouseUpEvent: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isDraggingText: boolean;
  setIsDraggingText: React.Dispatch<React.SetStateAction<boolean>>;
  draggingText: string;
  setDraggingText: React.Dispatch<React.SetStateAction<string>>;
  allTextTags: TextTag[];
  setAllTextTags: React.Dispatch<React.SetStateAction<TextTag[] | any | never[]>>;
  currentClicked: { currentClickedX: number; currentClickedY: number; };
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface HandleDeleteProps {
  allTextTags: TextTag[];
  setAllTextTags: React.Dispatch<React.SetStateAction<TextTag[] | any | never[]>>;
  formData: { text: string; size: number; color: string; id: string; };
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HandleCrossProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  allTextTags: TextTag[];
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  blur: number;
  rotate: number;
  brightness: number;
}

export interface DeleteTextProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  position: { currentClickedX: number; currentClickedY: number; };
  handleDelete: () => void;
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface CropControlProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  select: () => void;
  selectCanvas: boolean;
  setSelectCanvas: React.Dispatch<React.SetStateAction<boolean>>;
  croppedImage: string;
  setCroppedImage: React.Dispatch<React.SetStateAction<string>>;
  newImage: string;
  blur: number;
  brightness: number;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  currentCropped: Cropped;
}

export interface CropProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  currentCropped: Cropped;
  setCurrentCropped: React.Dispatch<React.SetStateAction<Cropped>>;
  dimensions: { height: number; width: number; };
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  allTextTags: TextTag[];
  setHoverTag: React.Dispatch<React.SetStateAction<string>>;
  setHoverPos: React.Dispatch<React.SetStateAction<{ hoveredDotX: number; hoveredDotY: number; }>>;
  setShowH: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DifferenceProps {
  width: number;
  height: number;
  differenceX: number;
  differenceY: number;
}

export interface Cropped {
  startingX: number;
  startingY: number;
  height: number;
  width: number;
}

export interface MouseDownProps {
  cropMouseDownEvent: React.MouseEvent<HTMLCanvasElement>;
  currentCropped: Cropped;
  setCroppingNode: React.Dispatch<React.SetStateAction<number>>;
  setIsResize: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setStartingNode: React.Dispatch<React.SetStateAction<{ startingNodeX: number; startingNodeY: number; }>>;
}

export interface SaveImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  currentCropped: Cropped;
  setSelectCanvas: React.Dispatch<React.SetStateAction<boolean>>;
  setCroppedImage: React.Dispatch<React.SetStateAction<string>>;
  newImage: string;
  blur: number;
  brightness: number;
}

export interface MouseMoveProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgRef: React.RefObject<HTMLImageElement>;
  imgSrc: string;
  cropMouseMoveEvent: React.MouseEvent<HTMLCanvasElement>;
  setDifference: React.Dispatch<React.SetStateAction<DifferenceProps>>;
  currentCropped: Cropped;
  croppingNode: number;
  isResize: boolean;
  isDragging: boolean;
  startingNode: { startingNodeX: number; startingNodeY: number; };
  dimensions: { height: number; width: number; };
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  allTextTags: TextTag[];
  setHoverTag: React.Dispatch<React.SetStateAction<string>>;
  setHoverPos: React.Dispatch<React.SetStateAction<{ hoveredDotX: number; hoveredDotY: number; }>>;
  setShowH: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MouseUPProps {
  cropMouseUpLeaveEvent: React.MouseEvent<HTMLCanvasElement>;
  difference: DifferenceProps;
  setDifference: React.Dispatch<React.SetStateAction<DifferenceProps>>;
  currentCropped: Cropped;
  setCurrentCropped: React.Dispatch<React.SetStateAction<Cropped>>;
  croppingNode: number;
  isResize: boolean;
  setIsResize: React.Dispatch<React.SetStateAction<boolean>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  startingNode: { startingNodeX: number; startingNodeY: number; };
}

interface MouseUpProps {
  difference: DifferenceProps;
  setDifference: React.Dispatch<React.SetStateAction<DifferenceProps>>;
  currentCropped: Cropped;
  setCurrentCropped: React.Dispatch<React.SetStateAction<Cropped>>;
  croppingNode: number;
  isResize: boolean;
  isDragging: boolean;
  startingNode: { startingNodeX: number; startingNodeY: number; };
}

export interface MouseLeaveProps {
  cropMouseUpLeaveEvent: React.MouseEvent<HTMLCanvasElement>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setIsResize: React.Dispatch<React.SetStateAction<boolean>>;
  mouseUp: MouseUpProps;
}

export interface FlipCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleTagMouseMove: (tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface PropsFlip {
  flipHorizontally: React.MouseEventHandler<HTMLButtonElement> | undefined;
  flipVertically: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface FlipHorizontallyProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  annotations: AnnotationProps[];
  flipHorizontal: boolean;
  setFlipHorizontal: React.Dispatch<React.SetStateAction<boolean>>;
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  allTextTags: TextTag[];
  rotate: number;
}

export interface FlipVerticallyProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  annotations: AnnotationProps[];
  flipVertical: boolean;
  setFlipVertical: React.Dispatch<React.SetStateAction<boolean>>;
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  allTextTags: TextTag[];
  rotate: number;
}

export interface PenProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  hoverPos: { hoveredDotX: number; hoveredDotY: number; };
  setHoverPos: React.Dispatch<React.SetStateAction<{ hoveredDotX: number; hoveredDotY: number; }>>;
  annotations: AnnotationProps[];
  setHoverTag: React.Dispatch<React.SetStateAction<string>>;
  setShowH: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PenControlProps {
  saveDrawing: () => void;
  clearDrawing: () => void;
}

export interface SaveDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface ClearDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  allTextTags: TextTag[];
}

export interface ControlsType {
  id: number;
  name: string;
  type: string;
  icon: JSX.Element;
}

export interface MoreFilterProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleTagMouseMove: (tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface HandleToolClickProps {
  key: string;
  index: number;
  setActiveIndex: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  };
  setCurrentControl: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  };
}