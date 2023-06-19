import { nanoid } from "nanoid"


interface TextTag {
  x: number,
  y: number,
  text: string,
  color: string,
  size: number,
  id?: number
}

export const clickHandler = (
  event: any,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  currentClicked: any,
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentClicked: any,
  imgSrc: string,
  allTextTags: any,
  isDraggingText: boolean,
  setIsDraggingText: React.Dispatch<React.SetStateAction<boolean>>,
  draggingText: string,
  setDraggingText: React.Dispatch<React.SetStateAction<string>>,
  isEditing: any,
  setIsEditing: any,
  setFormData: any
) => {
  const x = event.nativeEvent.offsetX
  const y = event.nativeEvent.offsetY
  const canvas = canvasRef.current
  const ctx = canvas!.getContext('2d')

  const clickrect = allTextTags.find((tags: any) => {
    ctx!.font = tags.size + 'px monospace'
    let textWidth = ctx!.measureText(tags.text).width
    const textHeight = parseInt(ctx!.font, 10)
    const padding = 5
    const rectHeight = textHeight + padding * 2

    return (
      x > tags.x + 10 &&
      x < tags.x + 10 + textWidth &&
      y > tags.y - rectHeight / 2 &&
      y < tags.y - rectHeight / 2 + rectHeight
    )
  })

  if (!clickrect) {
    ctx!.strokeStyle = 'yellow'
    ctx!.setLineDash([10, 10])
    ctx!.lineWidth = 2
    const image = new Image()
    image.src = imgSrc
    image.width = canvas!.width
    image.height = canvas!.height
    if (image) {
      if (image.complete) {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        ctx!.drawImage(image, 0, 0, image.width, image.height)
      } else {
        console.log('image not completed')
        image.onload = (): void => {
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
          ctx!.drawImage(image, 0, 0, image.width, image.height)
        }
      }
    } else {
      console.log('image not found')
    }
    const clicked = { x, y }
    setTempPrompt(true)
    setIsEditing(false)
    setCurrentClicked(clicked)
    setFormData({
      text: "",
      color: "#ffffff",
      size: 32
    })
  }
  else {
    const { text, id, color, size, x, y } = allTextTags.find((obj: any) => obj.id === clickrect.id)
    setFormData({
      text: text,
      color: color,
      size: size
    })
    console.log('text, id, color, size, x, y ', text, id, color, size, x, y)



    console.log('clickrect', clickrect.id)
    const clicked = { x, y }
    setTempPrompt(true)
    setIsEditing(true)
    setCurrentClicked(clicked)
  }
}

export const textOnChangeHandler1 = (
  textForm: any,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  currentClicked: any,
  imgSrc: string,
  isEditing: boolean
) => {
  const { text, color, size } = textForm
  const canvas = canvasRef.current
  const ctx = canvas!.getContext('2d')
  ctx!.strokeStyle = 'yellow'
  ctx!.setLineDash([10, 10])
  ctx!.lineWidth = 2

  const image = new Image()
  image.src = imgSrc
  image.width = canvas!.width
  image.height = canvas!.height

  ctx!.fillStyle = color
  ctx!.strokeStyle = 'gray'

  ctx!.font = `${size || 22}px monospace`

  const textWidth: number = ctx!.measureText(text).width
  const textHeight: number = parseInt(ctx!.font, 10)

  const padding: number = 10
  const rectWidth: number = textWidth + padding * 2
  const rectHeight: number = textHeight + padding * 2

  if (image) {
    if (image.complete) {
      if (isEditing) {

      } else {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        ctx!.drawImage(image, 0, 0, image.width, image.height)
        text.length > 0 &&
          ctx!.strokeRect(
            currentClicked.x,
            currentClicked.y - rectHeight / 2,
            rectWidth,
            rectHeight,
          )
        ctx!.textBaseline = 'middle'
        ctx!.fillText(text, currentClicked.x + padding, currentClicked.y)
      }
    } else {
      console.log('image not completed')
      image.onload = () => {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        ctx!.drawImage(image, 0, 0, image.width, image.height)
        text.length > 0 &&
          ctx!.strokeRect(
            currentClicked.x,
            currentClicked.y - rectHeight / 2,
            rectWidth,
            rectHeight,
          )
        ctx!.textBaseline = 'middle'
        ctx!.fillText(text, currentClicked.x + padding, currentClicked.y)
      }
    }
  } else {
    console.log('image not found')
  }
}

export const submitHandler = (
  e: any,
  allTextTags: any,
  setAllTextTags: any,
  currentClicked: any,
  setTempPrompt: React.Dispatch<React.SetStateAction<boolean>>,
  tempPrompt: boolean,
  setFormData: any
) => {
  e.preventDefault()

  setAllTextTags((prev: any) => [...prev, {
    id: nanoid(5),
    x: currentClicked?.x,
    y: currentClicked?.y,
    text: e.target.text.value,
    size: e.target.size.value,
    color: e.target.color.value,
  }])
  setFormData({
    text: "",
    size: 32,
    color: "#ffffff"
  })
  setTempPrompt(false)
}


