import React, { useState } from "react";
import "./index.css";
import img from "../../../assets/images/example-image.jpeg";

interface props {
  label: string;
  id: string;
  blur: number;
  setBlur: Function;
  brightness: number;
  setBrightness: Function;
}

export default function UniversalSlider({ label, id, blur, setBlur, brightness, setBrightness }: props): JSX.Element {
  // const [blur, setBlur] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  // const [brightness, setBrightness] = useState<number>(1);

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "blur") {
      setBlur(Number(e.target.value));
    }
    if (e.target.id === "zoom") {
      setZoom(Number(e.target.value));
    }
    if (e.target.id === "brightness") {
      setBrightness(Number(e.target.value));
    }
  };

  const inputValue = () => {
    if (id === "blur") {
      return blur;
    }
    if (id === "zoom") {
      return zoom;
    }
    if (id === "brightness") {
      return brightness;
    }
  };

  const imageFilter = () => {
    if (id === "blur") {
      let blurVal = `${blur*10}px`;
      return `blur(${blurVal})`;
    }
    if (id === "brightness") {
      return `brightness(${brightness})`;
    }
  };

  //id === "zoom" ? `transform: scale(${zoom}, ${zoom})`
  //id === "rotate" ? "transform: rotate(45deg)"

  return (
    <div className='brightness-slider'>
      <label className='brightness-label' htmlFor='brightness'>
        {label} :
      </label>
      <input
        type='range'
        id={id}
        name={id}
        min={0}
        max={1}
        step={0.2}
        value={inputValue()}
        onChange={handleBrightnessChange}
      />
      <img
        src={img}
        height={40}
        width={40}
        alt='Example'
        style={{ filter: imageFilter() }}
      />
    </div>
  );
};