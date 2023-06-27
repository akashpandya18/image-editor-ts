import React, { useEffect } from "react";
import {
  Clear,
  Check,
  Close,
  FlipHorizontal,
  FlipVertical,
  Save
} from "../../assets/icons";
import {
  PropsTag,
  AnnotationProps,
  TextOnImageControlProps,
  TextTag,
  CropControlProps,
  PropsFlip,
  PenControlProps, FontSizeOptionsProps
} from "../../types";
import "./index.css";
import { saveImage } from "../crop";
import {FontSizeOptions} from "../../utils/data";

export const TagControls = ({ annotations }: PropsTag) => {
  return (
    <div>
      <h3 className={"tag-head"}> Tags </h3>
      {annotations.length > 0 && (
        <div className={"tag-main"}>
          <ol className={"tag-ol"}>
            {annotations.map((data: AnnotationProps) => (
              <li className={"list-tags"} key={data.id}> {data.tag} </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export const TextOnImageControl = ({
  tempPrompt,
  textOnChangeHandler,
  onSubmit,
  formData,
  setFormData,
  error,
  canvasRef,
  imgSrc,
  annotations,
  allTextTags,
  handleCross
}: TextOnImageControlProps): JSX.Element => {
  let data = { text: "", color: "", size: 0, id: "" };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    data = {
      ...formData,
      [name]: value
    };
    setFormData(data);
    textOnChangeHandler(data);
  };

  useEffect(() => {
    setTimeout(() => {
      const canvas = canvasRef.current;
      const context = canvas!.getContext("2d");
      const image = new Image();
      image.src = imgSrc;

      context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
      annotations.forEach((annotationData: AnnotationProps) => {
        const { currentAnnotationX, currentAnnotationY } = annotationData;
        context!.beginPath();
        context!.fillStyle = "yellow";
        context!.arc(currentAnnotationX, currentAnnotationY, 10, 0, 2 * Math.PI);
        context!.fill();
      });
      allTextTags.forEach((textTags: TextTag) => {
        context!.textBaseline = "alphabetic";
        context!.font = `${textTags.size || 22}px monospace`;
        context!.fillStyle = textTags.color;
        context!.fillText(textTags.text, textTags.x + 10, textTags.y);
      });
    }, 10);
  },[annotations, allTextTags]);

  return (
    <div>
      <h3> Text On Image </h3>
      {tempPrompt && (
        <div>
          <form onSubmit={onSubmit}>
            <div
              style={{
                display: "flex",
                columnGap: "0.625rem",
                alignItems: "flex-start",
                margin: "0.938rem 0"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column"
                }}
              >
                <input
                  autoFocus
                  value={formData.text}
                  style={{
                    height: "1.875rem",
                    paddingInline: "0.625rem",
                    fontSize: "1rem"
                  }}
                  name={"text"}
                  placeholder={"Enter text"}
                  type={"text"}
                  onChange={handleInputChange}
                />
                {error !== "" &&
                  <span
                    style={{
                      textAlign: "left",
                      margin: "0 0.125rem",
                      fontSize: "1rem",
                      color: "red"
                    }}
                  > {error} </span>
                }
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: "0.625rem"
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
                  type={"submit"}
                  title={"Submit Text"}
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
                  type={"button"}
                  onClick={handleCross}
                  title={"Close"}
                >
                  <Close />
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                columnGap: "0.938rem"
              }}
            >
              <select name={"size"} value={formData.size} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(event)}>
                {FontSizeOptions?.map((fontSize: FontSizeOptionsProps) => (
                  <option value={fontSize.value} key={fontSize.id}> {fontSize.text} </option>
                ))}
              </select>

              <input
                style={{
                  height: "2.313rem",
                  width: "6.25rem"
                }}
                value={formData.color}
                type={"color"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                name={"color"}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export const CropControl = ({
  select,
  image,
  setImgSrc,
  canvasRef,
  currentCropped,
  selectCanvas
}: CropControlProps) => {
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
            columnGap: "0.625rem",
            marginTop: "1rem"
          }}
        >
          <button
            disabled={selectCanvas}
            style={{
              backgroundColor: "black",
              color: "white",
              paddingBlock: "0.438rem",
              paddingInline: "0.938rem",
              width: "fit-content",
              border: "none"
            }}
            onClick={select}
          >
            Select rectangle
          </button>
          <button
            className={"save-image"}
            disabled={currentCropped.width <= 0 && currentCropped.height <= 0}
            type={"button"}
            onClick={() => saveImage({setImgSrc, canvasRef, currentCropped})}
            title={"Submit"}
          >
            <Check />
          </button>
        </div>

        {image !== "data:," &&
          <img
            src={image}
            alt={""}
            style={{
              maxWidth: "25rem",
              maxHeight: "13.938rem",
              objectFit: "contain",
              marginTop: "1rem"
            }}
          />
        }
      </div>
    </div>
  );
};

export const FlipControl = ({ flipHorizontally, flipVertically }: PropsFlip) => {
  return (
    <div>
      <h3> Flip </h3>
      <div className={"button-div-main"}>
        <div className={"button-div"}>
          <button className={"flip-button"} onClick={flipHorizontally} title={"Flip Horizontal"}>
            <FlipHorizontal />
          </button>
          <button className={"flip-button"} onClick={flipVertically} title={"Flip Vertical"}>
            <FlipVertical />
          </button>
        </div>
      </div>
    </div>
  );
};

export const PenControl = ({ saveDrawing, clearDrawing }: PenControlProps) => {
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
          padding: "0.7rem",
          marginTop: "1rem"
        }}
        onClick={saveDrawing}
        title={"Save"}
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
        title={"Clear Draw"}
      >
        <Clear />
      </button>
    </div>
  );
};