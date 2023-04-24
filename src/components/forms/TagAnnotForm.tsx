import { Close } from "../../assets/icons";
import "../styles/index.css";
import React from "react";
interface props {
  tags: string;
  handleInputChange: (e: any) => void;
  onSubmit: (e: any) => void;
  position: { x: number; y: number };
  refer: any;
  handleCloseInput: React.Dispatch<React.SetStateAction<boolean>>;
}

function TagAnnotationForm({
  tags,
  handleInputChange,
  onSubmit,
  position,
  refer,
  handleCloseInput,
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
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <input
            className='TagInput'
            type='text'
            name='tag'
            maxLength={20}
            value={tags}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
            autoFocus
            autoComplete='off'
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            <button className='TagSubmit' type='submit'>
              Submit
            </button>
            <button
              className='TagSubmitClose'
              onClick={() => handleCloseInput(false)}
            >
              <Close />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TagAnnotationForm;
