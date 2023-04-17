// const flipHorizontally = (canvasRef: any) => {
//   const canvas = canvasRef.current;
//   if (!canvas) return;

//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;

//   ctx.translate(canvas.width, 0);
//   ctx.scale(-1, 1);
//   drawImage(ctx);
// };

// const flipVertically = (canvasRef: any) => {
//   const canvas = canvasRef.current;
//   if (!canvas) return;

//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;

//   ctx.translate(0, canvas.height);
//   ctx.scale(1, -1);
//   drawImage(ctx);
// };

// const drawImage = (ctx: CanvasRenderingContext2D, canvasRef: any) => {
//   const img = new Image();
//   img.onload = () => {
//     ctx.drawImage(
//       img,
//       0,
//       0,
//       canvasRef.current!.width,
//       canvasRef.current!.height
//     );
//   };
//   img.src = imageUrl;
// };
