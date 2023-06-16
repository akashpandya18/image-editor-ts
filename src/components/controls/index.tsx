import React, {
  useState,
  useEffect,
  useRef
} from "react";
import {
  handleCanvasClick,
  handleCanvasMouseMove,
  handleClearSingleTag,
  handleInputChange,
  handleScreenShot,
  handleSubmitTag,
  hideTags,
  showTags
} from "../TagAnnotation";
import "./index.css";
import { Button } from "./buttons";
import {
  controls,
  filterOptions,
  handleToolClick,
  tools
} from "../../utils/data";
import {
  CropControl,
  PenControl,
  FlipControl,
  TagControls,
  TextOnImageControl
} from "./allControls";
import MainCanvasControls from "./mainCanvasControls";
import { customAlphabet } from "nanoid";
import {
  controlsType,
  annotationProps,
  controlsProps,
  filterOptionsProps
} from "../../types";
import ShowTagOnHover from "../prompts/showTagOnHover";
import { DeleteTag } from "../prompts/deleteTag";
import TagAnnotationForm from "../forms/TagAnnotForm";
import TempRedTag from "../prompts/ConfirmSubmitTag";
import {
  HideTags,
  ShowTags
} from "../../assets/icons";
import {
  flipHorizontally,
  flipVertically
} from "../flip";
import {
  RegularCanvas,
  PenCanvas,
  TagCanvas,
  MoreFilterCanvas
} from "../canvases";
import "./sliders/index.css";
import {
  saveDrawing,
  clearDrawing
} from "../draw";

