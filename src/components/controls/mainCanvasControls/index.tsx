import { Draw, ScreenShot, Tornado } from "../../../assets/icons"
import { mainCanvasControlProps } from "../../../types"

interface props {
  clearFunction: (e: any) => void
  showHideFunction: any
  screenShotFunction: (e: any) => void
  iconTag: any
}
export default function MainCanvasControls({
  clearFunction,
  showHideFunction,
  screenShotFunction,
  iconTag,
}: mainCanvasControlProps) {
  const controls = [
    { id: 1, name: "Clear", type: "clear", icon: <Tornado /> },
    { id: 2, name: "ShowHideTags", type: "show-hide-tags", icon: iconTag },
    { id: 3, name: "ScreenShot", type: "screenshot", icon: <ScreenShot /> },
  ]

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "left",
          width: "100%",
          gap: "10px",
          marginTop: "1rem",
        }}
      >
        {controls.map(
          (item: { id: number; name: string; type: string; icon: any }) => {
            return (
              <div key={item.id}>
                <button
                  style={{
                    border: "none",
                    borderRadius: "7px",
                    padding: "10px",
                    color: "#fff",
                    cursor: "pointer",
                    backgroundColor: "#2a2a2a",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={(e: any) => {
                    switch (item.type) {
                      case "clear":
                        clearFunction(e)
                        break
                      case "show-hide-tags":
                        showHideFunction()
                        break
                      case "screenshot":
                        screenShotFunction(e)
                        break
                      default:
                        console.log("no case")
                        break
                    }
                  }}
                >
                  {item.icon}
                </button>
              </div>
            )
          }
        )}
      </div>
    </>
  )
}
