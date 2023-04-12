import { useState, useEffect, useRef } from "react";
import TagAnnotationForm from "../forms/TagAnnotForm";
import TempRedTag from "../prompts/ConfirmSubmitTag";
import { HideTags, ScreenShot, ShowTags, Tornado } from "../../assets/icons";
import { customAlphabet } from "nanoid";
import { DeleteTag } from "../prompts/deleteTag";
import ShowTagOnHover from "../prompts/showTagOnHover";
import ShowAllTags from "../prompts/showAllTags";

interface props {
  imageSrcMain: any;
}
interface annotation {
  id: string;
  x: number;
  y: number;
  tag: string;
}

function  ImageAnnot({ imageSrcMain }: props) {
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

  const [showH, setShowH] = useState(false);
  const [hoverTag, setHoverTag] = useState("");
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

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
      const inPath = ctx?.isPointInPath(xFind, yFind);
      return inPath;
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

    if (tag !== "") {
      //dot
      ctx!.beginPath();
      ctx!.fillStyle = "white";
      ctx!.arc(x, y, 10, 0, 2 * Math.PI);
      ctx!.fill();
      setAnnotations([...annotations, { id, x, y, tag }]);
      setTag("");
      setCurrentAnnotation({ x: 0, y: 0 });
      setTempRedPrompt(false);
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
          context!.fillStyle = "white";
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

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
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
        //tag
        context!.font = "24px Arial";
        context!.fillStyle = "#2A2A2A";
        // Draw the background color rectangle
        let textWidth = context!.measureText(annot.tag).width;
        context!.fillRect(annot.x, annot.y, textWidth + 20, 40);
        // Draw the text
        context!.fillStyle = "#fff";
        context!.fillText(annot.tag, annot.x + 10, annot.y + 25);
        //tags
        context!.beginPath();
        context!.fillStyle = "white";
        context!.arc(annot.x, annot.y, 10, 0, 2 * Math.PI);
        context!.fill();
      });
    }, 100);
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
        context!.fillStyle = "white";
        context!.arc(annot.x, annot.y, 10, 0, 2 * Math.PI);
        context!.fill();
      });
    }, 100);
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

  //for initial image load
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const image = new Image();
    image.src = imageSrcMain;
    image.onload = () => {
      image.width = canvas!.width;
      image.height = canvas!.height;
      ctx!.drawImage(image, 0, 0, image.width, image.height);
    };
  }, [imageSrcMain]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={(e) => handleCanvasClick(e)}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
        width={1000}
        height={562}
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

      {/* {showAllTags && annotations.length > 0 && (
        <ShowAllTags data={annotations} />
      )} */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "15%",
        }}
      >
        <button
          onClick={handleClearAllTags}
          style={{
            marginTop: "10px",
            border: "none",
            borderRadius: "7px",
            padding: "10px",
            color: "#fff",
            cursor: "pointer",
            backgroundColor: "#2a2a2a",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Tornado />
        </button>
        <button
          onClick={() => {
            showAllTags ? hideTags() : showTags();
          }}
          style={{
            marginTop: "10px",
            border: "none",
            borderRadius: "7px",
            padding: "10px",
            color: "#fff",
            cursor: "pointer",
            backgroundColor: "#2a2a2a",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
          }}
        >
          {showAllTags ? <HideTags /> : <ShowTags />}
        </button>
        <button
          onClick={handleScreenShot}
          style={{
            marginTop: "10px",
            border: "none",
            borderRadius: "7px",
            padding: "10px",
            color: "#fff",
            cursor: "pointer",
            backgroundColor: "#2a2a2a",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
          }}
        >
          <ScreenShot />
        </button>
      </div>
    </div>
  );
}

export default ImageAnnot;
