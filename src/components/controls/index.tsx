import { customAlphabet } from "nanoid"
import { createContext, useEffect, useMemo, useRef, useState } from "react"
import { HideTags, ShowTags } from "../../assets/icons"
import { Cropped, annotation, controlsProps, controlsType } from "../../types"
import { handleToolClick, tools } from "../../utils/data"

import {
  handleCanvasClick,
  handleCanvasMouseMove,
  handleClearSingleTag,
  handleInputChange,
  handleScreenShot,
  handleSubmitTag,
  hideTags,
  showTags,
} from "../TagAnnotation"
import { Button } from "./buttons"
import "./index.css"

import { Crop, DrawCanvas, RegularCanvas, TagCanvas, TextOnImage } from "../canvases"
import { flipHorizontally, flipVertically } from "../flip"
import TagAnnotationForm from "../forms/TagAnnotForm"
import TempRedTag from "../prompts/ConfirmSubmitTag"
import { DeleteTag } from "../prompts/deleteTag"
import ShowTagOnHover from "../prompts/showTagOnHover"
import {
  CropControl,
  DrawControl,
  FlipControl,
  MoreControls,
  TagControls,
  TextOnImageControl,
} from "./allControls"
import MainCanvasControls from "./mainCanvasControls"
import TextOnImageForm from "../forms/TextOnImageForm"
import { submitHandler, textOnChangeHandler1 } from "./textOnImage"
import TextInputPrompt from "../prompts/TextInputPrompt"


export const TextContext = createContext({
  text: "",
  setText: () => { }
})


