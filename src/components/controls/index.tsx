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
  TextonImage,
  Zoom,
} from "../../assets/icons";
import UniversalSlider from "./sliders";

interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: any;
}

export default function Controls() {
  const [showControls, setShowControls] = useState(false);

  const controls = [
    { id: 1, name: "Blur", type: "blur", icon: <Blur /> },
    { id: 2, name: "Zoom", type: "zoom", icon: <Zoom /> },
    { id: 3, name: "Rotate", type: "rotate", icon: <RotateRight /> },
    { id: 4, name: "Brightness", type: "brightness", icon: <BrightnessUp /> },
  ];

  const tools = [
    { id: 1, name: "Tag/Annot", type: "tag-annotation", icon: <Tag /> },
    {
      id: 2,
      name: "Text on Image",
      type: "text-on-image",
      icon: <TextonImage />,
    },
    { id: 3, name: "Crop", type: "crop", icon: <Crop /> },
    { id: 4, name: "Flip", type: "flip", icon: <Flip /> },
    { id: 5, name: "Draw", type: "draw", icon: <Draw /> },
    { id: 6, name: "More", type: "more", icon: <More /> },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "auto",
        gap: "10px",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          padding: "1rem",
          width: "400px",
          height: "auto",
          borderRadius: "7px",
          backgroundColor: "#fafafa",
          // boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1rem",
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
                  justifyContent: "space-between",
                }}
              >
                <div
                  onClick={(e: any) => {
                    switch (x.type) {
                      case "tag-annotation":
                        break;
                      case "text-on-image":
                        break;
                      case "crop":
                        break;
                      case "flip":
                        break;
                      case "draw":
                        break;
                      case "more":
                        setShowControls(!showControls);
                        break;
                      default:
                        break;
                    }
                  }}
                  style={{
                    display: "block",
                    borderRadius: "7px",
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "1rem",
                    width: "24px",
                    cursor: "pointer",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {x.icon}
                </div>
                <span
                  style={{
                    textAlign: "center",
                    marginTop: "4px",
                    color: "#3a3a3a",
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
            backgroundColor: "#fafafa",
            // boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
              gap: "0.5rem",
            }}
          >
            {controls.map((x: controlsType) => {
              return (
                <div
                  key={x.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "block",
                      borderRadius: "7px",
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "1rem",
                      width: "24px",
                    }}
                  >
                    {x.icon}
                  </div>
                  <div>
                    <UniversalSlider label={x.name} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
