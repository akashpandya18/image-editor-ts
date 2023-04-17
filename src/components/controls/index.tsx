import { useState, useEffect, useRef } from "react";
import UniversalSlider from "./sliders";
import ImageAnnot from "../TagAnnotation";
import "./index.css";
import { Button } from "./buttons";
import { controls, handleToolClick, tools } from "../../utils/data";
import FlipImage from "../flip";
import Draw from "../draw";

interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: any;
}

interface props {
  imgSrc: string;
}
interface CanvasState {}

export default function Controls({ imgSrc }: props): JSX.Element {
  const [canvasState, setCanvasState] = useState<CanvasState>({});
  const [currentTool, setCurrentTool] = useState<string>("tag-annotation");
  const [blur, setBlur] = useState<number>(0);
  const [rotate, setRotate] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function ShowSelectedTool() {
    return (
      <>
        {currentTool === "tag-annotation" ? (
          <div className='selectedTools-div'>
            <ImageAnnot
              imageSrcMain={imgSrc}
              blur={blur}
              setBlur={setBlur}
              brightness={brightness}
              setBrightness={setBrightness}
              rotate={rotate}
              setRotate={setRotate}
            />
          </div>
        ) : currentTool === "text-on-image" ? (
          console.log("ToI")
        ) : currentTool === "crop" ? (
          console.log("crop")
        ) : currentTool === "flip" ? (
          <div className='selectedTools-div'>
            <FlipImage imageUrl={imgSrc} />
          </div>
        ) : currentTool === "draw" ? (
          <div className='selectedTools-div'>
            <Draw width={1000} height={563} />
          </div>
        ) : (
          console.log("none")
        )}
      </>
    );
  }

  function Tools() {
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

  function Canvas(propRef: any) {
    return (
      <>
        <canvas
          ref={propRef}
          style={{
            borderRadius: "7px",
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
          }}
        />
      </>
    );
  }

  return (
    <div className='controls-out'>
      <Tools />
      <ShowSelectedTool />
      {/* <Canvas /> */}
    </div>
  );
};