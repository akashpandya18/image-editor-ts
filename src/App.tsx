import "./App.css"
import ImageAnnot from "./components/TagAnnotation"
import { useState } from "react"
import FileUpload from "./utils/FileUpload"
import Controls from "./components/controls"
import ImageCrop from "./components/crop"

function App() {
  // const [imgSrc, setImgSrc] = useState("");

  // const onSelectFile = (e: any) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () =>
  //     );
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const [croppedImage, setCroppedImage] = useState<string | undefined>()

  const handleCrop = (croppedImage: string) => {
    setCroppedImage(croppedImage)
  }

  return (
    <div className='App'>
      {/* {imgSrc ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "78%",
          }}
        >
          <Controls />
          <div
            style={{
              maxWidth: "1080px",
              maxHeight: "700px",
              borderRadius: "7px",
              padding: "1rem",
            }}
          >
            <Crop imageSrcMain={imgSrc} />
          </div>
        </div>
      ) : (
        <FileUpload onSelectFile={onSelectFile} />
      )} */}
      <div>
        <ImageCrop />
        {croppedImage && <img src={croppedImage} />}
      </div>

    </div>
  )
}

export default App
