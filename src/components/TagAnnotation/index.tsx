import { useState, useEffect, useRef } from "react";
import TagAnnotationForm from "../forms/TagAnnotForm";
import TempRedTag from "../prompts/ConfirmSubmitTag";
import { Tornado } from "../../assets/icons";

interface props {
  imageSrc: any;
}
interface annotation {
  x: number;
  y: number;
}

function ImageAnnot({ imageSrc }: props) {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [tag, setTag] = useState("");
  const [annotations, setAnnotations] = useState<annotation[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tempRedPrompt, setTempRedPrompt] = useState(false);

  const handleCanvasClick = (event: any) => {
    setTempRedPrompt(true);
    const canvas = canvasRef.current;
    const rect = canvas!.getBoundingClientRect();
    const x = event.clientX - rect!.left;
    const y = event.clientY - rect!.top;
    const annotation = { x, y };
    setCurrentAnnotation(annotation);
    setTag("");
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

    setAnnotations([...annotations, { x, y }]);
    setTags([...tags, tag]);
    setTag("");
    setCurrentAnnotation({ x: 0, y: 0 });
    setTempRedPrompt(false);
  };

  const handleClearAllTags = (e: any) => {
    e.preventDefault();
    setAnnotations([]);
    setTags([]);
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
        paddingBottom: "0.5rem",
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={(e) => handleCanvasClick(e)}
        style={{
          borderRadius: "7px",
        }}
        width='1000'
        height='562'
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

      <button
        onClick={handleClearAllTags}
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          border: "none",
          borderRadius: "7px",
          padding: "10px",
          color: "#fff",
          backgroundColor: "#2a2a2a",
          boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Tornado />
      </button>
    </div>
  );
}

export default ImageAnnot;
