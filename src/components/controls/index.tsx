import {
  Blur,
  BrightnessUp,
  Crop,
  Flip,
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
  const controls = [
    { id: 1, name: "Blur", type: "blur", icon: <Blur /> },
    { id: 2, name: "Tag Annotation", type: "tag-annotation", icon: <Tag /> },
    {
      id: 3,
      name: "Text on Image",
      type: "text-on-image",
      icon: <TextonImage />,
    },
    { id: 4, name: "Zoom", type: "zoom", icon: <Zoom /> },
    { id: 5, name: "Crop", type: "crop", icon: <Crop /> },
    { id: 6, name: "Rotate", type: "rotate", icon: <RotateRight /> },
    { id: 7, name: "Flip", type: "flip", icon: <Flip /> },
    { id: 8, name: "Brightness", type: "brightness", icon: <BrightnessUp /> },
  ];
  return (
    <>
      <div
        style={{
          padding: "1rem",
          width: "400px",
          minHeight: "500px",
          borderRadius: "7px",
          boxShadow: "0px 7px 12px 1px rgba(0, 0, 0, 0.2)",
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
    </>
  );
}
