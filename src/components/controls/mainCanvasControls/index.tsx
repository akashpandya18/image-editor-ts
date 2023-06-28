import React from "react";
import { Tornado, ScreenShot } from "../../../assets/icons";
import { MainCanvasControlProps, ControlsMapProps } from "../../../types";

export const MainCanvasControls = ({ clearFunction, showHideFunction, screenShotFunction, iconTag }: MainCanvasControlProps) => {
  const controls = [
    { id: 1, name: "Clear", type: "clear", title: "Clear the canvas", icon: <Tornado /> },
    { id: 2, name: "ShowHideTags", type: "show-hide-tags", title: "show-hide-tags", icon: iconTag },
    { id: 3, name: "ScreenShot", type: "screenshot", title: "Screen Shot", icon: <ScreenShot /> }
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
      {controls.map((item: ControlsMapProps) => (
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
            title={item.title}
            onClick={(clickEvent: React.MouseEvent<HTMLButtonElement>) => {
              switch (item.type) {
                case "clear":
                  clearFunction(clickEvent);
                  break;
                case "show-hide-tags":
                  showHideFunction();
                  break;
                case "screenshot":
                  screenShotFunction(clickEvent);
                  break;
                default:
                  break;
              }
            }}
          >
            {item.icon}
          </button>
        </div>
      ))}
    </div>
  );
};