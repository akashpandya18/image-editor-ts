import { useEffect, useRef, useState } from 'react'

interface Props {
  imageUrl: string
}

const ImageCropper = (props: Props) => {

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { imageUrl } = props
  const [startingNode, setstartingNode] = useState({
    x: 0, y: 0
  })
  const [isDragging, setIsDragging] = useState(false)
  const [croppedImage, setCroppedImage] = useState(null)
  const [currentCropped, setCurrentCropped] = useState()
  const [isCropping, setisCropping] = useState<boolean>(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      const { width, height } = img
      if (width > 1000) {
        const ratio = width / height
        const newHeight = 1000 / ratio
        const newWidth = 563 * ratio
        setDimensions({ width: newWidth, height: newHeight })
      } else {
        setDimensions({ width, height })
      }
    }
  }, [imageUrl])

  useEffect(() => {
    const canvas = canvasRef.current
    const { width, height } = dimensions
    canvas!.width = width
    canvas!.height = height
    const ctx = canvas!.getContext("2d")
    const image = new Image()
    image.src = imageUrl
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height)
    }
  }, [dimensions, imageUrl])


  const mouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {

    if (isCropping) {
      return // Return early if cropping is already in progress
    }
    const mouseX = event.nativeEvent.offsetX
    let dragging = false
    const mouseY = event.nativeEvent.offsetY

    if (croppedImage) {
      console.log('currentCropped', currentCropped)
      if (mouseX > currentCropped.startingX && mouseX < currentCropped.mouseX && mouseY > currentCropped.startingY && mouseY < currentCropped.mouseY) {
        setIsDragging(true)
        dragging = true
      }
      else {
        setIsDragging(false)

        setisCropping(true)
      }
    } else {

      setisCropping(true)
    }

    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    setstartingNode({ x: x, y: y })
    setisCropping(true)
    // console.log('x,y', x, y)
  }

  const mouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY

    if (isDragging) {
      console.log('isDragging', startingNode)
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const img = imgRef.current
      canvas!.width = canvas!.width // Clear the canvas and resize it
      ctx!.drawImage(img!, 0, 0, dimensions.width, dimensions.height)
      ctx!.strokeStyle = 'red'
      ctx!.setLineDash([10, 10])
      ctx!.lineWidth = 2
      ctx?.strokeRect(x - startingNode.x, y - startingNode.y, currentCropped.width, currentCropped.height)
    }


    if (isCropping && !isDragging) {

      console.log('startingNode', startingNode)
      console.log('x,y', x, y)
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      canvas!.width = canvas!.width // Clear the canvas and resize it
      const img = imgRef.current
      ctx!.drawImage(img!, 0, 0, dimensions.width, dimensions.height) // Draw the original image again
      ctx!.strokeStyle = 'red'
      ctx!.setLineDash([10, 10])
      ctx!.lineWidth = 2
      const width = x - startingNode.x
      const height = y - startingNode.y
      ctx?.strokeRect(startingNode.x, startingNode.y, width, height) // Draw the rectangle using the starting node

      setCurrentCropped({
        startingX: startingNode.x,
        startingY: startingNode.y,
        mouseX: event.nativeEvent.offsetX,
        mouseY: event.nativeEvent.offsetY,
        height: height,
        width: width
      })
    }
  }

  const mouseUP = (event) => {
    if (isDragging) {
      setIsDragging(false)
    }
    setisCropping(false)
    const width = event.nativeEvent.offsetX - startingNode.x
    const height = event.nativeEvent.offsetY - startingNode.y
    const canvas = canvasRef.current
    const croppedCanvas = document.createElement('canvas')
    const ctx = croppedCanvas.getContext('2d')
    const xPosition = startingNode.x + (width < 0 ? width : 0)
    const yPosition = startingNode.y + (height < 0 ? height : 0)
    const newWidth = Math.abs(width)
    const newHeight = Math.abs(height)
    croppedCanvas.width = newWidth
    croppedCanvas.height = newHeight
    ctx!.drawImage(canvas!, xPosition + 1, yPosition + 1, newWidth - 2, newHeight - 2, 0, 0, newWidth, newHeight)
    setCroppedImage(croppedCanvas.toDataURL())
  }

  return (
    <>
      <canvas
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUP}
        ref={canvasRef} />
      <img src={imageUrl} alt="uploaded" height={dimensions.height} width={dimensions.width} ref={imgRef} style={{ display: 'none' }} />

      {/* <input type="file" accept="image/*" onChange={handleFileInputChange} /> */}
      {/* {image && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleUndo}>Undo</button>

            {croppedImage && <button onClick={handleDownload}>Download</button>}
          </div>
          {renderCroppedImage()}
        </>
      )} */}
    </>
  )
}

export default ImageCropper
