import React, { useEffect, useRef, useState } from "react";
import TagAnnotationForm from "../forms/TagAnnotForm";
import TempRedTag from "../prompts/ConfirmSubmitTag";
import { HideTags, ShowTags } from "../../assets/icons";
import { customAlphabet } from "nanoid";
import { DeleteTag } from "../prompts/deleteTag";
import ShowTagOnHover from "../prompts/showTagOnHover";
import MainCanvasControls from "../controls/mainCanvasControls";
import Draw from "../draw";

interface props {
  imageSrcMain: any;
  blur: number;
  setBlur: Function;
  brightness: number;
  setBrightness: Function;
  rotate: number;
  setRotate: Function;
}

interface annotation {
  id: string;
  x: number;
  y: number;
  tag: string;
}

function ImageAnnot({
  imageSrcMain,
  blur,
  setBlur,
  brightness,
  setBrightness,
  rotate,
  setRotate,
}: props) {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [tag, setTag] = useState("");
  const [annotations, setAnnotations] = useState<annotation[]>([]);
  const [tempRedPrompt, setTempRedPrompt] = useState(false);
  const [deleteTag, setDeleteTag] = useState(false);
  const [deletePos, setDeletePos] = useState({ xN: 0, yN: 0 });
  const [deleteTagId, setDeleteTagId] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showH, setShowH] = useState(false);
  const [hoverTag, setHoverTag] = useState("");
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [draw,
    // setDraw
  ] = useState(false);

  const nanoid = customAlphabet("1234567890abcdef", 10);
  const id = nanoid(5);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setTempRedPrompt(true);
    setDeleteTag(false);
    setDeleteTagId("");

    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const rect = canvas!.getBoundingClientRect();
    const x = event.clientX - rect!.left;
    const y = event.clientY - rect!.top;
    const annotation = { x, y };
    setCurrentAnnotation(annotation);
    setTag("");
    const xFind = event.nativeEvent.offsetX;
    const yFind = event.nativeEvent.offsetY;

    // Check if the mouse click is on any of the tags
    const clickedDot = annotations.find((annotation) => {
      ctx?.beginPath();
      ctx?.arc(annotation.x, annotation.y, 10, 0, 2 * Math.PI);
      return ctx?.isPointInPath(xFind, yFind);
    });

    // Check if the click was within the bounds of the tags
    if (clickedDot) {
      setTempRedPrompt(false);
      setDeleteTag(true);
      setShowH(false);
      setDeleteTagId(clickedDot.id);
      const xN = clickedDot.x;
      const yN = clickedDot.y;
      const annotationN = { xN, yN };
      setDeletePos(annotationN);
    }
  };

  const handleInputChange = (event: any) => {
    setTag(event.target.value);
  };

  const handleSubmitTag = (e: any) => {
    e.preventDefault();
    const x = currentAnnotation.x;
    const y = currentAnnotation.y;
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const image = new Image();
    image.src = imageSrcMain;
    image.width = canvas!.width;
    image.height = canvas!.height;

    if (tag !== "") {
      //dot
      ctx!.beginPath();
      ctx!.fillStyle = "yellow";
      ctx!.arc(x, y, 10, 0, 2 * Math.PI);
      ctx!.fill();
      const tempAnnot = [...annotations, { id, x, y, tag }];
      setAnnotations([...annotations, { id, x, y, tag }]);
      setTag("");
      setCurrentAnnotation({ x: 0, y: 0 });
      setTempRedPrompt(false);

      if (showAllTags) {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        setTimeout(() => {
          ctx!.drawImage(image, 0, 0, image.width, image.height);
          tempAnnot.forEach((annot: any) => {
            const { x, y, tag } = annot;
            //tag
            ctx!.font = "24px Arial";
            // Draw the background color rectangle
            let textWidth = ctx!.measureText(tag).width;

            //tags
            ctx!.beginPath();
            ctx!.fillStyle = "yellow";
            ctx!.arc(x, y, 10, 0, 2 * Math.PI);
            ctx!.fill();

            if (x - image.width > -200 && y - image.height < -100) {
              ctx!.fillStyle = "#2A2A2A";
              ctx!.fillRect(x - textWidth - 20, y, textWidth + 20, 40);
              ctx!.fillStyle = "#fff";
              ctx!.fillText(tag, x - textWidth - 10, y + 25);
            } else if (x - image.width < -200 && y - image.height > -100) {
              ctx!.fillStyle = "#2A2A2A";
              ctx!.fillRect(x, y - 40, textWidth + 20, 40);
              ctx!.fillStyle = "#fff";
              ctx!.fillText(tag, x + 10, y - 15);
            } else if (x - image.width > -200 && y - image.height > -100) {
              ctx!.fillStyle = "#2A2A2A";
              ctx!.fillRect(x - textWidth - 20, y - 40, textWidth + 20, 40);
              ctx!.fillStyle = "#fff";
              ctx!.fillText(tag, x - textWidth - 10, y - 15);
            } else {
              ctx!.fillStyle = "#2A2A2A";
              ctx!.fillRect(x, y, textWidth + 20, 40);
              ctx!.fillStyle = "#fff";
              ctx!.fillText(tag, x + 10, y + 25);
            }
          });
        }, 10);
      }
    }

    setTag("");
    setCurrentAnnotation({ x: 0, y: 0 });
    setTempRedPrompt(false);
  };

  const handleClearAllTags = (e: any) => {
    e.preventDefault();

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
    setRotate(0);
    setBrightness(1);

    const image = new Image();
    image.src = imageSrcMain;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    image.width = canvas!.width;
    image.height = canvas!.height;
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    setTimeout(() => {
      context!.drawImage(image, 0, 0, image.width, image.height);
    }, 100);
  };

  const handleClearSingleTag = (e: any) => {
    e.preventDefault();
    setShowAllTags(false);

    const filteredArray = annotations.filter(
      (item: any) => item.id !== deleteTagId
    );

    const image = new Image();
    image.src = imageSrcMain;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    image.width = canvas!.width;
    image.height = canvas!.height;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);

    setTimeout(() => {
      context!.drawImage(image, 0, 0, image.width, image.height);
      if (deleteTagId !== "") {
        // populate dots again
        filteredArray.forEach((annot) => {
          context!.beginPath();
          context!.fillStyle = "yellow";
          context!.arc(annot.x, annot.y, 10, 0, 2 * Math.PI);
          context!.fill();
        });
        setAnnotations(filteredArray);
        setDeleteTag(false);
        setDeleteTagId("");
        setTag("");
        setCurrentAnnotation({ x: 0, y: 0 });
        setTempRedPrompt(false);
      }
    }, 10);
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    // Check if the mouse is hovering over the white dot
    const hoveredDot = annotations.find((annotation) => {
      ctx?.beginPath();
      ctx?.arc(annotation.x, annotation.y, 10, 0, 2 * Math.PI);
      return ctx?.isPointInPath(x, y);
    });

    if (hoveredDot) {
      canvas!.style.cursor = "pointer";
      let x = hoveredDot.x;
      let y = hoveredDot.y;
      let pos = { x, y };
      setHoverTag(hoveredDot.tag);
      setHoverPos(pos);
      setShowH(true);
    } else {
      canvas!.style.cursor = "default";
      setHoverTag("");
      setShowH(false);
    }
  };

  const showTags = () => {
    setShowAllTags(true);
    const image = new Image();
    image.src = imageSrcMain;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    image.width = canvas!.width;
    image.height = canvas!.height;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    setTimeout(() => {
      context!.drawImage(image, 0, 0, image.width, image.height);
      annotations.forEach((annot: any) => {
        const { x, y, tag } = annot;
        //tag
        context!.font = "24px Arial";
        // Draw the background color rectangle
        let textWidth = context!.measureText(tag).width;

        //tags
        context!.beginPath();
        context!.fillStyle = "yellow";
        context!.arc(x, y, 10, 0, 2 * Math.PI);
        context!.fill();

        if (x - image.width > -200 && y - image.height < -100) {
          context!.fillStyle = "#2A2A2A";
          context!.fillRect(x - textWidth - 20, y, textWidth + 20, 40);
          context!.fillStyle = "#fff";
          context!.fillText(tag, x - textWidth - 10, y + 25);
        } else if (x - image.width < -200 && y - image.height > -100) {
          context!.fillStyle = "#2A2A2A";
          context!.fillRect(x, y - 40, textWidth + 20, 40);
          context!.fillStyle = "#fff";
          context!.fillText(tag, x + 10, y - 15);
        } else if (x - image.width > -200 && y - image.height > -100) {
          context!.fillStyle = "#2A2A2A";
          context!.fillRect(x - textWidth - 20, y - 40, textWidth + 20, 40);
          context!.fillStyle = "#fff";
          context!.fillText(tag, x - textWidth - 10, y - 15);
        } else {
          context!.fillStyle = "#2A2A2A";
          context!.fillRect(x, y, textWidth + 20, 40);
          context!.fillStyle = "#fff";
          context!.fillText(tag, x + 10, y + 25);
        }
      });
    }, 10);
  };

  const hideTags = () => {
    setShowAllTags(false);
    const image = new Image();
    image.src = imageSrcMain;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    image.width = canvas!.width;
    image.height = canvas!.height;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    setTimeout(() => {
      context!.drawImage(image, 0, 0, image.width, image.height);
      annotations.forEach((annot: any) => {
        context!.beginPath();
        context!.fillStyle = "yellow";
        context!.arc(annot.x, annot.y, 10, 0, 2 * Math.PI);
        context!.fill();
      });
    }, 10);
  };

  const handleScreenShot = () => {
    const canvas = canvasRef.current;
    const image = canvas!.toDataURL("image/png");

    // To download the image, you can create a link element and simulate a click
    const link = document.createElement("a");
    link.download = "canvas-screenshot.png";
    link.href = image;
    link.click();
  };
  // for initial image load
  useEffect(() => {
    const img = new Image();
    img.src = imageSrcMain;

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
  }, [imageSrcMain]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;
    const ctx = canvas!.getContext("2d");
    const image = new Image();
    image.src = imageSrcMain;
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    };
  }, [dimensions, imageSrcMain]);

  useEffect(() => {
    console.log({imageSrcMain, blur, brightness})
    let blurVal = `${blur * 10}px`;
    const image = new Image();
    image.src = imageSrcMain;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    const cx = canvas!.width/2;
    const cy = canvas!.height/2;
    // let x = 0;
    // let y = 0;
    // let w = canvas!.width;
    // let h = canvas!.height;
    let deg = rotate;

    image.width = canvas!.width;
    image.height = canvas!.height;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);

    function clear() {
      context!.save();
      context!.setTransform(1, 0, 0, 1, 0, 0);
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
      context!.restore();
    }

    function renderSquare() {
      context!.save();
      context!.translate(cx, cy); // pivot point
      context!.rotate(deg); // rotate square in radians
      context!.strokeRect(0, 0, canvas!.width, canvas!.height);
      context!.restore();
    }

    setTimeout(() => {
      context!.drawImage(image, 0, 0, image.width, image.height);
      context!.filter = `blur(${blurVal}) brightness(${brightness})`;
      clear();
      renderSquare();
      console.log("context", context);
    }, 10);
  }, [imageSrcMain, blur, brightness, rotate]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={(e) => handleCanvasClick(e)}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
        }}
        onMouseMove={handleCanvasMouseMove}
      />

      {tempRedPrompt && (
        <>
          <TempRedTag position={currentAnnotation} />
          <TagAnnotationForm
            refer={ref}
            tags={tag}
            handleCloseInput={setTempRedPrompt}
            handleInputChange={handleInputChange}
            onSubmit={handleSubmitTag}
            position={currentAnnotation}
          />
        </>
      )}

      {deleteTag && (
        <DeleteTag
          position={deletePos}
          setPromptOff={() => setDeleteTag(false)}
          deleteTagSubmit={handleClearSingleTag}
        />
      )}

      {showH && <ShowTagOnHover position={hoverPos} tag={hoverTag} />}

      {draw && <Draw width={dimensions.width} height={dimensions.height} />}

      <MainCanvasControls
        clearFunction={handleClearAllTags}
        showHideFunction={() => (showAllTags ? hideTags() : showTags())}
        screenShotFunction={handleScreenShot}
        iconTag={showAllTags ? <HideTags /> : <ShowTags />}
      />
    </div>
  );
}

export default ImageAnnot;