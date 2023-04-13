import { useEffect, useRef, useState } from 'react'

const ImageCropper = () => {
  const [image, setImage] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [cropping, setCropping] = useState(false)
  const [croppedArea, setCroppedArea] = useState(null)
  const [currentCropped, setCurrentCropped] = useState()
  const [isDragging, setIsDragging] = useState(false)
  const imgRef = useRef<HTMLCanvasElement>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (image) {
      const img = imgRef.current
      const canvas = canvasRef.current
      const ctx = canvas!.getContext('2d')

      img!.onload = () => {
        // const { width:any, height } = img
        canvas!.width = img?.width || 0
        canvas!.height = img?.height || 0
        ctx!.drawImage(img!, 0, 0)
      }
    }
  }, [image])


  function handleFileInputChange(e: any) {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event: any) => {
      console.log('first', typeof event)
      setImage(event.target.result)
    }

    reader.readAsDataURL(file)
  }

  function handleMouseDown(e: any) {

    const mouseX = e.nativeEvent.offsetX
    const mouseY = e.nativeEvent.offsetY
    if (croppedImage) {
      console.log('currentCropped', currentCropped, mouseX, e.nativeEvent.offsetY, (mouseX > currentCropped.startingX && mouseX < currentCropped.mouseX && mouseY > currentCropped.startingY && mouseY < currentCropped.mouseY))
      if (mouseX > currentCropped.startingX && mouseX < currentCropped.mouseX && mouseY > currentCropped.startingY && mouseY < currentCropped.mouseY) {
        setIsDragging(true)
      } else {
        setIsDragging(false)
        setCropping(true)

      }
    } else {
      setCropping(true)
    }

    setCroppedArea({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY } as any)



    console.log('mouseX', mouseX, canvasRef, mouseY)


  }

  function handleMouseMove(e) {
    if (cropping) {
      const canvas = canvasRef.current
      const ctx = canvas!.getContext('2d')

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(imgRef.current, 0, 0)

      const { x, y } = croppedArea

      // console.log('e.nativeEvent.offsetX', e.nativeEvent.offsetX , x)
      setCurrentCropped({
        startingX: x,
        startingY: y,
        mouseX: e.nativeEvent.offsetX,
        mouseY: e.nativeEvent.offsetY
      })

      const width = e.nativeEvent.offsetX - x
      const height = e.nativeEvent.offsetY - y
      ctx!.strokeStyle = 'red'
      ctx!.setLineDash([10, 10])
      ctx!.lineWidth = 2
      ctx!.strokeRect(x, y, width, height)
    }

  }


  // function handleMouseMove(e) {
  //   if (isMouseDown) {
  //     const mouseX = e.clientX;
  //     const mouseY = e.clientY;

  //     // Calculate the distance the mouse has moved since the last event
  //     const deltaX = mouseX - lastMousePosition.x;
  //     const deltaY = mouseY - lastMousePosition.y;

  //     if (isClickInsideCropArea(mouseX, mouseY)) {
  //       // Move the image if the click is inside the crop area
  //       cropStart.x -= deltaX;
  //       cropStart.y -= deltaY;
  //       redraw();
  //     } else {
  //       // Update the crop start position if the click is outside the crop area
  //       cropStart.x = mouseX - (cropWidth / 2);
  //       cropStart.y = mouseY - (cropHeight / 2);
  //       redraw();
  //     }

  //     lastMousePosition = { x: mouseX, y: mouseY };
  //   }
  // }



  function handleMouseUp(e: any) {
    setCropping(false)
    const { x, y } = croppedArea
    const width = e.nativeEvent.offsetX - x
    const height = e.nativeEvent.offsetY - y

    const canvas = canvasRef.current
    const croppedCanvas = document.createElement('canvas')
    const ctx = croppedCanvas.getContext('2d')

    const xPosition = x + (width < 0 ? width : 0)
    const yPosition = y + (height < 0 ? height : 0)
    const newWidth = Math.abs(width)
    const newHeight = Math.abs(height)

    croppedCanvas.width = newWidth
    croppedCanvas.height = newHeight

    ctx!.drawImage(canvas!, xPosition + 1, yPosition + 1, newWidth - 2, newHeight - 2, 0, 0, newWidth, newHeight)

    setCroppedImage(croppedCanvas.toDataURL())
  }



  function handleClear() {
    setImage(null)
    setCroppedImage(null)
    setCroppedArea(null)
    setCropping(false)

    const canvas = canvasRef.current
    const ctx = canvas!.getContext('2d')

    ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
  }

  function handleUndo() {
    setCroppedImage(null)

    const canvas = canvasRef.current
    const ctx = canvas!.getContext('2d')

    ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
    ctx!.drawImage(imgRef.current, 0, 0)
  }

  function handleDownload() {
    const link = document.createElement('a')
    link.download = 'cropped-image.png'
    link.href = croppedImage

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = croppedArea.width
      canvas.height = croppedArea.height

      console.log('croppedArea', croppedArea)

      ctx!.drawImage(img, croppedArea.x, croppedArea.y, croppedArea.width, croppedArea.height, 0, 0, croppedArea.width, croppedArea.height)
      ctx!.strokeRect(0, 0, croppedArea.width, croppedArea.height)
      ctx!.strokeStyle = 'transparent' // set the strokeStyle to transparent
      link.href = canvas.toDataURL()
      link.click()
    }

    img.src = croppedImage
    console.log('croppedImage', croppedImage)
  }

  function renderCroppedImage() {
    if (croppedImage) {
      return (
        <div style={{ marginTop: '20px' }}>
          <h2>Cropped Image:</h2>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )
    }
    return null
  }

  return (
    <>
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
      {image && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
            <img src={image} alt="uploaded" ref={imgRef} style={{ display: 'none' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleUndo}>Undo</button>

            {croppedImage && <button onClick={handleDownload}>Download</button>}
          </div>
          {renderCroppedImage()}
        </>
      )}
    </>
  )
}

export default ImageCropper
