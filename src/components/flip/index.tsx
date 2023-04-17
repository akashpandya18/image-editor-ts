import { useEffect, useRef, useState } from "react";
import "./index.css";
import { FlipHorizontal, FlipVertical } from "../../assets/icons";

interface Props {
  imageUrl: string;
}

export default function FlipImage(props: Props) {
  const { imageUrl } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const flipHorizontally = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    drawImage(ctx);
  };

  const flipVertically = () => {
    const canvas = canvasRef.current;
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
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
    };
    img.src = imageUrl;
  };

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const { width, height } = img;
      if (width > 1000) {
        const ratio = width / height;
        const newHeight = 1000 / ratio;
        const newWidth = 563 * ratio;
        setDimensions({ width: newWidth, height: newHeight });
      } else {
        setDimensions({ width, height });
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const { width, height } = dimensions;
    canvas!.width = width;
    canvas!.height = height;
    const ctx = canvas!.getContext("2d");
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    };
  }, [dimensions, imageUrl]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "7px",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)"
        }}
      />
      <div className={"button-div"}>
        <button className={"flip-button"} onClick={flipHorizontally}>
          <FlipHorizontal />
        </button>

        <button className={"flip-button"} onClick={flipVertically}>
          <FlipVertical />
        </button>
      </div>
    </div>
  );
};