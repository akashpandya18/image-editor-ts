import { useRef, useState } from "react"
import { CropProps, DrawProps, TagProps } from "../../types"
import { mouseDown, mouseMove, mouseUP } from "../crop"

export const TagCanvas = ({
  canvasRef,
  handleTagClick,
  handleTagMouseMove,
}: TagProps) => {
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleTagClick}
        onMouseMove={handleTagMouseMove}
      />
    </>
  )
}
export const Crop = ({ canvasRef, currentCropped, setCurrentCropped, dimensions, setDimensions, imgSrc }: CropProps) => {

  const [difference, setDifference] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  })
  const [croppingNode, setCroppingNode] = useState<number>(0)
  const [isResize, setIsResize] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startingNode, setstartingNode] = useState({
    x: 0, y: 0
  })

  const imgRef = useRef<HTMLImageElement>(null)

  console.log('canvasRef-1', canvasRef)


  return (
    <div>
      <canvas
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
        ref={canvasRef}
        onMouseDown={(event) => mouseDown(
          event,
          currentCropped,
          setCroppingNode,
          setIsResize,
          setIsDragging,
          setstartingNode
        )}

        onMouseMove={(event) => mouseMove(
          event,
          setDifference,
          currentCropped,
          croppingNode,
          isResize,
          isDragging,
          startingNode,
          canvasRef,
          dimensions,
          imgRef,
        )}
        // onMouseLeave={mouseLeave}
        onMouseUp={(event) => mouseUP(
          event,
          difference,
          setDifference,
          currentCropped,
          setCurrentCropped,
          croppingNode,
          isResize,
          setIsResize,
          isDragging,
          setIsDragging,
          startingNode,
          canvasRef,
          imgRef,
        )}
      />
      <img src={imgSrc} alt="uploaded" height={dimensions.height} width={dimensions.width} ref={imgRef} style={{ display: 'none' }} />
    </div>

  )
}

export const DrawCanvas = ({ canvasRef }: DrawProps) => {
  const [isDrawing, setIsDrawing] = useState(false)

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (context) {
      context.beginPath()
      context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
      setIsDrawing(true)
    }
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!isDrawing) return

    if (context) {
      context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
      context.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clickDot = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (context) {
      context!.beginPath()
      context!.fillStyle = "#000"
      context!.arc(
        event.nativeEvent.offsetX,
        event.nativeEvent.offsetY,
        1,
        0,
        2 * Math.PI
      )
      context!.fill()
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => startDrawing(e)}
        onMouseMove={(e) => draw(e)}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onClick={(event: React.MouseEvent<HTMLCanvasElement>) =>
          clickDot(event)
        }
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
      />

    </>
  )
}

export const RegularCanvas = ({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>
}) => {
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
      />

    </>
  )
}
