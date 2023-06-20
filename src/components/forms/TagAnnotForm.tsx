import React from "react";
import "../styles/index.css";
import { Close } from "../../assets/icons";
import { TagAnnotationFormProps } from "../../types";

export const TagAnnotationForm = ({
  tags,
  handleInputChange,
  onSubmit,
  position,
  refer,
  handleCloseInput
}: TagAnnotationFormProps) => {
  return (
    <div
      ref={refer}
      style={{
        position: "absolute",
        zIndex: 9,
        top: position.y,
        left: position.x
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <input
          className={"TagInput"}
          type={"text"}
          name={"tag"}
          maxLength={20}
          value={tags}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          autoFocus
          autoComplete={"off"}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "40%"
          }}
        >
          <button className={"TagSubmit"} type={"submit"}>
            Submit
          </button>
          <button
            className={"TagSubmitClose"}
            onClick={() => handleCloseInput(false)}
          >
            <Close />
          </button>
        </div>
      </form>
    </div>
  );
}