import React from "react";
import { TagOnHoverProps } from "../../types";

export default function ShowTagOnHover({ position, tag }: TagOnHoverProps) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 9,
        top: position.hoveredDotY - 40,
        left: position.hoveredDotX,
        backgroundColor: "#2a2a2a",
        color: "#fff",
        padding: "0.5rem",
        borderRadius: "0.438rem",
        fontSize: "1.25rem"
      }}
    >
      {tag}
    </div>
  );
};