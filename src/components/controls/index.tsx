import { useState, useEffect, useRef } from "react";
import {
  handleCanvasClick,
  handleCanvasMouseMove,
  handleClearSingleTag,
  handleInputChange,
  handleScreenShot,
  handleSubmitTag,
  hideTags,
  showTags,
} from "../TagAnnotation";
import "./index.css";
import { Button } from "./buttons";
import { handleToolClick, tools } from "../../utils/data";
import { FlipControl, MoreControls, TagControls } from "./allControls";
import MainCanvasControls from "./mainCanvasControls";
import { customAlphabet } from "nanoid";
import { controlsType, annotation, controlsProps } from "../../types";
import ShowTagOnHover from "../prompts/showTagOnHover";
import { DeleteTag } from "../prompts/deleteTag";
import TagAnnotationForm from "../forms/TagAnnotForm";
import TempRedTag from "../prompts/ConfirmSubmitTag";
import { HideTags, ShowTags } from "../../assets/icons";
import { flipHorizontally, flipVertically } from "../flip";
import { DrawCanvas, RegularCanvas, TagCanvas } from "../canvases";

export default function Controls({ imgSrc }: controlsProps): JSX.Element {
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
  const [tempRedPrompt, setTempRedPrompt] = useState(false);
  const [deleteTag, setDeleteTag] = useState(false);
  const [deletePos, setDeletePos] = useState({ xN: 0, yN: 0 });
  const [showAllTags, setShowAllTags] = useState(false);
  const [deleteTagId, setDeleteTagId] = useState("");
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [tag, setTag] = useState("");

  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const nanoid = customAlphabet("1234567890abcdef", 10);
  const id = nanoid(5);

  const lineWidth = 4;
  const lineColor = "#000000";

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
            flipHorizontally={() =>
              flipHorizontally(canvasRef, imgSrc, annotations)
            }
            flipVertically={() =>
              flipVertically(canvasRef, imgSrc, annotations)
            }
          />
        ) : currentControl === "draw" ? (
          console.log("")
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
    setAnnotations([]);
    setTempRedPrompt(false);
    setCurrentAnnotation({ x: 0, y: 0 });
    setTag("");
    setDeleteTag(false);
    setDeletePos({ xN: 0, yN: 0 });
    setDeleteTagId("");
    setShowAllTags(false);
    setShowH(false);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      context.lineWidth = lineWidth;
      context.strokeStyle = lineColor;
    }
  }, [canvasRef, lineWidth, lineColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
      annotations.forEach((annot: any) => {
        const { x, y } = annot;
        ctx!.beginPath();
        ctx!.fillStyle = "yellow";
        ctx!.arc(x, y, 10, 0, 2 * Math.PI);
        ctx!.fill();
      });
      setTag("");
      setCurrentAnnotation({ x: 0, y: 0 });
      setTempRedPrompt(false);
    };
  }, [currentControl]);

  return (
    <div className='controls-out'>
      <Tools />
      <div className='canvas-div'>
        {currentControl === "tag-annotation" ? (
          <TagCanvas
            canvasRef={canvasRef}
            handleTagClick={(event: any) =>
              handleCanvasClick(
                event,
                canvasRef,
                annotations,
                setTempRedPrompt,
                setDeleteTag,
                setShowH,
                setDeleteTagId,
                setCurrentAnnotation,
                setTag,
                setDeletePos
              )
            }
            handleTagMouseMove={(event: any) =>
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
        ) : currentControl === "draw" ? (
          <DrawCanvas canvasRef={canvasRef} />
        ) : (
          <RegularCanvas canvasRef={canvasRef} />
        )}

        {tempRedPrompt && (
          <>
            <TempRedTag position={currentAnnotation} />
            <TagAnnotationForm
              refer={ref}
              tags={tag}
              handleCloseInput={setTempRedPrompt}
              handleInputChange={(e) => handleInputChange(e, setTag)}
              onSubmit={(e) =>
                handleSubmitTag(
                  e,
                  currentAnnotation,
                  canvasRef,
                  imgSrc,
                  tag,
                  annotations,
                  id,
                  setAnnotations,
                  setTag,
                  setCurrentAnnotation,
                  setTempRedPrompt,
                  showAllTags
                )
              }
              position={currentAnnotation}
            />
          </>
        )}

        {deleteTag && (
          <DeleteTag
            position={deletePos}
            setPromptOff={() => setDeleteTag(false)}
            deleteTagSubmit={(e) =>
              handleClearSingleTag(
                e,
                setDeleteTagId,
                canvasRef,
                imgSrc,
                setDeleteTag,
                annotations,
                deleteTagId,
                setAnnotations,
                setTag,
                setCurrentAnnotation,
                setTempRedPrompt,
                setShowAllTags
              )
            }
          />
        )}

        {showH && <ShowTagOnHover position={hoverPos} tag={hoverTag} />}

        <MainCanvasControls
          clearFunction={() => setClear(!clear)}
          showHideFunction={() =>
            showAllTags
              ? hideTags(setShowAllTags, imgSrc, canvasRef, annotations)
              : showTags(setShowAllTags, imgSrc, canvasRef, annotations)
          }
          screenShotFunction={() => handleScreenShot(canvasRef)}
          iconTag={showAllTags ? <HideTags /> : <ShowTags />}
        />
      </div>
    </div>
  );
}
