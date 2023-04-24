import { controls } from "../../utils/data";
import UniversalSlider from "./sliders";
import "./index.css";
import { Check, FlipHorizontal, FlipVertical } from "../../assets/icons";
import { controlsType, propsFlip, propsMore, propsTag } from "../../types";

export function TagControls({ annotations }: propsTag) {
  // const messageRef = useRef<HTMLDivElement>(null);

  // if (messageRef.current) {
  //   messageRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //     inline: "nearest",
  //   });
  // }

  return (
    <>
      <h3 className='tag-head'>Tags</h3>
      <div className='tag-main'>
        {annotations.length > 0 && (
          <ol className='tag-ol'>
            {annotations.map((data: any) => {
              return (
                <li className='list-tags' key={data.id}>
                  {data.tag}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </>
  );
}
export function FlipControl({ flipHorizontally, flipVertically }: propsFlip) {
  return (
    <>
      <h3>Flip</h3>
      <div className='buttondiv-main'>
        <div className='button-div'>
          <button className='flip-button' onClick={flipHorizontally}>
            <FlipHorizontal />
          </button>
          <button className='flip-button' onClick={flipVertically}>
            <FlipVertical />
          </button>
        </div>
        <button className='flip-button-sure'>
          <Check />
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
      <h3>More Controls</h3>
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
export function DrawControl() {
  return (
    <>
      <h3>Draw</h3>
    </>
  );
}
export function TextOnImageControl() {
  return (
    <>
      <h3>Text On Image</h3>
    </>
  );
}
export function CropControl() {
  return (
    <>
      <h3>Crop</h3>
    </>
  );
}
