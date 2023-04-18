import { useEffect, useRef, useState } from 'react'

interface Props {
  imageUrl: string
}
interface Cropped {
  startingX: number,
  startingY: number,
  height: number,
  width: number
}

interface CropImageProps {
  startingX: any
  startingY: any
  totalWidth: any
  totalHeight: any
}

const ImageCropper = (props: Props) => {

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { imageUrl } = props
  const [startingNode, setstartingNode] = useState({
    x: 0, y: 0
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isResize, setIsResize] = useState(false)
  const [croppingNode, setCroppingNode] = useState<string>()
  const [croppedImage, setCroppedImage] = useState<string>()
  const [movedArea, setmovedArea] = useState({
    xMoved: 0,
    yMoved: 0
  })
  const [currentCropped, setCurrentCropped] = useState<Cropped>({
    startingX: 0,
    startingY: 0,
    height: 0,
    width: 0
  })
  const [isCropping, setisCropping] = useState<boolean>(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
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
    const mouseY = event.nativeEvent.offsetY

    if (croppedImage) {
      if (mouseX > currentCropped.startingX && mouseX < currentCropped.width + currentCropped.startingX && mouseY > currentCropped.startingY &&
        mouseY < currentCropped.height + currentCropped.startingY) {
        setIsDragging(true)
      }
      // else if (mouseX > currentCropped.startingX - 5 && mouseX < currentCropped.startingX + 5 && mouseY > currentCropped.startingY - 5 && mouseY < currentCropped.startingY + 5) {
      //   setIsResize(true)
      //   setCroppingNode('n1')
      // }
      else {
        setIsResize(false)
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
  }

  // console.log('isResize , croppingNode', isResize, croppingNode)

  const mouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY

    if (isDragging) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const img = imgRef.current
      canvas!.width = canvas!.width // Clear the canvas and resize it
      ctx!.drawImage(img!, 0, 0, dimensions.width, dimensions.height)
      ctx!.strokeStyle = 'white'
      ctx!.setLineDash([5, 5])
      ctx!.lineWidth = 2
      let movedArea = {
        xMoved: currentCropped.startingX + (x - startingNode.x),
        yMoved: currentCropped.startingY + (y - startingNode.y)
      }
      setmovedArea({
        xMoved: movedArea.xMoved,
        yMoved: movedArea.yMoved
      })
      ctx!.strokeRect(movedArea.xMoved, movedArea.yMoved, currentCropped.width, currentCropped.height)
      // ctx!.strokeRect(movedArea.xMoved, startingNode.y, width, height) // Draw the rectangle using the starting node
      ctx!.setLineDash([0, 0])
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved - 5, 10, 0)
      ctx!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved - 5, 0, 10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect(movedArea.xMoved + currentCropped.width + 5, movedArea.yMoved - 5, -10, 0)
      ctx!.strokeRect(movedArea.xMoved + currentCropped.width + 5, movedArea.yMoved - 5, 0, 10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved + currentCropped.height + 5, 10, 0)
      ctx!.strokeRect(movedArea.xMoved - 5, movedArea.yMoved + currentCropped.height + 5, 0, -10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect(movedArea.xMoved - 5 + currentCropped.width, movedArea.yMoved + currentCropped.height + 5, 10, 0)
      ctx!.strokeRect(movedArea.xMoved + 5 + currentCropped.width, movedArea.yMoved + currentCropped.height + 5, 0, -10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
    }

    if (isCropping && !isDragging) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      canvas!.width = canvas!.width // Clear the canvas and resize it
      const img = imgRef.current
      ctx!.drawImage(img!, 0, 0, dimensions.width, dimensions.height) // Draw the original image again
      ctx!.strokeStyle = 'white'
      ctx!.setLineDash([5, 5])
      ctx!.lineWidth = 2
      const width = x - startingNode.x
      const height = y - startingNode.y

      ctx!.strokeRect(startingNode.x, startingNode.y, width, height) // Draw the rectangle using the starting node
      ctx!.setLineDash([0, 0])
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect(startingNode.x - 5, startingNode.y - 5, 10, 0)
      ctx!.strokeRect(startingNode.x - 5, startingNode.y - 5, 0, 10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect(startingNode.x + width + 5, startingNode.y - 5, -10, 0)
      ctx!.strokeRect(startingNode.x + width + 5, startingNode.y - 5, 0, 10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect(startingNode.x - 5, startingNode.y + height + 5, 10, 0)
      ctx!.strokeRect(startingNode.x - 5, startingNode.y + height + 5, 0, -10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect(startingNode.x - 5 + width, startingNode.y + height + 5, 10, 0)
      ctx!.strokeRect(startingNode.x + 5 + width, startingNode.y + height + 5, 0, -10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
    }
  }

  document.addEventListener('mouseup', () => {

    if (isDragging) {
      setIsDragging(false)
    }
    if (isCropping) {
      setisCropping(false)
    }
  })

  const cropImage = (props: CropImageProps) => {

    const { startingX, startingY, totalWidth, totalHeight } = props

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = imgRef.current

    if (!img || !ctx) {
      return
    }

    const croppedCanvas: any = document.createElement('canvas')
    const croppedCtx = croppedCanvas.getContext('2d')

    if (!croppedCtx) {
      return
    }

    croppedCanvas.width = totalWidth
    croppedCanvas.height = totalHeight

    const imageData = ctx.getImageData(startingX + 2, startingY + 2, totalWidth - 3, totalHeight - 3)

    croppedCtx.putImageData(imageData, 0, 0)

    setCroppedImage(croppedCanvas.toDataURL())
  }

  const mouseUP = (event: any) => {

    let startingX, startingY, totalWidth, totalHeight

    if (isDragging) {
      startingX = currentCropped?.startingX + (event.nativeEvent.offsetX - startingNode.x)
      startingY = currentCropped?.startingY + (event.nativeEvent.offsetY - startingNode.y)
      totalWidth = currentCropped?.width
      totalHeight = currentCropped?.height
      setCurrentCropped({
        startingX: startingX,
        startingY: startingY,
        width: totalWidth,
        height: totalHeight
      })

    }

    if (isCropping && !isDragging) {
      startingX = startingNode.x
      startingY = startingNode.y
      totalWidth = event.nativeEvent.offsetX - startingNode.x
      totalHeight = event.nativeEvent.offsetY - startingNode.y
      setCurrentCropped({
        startingX: startingNode.x,
        startingY: startingNode.y,
        width: event.nativeEvent.offsetX - startingNode.x,
        height: event.nativeEvent.offsetY - startingNode.y
      })
    }

    cropImage({
      startingX: startingX,
      startingY: startingY,
      totalWidth: totalWidth,
      totalHeight: totalHeight
    })
  }

  console.log('currentCropped', currentCropped)
  return (
    <>
      <canvas
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUP}
        ref={canvasRef} />
      <img src={imageUrl} alt="uploaded" height={dimensions.height} width={dimensions.width} ref={imgRef} style={{ display: 'none' }} />
      <img src={croppedImage} />

    </>
  )
}

export default ImageCropper
