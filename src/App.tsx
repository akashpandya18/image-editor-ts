import "./App.css";
import ImageAnnot from "./components/TagAnnotation";
import { useState } from "react";
import FileUpload from "./utils/FileUpload";
import Controls from "./components/controls";
import { Blur, BrightnessUp, RotateRight, Zoom } from "./assets/icons";

const controls = [
  { id: 1, name: "Blur", type: "blur", icon: <Blur /> },
  { id: 2, name: "Zoom", type: "zoom", icon: <Zoom /> },
  { id: 3, name: "Rotate", type: "rotate", icon: <RotateRight /> },
  { id: 4, name: "Brightness", type: "brightness", icon: <BrightnessUp /> },
];

function App() {
  const [imgSrc, setImgSrc] = useState("");
  const [blur, setBlur] = useState<number>(0);
  const [rotate, setRotate] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(1);

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
          <Controls
            controls={controls}
            blur={blur}
            setBlur={setBlur}
            brightness={brightness}
            setBrightness={setBrightness}
            rotate={rotate}
            setRotate={setRotate}
          />
          <div
            style={{
              maxWidth: "1080px",
              maxHeight: "700px",
              borderRadius: "7px",
              padding: "1rem",
            }}
          >
            <ImageAnnot
              imageSrcMain={imgSrc}
              blur={blur}
              setBlur={setBlur}
              brightness={brightness}
              setBrightness={setBrightness}
              rotate={rotate}
              setRotate={setRotate}
            />
          </div>
        </div>
      ) : (
        <FileUpload onSelectFile={onSelectFile} />
      )}
    </div>
  );
}

export default App;
