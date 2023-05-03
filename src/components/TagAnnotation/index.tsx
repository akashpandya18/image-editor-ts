import { annotation } from "../../types";
import React from "react";

export const handleCanvasMouseMove = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  annotations: annotation[],
  setHoverTag: React.Dispatch<React.SetStateAction<string>>,
  setHoverPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  setShowH: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  event.preventDefault();
  const canvas = canvasRef.current;
  const ctx = canvas!.getContext("2d");
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;

  // Check if the mouse is hovering over the white dot
  const hoveredDot = annotations.find((annotation: any) => {
    ctx?.beginPath()
    ctx?.arc(annotation.x, annotation.y, 10, 0, 2 * Math.PI)
    return ctx?.isPointInPath(x, y)
  })
  if (hoveredDot) {
    canvas!.style.cursor = "pointer"
    let x = hoveredDot.x
    let y = hoveredDot.y
    let pos = { x, y }
    setHoverTag(hoveredDot.tag)
    setHoverPos(pos)
    setShowH(true)
  } else {
    canvas!.style.cursor = "default"
    setHoverTag("")
    setShowH(false)
  }
}

export const handleCanvasClick = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  annotations: annotation[],
  setTempRedPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteTag: React.Dispatch<React.SetStateAction<boolean>>,
  setShowH: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteTagId: React.Dispatch<React.SetStateAction<string>>,
  setCurrentAnnotation: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >,
  setTag: React.Dispatch<React.SetStateAction<string>>,
  setDeletePos: React.Dispatch<React.SetStateAction<{ xN: number; yN: number }>>
): void => {
  setTempRedPrompt(true);
  setDeleteTag(false);
  setDeleteTagId("");
  const canvas = canvasRef.current;
  const ctx = canvas!.getContext("2d");
  const rect = canvas!.getBoundingClientRect();
  const x = event.clientX - rect!.left;
  const y = event.clientY - rect!.top;
  const annotation = { x, y };
  setCurrentAnnotation(annotation);
  setTag("");
  const xFind = event.nativeEvent.offsetX;
  const yFind = event.nativeEvent.offsetY;

  // Check if the mouse click is on any of the tags
  const clickedDot = annotations.find((annotation: annotation) => {
    ctx?.beginPath()
    ctx?.arc(annotation.x, annotation.y, 10, 0, 2 * Math.PI)
    return ctx?.isPointInPath(xFind, yFind)
  })

  // Check if the click was within the bounds of the tags
  if (clickedDot) {
    setTempRedPrompt(false)
    setDeleteTag(true)
    setShowH(false)
    setDeleteTagId(clickedDot.id)
    const xN = clickedDot.x
    const yN = clickedDot.y
    const annotationN = { xN, yN }
    setDeletePos(annotationN)
  }
}

export const handleInputChange = (
  event: any,
  setTag: React.Dispatch<React.SetStateAction<string>>
): void => {
  setTag(event.target.value);
};

export const handleSubmitTag = (
  e: any,
  currentAnnotation: { x: number; y: number },
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageSrcMain: string,
  tag: string,
  annotations: annotation[],
  id: string,
  setAnnotations: React.Dispatch<React.SetStateAction<annotation[]>>,
  setTag: React.Dispatch<React.SetStateAction<string>>,
  setCurrentAnnotation: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >,
  setTempRedPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  showAllTags: boolean
): void => {
  e.preventDefault();
  const x = currentAnnotation.x;
  const y = currentAnnotation.y;
  const canvas = canvasRef.current;
  const ctx = canvas!.getContext("2d");
  const image = new Image();
  image.src = imageSrcMain;
  image.width = canvas!.width;
  image.height = canvas!.height;

  if (tag !== "") {
    //dot
    ctx!.beginPath()
    ctx!.fillStyle = "yellow"
    ctx!.arc(x, y, 10, 0, 2 * Math.PI)
    ctx!.fill()
    const tempAnnot = [...annotations, { id, x, y, tag }]
    setAnnotations([...annotations, { id, x, y, tag }])
    setTag("")
    setCurrentAnnotation({ x: 0, y: 0 })
    setTempRedPrompt(false)

    if (showAllTags) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      setTimeout(() => {
        ctx!.drawImage(image, 0, 0, image.width, image.height)
        tempAnnot.forEach((annot: any) => {
          const { x, y, tag } = annot
          //tag
          ctx!.font = "24px Arial"
          // Draw the background color rectangle
          let textWidth = ctx!.measureText(tag).width

          //tags
          ctx!.beginPath()
          ctx!.fillStyle = "yellow"
          ctx!.arc(x, y, 10, 0, 2 * Math.PI)
          ctx!.fill()

          if (x - image.width > -200 && y - image.height < -100) {
            ctx!.fillStyle = "#2A2A2A"
            ctx!.fillRect(x - textWidth - 20, y, textWidth + 20, 40)
            ctx!.fillStyle = "#fff"
            ctx!.fillText(tag, x - textWidth - 10, y + 25)
          } else if (x - image.width < -200 && y - image.height > -100) {
            ctx!.fillStyle = "#2A2A2A"
            ctx!.fillRect(x, y - 40, textWidth + 20, 40)
            ctx!.fillStyle = "#fff"
            ctx!.fillText(tag, x + 10, y - 15)
          } else if (x - image.width > -200 && y - image.height > -100) {
            ctx!.fillStyle = "#2A2A2A"
            ctx!.fillRect(x - textWidth - 20, y - 40, textWidth + 20, 40)
            ctx!.fillStyle = "#fff"
            ctx!.fillText(tag, x - textWidth - 10, y - 15)
          } else {
            ctx!.fillStyle = "#2A2A2A"
            ctx!.fillRect(x, y, textWidth + 20, 40)
            ctx!.fillStyle = "#fff"
            ctx!.fillText(tag, x + 10, y + 25)
          }
        })
      }, 10)
    }
  }

  setTag("")
  setCurrentAnnotation({ x: 0, y: 0 })
  setTempRedPrompt(false)
}

