import React, { useEffect, useRef, useState } from 'react'

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
  const [croppingNode, setCroppingNode] = useState<number>()
  const [difference, setDifference] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  })
  const [currentCropped, setCurrentCropped] = useState<Cropped>({
    startingX: 0,
    startingY: 0,
    height: 0,
    width: 0
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasPreviewRef = useRef<HTMLCanvasElement>(null)

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
      ctx!.strokeStyle = 'white'
      ctx!.setLineDash([5, 5])
      const imgX = Math.floor(dimensions.width / 4)
      const imgY = Math.floor(dimensions.height / 4)
      ctx!.lineWidth = 2
      ctx!.strokeRect(imgX, imgY, imgX, imgY)
      setCurrentCropped({
        startingX: imgX,
        startingY: imgY,
        width: imgX,
        height: imgY,
      })
      ctx!.setLineDash([0, 0])
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect((dimensions.width / 4) - 5, (dimensions.height / 4) - 5, 10, 0)
      ctx!.strokeRect((dimensions.width / 4) - 5, (dimensions.height / 4) - 5, 0, 10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect((dimensions.width / 4) + (dimensions.width / 4) + 5, (dimensions.height / 4) - 5, -10, 0)
      ctx!.strokeRect((dimensions.width / 4) + (dimensions.width / 4) + 5, (dimensions.height / 4) - 5, 0, 10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect((dimensions.width / 4) - 5, (dimensions.height / 4) + (dimensions.height / 4) + 5, 10, 0)
      ctx!.strokeRect((dimensions.width / 4) - 5, (dimensions.height / 4) + (dimensions.height / 4) + 5, 0, -10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.lineWidth = 3
      ctx!.lineJoin = "round"
      ctx!.strokeRect((dimensions.width / 4) - 5 + (dimensions.width / 4), (dimensions.height / 4) + (dimensions.height / 4) + 5, 10, 0)
      ctx!.strokeRect((dimensions.width / 4) + 5 + (dimensions.width / 4), (dimensions.height / 4) + (dimensions.height / 4) + 5, 0, -10)
      ctx!.fillStyle = "white"
      ctx!.fill()
      ctx!.stroke()
      const croppedCanvas: any = document.createElement('canvas')
      const croppedCtx = croppedCanvas.getContext('2d')
      if (!croppedCtx) {
        return
      }
      const canvas1 = canvasRef.current
      const ctx1 = canvas1?.getContext('2d')
      croppedCanvas.width = (dimensions.width / 4)
      croppedCanvas.heigh = (dimensions.height / 4)
      const imageData = ctx1?.getImageData(dimensions.width / 4 + 2, dimensions.height / 4 + 2, dimensions.width / 4 - 3, dimensions.height / 4 - 3)
      croppedCtx.putImageData(imageData, 0, 0)
    }

  }, [dimensions, imageUrl])

  const mouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {

    const mouseX = event.nativeEvent.offsetX
    const mouseY = event.nativeEvent.offsetY

    if (
      mouseX > currentCropped.startingX - 5 && mouseX < currentCropped.startingX + 5 && mouseY > currentCropped.startingY - 5 && mouseY < currentCropped.startingY + 5
    ) {
      setIsResize(true)
      setCroppingNode(1)
    }
    else if (mouseX > currentCropped.startingX + currentCropped.width - 5 &&
      mouseX < currentCropped.startingX + currentCropped.width + 5 &&
      mouseY > currentCropped.startingY - 5 && mouseY < currentCropped.startingY + 5
    ) {
      setIsResize(true)
      setCroppingNode(2)
    }
    else if (mouseX > currentCropped.startingX - 5 && mouseX < currentCropped.startingX + 5 &&
      mouseY > currentCropped.startingY + currentCropped.height - 5 &&
      mouseY < currentCropped.startingY + currentCropped.height + 5
    ) {
      setIsResize(true)
      setCroppingNode(3)
    } else if (
      mouseX > currentCropped.startingX + currentCropped.width - 5 &&
      mouseX < currentCropped.startingX + currentCropped.width + 5 &&
      mouseY > currentCropped.startingY + currentCropped.height - 5 &&
      mouseY < currentCropped.startingY + currentCropped.height + 5
    ) {
      setIsResize(true)
      setCroppingNode(4)
    }
    else if ((mouseX > currentCropped.startingX + 5 && mouseX < currentCropped.startingX + currentCropped.width - 5 && mouseY > currentCropped.startingY - 5 && mouseY < currentCropped.startingY + 5)) {
      setIsResize(true)
      setCroppingNode(5)
    }
    else if ((mouseX > currentCropped.startingX - 5 && mouseX < currentCropped.startingX + 5 && mouseY > currentCropped.startingY && mouseY < currentCropped.height + currentCropped.startingY)) {
      setIsResize(true)
      setCroppingNode(6)
    }
    else if (mouseX > currentCropped.startingX + 5 && mouseX < currentCropped.startingX + currentCropped.width - 5 && mouseY > currentCropped.startingY + currentCropped.height - 5 && mouseY < currentCropped.startingY + currentCropped.height + 5) {
      setIsResize(true)
      setCroppingNode(7)
    }
    else if (mouseX > currentCropped.startingX + currentCropped.width - 5 && mouseX < currentCropped.startingX + currentCropped.width + 5 && mouseY > currentCropped.startingY && mouseY < currentCropped.height + currentCropped.startingY) {
      setIsResize(true)
      setCroppingNode(8)
    }
    else if (mouseX > currentCropped.startingX && mouseX < currentCropped.width + currentCropped.startingX && mouseY > currentCropped.startingY &&
      mouseY < currentCropped.height + currentCropped.startingY) {
      setIsDragging(true)
    }

    else {
      setIsDragging(false)
      setIsResize(false)
    }

    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    setstartingNode({ x: x, y: y })
  }


  useEffect(() => {
    if (currentCropped.startingX < 0) {
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingX: 0
      }))
    }
    if (currentCropped.startingY < 0) {
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingY: 0
      }))
    }
    if (currentCropped.startingX - 1 > Math.floor(dimensions.width) - currentCropped.width) {
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingX: dimensions.width - currentCropped.width
      }))
    }
    if (currentCropped.startingY - 1 >= dimensions.height - currentCropped.height) {
      setCurrentCropped((prevState) => ({
        ...prevState,
        startingY: dimensions.height - currentCropped.height
      }))
    }
  }, [currentCropped])


  const mouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY

    if (
      (x > currentCropped.startingX - 5 && x < currentCropped.startingX + 5 && y > currentCropped.startingY - 5 && y < currentCropped.startingY + 5)
    ) {
      document.body.style.setProperty('cursor', 'nw-resize')

    }
    else if (x > currentCropped.startingX + currentCropped.width - 5 &&
      x < currentCropped.startingX + currentCropped.width + 5 &&
      y > currentCropped.startingY - 5 && y < currentCropped.startingY + 5
    ) {
      document.body.style.setProperty('cursor', 'nesw-resize')

    }
    else if (x > currentCropped.startingX - 5 && x < currentCropped.startingX + 5 &&
      y > currentCropped.startingY + currentCropped.height - 5 &&
      y < currentCropped.startingY + currentCropped.height + 5
    ) {
      document.body.style.setProperty('cursor', 'nesw-resize')

    } else if (
      x > currentCropped.startingX + currentCropped.width - 5 &&
      x < currentCropped.startingX + currentCropped.width + 5 &&
      y > currentCropped.startingY + currentCropped.height - 5 &&
      y < currentCropped.startingY + currentCropped.height + 5
    ) {
      document.body.style.setProperty('cursor', 'nw-resize')
    } else if ((x > currentCropped.startingX + 5 && x < currentCropped.startingX + currentCropped.width - 5 && y > currentCropped.startingY - 5 && y < currentCropped.startingY + 5) || (x > currentCropped.startingX + 5 && x < currentCropped.startingX + currentCropped.width - 5 && y > currentCropped.startingY + currentCropped.height - 5 && y < currentCropped.startingY + currentCropped.height + 5)) {
      document.body.style.setProperty('cursor', 'n-resize')
    } else if ((x > currentCropped.startingX - 5 && x < currentCropped.startingX + 5 && y > currentCropped.startingY && y < currentCropped.height + currentCropped.startingY) || (x > currentCropped.startingX + currentCropped.width - 5 && x < currentCropped.startingX + currentCropped.width + 5 && y > currentCropped.startingY && y < currentCropped.height + currentCropped.startingY)) {
      document.body.style.setProperty('cursor', 'w-resize')
    }
    else if ((x > currentCropped.startingX && x < currentCropped.width + currentCropped.startingX && y > currentCropped.startingY &&
      y < currentCropped.height + currentCropped.startingY) || isDragging) {
      document.body.style.setProperty('cursor', 'grab')
    } else {
      document.body.style.setProperty('cursor', 'default')
    }


    if (isDragging) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const img = imgRef.current
      canvas!.width = canvas!.width // Clear the canvas and resize it
      ctx!.drawImage(img!, 0, 0, dimensions.width, dimensions.height)
      ctx!.strokeStyle = 'white'
      // ctx!.fillStyle = 'rgba(0, 0, 0, 0.1)'
      // ctx!.fillRect()

      ctx!.setLineDash([5, 5])
      ctx!.lineWidth = 2
      let movedArea = {
        xMoved: currentCropped.startingX + (x - startingNode.x),
        yMoved: currentCropped.startingY + (y - startingNode.y)
      }

      movedArea.xMoved <= 0 ? 10 : movedArea.xMoved
      movedArea.yMoved <= 0 ? 10 : movedArea.yMoved

      if (movedArea.xMoved <= 0) {
        movedArea.xMoved = 0
      }
      if (movedArea.yMoved <= 0) {
        movedArea.yMoved = 0
      }
      if (movedArea.yMoved + currentCropped.height >= dimensions.height) {
        console.log('movedArea', movedArea)
        movedArea.yMoved = dimensions.height - currentCropped.height - 2
      } if (movedArea.xMoved + currentCropped.width >= dimensions.width) {
        movedArea.xMoved = dimensions.width - currentCropped.width - 2
        // setCurrentCropped({
        //   startingX: dimensions.width - currentCropped.width - 2,
        //   startingY: movedArea.yMoved,
        //   height: currentCropped.height,
        //   width: currentCropped.width
        // })
      }

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

    if (isResize) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      const img = imgRef.current
      canvas!.width = canvas!.width // Clear the canvas and resize it
      ctx!.drawImage(img!, 0, 0, dimensions.width, dimensions.height)
      ctx!.strokeStyle = 'white'
      ctx!.setLineDash([5, 5])
      ctx!.lineWidth = 2

      if (croppingNode == 1) {
        const widthDiff = currentCropped.startingX - x
        const heightDiff = currentCropped.startingY - y
        ctx!.strokeRect(x, y, currentCropped.width + widthDiff, currentCropped.height + heightDiff)

        setDifference({
          width: currentCropped.width + widthDiff,
          height: currentCropped.height + heightDiff,
          x: 0,
          y: 0
        })
      }

      if (croppingNode == 2) {
        const widthDiff = x - (currentCropped.startingX + currentCropped.width)
        ctx!.strokeRect(currentCropped.startingX, y, currentCropped.width + widthDiff, (currentCropped.height + currentCropped.startingY) - y)
        setDifference({
          width: currentCropped.width + widthDiff,
          height: (currentCropped.height + currentCropped.startingY) - y,
          x: 0,
          y: y
        })
      }

      if (croppingNode == 3) {
        ctx!.strokeRect(x, currentCropped.startingY, (currentCropped.startingX - x) + currentCropped.width, currentCropped.height + (y - (currentCropped.startingY + currentCropped.height)))

        setDifference({
          x: x,
          y: 0,
          width: (currentCropped.startingX - x) + currentCropped.width,
          height: currentCropped.height + (y - (currentCropped.startingY + currentCropped.height))
        })
      }

      if (croppingNode == 4) {
        ctx!.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width + (x - (currentCropped.startingX + currentCropped.width)), currentCropped.height + (y - (currentCropped.startingY + currentCropped.height)))

        setDifference({
          x: 0,
          y: 0,
          width: currentCropped.width + (x - (currentCropped.startingX + currentCropped.width)),
          height: currentCropped.height + (y - (currentCropped.startingY + currentCropped.height)),
        })
      }

      if (croppingNode == 5) {
        const heightDiff = currentCropped.startingY - y
        ctx!.strokeRect(currentCropped.startingX, y, currentCropped.width, currentCropped.height + heightDiff)
        setDifference({
          x: 0,
          y: y,
          height: currentCropped.height + heightDiff,
          width: 0
        })
      }

      if (croppingNode == 6) {
        const widthDiff = currentCropped.startingX - x
        ctx!.strokeRect(x, currentCropped.startingY, currentCropped.width + widthDiff, currentCropped.height)
        setDifference({
          x: x,
          y: 0,
          height: 0,
          width: currentCropped.width + widthDiff
        })
      }

      if (croppingNode == 7) {
        const heightDiff = (y - (currentCropped.startingY + currentCropped.height))
        ctx?.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width, currentCropped.height + heightDiff)
        setDifference({
          x: 0,
          y: 0,
          height: currentCropped.height + heightDiff,
          width: 0
        })
      }

      if (croppingNode == 8) {
        const widthDiff = (x - (currentCropped.startingX + currentCropped.width))
        ctx!.strokeRect(currentCropped.startingX, currentCropped.startingY, currentCropped.width + widthDiff, currentCropped.height)
        setDifference({
          x: 0,
          y: 0,
          height: 0,
          width: currentCropped.width + widthDiff
        })
      }
    }
  }


  console.log('currentCropped', currentCropped)

  const cropImage = (props: CropImageProps) => {

    const { startingX, startingY, totalWidth, totalHeight } = props

    const canvas = canvasRef.current
    const ctx = canvas!.getContext('2d')
    const img = imgRef.current

    if (!img || !ctx) {
      return
    }

    const croppedCanvas: any = canvasPreviewRef.current
    const croppedCtx = croppedCanvas!.getContext('2d')

    if (!croppedCtx) {
      return
    }

    croppedCanvas.width = totalWidth
    croppedCanvas.height = totalHeight

    const imageData = ctx!.getImageData(startingX < 0 ? 5 : startingX + 2, startingY < 0 ? 5 : startingY + 2, totalWidth - 3, totalHeight - 3)
    croppedCtx.putImageData(imageData, 0, 0)

  }

  const mouseUP = (event: any) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY

    const distance = Math.sqrt(Math.pow(x - startingNode.x, 2) + Math.pow(y - startingNode.y, 2))


    if (!isResize && !isDragging) {
      return
    }

    if (distance < 10) {
      setIsResize(false)
      setIsDragging(false)
      return
    }

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
      setIsDragging(false)
    }

    if (isResize) {
      if (croppingNode == 1) {
        setCurrentCropped({
          startingX: x,
          startingY: y,
          width: difference.width,
          height: difference.height
        })
        startingX = x
        startingY = y
        totalWidth = difference.width,
          totalHeight = difference.height
      }
      else if (croppingNode == 2) {
        setCurrentCropped({
          startingX: currentCropped.startingX,
          startingY: difference.y,
          width: difference.width,
          height: difference.height
        })
        startingX = currentCropped.startingX,
          startingY = difference.y,
          totalWidth = difference.width,
          totalHeight = difference.height
      }
      else if (croppingNode == 3) {
        setCurrentCropped({
          startingX: difference.x,
          startingY: currentCropped.startingY,
          width: difference.width,
          height: difference.height
        })
        startingX = difference.x,
          startingY = currentCropped.startingY,
          totalWidth = difference.width,
          totalHeight = difference.height
      }
      else if (croppingNode == 4) {
        setCurrentCropped({
          startingX: currentCropped.startingX,
          startingY: currentCropped.startingY,
          width: difference.width,
          height: difference.height
        })
        startingX = currentCropped.startingX,
          startingY = currentCropped.startingY,
          totalWidth = difference.width,
          totalHeight = difference.height
      } else if (croppingNode == 5) {
        setCurrentCropped({
          startingX: currentCropped.startingX,
          startingY: difference.y,
          width: currentCropped.width,
          height: difference.height
        })
        startingX = currentCropped.startingX,
          startingY = difference.y,
          totalWidth = currentCropped.width,
          totalHeight = difference.height
      } else if (croppingNode == 6) {
        setCurrentCropped({
          startingX: difference.x,
          startingY: currentCropped.startingY,
          width: difference.width,
          height: currentCropped.height
        })
        startingX = difference.x,
          startingY = currentCropped.startingY,
          totalWidth = difference.width,
          totalHeight = currentCropped.height
      }
      else if (croppingNode == 7) {
        setCurrentCropped({
          startingX: currentCropped.startingX,
          startingY: currentCropped.startingY,
          width: currentCropped.width,
          height: difference.height
        })
        startingX = currentCropped.startingX,
          startingY = currentCropped.startingY,
          totalWidth = currentCropped.width,
          totalHeight = difference.height
      }
      else if (croppingNode == 8) {
        setCurrentCropped({
          startingX: currentCropped.startingX,
          startingY: currentCropped.startingY,
          width: difference.width,
          height: currentCropped.height
        })
        startingX = currentCropped.startingX,
          startingY = currentCropped.startingY,
          totalWidth = difference.width,
          totalHeight = currentCropped.height
      }

      setDifference({
        height: 0,
        x: 0,
        width: 0,
        y: 0
      })
      setIsResize(false)
    }

    cropImage({
      startingX: startingX,
      startingY: startingY,
      totalWidth: totalWidth,
      totalHeight: totalHeight
    })
  }


  const mouseLeave = (event: any) => {
    setIsDragging(false)
    setIsResize(false)
    document.body.style.setProperty('cursor', 'default')
    mouseUP(event)
  }

  return (
    <React.Fragment>
      <canvas
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        onMouseUp={mouseUP}
        ref={canvasRef} />
      <img src={imageUrl} alt="uploaded" height={dimensions.height} width={dimensions.width} ref={imgRef} style={{ display: 'none' }} />
      <canvas style={{
        marginTop: '20px'
      }} ref={canvasPreviewRef} />

    </React.Fragment>
  )
}

export default ImageCropper
