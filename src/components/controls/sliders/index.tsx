import React, { useState } from "react";
import "./index.css";
interface props {
  label: string;
}

export default function UniversalSlider({ label }: props): JSX.Element {
  const [brightness, setBrightness] = useState<number>(1);

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value));
  };

  return (
    <div className='brightness-slider'>
      <label className='brightness-label' htmlFor='brightness'>
        {label} :
      </label>
      <input
        type='range'
        id='brightness'
        name='brightness'
        min={0}
        max={1}
        step={0.2}
        value={brightness}
        onChange={handleBrightnessChange}
      />
      <img
        src='example-image.jpg'
        alt='Example'
        style={{ filter: `brightness(${brightness})` }}
      />
    </div>
  );
}
