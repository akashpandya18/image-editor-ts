import React from "react";
import {
  Check,
  Close
} from "../../assets/icons";
import { deleteTagProps } from "../../types";

export const DeleteTag = ({
  position,
  setPromptOff,
  deleteTagSubmit,
}: deleteTagProps) => {
  return (
    <div
      style={{
        top: position.yN + 2,
        left: position.xN - 100,
        position: "absolute",
        zIndex: 9,
        width: "200px",
        height: "50px",
        backgroundColor: "#fafafa",
        borderRadius: "7px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px"
      }}
    >
      <p
        style={{
          textAlign: "left",
          fontSize: "20px"
        }}
      >
        Delete this tag?
      </p>
      <button
        onClick={deleteTagSubmit}
        style={{
          border: "none",
          borderRadius: "7px",
          padding: "4px",
          color: "#fff",
          backgroundColor: "#2a2a2a",
          cursor: "pointer",
          boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.2)"
        }}
      >
        <Check />
      </button>
      <button
        onClick={setPromptOff}
        style={{
          border: "none",
          borderRadius: "7px",
          padding: "4px",
          color: "#2a2a2a",
          backgroundColor: "#fff",
          cursor: "pointer",
          boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.2)"
        }}
      >
        <Close />
      </button>
    </div>
  );
};