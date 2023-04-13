import "./App.css";
import ImageAnnot from "./components/TagAnnotation";
import { useState } from "react";
import FileUpload from "./utils/FileUpload";
import Controls from "./components/controls";

function App() {
  const [imgSrc, setImgSrc] = useState("");
  const [currentTool, setCurrentTool] = useState("tag-annot");

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const SetTools = () => {
    return <></>;
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
          <Controls />
          <div
            style={{
              maxWidth: "1080px",
              maxHeight: "700px",
              borderRadius: "7px",
              padding: "1rem",
              // boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ImageAnnot imageSrcMain={imgSrc} />
          </div>
        </div>
      ) : (
        <FileUpload onSelectFile={onSelectFile} />
      )}
    </div>
  );
}

export default App;
