import { useState, useEffect, useRef } from "react";
import TagAnnotationForm from "../forms/TagAnnotForm";
import TempRedTag from "../prompts/ConfirmSubmitTag";
import { Tornado } from "../../assets/icons";
import { customAlphabet } from "nanoid";
import { DeleteTag } from "../prompts/deleteTag";

interface props {
  imageSrc: any;
}
interface annotation {
  id: any;
  x: number;
  y: number;
  tag: string;
}

function ImageAnnot({ imageSrc }: props) {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [tag, setTag] = useState("");
  const [annotations, setAnnotations] = useState<annotation[]>([]);
  const [tempRedPrompt, setTempRedPrompt] = useState(false);
  const [deleteTag, setDeleteTag] = useState(false);
  const [deletePos, setDeletePos] = useState({ xN: 0, yN: 0 });

  const nanoid = customAlphabet("1234567890abcdef", 10);
  const id = nanoid(5);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setTempRedPrompt(true);
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
      const xN = clickedDot.x;
      const yN = clickedDot.y;
      const annotationN = { xN, yN };
      setDeletePos(annotationN);
      console.log(
        "You clicked on a tag at",
        clickedDot.x,
        clickedDot.y,
        "with id",
        clickedDot.id
      );
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
    //tag
    ctx!.font = "24px Arial";
    ctx!.fillStyle = "#2A2A2A";
    // Draw the background color rectangle
    let textWidth = ctx!.measureText(tag).width;
    ctx!.fillRect(x, y, textWidth + 20, 40);
    // Draw the text
    ctx!.fillStyle = "#fff";
    ctx!.fillText(tag, x + 10, y + 25);
    //dot
    ctx!.beginPath();
    ctx!.fillStyle = "white";
    ctx!.arc(x, y, 10, 0, 2 * Math.PI);
    ctx!.fill();

    setAnnotations([...annotations, { id, x, y, tag }]);
    setTag("");
    setCurrentAnnotation({ x: 0, y: 0 });
    setTempRedPrompt(false);
  };

  const handleClearAllTags = (e: any) => {
    e.preventDefault();
    setAnnotations([]);
    const image = new Image();
    image.src = imageSrc;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    image.width = canvas!.width;
    image.height = canvas!.height;
    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    setTimeout(() => {
      context!.drawImage(image, 0, 0, image.width, image.height);
    }, 100);
  };

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    // Check if the mouse is hovering over the red dot
    const hoveredDot = annotations.find((annotation) => {
      ctx?.beginPath();
      ctx?.arc(annotation.x, annotation.y, 10, 0, 2 * Math.PI);
      return ctx?.isPointInPath(x, y);
    });
    if (hoveredDot) {
      canvas!.style.cursor = "pointer";
    } else {
      canvas!.style.cursor = "default";
    }
  };

  //for initial image load
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      image.width = canvas!.width;
      image.height = canvas!.height;
      ctx!.drawImage(image, 0, 0, image.width, image.height);
    };
  }, [imageSrc]);

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
        />
      )}

      <button
        onClick={handleClearAllTags}
        style={{
          marginTop: "10px",
          border: "none",
          borderRadius: "7px",
          padding: "10px",
          color: "#fff",
          backgroundColor: "#2a2a2a",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Tornado />
      </button>
    </div>
  );
}

export default ImageAnnot;
