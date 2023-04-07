interface props {
  position: { x: number; y: number };
}
export default function TempRedTag({ position }: props) {
  return (
    <>
      <div
        style={{
          top: position.y - 10,
          left: position.x - 10,
          position: "absolute",
          zIndex: 9,
          width: "20px",
          height: "20px",
          backgroundColor: "red",
          borderRadius: "50%",
        }}
      ></div>
    </>
  );
}
