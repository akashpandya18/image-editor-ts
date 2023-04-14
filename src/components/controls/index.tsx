import { useState } from "react";
import {
  Blur,
  BrightnessUp,
  Crop,
  Draw,
  Flip,
  More,
  RotateRight,
  Tag,
  TextOnImage,
  Zoom
} from "../../assets/icons";
import UniversalSlider from "./sliders";
import ImageAnnot from "../TagAnnotation";

interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: any;
}

interface props {
  imgSrc: string;
}

const controls: controlsType[] = [
  { id: 1, name: "Blur", type: "blur", icon: <Blur /> },
  { id: 2, name: "Zoom", type: "zoom", icon: <Zoom /> },
  { id: 3, name: "Rotate", type: "rotate", icon: <RotateRight /> },
  { id: 4, name: "Brightness", type: "brightness", icon: <BrightnessUp /> }
];

const tools: controlsType[] = [
  { id: 1, name: "Tag/Annot", type: "tag-annotation", icon: <Tag /> },
  { id: 2, name: "Text on Image", type: "text-on-image", icon: <TextOnImage /> },
  { id: 3, name: "Crop", type: "crop", icon: <Crop /> },
  { id: 4, name: "Flip", type: "flip", icon: <Flip /> },
  { id: 5, name: "Draw", type: "draw", icon: <Draw /> },
  { id: 6, name: "More", type: "more", icon: <More /> }
];

export default function Controls({ imgSrc }: props): JSX.Element {
  const [showControls, setShowControls] = useState(false);
  const [currentTool, setCurrentTool] = useState("tag-annotation");
  const [blur, setBlur] = useState<number>(0);
  const [rotate, setRotate] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(1);

  function handleToolClick(key: string) {
    switch (key) {
      case "tag-annotation":
        setCurrentTool("tag-annotation");
        break;
      case "text-on-image":
        setCurrentTool("text-on-image");
        break;
      case "crop":
        setCurrentTool("crop");
        break;
      case "flip":
        setCurrentTool("flip");
        break;
      case "draw":
        setCurrentTool("draw");
        break;
      case "more":
        setCurrentTool("more");
        break;
      default:
        break;
    }
  }

  function ShowSelectedTool() {
    return (
      <>
        {currentTool === "tag-annotation" ? (
          <ImageAnnot
            imageSrcMain={imgSrc}
            blur={blur}
            setBlur={setBlur}
            brightness={brightness}
            setBrightness={setBrightness}
            rotate={rotate}
            setRotate={setRotate}
          />
        ) : currentTool === "text-on-image" ? (
          console.log("ToI")
        ) : currentTool === "crop" ? (
          console.log("crop")
        ) : currentTool === "flip" ? (
          console.log("flip")
        ) : currentTool === "draw" ? (
          console.log("draw")
        ) : currentTool === "more" && (
          setShowControls(!showControls)
        )}
      </>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "auto",
          gap: "10px",
          padding: "1rem 0"
        }}
      >
        <div
          style={{
            padding: "1rem",
            width: "400px",
            height: "auto",
            borderRadius: "7px",
            backgroundColor: "#fafafa"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "1rem"
            }}
          >
            {tools.map((x: controlsType) => {
              return (
                <div
                  key={x.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div
                    onClick={() => handleToolClick(x.type)}
                    style={{
                      display: "block",
                      borderRadius: "7px",
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "1rem",
                      width: "24px",
                      cursor: "pointer",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    {x.icon}
                  </div>
                  <span
                    style={{
                      textAlign: "center",
                      marginTop: "4px",
                      color: "#3a3a3a"
                    }}
                  >
                    {x.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {showControls && (
          <div
            style={{
              padding: "1rem",
              width: "400px",
              height: "auto",
              borderRadius: "7px",
              backgroundColor: "#fafafa"
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                gap: "0.5rem"
              }}
            >
              {controls.map((x: controlsType) => {
                return (
                  <div
                    key={x.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <div
                      style={{
                        display: "block",
                        borderRadius: "7px",
                        backgroundColor: "#000",
                        color: "#fff",
                        padding: "1rem",
                        width: "24px"
                      }}
                    >
                      {x.icon}
                    </div>
                    <div>
                      <UniversalSlider
                        label={x.name}
                        id={x.type}
                        blur={blur}
                        setBlur={setBlur}
                        brightness={brightness}
                        setBrightness={setBrightness}
                        rotate={rotate}
                        setRotate={setRotate}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          maxWidth: "1080px",
          maxHeight: "700px",
          borderRadius: "7px",
          padding: "1rem"
        }}
      >
        <ShowSelectedTool />
      </div>
    </>
  );
};