export const handleMouseMove = (
  event: any,
  isDraggingText: any,
  setIsDraggingText: any,
  draggingText: any,
  setDraggingText: any,
  canvasRef: any,
  allTextTags: any,
  dimensions: any,
  imgSrc: any,
  currentClicked: any
) => {

  const mouseX = event.nativeEvent.offsetX
  const mouseY = event.nativeEvent.offsetY

  if (isDraggingText) {

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { width, height } = dimensions
    canvas!.width = width
    canvas!.height = height
    ctx!.strokeStyle = 'gray'
    ctx!.setLineDash([10, 10])
    ctx!.lineWidth = 2
    const { text, id, color, size, x, y } = allTextTags.find((obj: any) => obj.id === draggingText)


    console.log('draggingText', draggingText, text, x, y, id, color, size)

    const textWidth: number = ctx!.measureText(text).width
    const textHeight: number = parseInt(ctx!.font, 10)

    const padding: number = 10

    // console.log('textWidth', ctx.emsa)

    const image = new Image()
    image.src = imgSrc
    ctx!.fillStyle = "white"

    let movedArea = {
      xMoved: x + (mouseX - currentClicked.x),
      yMoved: y + (mouseY - currentClicked.y),
    }

    if (image.complete) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height)

      allTextTags.forEach((texts: any) => {
        const { x, y, text, color, size, id: currentId } = texts
        ctx!.fillStyle = color
        ctx!.font = `${size || 22}px monospace`
        ctx!.beginPath()
        if (currentId !== id) {
          ctx!.fillText(text, x + 10, y + (textHeight / 4))
        }
      })

      ctx!.textBaseline = 'middle'
      ctx!.fillText(text, movedArea.xMoved + 10, movedArea.yMoved + (textHeight / 4))

      const rectWidth: number = (ctx.measureText(text).width) + padding * 2
      const rectHeight: number = (parseInt(ctx!.font, 10)) + padding * 2

      ctx!.strokeRect(
        movedArea.xMoved,
        movedArea.yMoved - rectHeight / 2,
        rectWidth,
        rectHeight,
      )
    }
    else {
      image.onload = () => {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height)
        const rectWidth: number = textWidth + padding * 2
        const rectHeight: number = textHeight + padding * 2
        allTextTags.forEach((texts: any) => {
          const { x, y, text, color, size, id: currentId } = texts
          ctx!.fillStyle = color
          ctx!.font = `${size || 22}px monospace`
          ctx!.beginPath()
          if (currentId !== id) {
            ctx!.fillText(text, x + 10, y + (textHeight / 4))
          }
        })
        ctx!.strokeRect(
          movedArea.xMoved,
          movedArea.yMoved - rectHeight / 2,
          rectWidth,
          rectHeight,
        )
        ctx!.textBaseline = 'middle'
        ctx!.fillText(text, movedArea.xMoved + 10, movedArea.yMoved + (textHeight / 4))
      }
    }
  }
}

export const handleMouseDown = (
  event: any,
  isDraggingText: any,
  setIsDraggingText: any,
  draggingText: any,
  setDraggingText: any,
  canvasRef: any,
  allTextTags: any,
  setCurrentClicked: any
) => {
  const x = event.nativeEvent.offsetX
  const y = event.nativeEvent.offsetY
  const canvas = canvasRef.current
  const ctx = canvas!.getContext('2d')

  const clickrect = allTextTags.find((tags: any) => {
    ctx!.font = tags.size + 'px monospace'
    let textWidth = ctx!.measureText(tags.text).width
    const textHeight = parseInt(ctx!.font, 10)
    const padding = 5
    const rectHeight = textHeight + padding * 2

    return (
      x > tags.x + 10 &&
      x < tags.x + 10 + textWidth &&
      y > tags.y - rectHeight / 2 &&
      y < tags.y - rectHeight / 2 + rectHeight
    )
  })

  if (clickrect) {
    setIsDraggingText(true)
    setDraggingText(clickrect?.id)
    setCurrentClicked({ x: x, y: y })
  }

  else {
    setIsDraggingText(false)
    setDraggingText("")
  }
}


export const handleMouseUp = (
  event: any,
  isDraggingText: any,
  setIsDraggingText: any,
  draggingText: any,
  setDraggingText: any,
  canvasRef: any,
  allTextTags: any,
  setAllTextTags: any,
  currentClicked: any
) => {


  if (isDraggingText) {
    setDraggingText("")
    setIsDraggingText(false)
  }

  const mouseX = event.nativeEvent.offsetX
  const mouseY = event.nativeEvent.offsetY

  const { x, y } = allTextTags.find((obj: any) => obj.id === draggingText)

  let movedArea = {
    xMoved: x + (mouseX - currentClicked.x),
    yMoved: y + (mouseY - currentClicked.y),
  }

  if (isDraggingText) {
    setAllTextTags((prevTag: any) => {
      const updatedTags = prevTag.map((tag: any) => {
        if (tag.id === draggingText) {
          return { ...tag, x: movedArea.xMoved, y: movedArea.yMoved }
        }
        return tag
      })
      return updatedTags
    })
    setIsDraggingText(false)
    setDraggingText(0)
  }
}