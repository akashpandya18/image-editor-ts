interface props {
    position: { x: number; y: number }
}

const TextInputPrompt = ({ position }: props) => {


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
        </div>
    )
}

export default TextInputPrompt