export default function Controls({
  imgSrc
}: controlsProps): JSX.Element {
  const [annotations, setAnnotations] = useState<annotationProps[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentControl, setCurrentControl] = useState<string>("tag-annotation");
  let [blur, setBlur] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
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
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);
  const [drawing, setDrawing] = useState("");

  const lineWidth = 4;
  const lineColor = "#000";
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const id = nanoid(5);

  // set range slider values
  const handleEffectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.id === "blur") {
      setBlur(Number(e.target.value));
    }
    if (e.target.id === "zoom") {
      setZoom(Number(e.target.value));
    }
    if (e.target.id === "rotate") {
      setRotate(Number(e.target.value));
    }
    if (e.target.id === "brightness") {
      setBrightness(Number(e.target.value));
    }
  };

  // return range slider value
  const inputValue = (name: string) => {
    if (name === "blur") {
      return blur;
    }
    if (name === "zoom") {
      return zoom;
    }
    if (name === "rotate") {
      return rotate;
    }
    if (name === "brightness") {
      return brightness;
    }
  };

  // set height and width of image on canvas
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
      // } else if (width < 500) {
      //   setDimensions({ width: 500, height: 490 });
      } else {
        setDimensions({ width, height });
      }
    };
  }, [imgSrc]);

  // clear all filters
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
    setBlur(0);
    setZoom(1);
    setRotate(0);
    setBrightness(1);
    setFlipVertical(false);
    setFlipHorizontal(false);
    setDrawing("");

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      context!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
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

  const flipValue = (canvas: HTMLCanvasElement | null, context: CanvasRenderingContext2D) => {
    if (!canvas) return;

    if (flipHorizontal && !flipVertical) {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    } else if (flipVertical && !flipHorizontal) {
      context.translate(0, canvas.height);
      context.scale(1, -1);
    } else if (flipVertical && flipHorizontal) {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.translate(0, canvas.height);
      context.scale(1, -1);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas!.getContext("2d");
    if (!context) return;

    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;

    const image = new Image();
    if (drawing !== "") {
      image.src = drawing
    } else {
      image.src = imgSrc;
    }

    image.width = canvas!.width;
    image.height = canvas!.height;

    image.onload = () => {
      // setting tag/annotation on canvas
      setTimeout(() => {
        // context!.drawImage(image, 0, 0, canvas.width, canvas.height);
        annotations.forEach((annotationData: any) => {
          const { x, y } = annotationData;
          context!.beginPath();
          context!.fillStyle = "yellow";
          context!.arc(x, y, 10, 0, 2 * Math.PI);
          context!.fill();
        });
      }, 10);

      // setting flip on canvas
      flipValue(canvas, context);

      // setting blur and brightness value on canvas
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      blur = blur / 16;
      context!.filter = `blur(${blur}rem) brightness(${brightness})`;
      setTimeout(() => {
        context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
      });

      // setting zoom value on canvas
      if (canvas) {
        // Clear canvas and scale it
        const centerX = canvas!.width / 2;
        const centerY = canvas!.height / 2;

        context!.translate(centerX, centerY);
        context!.scale(zoom, zoom);
        context!.translate(-centerX, -centerY)
        context!.clearRect(0, 0, width, height);
      }

      // if show all tag is true
      if (showAllTags) {
        showTags(setShowAllTags, imgSrc, canvasRef, annotations, drawing);
      }

      setTag("");
      setCurrentAnnotation({ x: 0, y: 0 });
      setTempRedPrompt(false);
    };
  }, [currentControl, blur, zoom, brightness]);

  return (
    <div className={"controls-out"}>
      {/* filter options */}
      <div className={"options-div"}>
        <div>
          <h3> Tabs </h3>
          {filterOptions.map((filterOptionsValue: filterOptionsProps) => {
            return (
              <div className={"filter-options-div"} key={filterOptionsValue.id}>
                <input
                  type={"checkbox"}
                  name={filterOptionsValue.name}
                  value={filterOptionsValue.name}
                  className={"checkbox"}
                  // onChange={() => filterOptionsValue.checked = !filterOptionsValue.checked}
                  // checked={filterOptionsValue.checked}
                />
                <label> {filterOptionsValue.name} </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className={"controls-main"}>
        {/* tools */}
        <div className={"controls-2div"}>
          <div className={"tools-grid"}>
            {tools.map((x: controlsType, idx: number) => {
              return (
                <div key={x.id} className={"tools-map-div"}>
                  <Button
                    className={"tools-button"}
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
                  <span> {x.name} </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* controls */}
        <div className={"showControls-div"}>
          {currentControl === "tag-annotation" ? (
            <TagControls annotations={annotations}/>
          ) : currentControl === "text-on-image" ? (
            <TextOnImageControl />
          ) : currentControl === "crop" ? (
            <CropControl />
          ) : currentControl === "flip" ? (
            <FlipControl
              flipHorizontally={() => flipHorizontally(canvasRef, imgSrc, annotations, flipHorizontal, setFlipHorizontal, drawing, showAllTags, setShowAllTags)}
              flipVertically={() => flipVertically(canvasRef, imgSrc, annotations, flipVertical, setFlipVertical, drawing, showAllTags, setShowAllTags)}
            />
          ) : currentControl === "pen" ? (
            <PenControl
              saveDrawing={() => saveDrawing(canvasRef, setDrawing,)}
              clearDrawing={() => clearDrawing(canvasRef, imgSrc, annotations, setDrawing, showAllTags, setShowAllTags)}
            />
          ) : currentControl === "more" && (
            <div>
              <h3> More Controls </h3>
              <div className={"showControls-grid"}>
                {controls.map((x: controlsType) => {
                  return (
                    <div key={x.id} className={"controlsMap-div"}>
                      <div className={"controlsMap-icon"}> {x.icon} </div>
                      <div className={"brightness-slider"}>
                        <label className={"brightness-label"} htmlFor={"brightness"}>
                          {x.name} :
                        </label>
                        <input
                          type={"range"}
                          id={x.type}
                          name={x.type}
                          min={x.type === "zoom" ? 0.2 : x.type === "rotate" ? -180 : x.type === "brightness" ? 0.2 : 0}
                          max={x.type === "zoom" ? 1.5 : x.type === "rotate" ? 180 : x.type === "blur" ? 5 : 1}
                          step={x.type === "zoom" ? 0.1 : x.type === "rotate" ? 45 : x.type === "blur" ? 1 : 0.2}
                          value={inputValue(x.type)}
                          onChange={(e: any) => handleEffectChange(e)}
                          autoComplete={"off"}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={"canvas-div"}>
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
        ) : currentControl === "pen" ? (
          <PenCanvas canvasRef={canvasRef} />
        ) : currentControl === "more" ? (
          <MoreFilterCanvas
            canvasRef={canvasRef}
            zoom={zoom}
            blur={blur}
            rotate={rotate}
            brightness={brightness}
            imgSrc={imgSrc}
            drawing={drawing}
          />
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
              handleInputChange={(e: any) => handleInputChange(e, setTag)}
              onSubmit={(e: any) =>
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
              ? hideTags(setShowAllTags, imgSrc, canvasRef, annotations, drawing)
              : showTags(setShowAllTags, imgSrc, canvasRef, annotations, drawing)
          }
          screenShotFunction={() => handleScreenShot(canvasRef)}
          iconTag={showAllTags ? <HideTags /> : <ShowTags />}
        />
      </div>
    </div>
  );
};