import React, { useState } from "react";
import FileUpload from "./utils/FileUpload";
import { Controls } from "./components/controls";
import "./App.css";
import { OnSelectFileProps } from "./types";

function App() {
  const [imgSrc, setImgSrc] = useState("")

  const onSelectFile = (e: OnSelectFileProps) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      {imgSrc ? (
        <Controls imgSrc={imgSrc} setImgSrc={setImgSrc} />
      ) : (
        <FileUpload onSelectFile={onSelectFile} />
      )}
    </div>
  );
}

export default App;