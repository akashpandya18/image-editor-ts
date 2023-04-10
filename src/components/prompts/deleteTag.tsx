interface props {
  position: { xN: number; yN: number };
  setPromptOff: (e: any) => void;
}
export const DeleteTag = ({ position, setPromptOff }: props) => {
  return (
    <>
      <div
        style={{
          top: position.yN + 12,
          left: position.xN - 100,
          position: "absolute",
          zIndex: 9,
          width: "200px",
          height: "50px",
          backgroundColor: "white",
          borderRadius: "7px",
        }}
      >
        <p>Delete this tag at ${[position.xN, position.yN]}</p>
        <button onClick={setPromptOff}>ok</button>
      </div>
    </>
  );
};
