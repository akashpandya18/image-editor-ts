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
import {
  flipHorizontally,
  flipVertically
} from "../flip";
import {
  RegularCanvas,
  PenCanvas,
  TagCanvas,
  MoreFilterCanvas,
  TextOnImageCanvas,
  CropCanvas,
  FlipCanvas
} from "../canvases";
import {
  saveDrawing,
  clearDrawing
} from "../draw";
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
  controls,
  filterOptions,
  handleToolClick,
  tools
} from "../../utils/data";
import {
  ControlsProps,
  AnnotationProps,
  Cropped,
  TextFormProps,
  TextTag,
  FilterOptionsProps,
  ControlsType
} from "../../types";
import {
  HideTags,
  ShowTags
} from "../../assets/icons";
import "./sliders/index.css";
import "./index.css";

export const Controls = ({
  imgSrc,
  setImgSrc
}: ControlsProps): JSX.Element => {
  // Canvas and selected/active tab
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentControl, setCurrentControl] = useState<string>("tag-annotation");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [clear, setClear] = useState<boolean>(false);
  // Tag/Annotation Canvas
  const [annotations, setAnnotations] = useState<AnnotationProps[]>([]);
  const [hoverTag, setHoverTag] = useState("");
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [showH, setShowH] = useState(false);
  const [tempRedPrompt, setTempRedPrompt] = useState(false);
  const [deleteTag, setDeleteTag] = useState(false);
  const [deleteTagId, setDeleteTagId] = useState("");
  const [deletePos, setDeletePos] = useState({ xN: 0, yN: 0 });
  const [showAllTags, setShowAllTags] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [tag, setTag] = useState("");
  // Text on Image Canvas
  const [allTextTags, setAllTextTags] = useState([]);
  const [tempPrompt, setTempPrompt] = useState(false);
  const [currentClicked, setCurrentClicked] = useState({
    x: 0,
    y: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ text: "", size: 32, color: "#ffffff", id: "" });
  const [error, setError] = useState("");
  const [deleteTextTag, setDeleteTextTag] = useState(false);
  // Crop Canvas
  const [currentCropped, setCurrentCropped] = useState<Cropped>({
    startingX: 0,
    startingY: 0,
    height: 0,
    width: 0
  });
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [selectCanvas, setSelectCanvas] = useState(false);
  // Flip Canvas
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);
  // Pen Canvas
  const [drawing, setDrawing] = useState("");
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
    image.src = imgSrc;
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
    canvas!.width = width;
    canvas!.height = height;

    const image = new Image();
    if (drawing !== "") {
      image.src = drawing;
    } else {
      image.src = imgSrc;
    }

    image.width = canvas!.width;
    image.height = canvas!.height;

    image.onload = () => {
      // setting tag/annotation on canvas
      setTimeout(() => {
        annotations.forEach((annotationData: AnnotationProps) => {
          const { x, y } = annotationData;
          context!.beginPath();
          context!.fillStyle = "yellow";
          context!.arc(x, y, 10, 0, 2 * Math.PI);
          context!.fill();
        });
        allTextTags.forEach((texts: TextTag) => {
          context!.textBaseline = "alphabetic";
          context!.font = `${texts.size || 22}px monospace`;
          context!.fillStyle = texts.color;
          context!.fillText(texts.text, texts.x + 10, texts.y);
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
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        context!.translate(centerX, centerY);
        context!.scale(zoom, zoom);
        context!.translate(-centerX, -centerY);
        context!.clearRect(0, 0, width, height);
      }

      // if show all tag is true
      if (showAllTags) {
        showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags});
      }

      setTag("");
      setCurrentAnnotation({ x: 0, y: 0 });
      setTempRedPrompt(false);
    };
  }, [currentControl, blur, zoom, brightness, allTextTags]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;

    const image = new Image();
    if (drawing !== "") {
      image.src = drawing;
    } else {
      image.src = imgSrc;
    }

    image.width = canvas!.width;
    image.height = canvas!.height;

    const deg = Math.PI / 180;
    const degToRad = (rotate: number) => rotate * deg;

    setTimeout(() => {
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.save();
      context!.translate(canvas!.width / 2, canvas!.height / 2);
      context!.rotate(degToRad(rotate++ % 360));
      context!.drawImage(
        image,
        image.width / -2,
        image.height / -2,
        image.width,
        image.height
      );
      context!.restore();
    },10);
  },[currentControl, blur, zoom, rotate, brightness]);

  // setting crop rectangle in crop tab canvas
  useEffect(() => {
    if (currentCropped.startingX < 0) {
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingX: 0
      }));
    }
    if (currentCropped.startingY < 0) {
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingY: 0
      }));
    }
    if (currentCropped.startingX - 1 > Math.floor(dimensions.width) - currentCropped.width) {
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingX: dimensions.width - currentCropped.width
      }));
    }
    if (currentCropped.startingY - 1 >= dimensions.height - currentCropped.height) {
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingY: dimensions.height - currentCropped.height
      }));
    }
    if (currentCropped.width < 0) {
      setCurrentCropped((precState) => ({
        ...precState,
        startingX: precState.startingX - Math.abs(precState.width),
        width: Math.abs(precState.width)
      }));
    }
    if (currentCropped.height < 0) {
      setCurrentCropped((precState) => ({
        ...precState,
        startingY: precState.startingY - Math.abs(precState.height),
        height: Math.abs(precState.height)
      }));
    }

    if (currentCropped.startingX === 0 && currentCropped.startingY === 0 && currentCropped.height === 0 && currentCropped.width === 0) {
      setSelectCanvas(false);
    } else {
      setSelectCanvas(true);
    }

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

      context!.strokeStyle = "black";
      context!.setLineDash([5, 5]);
      const imageX = Math.floor(dimensions.width / 4);
      const imageY = Math.floor(dimensions.height / 4);
      context!.lineWidth = 2;
      context!.strokeRect(imageX, imageY, imageX, imageY);

      setCurrentCropped({
        startingX: imageX,
        startingY: imageY,
        width: imageX,
        height: imageY
      });

      context!.setLineDash([5, 5]);
      context!.beginPath();
      context!.lineWidth = 3;
      context!.lineJoin = "round";
      context!.strokeRect((dimensions.width / 4) - 5, (dimensions.height / 4) - 5, 10, 0);
      context!.strokeRect((dimensions.width / 4) - 5, (dimensions.height / 4) - 5, 0, 10);
      context!.fillStyle = "white";
      context!.fill();
      context!.stroke();

      context!.beginPath();
      context!.lineWidth = 3;
      context!.lineJoin = "round";
      context!.strokeRect((dimensions.width / 4) + (dimensions.width / 4) + 5, (dimensions.height / 4) - 5, -10, 0);
      context!.strokeRect((dimensions.width / 4) + (dimensions.width / 4) + 5, (dimensions.height / 4) - 5, 0, 10);
      context!.fillStyle = "white";
      context!.fill();
      context!.stroke();

      context!.beginPath();
      context!.lineWidth = 3;
      context!.lineJoin = "round";
      context!.strokeRect((dimensions.width / 4) - 5, (dimensions.height / 4) + (dimensions.height / 4) + 5, 10, 0);
      context!.strokeRect((dimensions.width / 4) - 5, (dimensions.height / 4) + (dimensions.height / 4) + 5, 0, -10);
      context!.fillStyle = "white";
      context!.fill();
      context!.stroke();

      context!.beginPath();
      context!.lineWidth = 3;
      context!.lineJoin = "round";
      context!.strokeRect((dimensions.width / 4) - 5 + (dimensions.width / 4), (dimensions.height / 4) + (dimensions.height / 4) + 5, 10, 0);
      context!.strokeRect((dimensions.width / 4) + 5 + (dimensions.width / 4), (dimensions.height / 4) + (dimensions.height / 4) + 5, 0, -10);
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
  }, [selectCanvas]);

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
      drawing
    });
  };

  // handle crop rectangle
  const select = () => {
    setSelectCanvas(!selectCanvas);
  };

  // set range slider values in more filter tab canvas
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
    setCurrentAnnotation({ x: 0, y: 0 });
    setTag("");
    setDeleteTag(false);
    setDeletePos({ xN: 0, yN: 0 });
    setCurrentCropped({
      height: 0,
      startingX: 0,
      startingY: 0,
      width: 0
    });
    setFormData({
      text: "",
      size: 32,
      color: "#ffffff",
      id: ""
    });
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

  return (
    <div className={"controls-out"}>
      {/* filter options */}
      <div className={"options-div"}>
        <div>
          <h3> Tabs </h3>
          <div style={{ marginTop: "1rem" }}>
            {filterOptions.map((filterOptionsValue: FilterOptionsProps) => {
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
      </div>

      <div className={"controls-main"}>
        {/* tools */}
        <div className={"controls-2div"}>
          <div className={"tools-grid"}>
            {tools.map((x: ControlsType, index: number) => {
              const key = x.type;
              return (
                <div key={x.id} className={"tools-map-div"}>
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
            <TextOnImageControl
              tempPrompt={tempPrompt}
              textOnChangeHandler={textOnChangeHandlerCall}
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => submitHandler({
                event,
                setAllTextTags,
                currentClicked,
                setTempPrompt,
                setError,
                canvasRef,
                imgSrc
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
                drawing
              })}
            />
          ) : currentControl === "crop" ? (
            <CropControl
              image={croppedImage}
              select={select}
              setImgSrc={setImgSrc}
              canvasRef={canvasRef}
              currentCropped={currentCropped}
              selectCanvas={selectCanvas}
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
                allTextTags
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
                allTextTags
              })}
            />
          ) : currentControl === "pen" ? (
            <PenControl
              saveDrawing={() => saveDrawing({ canvasRef, setDrawing })}
              clearDrawing={() => clearDrawing({ canvasRef, imgSrc, annotations, setDrawing, showAllTags, setShowAllTags, drawing, allTextTags })}
            />
          ) : currentControl === "more" && (
            <div>
              <h3> More Controls </h3>
              <div className={"showControls-grid"}>
                {controls.map((x: ControlsType) => {
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEffectChange(e)}
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

      {/* canvases */}
      <div className={"canvas-div"}>
        {currentControl === "tag-annotation" ? (
          <TagCanvas
            canvasRef={canvasRef}
            handleTagClick={(event: React.MouseEvent<HTMLCanvasElement>) => handleCanvasClick({
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
            })}
            handleTagMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              event,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH
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
            handleTagMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              event,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH
            })}
            showAllTags={showAllTags}
            setShowAllTags={setShowAllTags}
            drawing={drawing}
          />
        ) : currentControl === "crop" ? (
          <CropCanvas
            canvasRef={canvasRef}
            currentCropped={currentCropped}
            setCurrentCropped={setCurrentCropped}
            dimensions={dimensions}
            imgSrc={imgSrc}
            handleTagMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              event,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH
            })}
          />
        ) : currentControl === "flip" ? (
          <FlipCanvas
            canvasRef={canvasRef}
            handleTagMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              event,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH
            })}
          />
        ) : currentControl === "pen" ? (
          <PenCanvas
            canvasRef={canvasRef}
            handleTagMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              event,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH
            })}
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
            handleTagMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => handleCanvasMouseMove({
              event,
              canvasRef,
              annotations,
              setHoverTag,
              setHoverPos,
              setShowH
            })}
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
              handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange({event, setTag})}
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmitTag({
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
                })
              }
              position={currentAnnotation}
            />
          </>
        )}

        {/* Delete tag form */}
        {deleteTag && (
          <DeleteTag
            position={deletePos}
            setPromptOff={() => setDeleteTag(false)}
            deleteTagSubmit={(e: React.MouseEvent<HTMLButtonElement>) => handleClearSingleTag({
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
          showHideFunction={() =>
            showAllTags
              ? hideTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags})
              : showTags({setShowAllTags, imgSrc, canvasRef, annotations, drawing, allTextTags})
          }
          screenShotFunction={() => handleScreenShot({canvasRef})}
          iconTag={showAllTags ? <HideTags /> : <ShowTags />}
        />
      </div>
    </div>
  );
};