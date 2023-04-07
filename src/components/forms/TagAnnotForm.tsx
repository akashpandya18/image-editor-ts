import { useEffect } from "react";

interface props {
  tags: string;
  handleInputChange: (e: any) => void;
  onSubmit: (e: any) => void;
  position: { x: number; y: number };
  refer: any;
}

function TagAnnotationForm({
  tags,
  handleInputChange,
  onSubmit,
  position,
  refer,
}: props) {
  return (
    <>
      <div
        ref={refer}
        style={{
          position: "absolute",
          zIndex: 9,
          top: position.y,
          left: position.x,
        }}
      >
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='tag'
            value={tags}
            onChange={(e) => handleInputChange(e)}
            autoFocus
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default TagAnnotationForm;
