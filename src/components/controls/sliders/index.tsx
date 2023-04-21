import React from "react";
import "./index.css";

interface props {
  label: string;
  id: string;
  blur: number;
  setBlur: Function;
  zoom: number;
  setZoom: Function;
  rotate: number;
  setRotate: Function;
  brightness: number;
  setBrightness: Function;
}

export default function UniversalSlider({
  label,
  id,
  blur,
  setBlur,
  zoom,
  setZoom,
  rotate,
  setRotate,
  brightness,
  setBrightness
}: props): JSX.Element {
  const handleEffectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.id === "blur") {
      setBlur(Number(e.target.value));
      // setZoom(zoom);
      // setRotate(rotate);
      // setBrightness(brightness);
    }
    if (e.target.id === "zoom") {
      // setBlur(blur);
      setZoom(Number(e.target.value));
      // setRotate(rotate);
      // setBrightness(brightness);
    }
    if (e.target.id === "rotate") {
      // setBlur(blur);
      // setZoom(zoom);
      setRotate(Number(e.target.value));
      // setBrightness(brightness);
    }
    if (e.target.id === "brightness") {
      // setBlur(blur);
      // setZoom(zoom);
      // setRotate(rotate);
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
    if (id === "rotate") {
      return rotate;
    }
    if (id === "brightness") {
      return brightness;
    }
  };

  const minValue = id === "zoom" ? 0.2 : id === "rotate" ? -180 : 0;
  const maxValue = id === "zoom" ? 1.5 : id === "rotate" ? 180 : id === "blur" ? 5 : 1;
  const stepValue = id === "zoom" ? 0.1 : id === "rotate" ? 45 : id === "blur" ? 1 : 0.2;

  return (
    <div className={"brightness-slider"}>
      <label className={"brightness-label"} htmlFor={"brightness"}>
        {label} :
      </label>
      <input
        type={"range"}
        id={id}
        name={id}
        min={minValue}
        max={maxValue}
        step={stepValue}
        value={inputValue()}
        onChange={(e: any) => handleEffectChange(e)}
        autoComplete="off"
      />
    </div>
  );
};