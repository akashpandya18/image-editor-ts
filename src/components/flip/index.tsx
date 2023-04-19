import { useEffect, useRef, useState } from "react";
import "./index.css";
interface Props {
  canvas: HTMLCanvasElement | null;
}
export default function FlipImage(props: Props) {
  const { canvas } = props;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const flipHorizontally = () => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    drawImage(ctx);
  };

  const flipVertically = () => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    drawImage(ctx);
  };

  const drawImage = (ctx: CanvasRenderingContext2D) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas!.width, canvas!.height);
    };
  };

  useEffect(() => {
    const ctx = canvas?.getContext("2d");
  }, [canvas]);

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = imageUrl;
  //   img.onload = () => {
  //     const { width, height } = img;
  //     if (width > 1000) {
  //       const ratio = width / height;
  //       const newHeight = 1000 / ratio;
  //       const newWidth = 563 * ratio;
  //       setDimensions({ width: newWidth, height: newHeight });
  //     } else {
  //       setDimensions({ width, height });
  //     }
  //   };
  // }, [imageUrl]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const { width, height } = dimensions;
  //   canvas!.width = width;
  //   canvas!.height = height;
  //   const ctx = canvas!.getContext("2d");
  //   const image = new Image();
  //   image.src = imageUrl;
  //   image.onload = () => {
  //     ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
  //   };
  // }, [dimensions, imageUrl]);
  return <>Flip</>;
}
