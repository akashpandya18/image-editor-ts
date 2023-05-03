interface props {
    position: { x: number; y: number }
    // TextForm: any
}

const TextInputPrompt = ({ position }: props) => {

    // console.log('textForm', TextForm)

    return (
        <div
            style={{
                borderStyle: 'dashed',
                top: position.y - 10,
                left: position.x - 10,
                position: "absolute",
                zIndex: 9,
                border: ' 2px dashed red',
                width: 'fit-content',
                height: 'fit-content'
            }}
        >
            {/* <p style={{
                fontSize: `${TextForm.size}px`,
                color: `${TextForm.color}`,
                margin: 0
            }}> {TextForm.text}</p> */}
        </div>
    )
}

export default TextInputPrompt