export default function Controls({
  imgSrc,
  setImgSrc,
}: controlsProps): JSX.Element {
  const [annotations, setAnnotations] = useState<annotation[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [currentControl, setCurrentControl] =
    useState<string>("tag-annotation")
  const [blur, setBlur] = useState<number>(0)
  const [rotate, setRotate] = useState<number>(0)
  const [brightness, setBrightness] = useState<number>(1)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [clear, setClear] = useState<boolean>(false)
  const [cloneRef, setCloneRef] = useState<any>()
  const [hoverTag, setHoverTag] = useState("")
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
  const [selectCanvas, setselectCanvas] = useState(false)
  const [showH, setShowH] = useState(false)
  const [tempRedPrompt, setTempRedPrompt] = useState(false)
  const [deleteTag, setDeleteTag] = useState(false)
  const [deletePos, setDeletePos] = useState({ xN: 0, yN: 0 })
  const [showAllTags, setShowAllTags] = useState(false)
  const [deleteTagId, setDeleteTagId] = useState("")
  const [croppedImage, setCroppedImage] = useState<string>("")
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 })
  const [tag, setTag] = useState("")
  const [tempPrompt, setTempPrompt] = useState(false)
  const [currentClicked, setCurrentClicked] = useState({
    x: 0,
    y: 0
  })
  // const [name, setName] = useState("Mks");


  const [allTextTags, setAllTextTags] = useState([])
  const [currentCropped, setCurrentCropped] = useState<Cropped>({
    startingX: 0,
    startingY: 0,
    height: 0,
    width: 0,
  })
  const [TextForm, setTextForm] = useState({
    text: "",
    color: "",
    size: ""
  })
  const [lineWidth, setLineWidth] = useState<number>(4)
  const [lineColor, setLineColor] = useState<string>("#000")

  const ref = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const nanoid = customAlphabet("1234567890abcdef", 10)
  const id = nanoid(5)

  const nanoid = customAlphabet("1234567890abcdef", 10);
  const id = nanoid(5);

  function Tools() {
    return (
      <>
        <div className='controls-main'>
          {/* tools */}
          <div className='controls-2div'>
            <div className='tools-grid'>
              {tools.map((x: controlsType, idx: number) => {
                return (
                  <div key={x.id} className='tools-map-div'>
                    <Button
                      className='tools-button'
                      isActive={idx === activeIndex}
                      onClick={() => {
                        handleToolClick(
                          x.type,
                          idx,
                          setActiveIndex,
                          setCurrentControl
                        )
                      }}
                    >
                      {x.icon}
                    </Button>
                    <span>{x.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
          {/* controls */}
          <div className='showControls-div'>
            <SelectedControl />
          </div>
        </div>
      </>
    )
  }

  const demo = (textForm: any) => {
    textOnChangeHandler1(
      textForm,
      canvasRef,
      currentClicked,
      imgSrc
    )
    // console.log('textForm', textForm)

    // let newCode = { ...textForm }

    // clo

    // sette
    // setTextForm({
    //   text: textForm.text,
    //   color: textForm.color,
    //   size: textForm.size
    // })

    // setTextForm({
    //   text: textForm.text,
    //   color: textForm.color,
    //   size: textForm.size
    // })

    // setText(textForm.text)

  }

  function SelectedControl(): JSX.Element {
    return (
      <>
        {currentControl === "tag-annotation" ? (
          <TagControls annotations={annotations} />
        ) : currentControl === "text-on-image" ? (
          <TextOnImageControl
            tempPrompt={tempPrompt}
            textOnChangeHandler={demo}
            onSubmit={(event: any) => submitHandler(
              event,
              allTextTags,
              setAllTextTags,
              currentClicked,
              setTempPrompt,
              tempPrompt
            )}
            allTextTags={allTextTags}
            setTempPrompt={setTempPrompt}
            TextForm={TextForm}
            setTextForm={setTextForm}
            canvasRef={canvasRef}
          />
        ) : currentControl === "crop" ? (
          <CropControl img={croppedImage} select={select} />
        ) : currentControl === "flip" ? (
          <FlipControl
            flipHorizontally={() =>
              flipHorizontally(canvasRef, imgSrc, annotations)
            }
            flipVertically={() =>
              flipVertically(canvasRef, imgSrc, annotations)
            }
          />
        ) : currentControl === "draw" ? (
          <DrawControl />
        ) : currentControl === "more" ? (
          <MoreControls
            blur={blur}
            setBlur={setBlur}
            brightness={brightness}
            setBrightness={setBrightness}
            rotate={rotate}
            setRotate={setRotate}
          />
        ) : (
          console.log("none")
        )}
      </>
    )
  }


  useEffect(() => {
    const img = new Image()
    img.src = imgSrc
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
  }, [imgSrc])

  useEffect(() => {
    setAnnotations([])
    setTempRedPrompt(false)
    setCurrentAnnotation({ x: 0, y: 0 })
    setTag("")
    setDeleteTag(false)
    setDeletePos({ xN: 0, yN: 0 })
    setDeleteTagId("")
    setShowAllTags(false)
    setShowH(false)

    const canvas: HTMLCanvasElement | null = canvasRef.current
    const { width, height } = dimensions
    canvas!.width = width
    canvas!.height = height
    const ctx = canvas!.getContext("2d")
    const image = new Image()
    image.src = imgSrc
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height)
    }
  }, [dimensions, imgSrc, clear])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    if (context) {
      context.lineWidth = lineWidth
      context.strokeStyle = lineColor
    }
  }, [canvasRef, lineWidth, lineColor])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas!.getContext("2d")
    const { width, height } = dimensions
    canvas!.width = width
    canvas!.height = height
    const image = new Image()
    image.src = imgSrc
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height)
      annotations.forEach((annot: any) => {
        const { x, y } = annot
        ctx!.beginPath()
        ctx!.fillStyle = "yellow"
        ctx!.arc(x, y, 10, 0, 2 * Math.PI)
        ctx!.fill()
      })
      setTag("")
      setCurrentAnnotation({ x: 0, y: 0 })
    }
  }, [
  ])

  useEffect(() => {
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
      allTextTags.forEach((texts: any) => {
        const { x, y, text, color, size } = texts
        ctx!.fillStyle = color
        ctx!.font = `${size || 22}px monospace`
        console.log('texts', texts)
        ctx!.beginPath()
        ctx!.fillText(text, x + 10, y + (textHeight / 4))
      })

      // setTag("")
      // setCurrentAnnotation({ x: 0, y: 0 })
    }
  }, [allTextTags])

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

    if (selectCanvas) {
      const canvas1 = canvasRef.current
      const ctx1 = canvas1?.getContext('2d')
      let newCanvas = document.createElement("canvas")
      let newCtx = newCanvas.getContext("2d")

      const { width, height } = currentCropped

      newCanvas.height = height
      newCanvas.width = width

      const imageData = ctx1!.getImageData(currentCropped.startingX + 2, currentCropped.startingY + 2, currentCropped.width - 3, currentCropped.height - 3)
      newCtx!.putImageData(imageData, 0, 0)
      let crop = newCanvas.toDataURL()
      setCroppedImage(crop)
    }
  }, [currentCropped])

  useEffect(() => {
    const clone = canvasRef.current
    setCloneRef(clone!.toDataURL())
  }, [annotations, canvasRef])

  useEffect(() => {
    if (selectCanvas) {
      const canvas = canvasRef.current
      const ctx = canvas!.getContext("2d")

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

      const canvas1 = canvasRef.current
      const ctx1 = canvas1?.getContext('2d')
      let newCanvas = document.createElement("canvas")
      let newCtx = newCanvas.getContext("2d")


      newCanvas.height = imgY
      newCanvas.width = imgY

      console.log('imgx,imgY', imgX, imgY)

      const imageData = ctx1!.getImageData(dimensions.width / 4 + 2, dimensions.height / 4 + 2, dimensions.width / 4 - 3, dimensions.height / 4 - 3)
      newCtx!.putImageData(imageData, 0, 0)
      let crop = newCanvas.toDataURL()
      setCroppedImage(crop)
    }
  }, [selectCanvas])

  const select = () => {
    setselectCanvas(!selectCanvas)
  }

  return (
    <div className='controls-out'>
      <Tools />
      {/* <img src={ } /> */}
      <div className='canvas-div'>
        {currentControl === "tag-annotation" ? (
          <TagCanvas
            canvasRef={canvasRef}
            handleTagClick={(event: any) =>
              handleCanvasClick(
                event,
                canvasRef,
                annotations,
                setTempRedPrompt,
                setDeleteTag,
                setShowH,
                setDeleteTagId,
                setCurrentAnnotation,
                setTag,
                setDeletePos
              )
            }
            handleTagMouseMove={(event: any) =>
              handleCanvasMouseMove(
                event,
                canvasRef,
                annotations,
                setHoverTag,
                setHoverPos,
                setShowH
              )
            }
          />
        ) : currentControl === "draw" ? (
          <DrawCanvas canvasRef={canvasRef} />
        ) : currentControl === 'crop' ? (
          <Crop
            canvasRef={canvasRef}
            currentCropped={currentCropped}
            setCurrentCropped={setCurrentCropped}
            dimensions={dimensions}
            setDimensions={setDimensions}
            imgSrc={cloneRef}
          />
        ) : currentControl === "text-on-image" ?
          <TextOnImage
            allTextTags={allTextTags}
            tempPrompt={tempPrompt}
            setTempPrompt={setTempPrompt}
            canvasRef={canvasRef}
            currentClicked={currentClicked}
            setCurrentClicked={setCurrentClicked}
            setTextForm={setTextForm}
            imgSrc={imgSrc}
          /> : (
            <RegularCanvas canvasRef={canvasRef} />
          )}

        {tempRedPrompt && (
          <>
            <TempRedTag position={currentAnnotation} />
            <TagAnnotationForm
              refer={ref}
              tags={tag}
              handleCloseInput={setTempRedPrompt}
              handleInputChange={(e) => handleInputChange(e, setTag)}
              onSubmit={(e) =>
                handleSubmitTag(
                  e,
                  currentAnnotation,
                  canvasRef,
                  imgSrc,
                  tag,
                  annotations,
                  id,
                  setAnnotations,
                  setTag,
                  setCurrentAnnotation,
                  setTempRedPrompt,
                  showAllTags
                )
              }
              position={currentAnnotation}
            />
          </>
        )}

        {/* {
          tempPrompt &&
          <>
            <TextInputPrompt position={currentClicked} />
          </>

        } */}

        {deleteTag && (
          <DeleteTag
            position={deletePos}
            setPromptOff={() => setDeleteTag(false)}
            deleteTagSubmit={(e) =>
              handleClearSingleTag(
                e,
                setDeleteTagId,
                canvasRef,
                imgSrc,
                setDeleteTag,
                annotations,
                deleteTagId,
                setAnnotations,
                setTag,
                setCurrentAnnotation,
                setTempRedPrompt,
                setShowAllTags
              )
            }
          />
        )}

        {showH && <ShowTagOnHover position={hoverPos} tag={hoverTag} />}

        <MainCanvasControls
          clearFunction={() => setClear(!clear)}
          showHideFunction={() =>
            showAllTags
              ? hideTags(setShowAllTags, imgSrc, canvasRef, annotations)
              : showTags(setShowAllTags, imgSrc, canvasRef, annotations)
          }
          screenShotFunction={() => handleScreenShot(canvasRef)}
          iconTag={showAllTags ? <HideTags /> : <ShowTags />}
        />
      </div>
    </div>
  )
}
