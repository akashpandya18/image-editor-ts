import { controls } from "../../utils/data";
import UniversalSlider from "./sliders";
import "./index.css";
import { FlipHorizontal, FlipVertical } from "../../assets/icons";

interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: any;
}
interface propsMore {
  blur: number;
  setBlur: Function;
  brightness: number;
  setBrightness: Function;
  rotate: number;
  setRotate: Function;
}
interface propsTag {
  annotations: { id: string; x: number; y: number; tag: string }[];
}
interface propsFlip {
  flipHorizontally: any;
  flipVertically: any;
}
export function TagControls({ annotations }: propsTag) {
  return (
    <>
      <div>
        {annotations && (
          <div>
            <ol>
              {annotations.map((data: any) => {
                return <li>{data.tag}</li>;
              })}
            </ol>
          </div>
        )}
      </div>
    </>
  );
}
export function FlipControl({ flipHorizontally, flipVertically }: propsFlip) {
  return (
    <>
      <div className='button-div'>
        <button className='flip-button' onClick={() => flipHorizontally()}>
          <FlipHorizontal />
        </button>
        <button className='flip-button' onClick={() => flipVertically()}>
          <FlipVertical />
        </button>
      </div>
    </>
  );
}
export function MoreControls({
  blur,
  setBlur,
  brightness,
  setBrightness,
  rotate,
  setRotate,
}: propsMore) {
  return (
    <>
      <div className='showControls-grid'>
        {controls.map((x: controlsType) => {
          return (
            <div key={x.id} className='controlsMap-div'>
              <div className='controlsMap-icon'>{x.icon}</div>
              <div>
                <UniversalSlider
                  label={x.name}
                  id={x.type}
                  blur={blur}
                  setBlur={setBlur}
                  brightness={brightness}
                  setBrightness={setBrightness}
                  rotate={rotate}
                  setRotate={setRotate}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
