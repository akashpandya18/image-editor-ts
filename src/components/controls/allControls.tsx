import React from "react";
import {
  Clear,
  Check,
  Close,
  FlipHorizontal,
  FlipVertical,
  Save
} from "../../assets/icons";
import {
  propsFlip,
  propsTag
} from "../../types";
import "./index.css";
import { saveImage } from "../crop";

export const TagControls = ({ annotations }: propsTag) => {
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
};

export const TextOnImageControl = ({
  tempPrompt,
  textOnChangeHandler,
  onSubmit,
  setTempPrompt,
  formData,
  setFormData
}: any) => {
  let data = {
    text: "",
    color: "",
    size: ""
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    data = {
      ...formData,
      [name]: value
    };
    setFormData(data);
    textOnChangeHandler(data);
  };

  return (
    tempPrompt && (
      <div>
        <form onSubmit={onSubmit}>
          <div
            style={{
              display: "flex",
              columnGap: "0.625rem",
              alignItems: "center"
            }}
          >
            <input
              autoFocus
              value={formData.text}
              style={{
                height: "1.875rem",
                paddingInline: "0.625rem",
                width: "100%",
                fontSize: "1rem"
              }}
              required
              name="text"
              placeholder="Enter text"
              type="text"
              onChange={handleInputChange}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                columnGap: "0.625rem",
                width: "40%"
              }}
            >
              <button
                style={{
                  border: "none",
                  borderRadius: "0.438rem",
                  padding: "0.438rem 0.532rem",
                  color: "#fff",
                  backgroundColor: "#2a2a2a",
                  cursor: "pointer",
                  boxShadow: "0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.2)"
                }}
                type="submit"
              >
                <Check />
              </button>
              <button
                style={{
                  border: "none",
                  borderRadius: "0.438rem",
                  padding: "0.438rem 0.532rem",
                  color: "#fff",
                  backgroundColor: "#2a2a2a",
                  cursor: "pointer",
                  boxShadow: "0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.2)"
                }}
                type="button"
                onClick={() => setTempPrompt(false)}
              >
                <Close />
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "0.938rem",
              columnGap: "0.938rem"
            }}
          >
            <select name="size" value={formData.size} onChange={(event) => handleInputChange(event)}>
              <option value="8"> 8px </option>
              <option value="10"> 10px </option>
              <option value="12"> 12px </option>
              <option value="14"> 14px </option>
              <option value="16"> 16px </option>
              <option value="18"> 18px </option>
              <option value="20"> 20px </option>
              <option value="24"> 24px </option>
              <option value="28"> 28px </option>
              <option value="32"> 32px </option>
              <option value="36"> 36px </option>
              <option value="40"> 40px </option>
              <option value="42"> 42px </option>
              <option value="46"> 46px </option>
              <option value="50"> 50px </option>
              <option value="54"> 54px </option>
              <option value="58"> 58px </option>
              <option value="62"> 62px </option>
              <option value="66"> 66px </option>
              <option value="72"> 72px </option>
            </select>

            <input
              style={{
                height: "2.313rem",
                width: "6.25rem"
              }}
              value={formData.color}
              type="color"
              onChange={(event) => handleInputChange(event)}
              name="color"
            />
          </div>
        </form>
      </div>
    )
  );
};

export const CropControl = ({
  select,
  img,
  setImgSrc,
  canvasRef,
  currentCropped,
  selectCanvas
}: any) => {
  return (
    <div>
      <h3> Crop </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            columnGap: "10px"
          }}
        >
          <button
            disabled={selectCanvas}
            style={{
              backgroundColor: "black",
              color: "white",
              paddingBlock: "7px",
              paddingInline: "15px",
              width: "fit-content",
              border: "none"
            }}
            onClick={() => select()}
          >
            Select rectangle
          </button>
          <button
            className="save-image"
            disabled={currentCropped.width <= 0 && currentCropped.height <= 0}
            type="button"
            onClick={() => saveImage(setImgSrc, canvasRef, currentCropped)}
          >
            <Check />
          </button>
        </div>

        {img !== "data:," &&
          <img
            src={img}
            alt={""}
            style={{
              maxWidth: "400px",
              maxHeight: "223px",
              objectFit: "contain"
            }}
          />
        }
      </div>
    </div>
  );
};

export const FlipControl = ({ flipHorizontally, flipVertically }: propsFlip) => {
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
};

export const PenControl = ({ saveDrawing, clearDrawing }: any) => {
  return (
    <div>
      <h3> Pen </h3>
      <button
        style={{
          border: "none",
          borderRadius: "0.438rem",
          color: "#fff",
          cursor: "pointer",
          backgroundColor: "#2a2a2a",
          boxShadow: "0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.2)",
          padding: "0.7rem"
        }}
        onClick={saveDrawing}
      >
        <Save />
      </button>

      <button
        style={{
          border: "none",
          borderRadius: "0.438rem",
          color: "#fff",
          cursor: "pointer",
          backgroundColor: "#2a2a2a",
          boxShadow: "0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.2)",
          padding: "0.7rem",
          marginLeft: "0.313rem"
        }}
        onClick={clearDrawing}
      >
        <Clear />
      </button>
    </div>
  );
};