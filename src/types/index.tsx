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
