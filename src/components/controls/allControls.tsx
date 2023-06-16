import React  from "react";
import "./index.css";
import {
  Clear,
  FlipHorizontal,
  FlipVertical,
  Save
} from "../../assets/icons";
import {
  propsFlip,
  propsTag
} from "../../types";

export function TagControls({ annotations }: propsTag) {
  return (
    <div>
      <h3 className={"tag-head"}> Tags </h3>
      <div className={"tag-main"}>
        {annotations.length > 0 && (
          <ol className={"tag-ol"}>
            {annotations.map((data: any) => {
              return (
                <li className={"list-tags"} key={data.id}>
                  {data.tag}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

export function TextOnImageControl() {
  return (
    <h3> Text On Image </h3>
  );
}

export function CropControl() {
  return (
    <h3> Crop </h3>
  );
}

export function FlipControl({ flipHorizontally, flipVertically }: propsFlip) {
  return (
    <div>
      <h3> Flip </h3>
      <div className={"button-div-main"}>
        <div className={"button-div"}>
          <button className={"flip-button"} onClick={flipHorizontally}>
            <FlipHorizontal />
          </button>
          <button className={"flip-button"} onClick={flipVertically}>
            <FlipVertical />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PenControl({ saveDrawing, clearDrawing }: any) {
  return (
    <div>
      <h3> Pen </h3>
      <button
        style={{
          border: "none",
          borderRadius: "7px",
          color: "#fff",
          cursor: "pointer",
          backgroundColor: "#2a2a2a",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
          padding: "0.7rem"
        }}
        onClick={saveDrawing}
      >
        <Save />
      </button>

      <button
        style={{
          border: "none",
          borderRadius: "7px",
          color: "#fff",
          cursor: "pointer",
          backgroundColor: "#2a2a2a",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
          padding: "0.6rem",
          marginLeft: "5px"
        }}
        onClick={clearDrawing}
      >
        <Clear />
      </button>
    </div>
  );
}