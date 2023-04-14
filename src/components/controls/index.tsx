import { useState } from "react";
import {
  Blur,
  BrightnessUp,
  Crop,
  Draw,
  Flip,
  RotateRight,
  Tag,
  TextOnImage,
  Zoom,
} from "../../assets/icons";
import UniversalSlider from "./sliders";
import ImageAnnot from "../TagAnnotation";
import "./index.css";
import { Button } from "./buttons";
import { controls, handleToolClick, tools } from "../../utils/data";

interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: any;
}
interface props {
  imgSrc: string;
}

export default function Controls({ imgSrc }: props): JSX.Element {
  const [currentTool, setCurrentTool] = useState<string>("tag-annotation");
  const [blur, setBlur] = useState<number>(0);
  const [rotate, setRotate] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  function ShowSelectedTool() {
    return (
      <>
        {currentTool === "tag-annotation" ? (
          <ImageAnnot
            imageSrcMain={imgSrc}
            blur={blur}
            setBlur={setBlur}
            brightness={brightness}
            setBrightness={setBrightness}
            rotate={rotate}
            setRotate={setRotate}
          />
        ) : currentTool === "text-on-image" ? (
          console.log("ToI")
        ) : currentTool === "crop" ? (
          console.log("crop")
        ) : currentTool === "flip" ? (
          console.log("flip")
        ) : currentTool === "draw" ? (
          console.log("draw")
        ) : (
          console.log("none")
        )}
      </>
    );
  }

  function Controls() {
    return (
      <>
        <div className='controls-main'>
          {/* tools */}
          <div className='controls-2div'>
            <div className='tools-grid'>
              {tools.map((x: controlsType, idx: number) => {
                return (
                  <div key={x.id} className='tools-map-div'>
                    <Button
                      className='tools-button'
                      isActive={idx === activeIndex}
                      onClick={() =>
                        handleToolClick(
                          x.type,
                          idx,
                          setActiveIndex,
                          setCurrentTool
                        )
                      }
                    >
                      {x.icon}
                    </Button>
                    <span>{x.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* controls */}
          <div className='showControls-div'>
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
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='controls-out'>
      <Controls />
      <div className='selectedTools-div'>
        <ShowSelectedTool />
      </div>
    </div>
  );
}
