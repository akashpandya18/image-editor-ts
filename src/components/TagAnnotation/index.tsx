import { useState, useEffect, useRef } from "react";
import TagAnnotationForm from "../forms/TagAnnotForm";
import { useOnClickOutside } from "usehooks-ts";
import ConfirmSubmitTag from "../prompts/ConfirmSubmitTag";

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

  const [finalSet, setFinalSet] = useState([{ annotations, tags }]);

  const [showInput, setShowInput] = useState(false);
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);

  const handleClickOutside = () => {
    // Your custom logic here
    const x = currentAnnotation.x;
    const y = currentAnnotation.y;
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    const image = new Image();
    image.src = imageSrc;
    // context!.drawImage(image, 0, 0);
    // context!.clearRect(x, y, 20, 20);
    console.log("clicked outside");
  };

  const handleClickInside = () => {
    // Your custom logic here
    console.log("clicked inside");
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleCanvasClick = (event: any) => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    // const image = new Image();
    // image.src = imageSrc;
    // context!.drawImage(image, 0, 0);

    const rect = canvas!.getBoundingClientRect();
    const x = event.clientX - rect!.left;
    const y = event.clientY - rect!.top;
    const annotation = { x, y };
    setCurrentAnnotation(annotation);
    setShowInput(true);
    context!.beginPath();
    context!.fillStyle = "red";
    context!.arc(x, y, 5, 0, 2 * Math.PI);
    context!.fill();
  };

  const handleInputChange = (event: any) => {
    // handleClickInside();
    setTag(event.target.value);
  };

  const handleSubmitTag = (e: any) => {
    e.preventDefault();
    const x = currentAnnotation.x;
    const y = currentAnnotation.y;
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    ctx!.font = "24px Arial";
    ctx!.fillStyle = "white";
    ctx!.fillText(tag, x, y);
    setAnnotations([...annotations, { x, y }]);
    setTags([...tags, tag]);
    setShowConfirmPrompt(true);
    // setFinalSet([...finalSet, { annotations, tags }]);
    setTag("");
    setShowInput(false);
    setCurrentAnnotation({ x: 0, y: 0 });
  };

  const handleClearAllTags = () => {
    console.log(finalSet);
  };

  //for initial image load
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas!.width = image.width;
      canvas!.height = image.height;
      ctx!.drawImage(image, 0, 0, image.width, image.height);
    };
  }, [imageSrc]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <canvas ref={canvasRef} onClick={(e) => handleCanvasClick(e)} />
      {showInput && (
        <TagAnnotationForm
          refer={ref}
          tags={tag}
          handleInputChange={handleInputChange}
          onSubmit={handleSubmitTag}
          position={currentAnnotation}
        />
      )}
      {/* {showConfirmPrompt && (
        <ConfirmSubmitTag enteredTag={tag} position={currentAnnotation} />
      )} */}
      <button
        onClick={handleClearAllTags}
        style={{ marginTop: "10px", width: "200px" }}
      >
        Clear
      </button>
    </div>
  );
}

export default ImageAnnot;
