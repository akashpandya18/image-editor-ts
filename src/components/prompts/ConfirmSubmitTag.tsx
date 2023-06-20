import React from "react";
import { SubmitTagsProps } from "../../types";

export default function TempRedTag({ position }: SubmitTagsProps) {
  return (
    <div
      style={{
        top: position.y - 10,
        left: position.x - 10,
        position: "absolute",
        zIndex: 9,
        width: "1.25rem",
        height: "1.25rem",
        backgroundColor: "red",
        borderRadius: "50%"
      }}
    />
  );
};