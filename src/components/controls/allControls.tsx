import { useCallback, useRef, useState } from "react"
import { Check, Close, FlipHorizontal, FlipVertical } from "../../assets/icons"
import { controlsType, propsFlip, propsMore, propsTag } from "../../types"
import { controls } from "../../utils/data"
import "./index.css"
import UniversalSlider from "./sliders"

export function TagControls({ annotations }: propsTag) {
  // const messageRef = useRef<HTMLDivElement>(null);

  // if (messageRef.current) {
  //   messageRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "end",
  //     inline: "nearest",
  //   });
  // }

  return (
    <>
      <h3 className='tag-head'>Tags</h3>
      <div className='tag-main'>
        {annotations.length > 0 && (
          <ol className='tag-ol'>
            {annotations.map((data: any) => {
              return (
                <li className='list-tags' key={data.id}>
                  {data.tag}
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </>
  )
}
export function FlipControl({ flipHorizontally, flipVertically }: propsFlip) {
  return (
    <>
      <h3>Flip</h3>
      <div className='buttondiv-main'>
        <div className='button-div'>
          <button className='flip-button' onClick={flipHorizontally}>
            <FlipHorizontal />
          </button>
          <button className='flip-button' onClick={flipVertically}>
            <FlipVertical />
          </button>
        </div>
        <button className='flip-button-sure'>
          <Check />
        </button>
      </div>
    </>
  )
}
export function MoreControls({
  blur,
  setBlur,
  brightness,
  setBrightness,
  rotate,
  setRotate,
}: propsMore) {
  return (
    <>
      <h3>More Controls</h3>
      <div className='showControls-grid'>
        {controls.map((x: controlsType) => {
          return (
            <div key={x.id} className='controlsMap-div'>
              <div className='controlsMap-icon'>{x.icon}</div>
              <div>
                <UniversalSlider
                  label={x.name}
                  id={x.type}
                  blur={blur}
                  setBlur={setBlur}
                  brightness={brightness}
                  setBrightness={setBrightness}
                  rotate={rotate}
                  setRotate={setRotate}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export function DrawControl() {
  return (
    <>
      <h3>Draw</h3>
    </>
  )
}
export const TextOnImageControl = ({ tempPrompt, textOnChangeHandler, onSubmit, allTextTags, setTempPrompt, value, TextForm, setTextForm, canvasRef }: any) => {

  const [formData, setFormData] = useState({ text: '', size: '16', color: '' })

  const handleInputChange = (event: any) => {
    let data = {
      text: "",
      color: "",
      size: ""
    }
    const { name, value } = event.target
    data = {
      ...formData,
      [name]: value
    }

    setFormData(data)
    textOnChangeHandler(data)
  }


  return (
    <>
      {
        tempPrompt && (
          <div>
            <form onSubmit={onSubmit} >
              <div
                style={{
                  display: 'flex',
                  columnGap: '10px',
                  alignItems: 'center'
                }} >
                <input
                  autoFocus
                  value={formData.text}
                  style={{
                    height: "30px",
                    paddingInline: "10px",
                    width: "100%",
                    fontSize: "16px",
                  }}
                  required
                  name="text"
                  placeholder="Enter text"
                  type="text"
                  onChange={handleInputChange}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    columnGap: "10px",
                    width: "40%",
                  }}
                >
                  <button style={{
                    cursor: 'pointer',
                    borderRadius: '7px',
                    height: '35px',
                    border: 'none',
                    backgroundColor: '#2294fb'
                  }} type='submit'>
                    <Check />
                  </button>
                  <button
                    style={{
                      cursor: 'pointer',
                      borderRadius: '7px',
                      height: '35px',
                      border: 'none',
                      backgroundColor: '#2294fb'
                    }}
                    type="button"
                    onClick={() => setTempPrompt(false)}
                  >
                    <Close />
                  </button>
                </div>
              </div>

              <div style={{
                display: 'flex',
                marginTop: '15px',
                columnGap: '15px',
              }}>
                <select name="size" value={formData.size} onChange={(event) => {
                  handleInputChange(event)
                }}>
                  <option value="8">8px</option>
                  <option value="10">10px</option>
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                  <option value="20">20px</option>
                  <option value="24">24px</option>
                  <option value="28">28px</option>
                  <option value="32">32px</option>
                  <option value="36">36px</option>
                  <option value="40">40px</option>
                  <option value="42">42px</option>
                  <option value="46">46px</option>
                  <option value="50">50px</option>
                  <option value="54">54px</option>
                  <option value="58">58px</option>
                  <option value="62">62px</option>
                  <option value="66">66px</option>
                  <option value="72">72px</option>
                </select>

                <input style={{
                  height: "37px",
                  width: '100px',
                }}
                  value={formData.color}
                  type="color"
                  onChange={(event) => {
                    handleInputChange(event)
                  }}
                  name="color"
                // defaultValue="#ffffff"
                />
              </div>
            </form>
          </div>
        )
      }
      {/* {allTextTags.map((e: any, index: number) => {
        console.log('e', e)
        return (
          <div key={index}>
            {e.text}
          </div>
        )
      })} */}
    </>
  )
}
export function CropControl({ select, img }: any) {
  return (
    <>
      <h3>Crop</h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <button style={{
          cursor: "pointer",
          backgroundColor: "black",
          color: "white",
          paddingBlock: "7px",
          paddingInline: "15px",
          marginBottom: "10px",
          width: "fit-content"
        }} onClick={() => select()}>Select rectangle</button>
        <img src={img}
          style={{
            maxWidth: '400px',
            maxHeight: '223px',
            objectFit: 'contain'
          }}

        />
      </div>
    </>
  )
}
