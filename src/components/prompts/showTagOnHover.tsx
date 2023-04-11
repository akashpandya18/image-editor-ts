interface props {
  position: { x: number; y: number };
  tag: string;
}
export default function ShowTagOnHover({ position, tag }: props) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 9,
          top: position.y - 40,
          left: position.x,
          backgroundColor: "#2a2a2a",
          color: "#fff",
          padding: "0.5rem",
          borderRadius: "7px",
          fontSize: "20px",
        }}
      >
        {tag}
      </div>
    </>
  );
}
