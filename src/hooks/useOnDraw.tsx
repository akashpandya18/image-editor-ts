// import React, {
//   useEffect,
//   useRef
// } from "react";
//
// interface Point {
//   x: number;
//   y: number;
// }
//
// type OnDrawFunction = (
//   context: CanvasRenderingContext2D,
//   currentPoint: Point,
//   prevPoint: Point | null
// ) => void;
//
// interface UseOnDrawResult {
//   setCanvasRef: (ref: HTMLCanvasElement | null) => void;
//   onCanvasMouseDown: () => void;
// }
//
// export default function useOnDraw(onDraw?: OnDrawFunction): UseOnDrawResult {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const isDrawingRef = useRef<boolean>(false);
//   const prevPointRef = useRef<Point | null>(null);
//   const mouseMoveListenerRef = useRef<((e: MouseEvent) => void) | null>(null);
//   const mouseUpListenerRef = useRef<(() => void) | null>(null);
//
//   function setCanvasRef(ref: HTMLCanvasElement | null) {
//     canvasRef.current = ref;
//   }
//
//   function onCanvasMouseDown() {
//     isDrawingRef.current = true;
//   }
//
//   useEffect(() => {
//     function computePointInCanvas(
//       clientX: number,
//       clientY: number
//     ): Point | null {
//       if (canvasRef.current) {
//         const boundingRect = canvasRef.current.getBoundingClientRect();
//         return {
//           x: clientX - boundingRect.left,
//           y: clientY - boundingRect.top
//         };
//       } else {
//         return null;
//       }
//     }
//
//     function initMouseMoveListener() {
//       const mouseMoveListener = (e: MouseEvent) => {
//         if (isDrawingRef.current && canvasRef.current) {
//           const point = computePointInCanvas(e.clientX, e.clientY);
//           const context = canvasRef.current.getContext("2d");
//           if (onDraw) onDraw(context!, point!, prevPointRef.current);
//           prevPointRef.current = point;
//         }
//       };
//       mouseMoveListenerRef.current = mouseMoveListener;
//       window.addEventListener("mousemove", mouseMoveListener);
//     }
//
//     function initMouseUpListener() {
//       const listener = () => {
//         isDrawingRef.current = false;
//         prevPointRef.current = null;
//       };
//       mouseUpListenerRef.current = listener;
//       window.addEventListener("mouseup", listener);
//     }
//
//     function cleanup() {
//       if (mouseMoveListenerRef.current) {
//         window.removeEventListener("mousemove", mouseMoveListenerRef.current);
//       }
//       if (mouseUpListenerRef.current) {
//         window.removeEventListener("mouseup", mouseUpListenerRef.current);
//       }
//     }
//
//     initMouseMoveListener();
//     initMouseUpListener();
//     return () => cleanup();
//   }, [onDraw]);
//
//   return {
//     setCanvasRef,
//     onCanvasMouseDown
//   };
// };

export default function useOnDraw() {};