import "./App.css";
import ImageAnnot from "./components/TagAnnotation";
import {useEffect, useState} from "react";
import FileUpload from "./utils/FileUpload";
import Controls from "./components/controls";
import {Blur, BrightnessUp, RotateRight, Zoom} from "./assets/icons";

const controls = [
  { id: 1, name: "Blur", type: "blur", icon: <Blur /> },
  { id: 2, name: "Zoom", type: "zoom", icon: <Zoom /> },
  { id: 3, name: "Rotate", type: "rotate", icon: <RotateRight /> },
  { id: 4, name: "Brightness", type: "brightness", icon: <BrightnessUp /> },
];

function App() {
  const [imgSrc, setImgSrc] = useState("");
  const [blur, setBlur] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(1);
  let value: string;

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const imageFilter = () => {
    controls.map((x) => {
      if (x.type === "blur") {
        let blurVal = `${blur*10}px`;
        value = `blur(${blurVal})`;
      }
      else if (x.type === "brightness") {
        value = `brightness(${brightness})`;
      }
    });
    return value;
  };

  useEffect(()=> {
    imageFilter()
  }, [blur, brightness])

  return (
    <div className='App'>
      {imgSrc ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "left",
            width: "90%",
            gap: "10px",
          }}
        >
          <Controls controls={controls} blur={blur} setBlur={setBlur} brightness={brightness} setBrightness={setBrightness} />
          <div
            style={{
              maxWidth: "1080px",
              maxHeight: "700px",
              borderRadius: "7px",
              padding: "1rem",
              // boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ImageAnnot imageSrcMain={imgSrc} imageFilter={imageFilter()} />
          </div>
        </div>
      ) : (
        <FileUpload onSelectFile={onSelectFile} />
      )}
    </div>
  );
}

export default App;
