import React from "react";
import { tagOnHoverProps } from "../../types";

export default function ShowTagOnHover({ position, tag }: tagOnHoverProps) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 9,
        top: position.y - 40,
        left: position.x,
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