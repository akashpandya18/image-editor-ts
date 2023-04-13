import {
  Crop,
  Flip,
  Tag,
  TextOnImage
} from "../../assets/icons";
import UniversalSlider from "./sliders";

interface controlsType {
  id: number;
  name: string;
  type: string;
  icon: any;
}

interface props {
  controls: controlsType[];
  blur: number;
  setBlur: Function;
  brightness: number;
  setBrightness: Function;
  rotate: number;
  setRotate: Function;
}

export default function Controls({
  controls,
  blur,
  setBlur,
  brightness,
  setBrightness,
  rotate,
  setRotate
}: props): JSX.Element {
  const tools = [
    { id: 1, name: "Tag/Annot", type: "tag-annotation", icon: <Tag /> },
    {
      id: 2,
      name: "Text on Image",
      type: "text-on-image",
      icon: <TextOnImage />,
    },
    { id: 3, name: "Crop", type: "crop", icon: <Crop /> },
    { id: 4, name: "Flip", type: "flip", icon: <Flip /> },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "420px",
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
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "0.5rem",
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
                <span
                  style={{
                    textAlign: "center",
                    marginTop: "4px",
                  }}
                >
                  {x.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

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
    </div>
  );
}
