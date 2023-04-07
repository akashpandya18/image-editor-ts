import "./App.css";
import ImageAnnot from "./components/TagAnnotation";
import { useState } from "react";
import FileUpload from "./utils/FileUpload";

function App() {
  const [imgSrc, setImgSrc] = useState("");

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
      {!!imgSrc ? (
        <ImageAnnot imageSrc={imgSrc} />
      ) : (
        <FileUpload onSelectFile={onSelectFile} />
      )}
    </div>
  );
}

export default App;
