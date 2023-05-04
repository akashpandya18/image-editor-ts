

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
  draggingText: number,
  setDraggingText: React.Dispatch<React.SetStateAction<number>>,
) => {
  const x = event.nativeEvent.offsetX
  const y = event.nativeEvent.offsetY
  const canvas = canvasRef.current
  const ctx = canvas!.getContext('2d')

  const clickrect = allTextTags.reverse().find((tags: any) => {
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
    setCurrentClicked(clicked)

  }
  else {
    console.log('clickrect', clickrect.id)
  }
}

export const textOnChangeHandler1 = (
  textForm: any,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  currentClicked: any,
  imgSrc: string,
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
) => {
  e.preventDefault()
  setAllTextTags([
    ...allTextTags,
    {
      id: allTextTags?.length + 1,
      x: currentClicked?.x,
      y: currentClicked?.y,
      text: e.target.text.value,
      size: e.target.size.value,
      color: e.target.color.value,
    },
  ])
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
  dimensions: any
) => {

  const canvas = canvasRef.current
  const ctx = canvas!.getContext("2d")
  const { width, height } = dimensions
  canvas!.width = width
  canvas!.height = height
  const image = new Image()
  image.src = imgSrc
  ctx!.fillStyle = "white"
  const textHeight = parseInt(ctx!.font, 10)
  image.onload = () => {
    ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height)
    allTextTags.forEach((texts: TextObjectProps) => {
      const { x, y, text, color, size } = texts
      ctx!.fillStyle = color
      ctx!.font = `${size || 22}px monospace`
      ctx!.beginPath()
      ctx!.fillText(text, x + 10, y + (textHeight / 4))
    })

    // setTag("")
    // setCurrentAnnotation({ x: 0, y: 0 })
  }

}


export const handleMouseDown = (
  event: any,
  isDraggingText: any,
  setIsDraggingText: any,
  draggingText: any,
  setDraggingText: any,
  canvasRef: any,
  allTextTags: any

) => {
  const x = event.nativeEvent.offsetX
  const y = event.nativeEvent.offsetY
  const canvas = canvasRef.current
  const ctx = canvas!.getContext('2d')

  const clickrect = allTextTags.reverse().find((tags: any) => {
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
  }

  else {
    setIsDraggingText(false)
    setDraggingText(0)
  }
}
