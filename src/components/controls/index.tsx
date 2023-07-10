import React, {
  useState,
  useEffect,
  useRef
} from "react";
import { customAlphabet } from "nanoid";
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
import { Button } from "./buttons";
import {
  TagControls,
  TextOnImageControl,
  CropControl,
  FlipControl,
  PenControl
} from "./allControls";
import { MainCanvasControls } from "./mainCanvasControls";
import { flipHorizontally, flipVertically } from "../flip";
import {
  RegularCanvas,
  PenCanvas,
  TagCanvas,
  MoreFilterCanvas,
  TextOnImageCanvas,
  CropCanvas,
  FlipCanvas
} from "../canvases";
import { saveDrawing, clearDrawing } from "../draw";
import {
  handleCross,
  handleDelete,
  submitHandler,
  textOnChangeHandler
} from "./textOnImage";
import ShowTagOnHover from "../prompts/showTagOnHover";
import { DeleteTag } from "../prompts/deleteTag";
import { DeleteText } from "../prompts/deleteText";
import { TagAnnotationForm } from "../forms/TagAnnotForm";
import TempRedTag from "../prompts/ConfirmSubmitTag";
import {
  MoreFilterControls,
  // filterOptions,
  handleToolClick,
  OptionsTools
} from "../../utils/data";
import {
  ControlsProps,
  AnnotationProps,
  Cropped,
  TextFormProps,
  TextTag,
  // FilterOptionsProps,
  ControlsType
} from "../../types";
import { HideTags, ShowTags } from "../../assets/icons";
import "./sliders/index.css";
import "./index.css";

