export default function ShowAllTags({ data }: any) {
  return (
    <>
      {data &&
        data.map((item: any) => {
          return (
            <div
              style={{
                position: "absolute",
                zIndex: 9,
                top: item.y - 40,
                left: item.x,
                backgroundColor: "#2a2a2a",
                color: "#fff",
                padding: "0.5rem",
                borderRadius: "7px",
                fontSize: "20px",
              }}
            >
              {item.tag}
            </div>
          );
        })}
    </>
  );
}