export const handleClearSingleTag = (
  e: any,
  setDeleteTagId: React.Dispatch<React.SetStateAction<string>>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imageSrcMain: string,
  setDeleteTag: React.Dispatch<React.SetStateAction<boolean>>,
  annotations: annotation[],
  deleteTagId: string,
  setAnnotations: React.Dispatch<React.SetStateAction<annotation[]>>,
  setTag: React.Dispatch<React.SetStateAction<string>>,
  setCurrentAnnotation: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >,
  setTempRedPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  e.preventDefault();
  setShowAllTags(false);

  const filteredArray = annotations.filter(
    (item: any) => item.id !== deleteTagId
  )

  const image = new Image()
  image.src = imageSrcMain
  const canvas = canvasRef.current
  const context = canvas!.getContext("2d")

  image.width = canvas!.width
  image.height = canvas!.height

  context!.clearRect(0, 0, canvas!.width, canvas!.height)

  setTimeout(() => {
    context!.drawImage(image, 0, 0, image.width, image.height)
    if (deleteTagId !== "") {
      // populate dots again
      filteredArray.forEach((annot: any) => {
        context!.beginPath()
        context!.fillStyle = "yellow"
        context!.arc(annot.x, annot.y, 10, 0, 2 * Math.PI)
        context!.fill()
      })
      setAnnotations(filteredArray)
      setDeleteTag(false)
      setDeleteTagId("")
      setTag("")
      setCurrentAnnotation({ x: 0, y: 0 })
      setTempRedPrompt(false)
    }
  }, 10)
}

export const hideTags = (
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>,
  imageSrcMain: string,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  annotations: annotation[]
): void => {
  setShowAllTags(false);
  const image = new Image();
  image.src = imageSrcMain;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  image.width = canvas!.width
  image.height = canvas!.height

  context!.clearRect(0, 0, canvas!.width, canvas!.height)
  setTimeout(() => {
    context!.drawImage(image, 0, 0, image.width, image.height)
    annotations.forEach((annot: any) => {
      context!.beginPath()
      context!.fillStyle = "yellow"
      context!.arc(annot.x, annot.y, 10, 0, 2 * Math.PI)
      context!.fill()
    })
  }, 10)
}

export const showTags = (
  setShowAllTags: React.Dispatch<React.SetStateAction<boolean>>,
  imageSrcMain: string,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  annotations: annotation[]
): void => {
  setShowAllTags(true);
  const image = new Image();
  image.src = imageSrcMain;
  const canvas = canvasRef.current;
  const context = canvas!.getContext("2d");

  image.width = canvas!.width
  image.height = canvas!.height

  context!.clearRect(0, 0, canvas!.width, canvas!.height)
  setTimeout(() => {
    context!.drawImage(image, 0, 0, image.width, image.height)
    annotations.forEach((annot: any) => {
      const { x, y, tag } = annot
      //tag
      context!.font = "24px Arial"
      // Draw the background color rectangle
      let textWidth = context!.measureText(tag).width

      //tags
      context!.beginPath()
      context!.fillStyle = "yellow"
      context!.arc(x, y, 10, 0, 2 * Math.PI)
      context!.fill()

      if (x - image.width > -200 && y - image.height < -100) {
        context!.fillStyle = "#2A2A2A"
        context!.fillRect(x - textWidth - 20, y, textWidth + 20, 40)
        context!.fillStyle = "#fff"
        context!.fillText(tag, x - textWidth - 10, y + 25)
      } else if (x - image.width < -200 && y - image.height > -100) {
        context!.fillStyle = "#2A2A2A"
        context!.fillRect(x, y - 40, textWidth + 20, 40)
        context!.fillStyle = "#fff"
        context!.fillText(tag, x + 10, y - 15)
      } else if (x - image.width > -200 && y - image.height > -100) {
        context!.fillStyle = "#2A2A2A"
        context!.fillRect(x - textWidth - 20, y - 40, textWidth + 20, 40)
        context!.fillStyle = "#fff"
        context!.fillText(tag, x - textWidth - 10, y - 15)
      } else {
        context!.fillStyle = "#2A2A2A"
        context!.fillRect(x, y, textWidth + 20, 40)
        context!.fillStyle = "#fff"
        context!.fillText(tag, x + 10, y + 25)
      }
    })
  }, 10)
}

export const handleScreenShot = (
  canvasRef: React.RefObject<HTMLCanvasElement>
): void => {
  const canvas = canvasRef.current;
  const image = canvas!.toDataURL("image/png");

  // To download the image, you can create a link element and simulate a click
  const link = document.createElement("a")
  link.download = "canvas-screenshot.png"
  link.href = image
  link.click()
}
