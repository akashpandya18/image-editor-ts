export const clickHandler = (
  event: any,
  canvasRef: any,
  currentClicked: any,
  setTempPrompt: any,
  setCurrentClicked: any,
  imgSrc: any,
  allTextTags: any,
) => {
  // console.log(event, canvasRef)

  const x = event.nativeEvent.offsetX
  const y = event.nativeEvent.offsetY
  const canvas = canvasRef.current
  const ctx = canvas!.getContext('2d')

  const clickrect = allTextTags.reverse().find((tags: any) => {
    ctx.font = tags.size + 'px monospace'
    let textWidth = ctx.measureText(tags.text).width
    const textHeight = parseInt(ctx.font, 10)
    const padding = 5
    const rectHeight = textHeight + padding * 2

    return (
      x > tags.x + 10 &&
      x < tags.x + 10 + textWidth &&
      y > tags.y - rectHeight / 2 &&
      y < tags.y - rectHeight / 2 + rectHeight
    )
  })

  console.log(clickrect, 'is clicking')
  // console.log('clickedDot', clickedDot)

  if (!clickrect) {
    console.log('clickrect', clickrect)

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
        image.onload = () => {
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
}

export const textOnChangeHandler1 = (
  textForm: any,
  canvasRef: any,
  currentClicked: any,
  imgSrc: any,
) => {
  const { text, color, size } = textForm
  // console.log('textForm', textForm)
  const canvas = canvasRef.current
  const ctx = canvas!.getContext('2d')
  ctx!.strokeStyle = 'yellow'
  ctx!.setLineDash([10, 10])
  ctx!.lineWidth = 2

  const image = new Image()
  image.src = imgSrc
  image.width = canvas!.width
  image.height = canvas!.height

  ctx.fillStyle = color
  ctx.strokeStyle = 'gray'

  ctx.font = `${size || 22}px monospace`

  const textWidth = ctx.measureText(text).width
  const textHeight = parseInt(ctx.font, 10)

  const padding = 10
  const rectWidth = textWidth + padding * 2
  const rectHeight = textHeight + padding * 2

  if (image) {
    if (image.complete) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(image, 0, 0, image.width, image.height)
      text.length > 0 &&
        ctx.strokeRect(
          currentClicked.x,
          currentClicked.y - rectHeight / 2,
          rectWidth,
          rectHeight,
        )
      ctx.textBaseline = 'middle'
      ctx.fillText(text, currentClicked.x + padding, currentClicked.y)
    } else {
      console.log('image not completed')
      image.onload = () => {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
        ctx!.drawImage(image, 0, 0, image.width, image.height)
        text.length > 0 &&
          ctx.strokeRect(
            currentClicked.x,
            currentClicked.y - rectHeight / 2,
            rectWidth,
            rectHeight,
          )
        ctx.textBaseline = 'middle'
        ctx.fillText(text, currentClicked.x + padding, currentClicked.y)
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
  setTempPrompt: any,
  tempPrompt: any,
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
  console.log('tempPrompt', tempPrompt)
}
