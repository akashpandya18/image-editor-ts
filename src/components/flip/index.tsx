export const flipHorizontally = (canvasRef: any, LoadImageFlip: Function) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  LoadImageFlip(ctx);
};

export const flipVertically = (canvasRef: any, LoadImageFlip: Function) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
  LoadImageFlip(ctx);
};