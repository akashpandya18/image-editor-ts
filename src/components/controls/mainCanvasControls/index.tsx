import React from "react";
import {
  ScreenShot,
  Tornado
} from "../../../assets/icons";
import { mainCanvasControlProps } from "../../../types";

export default function MainCanvasControls({
  clearFunction,
  showHideFunction,
  screenShotFunction,
  iconTag
}: mainCanvasControlProps) {
  const controls = [
    { id: 1, name: "Clear", type: "clear", icon: <Tornado /> },
    { id: 2, name: "ShowHideTags", type: "show-hide-tags", icon: iconTag },
    { id: 3, name: "ScreenShot", type: "screenshot", icon: <ScreenShot /> }
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        width: "100%",
        gap: "0.625rem",
        marginTop: "1rem"
      }}
    >
      {controls.map(
        (item: { id: number; name: string; type: string; icon: any }) => {
          return (
            <div key={item.id}>
              <button
                style={{
                  border: "none",
                  borderRadius: "0.438rem",
                  padding: "0.625rem",
                  color: "#fff",
                  cursor: "pointer",
                  backgroundColor: "#2a2a2a",
                  boxShadow: "0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.2)"
                }}
                onClick={(e: any) => {
                  switch (item.type) {
                    case "clear":
                      clearFunction(e);
                      break;
                    case "show-hide-tags":
                      showHideFunction();
                      break;
                    case "screenshot":
                      screenShotFunction(e);
                      break;
                    default:
                      break;
                  }
                }}
              >
                {item.icon}
              </button>
            </div>
          );
        }
      )}
    </div>
  );
};