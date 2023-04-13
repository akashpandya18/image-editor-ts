import React, { useState } from "react";
import "./index.css";

interface props {
  label: string;
  id: string;
  blur: number;
  setBlur: Function;
  brightness: number;
  setBrightness: Function;
  rotate: number;
  setRotate: Function;
}

export default function UniversalSlider({
  label,
  id,
  blur,
  setBlur,
  brightness,
  setBrightness,
  rotate,
  setRotate
}: props): JSX.Element {
  const [zoom, setZoom] = useState<number>(1);

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("eee", e.target.value);
    e.preventDefault();
    if (e.target.id === "blur") {
      setBlur(Number(e.target.value));
    }
    if (e.target.id === "zoom") {
      setZoom(Number(e.target.value));
    }
    if (e.target.id === "rotate") {
      setRotate(Number(e.target.value));
    }
    if (e.target.id === "brightness") {
      setBrightness(Number(e.target.value));
    }
  };

  const inputValue = () => {
    if (id === "blur") {
      // console.log("blur===>>>", {blur});
      return blur;
    }
    if (id === "zoom") {
      return zoom;
    }
    if (id === "rotate") {
      return rotate;
    }
    if (id === "brightness") {
      return brightness;
    }
  };

  return (
    <div className='brightness-slider'>
      <label className='brightness-label' htmlFor='brightness'>
        {label} :
      </label>
      <input
        type='range'
        id={id}
        name={id}
        min={id === "rotate" ? -180 : 0}
        max={id === "rotate" ? 180 : 1}
        step={id !== "rotate" ? 0.2 : ""}
        value={inputValue()}
        onChange={handleBrightnessChange}
      />
    </div>
  );
};