export const Controls = ({ imgSrc }: ControlsProps): JSX.Element => {
  // Canvas and selected/active tab
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentControl, setCurrentControl] = useState<string>("tag-annotation");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [clear, setClear] = useState<boolean>(false);
  // Tag/Annotation Canvas
  const [annotations, setAnnotations] = useState<AnnotationProps[]>([]);
  const [hoverTag, setHoverTag] = useState("");
  const [hoverPos, setHoverPos] = useState({ hoveredDotX: 0, hoveredDotY: 0 });
  const [showH, setShowH] = useState(false);
  const [tempRedPrompt, setTempRedPrompt] = useState(false);
  const [deleteTag, setDeleteTag] = useState(false);
  const [deleteTagId, setDeleteTagId] = useState("");
  const [deletePos, setDeletePos] = useState({ deletePositionX: 0, deletePositionY: 0 });
  const [showAllTags, setShowAllTags] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState({ currentAnnotationX: 0, currentAnnotationY: 0 });
  const [tag, setTag] = useState("");
  // Text on Image Canvas
  const [allTextTags, setAllTextTags] = useState([]);
  const [tempPrompt, setTempPrompt] = useState(false);
  const [currentClicked, setCurrentClicked] = useState({ currentClickedX: 0, currentClickedY: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ text: "", size: 32, color: "#ffffff", id: "" });
  const [error, setError] = useState("");
  const [deleteTextTag, setDeleteTextTag] = useState(false);
  // Crop Canvas
  const [currentCropped, setCurrentCropped] = useState<Cropped>({ startingX: 0, startingY: 0, height: 0, width: 0 });
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [selectCanvas, setSelectCanvas] = useState(false);
  const [cropCanvas, setCropCanvas] = useState("");
  // Flip Canvas
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);
  // Pen Canvas
  const [drawing, setDrawing] = useState("");
  const [drawingPen, setDrawingPen] = useState([]);
  // More filter Canvas
  let [blur, setBlur] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  let [rotate, setRotate] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(1);

  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const id = nanoid(5);

  // set height and width of image on canvas
  useEffect(() => {
    const image = new Image();
    image.src = drawing !== "" ? drawing : cropCanvas !== "" ? cropCanvas : imgSrc;

    image.onload = () => {
      const { width, height } = image;
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
  // setting flip value for sync in other tabs
  const flipValue = (canvas: HTMLCanvasElement | null, context: CanvasRenderingContext2D | null) => {
    if (flipHorizontal && !flipVertical) {
      context!.translate(canvas!.width, 0);
      context!.scale(-1, 1);
    } else if (flipVertical && !flipHorizontal) {
      context!.translate(0, canvas!.height);
      context!.scale(1, -1);
    } else if (flipVertical && flipHorizontal) {
      context!.translate(canvas!.width, 0);
      context!.scale(-1, 1);
      context!.translate(0, canvas!.height);
      context!.scale(1, -1);
    }
  };
  // values are sync with all tabs
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const { width, height } = dimensions;
    const image = new Image();
    image.src = drawing !== "" ? drawing : cropCanvas !== "" ? cropCanvas : imgSrc;
    const degToRad = (rotate: number) => rotate * Math.PI / 180;

    if (cropCanvas !== "") {
      canvas!.width = currentCropped.width;
      canvas!.height = currentCropped.height;
    } else {
      canvas!.width = width;
      canvas!.height = height;
    }

    image.onload = () => {
      // setting flip on canvas
      flipValue(canvas, context);
      context!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Clear canvas and scale it
      const centerX = canvas!.width / 2;
      const centerY = canvas!.height / 2;

      // setting zoom value on canvas
      if (canvas) {
        context!.translate(centerX, centerY);
        context!.scale(zoom, zoom);
        context!.translate(-centerX, -centerY);
        context!.clearRect(0, 0, width, height);
      }

      // setting tag/annotation, texts and rotation on canvas
      setTimeout(() => {
        // setting blur and brightness value on canvas
        context!.clearRect(0, 0, canvas!.width, canvas!.height);
        context!.filter = `blur(${blur}px) brightness(${brightness})`;

        if (cropCanvas !== "") {
          canvas!.width = currentCropped.width;
          canvas!.height = currentCropped.height;
        } else {
          image.width = canvas!.width;
          image.height = canvas!.height;
        }
        context!.save();
        context!.translate(centerX, centerY);
        context!.rotate(degToRad(rotate++ % 360));
        context!.drawImage(
          image,
          image.width / -2,
          image.height / -2,
          canvas!.width,
          canvas!.height
        );
        context!.restore();
        annotations.forEach((annotationData: AnnotationProps) => {
          const { currentAnnotationX, currentAnnotationY } = annotationData;
          context!.beginPath();
          context!.fillStyle = "yellow";
          context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
          context!.fill();
        });
        allTextTags.forEach((texts: TextTag) => {
          context!.textBaseline = "alphabetic";
          context!.font = `${texts.size || 22}px monospace`;
          context!.fillStyle = texts.color;
          context!.fillText(texts.text, texts.textPositionX + 10, texts.textPositionY);
        });
        drawingPen.forEach((line: any) => {
          const isArc = line.endY - line.startY < 5;
          if (isArc) {
            context!.beginPath();
            context!.fillStyle = "#000";
            context!.arc(
              line.endX,
              line.endY,
              1,
              0,
              2 * Math.PI
            );
            context!.stroke();
          } else {
            context!.beginPath();
            context!.moveTo(line.startX, line.startY);
            context!.lineTo(line.endX, line.endY);
            // context!.quadraticCurveTo(line.startX, line.startY, line.endX, line.endY);
            // context!.fillStyle = "#000";
            // context!.arc(
            //   line.endX,
            //   line.endY,
            //   1,
            //   0,
            //   2 * Math.PI
            // );
            // context!.fill();
            context!.strokeStyle = "black";
            context!.lineWidth = 2;
            context!.stroke();
          }
        });
        // context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
      },10);

      // if show all tag is true
      showAllTags && showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags, cropCanvas});

      setTag("");
      setCurrentAnnotation({ currentAnnotationX: 0, currentAnnotationY: 0 });
      setTempRedPrompt(false);
      if (currentControl !== "text-on-image") {
        setTempPrompt(false);
      }
      // set crop rectangle disable when user didn't save crop changes and move to other tab
      setCroppedImage("");
      setSelectCanvas(false);
    };
  }, [currentControl, blur, zoom, rotate, brightness, allTextTags, flipHorizontal, flipVertical]);
  // setting crop rectangle in crop tab canvas
  useEffect(() => {
    currentCropped.startingX < 0 &&
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingX: 0
      }));
    currentCropped.startingY < 0 &&
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingY: 0
      }));
    currentCropped.startingX - 1 > Math.floor(dimensions.width) - currentCropped.width &&
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingX: dimensions.width - currentCropped.width
      }));
    currentCropped.startingY - 1 >= dimensions.height - currentCropped.height &&
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingY: dimensions.height - currentCropped.height
      }));
    currentCropped.width < 0 &&
      setCurrentCropped((precState) => ({
        ...precState,
        startingX: precState.startingX - Math.abs(precState.width),
        width: Math.abs(precState.width)
      }));
    currentCropped.height < 0 &&
      setCurrentCropped((precState) => ({
        ...precState,
        startingY: precState.startingY - Math.abs(precState.height),
        height: Math.abs(precState.height)
      }));

    currentCropped.startingX === 0 && currentCropped.startingY === 0 && currentCropped.height === 0 && currentCropped.width === 0 ?
      setSelectCanvas(false) : setSelectCanvas(true);

    // preview of the cropped image
    if (selectCanvas) {
      const canvas1 = canvasRef.current;
      const context1 = canvas1?.getContext("2d");
      let newCanvas = document.createElement("canvas");
      let newCtx = newCanvas.getContext("2d");
      const { width, height } = currentCropped;

      newCanvas.height = height;
      newCanvas.width = width;

      const imageData = context1!.getImageData(currentCropped.startingX + 2, currentCropped.startingY + 2, currentCropped.width - 3, currentCropped.height - 3);
      newCtx!.putImageData(imageData, 0, 0);
      let crop = newCanvas.toDataURL();
      setCroppedImage(crop);
    }
  }, [currentCropped]);
  // create rectangle for crop canvas in crop tab canvas
  useEffect(() => {
    if (selectCanvas) {
      const canvas = canvasRef.current;
      const context = canvas!.getContext("2d");

      context!.strokeStyle = "white";
      context!.setLineDash([5, 5]);
      const imageX = Math.floor(canvas!.width / 4);
      const imageY = Math.floor(canvas!.height / 4);
      context!.lineWidth = 2;
      context!.strokeRect(imageX, imageY, imageX, imageY);

      setCurrentCropped({
        startingX: imageX,
        startingY: imageY,
        width: imageX,
        height: imageY
      });
      context!.setLineDash([5, 5]);
      // left top node
      context!.fillStyle = "white";
      context!.beginPath();
      context!.fillRect((dimensions.width / 4) - 2, (dimensions.height / 4) - 4, 6, 6);
      context!.fillStyle = "white";
      context!.fill();
      context!.stroke();
      // right top node
      context!.beginPath();
      context!.fillRect((dimensions.width / 4) + (dimensions.width / 4) - 2, (dimensions.height / 4) - 6, 6, 6);
      context!.fillStyle = "white";
      context!.fill();
      context!.stroke();
      // left bottom node
      context!.beginPath();
      context!.fillRect((dimensions.width / 4) - 4, (dimensions.height / 4) + (dimensions.height / 4) - 3, 6, 6);
      context!.fillStyle = "white";
      context!.fill();
      context!.stroke();
      // right bottom node
      context!.beginPath();
      context!.fillRect((dimensions.width / 4) + (dimensions.width / 4), (dimensions.height / 4) + (dimensions.height / 4) - 4, 6, 6);
      context!.fillStyle = "white";
      context!.fill();
      context!.stroke();

      const canvas1 = canvasRef.current;
      const context1 = canvas1!.getContext("2d");
      let newCanvas = document.createElement("canvas");
      let newCtx = newCanvas.getContext("2d");

      newCanvas.height = imageY;
      newCanvas.width = imageX;

      const imageData = context1!.getImageData(dimensions.width / 4 + 2, dimensions.height / 4 + 2, dimensions.width / 4 - 3, dimensions.height / 4 - 3);
      newCtx!.putImageData(imageData, 0, 0);
      let crop = newCanvas.toDataURL();
      setCroppedImage(crop);
    }
  }, [selectCanvas, showAllTags]);
  // input filed handleChange event of text-on-image tab canvas
  const textOnChangeHandlerCall = (textForm: TextFormProps) => {
    textOnChangeHandler({
      textForm,
      canvasRef,
      currentClicked,
      imgSrc,
      isEditing,
      setError,
      allTextTags,
      annotations,
      showAllTags,
      setShowAllTags,
      drawing,
      rotate,
      cropCanvas
    });
  };
  // handle crop rectangle
  const select = () => {
    setSelectCanvas(!selectCanvas);
  };
  // set range slider values in more filter tab canvas
  const handleEffectChange = (moreFilterEvent: React.ChangeEvent<HTMLInputElement>) => {
    moreFilterEvent.preventDefault();
    moreFilterEvent.target.id === "blur" && setBlur(Number(moreFilterEvent.target.value));
    moreFilterEvent.target.id === "zoom" && setZoom(Number(moreFilterEvent.target.value));
    moreFilterEvent.target.id === "rotate" && setRotate(Number(moreFilterEvent.target.value));
    moreFilterEvent.target.id === "brightness" && setBrightness(Number(moreFilterEvent.target.value));
  };
  // return range slider value in more filter tab canvas
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
  // clear all filters
  useEffect(() => {
    setAnnotations([]);
    setTempRedPrompt(false);
    setCurrentAnnotation({ currentAnnotationX: 0, currentAnnotationY: 0 });
    setTag("");
    setDeleteTag(false);
    setDeletePos({ deletePositionX: 0, deletePositionY: 0 });
    setCurrentCropped({ height: 0, startingX: 0, startingY: 0, width: 0 });
    setFormData({ text: "", size: 32, color: "#ffffff", id: "" });
    setAllTextTags([]);
    setIsEditing(false);
    setCroppedImage("");
    setSelectCanvas(false);
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
    setTempPrompt(false);
    setError("");
    setDeleteTextTag(false);
    setDrawingPen([]);
    setCropCanvas("");

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const { width, height } = dimensions;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = drawing !== "" ? drawing : cropCanvas !== "" ? cropCanvas : imgSrc;

    canvas!.width = width;
    canvas!.height = height;

    image.onload = () => {
      context!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    };
  }, [dimensions, imgSrc, clear]);

  return (
    <div className={"controls-out"}>
      {/* filter options */}
      {/*<div className={"options-div"}>*/}
      {/*  <div>*/}
      {/*    <h3> Tabs </h3>*/}
      {/*    <div style={{ marginTop: "1rem" }}>*/}
      {/*      {filterOptions.map((filterOptionsValue: FilterOptionsProps) => {*/}
      {/*        return (*/}
      {/*          <div className={"filter-options-div"} key={filterOptionsValue.id}>*/}
      {/*            <input*/}
      {/*              type={"checkbox"}*/}
      {/*              name={filterOptionsValue.name}*/}
      {/*              value={filterOptionsValue.name}*/}
      {/*              className={"checkbox"}*/}
      {/*              // onChange={() => filterOptionsValue.checked = !filterOptionsValue.checked}*/}
      {/*              // checked={filterOptionsValue.checked}*/}
      {/*            />*/}
      {/*            <label> {filterOptionsValue.name} </label>*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className={"controls-main"}>
        {/* tools */}
        <div className={"controls-2div"}>
          <div className={"tools-grid"}>
            {OptionsTools.map((options: ControlsType, index: number) => {
              const key = options.type;
              return (
                <div key={options.id} className={"tools-map-div"}>
                  <Button
                    className={"tools-button"}
                    isActive={index === activeIndex}
                    onClick={() => {
                      handleToolClick({
                        key,
                        index,
                        setActiveIndex,
                        setCurrentControl
                      });
                    }}
                  >
                    {options.icon}
                  </Button>
                  <span> {options.name} </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* controls */}
        <div className={"showControls-div"}>
          {currentControl === "tag-annotation" ? (
            <TagControls annotations={annotations} />
          ) : currentControl === "text-on-image" ? (
            <TextOnImageControl
              tempPrompt={tempPrompt}
              textOnChangeHandler={textOnChangeHandlerCall}
              onSubmit={(textOnImageSubmitEvent: React.FormEvent<HTMLFormElement>) => submitHandler({
                textOnImageSubmitEvent,
                setAllTextTags,
                currentClicked,
                setTempPrompt,
                setError
              })}
              formData={formData}
              setFormData={setFormData}
              error={error}
              canvasRef={canvasRef}
              imgSrc={imgSrc}
              annotations={annotations}
              allTextTags={allTextTags}
              handleCross={() => handleCross({
                setTempPrompt,
                setError,
                canvasRef,
                allTextTags,
                imgSrc,
                annotations,
                showAllTags,
                setShowAllTags,
                drawing,
                blur,
                rotate,
                brightness,
                cropCanvas
              })}
              drawing={drawing}
              cropCanvas={cropCanvas}
            />
          ) : currentControl === "crop" ? (
            <CropControl
              image={croppedImage}
              select={select}
              canvasRef={canvasRef}
              currentCropped={currentCropped}
              selectCanvas={selectCanvas}
              setCropCanvas={setCropCanvas}
              setSelectCanvas={setSelectCanvas}
              setCroppedImage={setCroppedImage}
              setCurrentCropped={setCurrentCropped}
              imgSrc={imgSrc}
            />
          ) : currentControl === "flip" ? (
            <FlipControl
              flipHorizontally={() => flipHorizontally({
                canvasRef,
                imgSrc,
                annotations,
                flipHorizontal,
                setFlipHorizontal,
                drawing,
                showAllTags,
                setShowAllTags,
                allTextTags,
                rotate,
                cropCanvas
              })}
              flipVertically={() => flipVertically({
                canvasRef,
                imgSrc,
                annotations,
                flipVertical,
                setFlipVertical,
                drawing,
                showAllTags,
                setShowAllTags,
                allTextTags,
                rotate,
                cropCanvas
              })}
            />
          ) : currentControl === "pen" ? (
            <PenControl
              saveDrawing={() => saveDrawing({canvasRef, setDrawing, imgSrc, drawingPen})}
              clearDrawing={() => clearDrawing({canvasRef, imgSrc, annotations, setDrawing, showAllTags, setShowAllTags, drawing, allTextTags, drawingPen, setDrawingPen, cropCanvas})}
            />
          ) : currentControl === "more" && (
            <div>
              <h3> More Controls </h3>
              <div className={"showControls-grid"}>
                {MoreFilterControls.map((more: ControlsType) => (
                  <div key={more.id} className={"controlsMap-div"}>
                    <div className={"controlsMap-icon"}> {more.icon} </div>
                    <div className={"brightness-slider"}>
                      <label className={"brightness-label"} htmlFor={"brightness"}>
                        {more.name} :
                      </label>
                      <input
                        type={"range"}
                        id={more.type}
                        name={more.type}
                        min={more.type === "zoom" ? 0.2 : more.type === "rotate" ? -180 : more.type === "brightness" ? 0.2 : 0}
                        max={more.type === "zoom" ? 1.5 : more.type === "rotate" ? 180 : more.type === "blur" ? 5 : 1}
                        step={more.type === "zoom" ? 0.1 : more.type === "rotate" ? 45 : more.type === "blur" ? 1 : 0.2}
                        value={inputValue(more.type)}
                        onChange={(moreFilterEvent: React.ChangeEvent<HTMLInputElement>) => handleEffectChange(moreFilterEvent)}
                        autoComplete={"off"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* canvases */}
      <div className={"canvas-div"}>
        {currentControl === "tag-annotation" ? (
          <TagCanvas
            canvasRef={canvasRef}
            handleTagClick={(tagCanvasClickEvent: React.MouseEvent<HTMLCanvasElement>) => handleCanvasClick({
              tagCanvasClickEvent,
              canvasRef,
              annotations,
              setTempRedPrompt,
              setDeleteTag,
              setShowH,
              setDeleteTagId,
              setCurrentAnnotation,
              setTag,
              setDeletePos
            })}
            handleTagMouseMove={(tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              tagHoverEvent,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH,
              flipHorizontal,
              flipVertical
            })}
          />
        ) : currentControl === "text-on-image" ? (
          <TextOnImageCanvas
            allTextTags={allTextTags}
            setAllTextTags={setAllTextTags}
            setTempPrompt={setTempPrompt}
            canvasRef={canvasRef}
            currentClicked={currentClicked}
            setCurrentClicked={setCurrentClicked}
            imgSrc={imgSrc}
            dimensions={dimensions}
            setIsEditing={setIsEditing}
            setFormData={setFormData}
            setDeleteTextTag={setDeleteTextTag}
            annotations={annotations}
            handleTagMouseMove={(tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              tagHoverEvent,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH,
              flipHorizontal,
              flipVertical
            })}
            showAllTags={showAllTags}
            setShowAllTags={setShowAllTags}
            drawing={drawing}
            blur={blur}
            zoom={zoom}
            rotate={rotate}
            brightness={brightness}
            cropCanvas={cropCanvas}
            currentCropped={currentCropped}
          />
        ) : currentControl === "crop" ? (
          <CropCanvas
            canvasRef={canvasRef}
            currentCropped={currentCropped}
            setCurrentCropped={setCurrentCropped}
            dimensions={dimensions}
            imgSrc={imgSrc}
            annotations={annotations}
            showAllTags={showAllTags}
            setShowAllTags={setShowAllTags}
            drawing={drawing}
            allTextTags={allTextTags}
            setHoverTag={setHoverTag}
            setHoverPos={setHoverPos}
            setShowH={setShowH}
            cropCanvas={cropCanvas}
          />
        ) : currentControl === "flip" ? (
          <FlipCanvas
            canvasRef={canvasRef}
            handleTagMouseMove={(tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              tagHoverEvent,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH,
              flipHorizontal,
              flipVertical
            })}
          />
        ) : currentControl === "pen" ? (
          <PenCanvas
            canvasRef={canvasRef}
            drawingPen={drawingPen}
            setDrawingPen={setDrawingPen}
            imgSrc={imgSrc}
            drawing={drawing}
            hoverPos={hoverPos}
            annotations={annotations}
            setHoverTag={setHoverTag}
            setHoverPos={setHoverPos}
            setShowH={setShowH}
            cropCanvas={cropCanvas}
          />
        ) : currentControl === "more" ? (
          <MoreFilterCanvas
            canvasRef={canvasRef}
            zoom={zoom}
            blur={blur}
            rotate={rotate}
            brightness={brightness}
            imgSrc={imgSrc}
            drawing={drawing}
            handleTagMouseMove={(tagHoverEvent: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              tagHoverEvent,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH,
              flipHorizontal,
              flipVertical
            })}
            cropCanvas={cropCanvas}
          />
        ) : (
          <RegularCanvas canvasRef={canvasRef} />
        )}

        {/* tag/annotation form */}
        {tempRedPrompt && (
          <>
            <TempRedTag position={currentAnnotation} />
            <TagAnnotationForm
              refer={ref}
              tags={tag}
              handleCloseInput={setTempRedPrompt}
              handleInputChange={(tagInputChangeEvent: React.ChangeEvent<HTMLInputElement>) => handleInputChange({tagInputChangeEvent, setTag})}
              onSubmit={(tagSubmitEvent: React.FormEvent<HTMLFormElement>) => handleSubmitTag({
                tagSubmitEvent,
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
                showAllTags,
                allTextTags,
                rotate,
                drawing,
                cropCanvas
              })}
              position={currentAnnotation}
            />
          </>
        )}

        {/* Delete tag form */}
        {deleteTag && (
          <DeleteTag
            position={deletePos}
            setPromptOff={() => setDeleteTag(false)}
            deleteTagSubmit={(clearSingleTagEvent: React.MouseEvent<HTMLButtonElement>) => handleClearSingleTag({
              clearSingleTagEvent,
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
              setShowAllTags,
              allTextTags,
              rotate,
              drawing,
              cropCanvas
            })}
          />
        )}

        {/* delete text form */}
        {deleteTextTag && (
          <DeleteText
            position={currentClicked}
            handleDelete={() => handleDelete({
              allTextTags,
              setAllTextTags,
              formData,
              setDeleteTextTag,
              setTempPrompt
            })}
            setDeleteTextTag={setDeleteTextTag}
          />
        )}

        {/* show tag/annotation value on hover of dot */}
        {showH && <ShowTagOnHover position={hoverPos} tag={hoverTag} />}

        {/* clear canvas, show-hide-tags, take screenshot */}
        <MainCanvasControls
          clearFunction={() => setClear(!clear)}
          showHideFunction={() => showAllTags
            ? hideTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags, rotate, cropCanvas})
            : showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags, cropCanvas})
          }
          screenShotFunction={() => handleScreenShot({canvasRef})}
          iconTag={showAllTags ? <HideTags /> : <ShowTags />}
        />
      </div>
    </div>
  );
};