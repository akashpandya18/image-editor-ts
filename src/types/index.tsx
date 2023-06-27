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
  className: string;
  isActive: boolean;
  onClick: () => void;
}

export interface FilterOptionsProps {
  id: number;
  name: string;
  checked: boolean;
}

export interface ControlsProps {
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

export interface MainCanvasControlProps {
  clearFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showHideFunction: () => void;
  screenShotFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
  iconTag: JSX.Element;
}

export interface ControlsMapProps {
  id: number;
  name: string;
  type: string;
  title: string;
  icon: JSX.Element;
}

export interface PropsTag {
  annotations: { id: string; currentAnnotationX: number; currentAnnotationY: number; tag: string; }[];
}

export interface CanvasRefProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface TagProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleTagClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  handleTagMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface AnnotationProps {
  id: string;
  currentAnnotationX: number;
  currentAnnotationY: number;
  tag: string;
}

export interface HandleCanvasMouseMoveProps {
  tagHoverEvent: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  annotations: AnnotationProps[];
  setHoverTag: React.Dispatch<React.SetStateAction<string>>;
  setHoverPos: React.Dispatch<React.SetStateAction<{ hoveredDotX: number; hoveredDotY: number; }>>;
  setShowH: React.Dispatch<React.SetStateAction<boolean>>;
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
  currentAnnotation: { currentAnnotationX: number; currentAnnotationY: number; }
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  tag: string;
  annotations: AnnotationProps[];
  id: string;
  setAnnotations: React.Dispatch<React.SetStateAction<AnnotationProps[]>>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  setCurrentAnnotation: React.Dispatch<React.SetStateAction<{ currentAnnotationX: number; currentAnnotationY: number; }>>;
  setTempRedPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  showAllTags: boolean;
}

export interface HandleClearSingleTagProps {
  clearSingleTagEvent: React.MouseEvent<HTMLButtonElement>;
  setDeleteTagId: React.Dispatch<React.SetStateAction<string>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  setDeleteTag: React.Dispatch<React.SetStateAction<boolean>>;
  annotations: AnnotationProps[];
  deleteTagId: string;
  setAnnotations: React.Dispatch<React.SetStateAction<AnnotationProps[]>>;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  setCurrentAnnotation: React.Dispatch<React.SetStateAction<{ currentAnnotationX: number; currentAnnotationY: number; }>>;
  setTempRedPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HideTagsProps {
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  imgSrc: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  annotations: AnnotationProps[];
  drawing: string;
  allTextTags: TextTag[];
  rotate: number;
  dimensions: { height: number; width: number; };
  currentCropped: Cropped;
  selectCanvas: boolean;
}

export interface ShowTagsProps {
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  imgSrc: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  annotations: AnnotationProps[];
  drawing: string;
  allTextTags: TextTag[];
}

export interface TagAnnotationFormProps {
  tags: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  position: { currentAnnotationX: number; currentAnnotationY: number };
  refer: React.MutableRefObject<null>;
  handleCloseInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TagOnHoverProps {
  position: { hoveredDotX: number; hoveredDotY: number; };
  tag: string;
}

export interface SubmitTagsProps {
  position: { currentAnnotationX: number; currentAnnotationY: number; };
}

export interface DeleteTagProps {
  position: { deletePositionX: number; deletePositionY: number; }
  setPromptOff: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteTagSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface TextOnImageControlProps {
  tempPrompt: boolean;
  textOnChangeHandler: (textForm: TextFormProps) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formData: { text: string; size: number; color: string; id: string; };
  setFormData: React.Dispatch<React.SetStateAction<{ text: string; size: number; color: string; id: string; }>>;
  error: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
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
  textForm: TextFormProps;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentClicked: { x: number; y: number; };
  imgSrc: string;
  isEditing: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  allTextTags: TextTag[];
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: string;
}

export interface TextOnImageClickHandlerProps {
  event: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentClicked:  React.Dispatch<React.SetStateAction<{ x: number; y: number; }>>;
  imgSrc: string;
  allTextTags: TextTag[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<{ text: string; size: number; color: string; id: string; }>>;
}

export interface TextFormProps {
  text: string;
  color: string;
  size: number;
}

export interface TextTag {
  x: number;
  y: number;
  text: string;
  color: string;
  size: number;
  id: string;
}

export interface TextOnImageProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  currentClicked: { x: number; y: number; };
  setCurrentClicked: React.Dispatch<React.SetStateAction<{ x: number; y: number; }>>;
  allTextTags: TextTag[];
  imgSrc: string;
  dimensions: { height: number; width: number; };
  setAllTextTags: React.Dispatch<React.SetStateAction<never[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<{ text: string; size: number; color: string; id: string; }>>;
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
  annotations: AnnotationProps[];
  handleTagMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: string;
}

export interface TextObjectProps {
  x: number;
  y: number;
  text: string;
  color: string;
  size: number;
  id: string;
}[]

export interface SubmitHandlerProps {
  event: any;
  setAllTextTags:  React.Dispatch<React.SetStateAction<TextTag[] | any | never[]>>;
  currentClicked: { x: number; y: number; };
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export interface HandleMouseMoveProps {
  event: React.MouseEvent<HTMLCanvasElement>;
  isDraggingText: boolean;
  draggingText: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  allTextTags: TextTag[];
  dimensions: { height: number; width: number; };
  imgSrc: string;
  currentClicked: { x: number; y: number; };
  annotations: AnnotationProps[];
  handleTagMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: string;
}

export interface HandleMouseDownProps {
  event: React.MouseEvent<HTMLCanvasElement>;
  setIsDraggingText: React.Dispatch<React.SetStateAction<boolean>>;
  setDraggingText: React.Dispatch<React.SetStateAction<string>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  allTextTags: TextTag[];
  setCurrentClicked: React.Dispatch<React.SetStateAction<{ x: number; y: number; }>>;
}

export interface HandleMouseUpProps {
  event: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isDraggingText: boolean;
  setIsDraggingText: React.Dispatch<React.SetStateAction<boolean>>;
  draggingText: string;
  setDraggingText: React.Dispatch<React.SetStateAction<string>>;
  allTextTags: TextTag[];
  setAllTextTags: React.Dispatch<React.SetStateAction<TextTag[] | any | never[]>>;
  currentClicked: { x: number; y: number; };
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HandleDeleteProps {
  allTextTags: TextTag[];
  setAllTextTags: React.Dispatch<React.SetStateAction<TextTag[] | any | never[]>>;
  formData: { text: string; size: number; color: string; id: string; };
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HandleCrossProps {
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  allTextTags: TextTag[];
  imgSrc: string;
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: string;
}

export interface DeleteTextProps {
  position: { x: number; y: number; };
  handleDelete: () => void;
  setDeleteTextTag: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CropControlProps {
  select: () => void;
  image: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentCropped: Cropped;
  selectCanvas: boolean;
}

export interface CropProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentCropped: Cropped;
  setCurrentCropped: React.Dispatch<React.SetStateAction<Cropped>>;
  dimensions: { height: number; width: number; };
  imgSrc: string;
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: string;
  allTextTags: TextTag[];
  setHoverTag: React.Dispatch<React.SetStateAction<string>>;
  setHoverPos: React.Dispatch<React.SetStateAction<{ hoveredDotX: number; hoveredDotY: number; }>>;
  setShowH: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DifferenceProps {
  width: number;
  height: number;
  x: number;
  y: number;
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
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  currentCropped: Cropped;
}

export interface MouseMoveProps {
  event: React.MouseEvent<HTMLCanvasElement>;
  setDifference: React.Dispatch<React.SetStateAction<DifferenceProps>>;
  currentCropped: Cropped;
  croppingNode: number;
  isResize: boolean;
  isDragging: boolean;
  startingNode: { startingNodeX: number; startingNodeY: number; };
  canvasRef: React.RefObject<HTMLCanvasElement>;
  dimensions: { height: number; width: number; };
  imgRef: React.RefObject<HTMLImageElement>;
  imgSrc: string;
  annotations: AnnotationProps[];
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: string;
  allTextTags: TextTag[];
  setHoverTag: React.Dispatch<React.SetStateAction<string>>;
  setHoverPos: React.Dispatch<React.SetStateAction<{ hoveredDotX: number; hoveredDotY: number; }>>;
  setShowH: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MouseUPProps {
  event: React.MouseEvent<HTMLCanvasElement>;
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
  difference: { width: number; height: number; x: number; y: number; };
  setDifference: React.Dispatch<React.SetStateAction<{ width: number; height: number; x: number; y: number; }>>;
  currentCropped: Cropped;
  setCurrentCropped: React.Dispatch<React.SetStateAction<Cropped>>;
  croppingNode: number;
  isResize: boolean;
  isDragging: boolean;
  startingNode: { startingNodeX: number; startingNodeY: number; };
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgRef: React.RefObject<HTMLImageElement>;
}

export interface FlipCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleTagMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface MouseLeaveProps {
  event: React.MouseEvent<HTMLCanvasElement>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setIsResize: React.Dispatch<React.SetStateAction<boolean>>;
  mouseUp: MouseUpProps;
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
  drawing: string;
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
  drawing: string;
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  allTextTags: TextTag[];
  rotate: number;
}

export interface LoadImageFlipProps {
  context: CanvasRenderingContext2D | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  annotations: AnnotationProps[];
  drawing: string;
  allTextTags: TextTag[];
  rotate: number;
}

export interface PenProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  handleTagMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

export interface PenControlProps {
  saveDrawing: () => void;
  clearDrawing: () => void;
}

export interface SaveDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setDrawing: React.Dispatch<React.SetStateAction<string>>;
  imgSrc: string;
}

export interface ClearDrawingProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imgSrc: string;
  annotations: AnnotationProps[];
  setDrawing: React.Dispatch<React.SetStateAction<string>>;
  showAllTags: boolean;
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: string;
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
  blur: number;
  zoom: number;
  rotate: number;
  brightness: number;
  imgSrc: string;
  drawing: string;
  handleTagMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
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