import React from 'react'
import { Close } from "../../assets/icons"

interface positionProps {
    position: {
        x: number
        y: number
    }
    onSubmit: any
}

const TextOnImageForm = ({ position, onSubmit }: positionProps) => {
    return (
        <div style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            color: "white"
        }}>
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
                    // value={tags}
                    // onChange={(e) => handleInputChange(e)}
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
                    // onClick={() => handleCloseInput(false)}
                    >
                        <Close />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TextOnImageForm