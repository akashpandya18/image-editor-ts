import { annotation } from "../../types"

export const flipHorizontally = (
  canvasRef: any,
  imgSrc: any,
  annotations: annotation[]
) => {
  const canvas = canvasRef.current
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.translate(canvas.width, 0)
  ctx.scale(-1, 1)
  LoadImageFlip(ctx, canvasRef, imgSrc, annotations)
}
export const flipVertically = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imgSrc: string,
  annotations: annotation[]
) => {
  const canvas = canvasRef.current
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.translate(0, canvas.height)
  ctx.scale(1, -1)
  LoadImageFlip(ctx, canvasRef, imgSrc, annotations)
}
export const LoadImageFlip = (
  ctx: CanvasRenderingContext2D,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imgSrc: string,
  annotations: annotation[]
) => {
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(
      img,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    )
    annotations.forEach((annot: annotation) => {
      const { x, y } = annot
      ctx!.beginPath()
      ctx!.fillStyle = "yellow"
      ctx!.arc(x, y, 10, 0, 2 * Math.PI)
      ctx!.fill()
    })
  }
  img.src = imgSrc
}
