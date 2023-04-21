export const Button = (props: any) => {
  const { isActive, onClick, className } = props;

  const boxShadow = isActive
    ? "inset 0px 1px 1px 1px rgba(0, 0, 0, 0.1)" // use inset shadow for active button
    : "0px 2px 8px 0px rgba(0, 0, 0, 0.35)"; // use normal shadow for inactive buttons
  const backgroundColor = isActive ? "white" : "#000";
  const color = isActive ? "#000" : "#fff";

  return (
    <button
      className={className}
      style={{ boxShadow, backgroundColor, color }}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};