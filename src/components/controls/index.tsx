import { useState, useEffect, useRef } from "react";
import ImageAnnot, { handleCanvasMouseMove } from "../TagAnnotation";
import "./index.css";
import { Button } from "./buttons";
import { handleToolClick, tools } from "../../utils/data";
import Draw from "../draw";
import { FlipControl, MoreControls, TagControls } from "./allControls";
import MainCanvasControls from "./mainCanvasControls";
import { customAlphabet } from "nanoid";

interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: any;
}
interface props {
  imgSrc: string;
}
interface annotation {
  id: string;
  x: number;
  y: number;
  tag: string;
}
interface flipProps {
  flipHorizontally: () => void;
  flipVertically: () => void;
}

export default function Controls({ imgSrc }: props): JSX.Element {
  const [currentTool, setCurrentTool] = useState<string>("tag-annotation");
  const [annotations, setAnnotations] = useState<annotation[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentControl, setCurrentControl] =
    useState<string>("tag-annotation");
  const [blur, setBlur] = useState<number>(0);
  const [rotate, setRotate] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [clear, setClear] = useState<boolean>(false);
  const [hoverTag, setHoverTag] = useState("");
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [showH, setShowH] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const nanoid = customAlphabet("1234567890abcdef", 10);
  const id = nanoid(5);

  const drawImage = (ctx: CanvasRenderingContext2D) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
    };
    img.src = imgSrc;
  };

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
                      onClick={() => {
                        handleToolClick(
                          x.type,
                          idx,
                          setActiveIndex,
                          setCurrentTool,
                          setCurrentControl
                        );
                      }}
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
            <SelectedControl />
          </div>
        </div>
      </>
    );
  }

  // function ShowSelectedTool() {
  //   return (
  //     <>
  //       {currentTool === "tag-annotation" ? (
  //         <div className='selectedTools-div'>
  //           {/* <ImageAnnot
  //             imageSrcMain={imgSrc}
  //             annotations={annotations}
  //             setAnnotations={setAnnotations}
  //             blur={blur}
  //             setBlur={setBlur}
  //             brightness={brightness}
  //             setBrightness={setBrightness}
  //             rotate={rotate}
  //             setRotate={setRotate}
  //           /> */}
  //         </div>
  //       ) : currentTool === "text-on-image" ? (
  //         console.log("ToI")
  //       ) : currentTool === "crop" ? (
  //         console.log("crop")
  //       ) : currentTool === "flip" ? (
  //         console.log("flip")
  //       ) : currentTool === "draw" ? (
  //         <div className='selectedTools-div'>
  //           <Draw width={1000} height={563} />
  //         </div>
  //       ) : currentTool === "more" ? (
  //         console.log("more")
  //       ) : (
  //         console.log("none")
  //       )}
  //     </>
  //   );
  // }

  function SelectedControl() {
    return (
      <>
        {currentControl === "tag-annotation" ? (
          <TagControls annotations={annotations} />
        ) : currentControl === "text-on-image" ? (
          console.log("ToI")
        ) : currentControl === "crop" ? (
          console.log("crop")
        ) : currentControl === "flip" ? (
          <FlipControl
            flipHorizontally={() => {
              const canvas = canvasRef.current;
              if (!canvas) return;

              const ctx = canvas.getContext("2d");
              if (!ctx) return;

              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
              drawImage(ctx);
            }}
            flipVertically={() => {
              const canvas = canvasRef.current;
              if (!canvas) return;

              const ctx = canvas.getContext("2d");
              if (!ctx) return;

              ctx.translate(0, canvas.height);
              ctx.scale(1, -1);
              drawImage(ctx);
            }}
          />
        ) : currentControl === "draw" ? (
          console.log("draw")
        ) : currentControl === "more" ? (
          <MoreControls
            blur={blur}
            setBlur={setBlur}
            brightness={brightness}
            setBrightness={setBrightness}
            rotate={rotate}
            setRotate={setRotate}
          />
        ) : (
          console.log("none")
        )}
      </>
    );
  }

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const { width, height } = img;
      if (width > 1000) {
        const ratio = width / height;
        const newHeight = 1000 / ratio;
        const newWidth = 563 * ratio;
        setDimensions({ width: newWidth, height: newHeight });
      } else {
        setDimensions({ width, height });
      }
    };
  }, [imgSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;
    const ctx = canvas!.getContext("2d");
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    };
  }, [dimensions, imgSrc, clear]);

  return (
    <div className='controls-out'>
      <Tools />
      {/* <ShowSelectedTool /> */}
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
        onMouseMove={(event) =>
          handleCanvasMouseMove(
            event,
            canvasRef,
            annotations,
            setHoverTag,
            setHoverPos,
            setShowH
          )
        }
      />
      <MainCanvasControls
        clearFunction={() => {
          setClear(!clear);
        }}
        showHideFunction={() => {}}
        screenShotFunction={() => {}}
        iconTag={() => {}}
      />
    </div>
  );
}
