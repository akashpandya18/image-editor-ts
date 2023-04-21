import { controls } from "../../utils/constant";
import UniversalSlider from "./sliders";
import {
  controlsType,
  flipProps,
  propsMore,
  propsTag
} from "../../types";
import { FlipHorizontal, FlipVertical } from "../../assets/icons";
import "./index.css";

export function TagControls({ annotations }: propsTag) {
  return (
    <div>
      {annotations && (
        <div>
          <ol>
            {annotations.map((data: any, index: number) => {
              return <li key={index}> {data.tag} </li>;
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

export function FlipControl({ flipHorizontally, flipVertically }: flipProps) {
  return (
    <div className={"button-div"}>
      <button className={"flip-button"} onClick={flipHorizontally}>
        <FlipHorizontal />
      </button>
      <button className={"flip-button"} onClick={flipVertically}>
        <FlipVertical />
      </button>
    </div>
  );
}

export function MoreControls({
  blur,
  setBlur,
  zoom,
  setZoom,
  brightness,
  setBrightness,
  rotate,
  setRotate
}: propsMore) {
  return (
    <div className={"showControls-grid"}>
      {controls.map((x: controlsType) => {
        return (
          <div key={x.id} className={"controlsMap-div"}>
            <div className={"controlsMap-icon"}>{x.icon}</div>
            <div>
              <UniversalSlider
                label={x.name}
                id={x.type}
                blur={blur}
                setBlur={setBlur}
                zoom={zoom}
                setZoom={setZoom}
                rotate={rotate}
                setRotate={setRotate}
                brightness={brightness}
                setBrightness={setBrightness}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}