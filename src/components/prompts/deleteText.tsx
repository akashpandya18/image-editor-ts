import React from "react";
import { Check, Close } from "../../assets/icons";
import { DeleteTextProps } from "../../types";

export const DeleteText = ({ position, handleDelete, setDeleteTextTag }: DeleteTextProps) => {
  return (
    <div
      style={{
        top: position.currentClickedY + 10,
        left: position.currentClickedX - 100,
        position: "absolute",
        zIndex: 9,
        width: "12.5rem",
        backgroundColor: "#fafafa",
        borderRadius: "0.438rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.625rem"
      }}
    >
      <p
        style={{
          textAlign: "left",
          fontSize: "1.25rem",
          margin: 0
        }}
      >
        Do you want to delete this text?
      </p>
      <button
        onClick={handleDelete}
        style={{
          border: "none",
          borderRadius: "0.438rem",
          padding: "0.25rem",
          color: "#fff",
          backgroundColor: "#2a2a2a",
          cursor: "pointer",
          boxShadow: "0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.2)",
          marginRight: "0.5rem"
        }}
        title={"Delete Text"}
      >
        <Check />
      </button>
      <button
        onClick={() => setDeleteTextTag(false)}
        style={{
          border: "none",
          borderRadius: "0.438rem",
          padding: "0.25rem",
          color: "#2a2a2a",
          backgroundColor: "#fff",
          cursor: "pointer",
          boxShadow: "0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.2)"
        }}
        title={"Close"}
      >
        <Close />
      </button>
    </div>
  );
};