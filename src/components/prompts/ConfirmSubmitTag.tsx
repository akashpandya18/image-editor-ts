interface props {
  enteredTag: string;
  position: { x: number; y: number };
}
export default function ConfirmSubmitTag({ enteredTag, position }: props) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 99,
          top: position.y,
          left: position.x,
          background: "#000",
        }}
      >
        <label htmlFor='submit'>Sure?</label>
        <label htmlFor='value'>{enteredTag}</label>
        <button>✔️</button>
      </div>
    </>
  );
}
