export const Button = (props: any) => {
  const { isActive, onClick, className } = props;

  const boxShadow = isActive
    ? "inset 0px 2px 8px 0px rgba(0, 0, 0, 0.35)" // use inset shadow for active button
    : "0px 2px 8px 0px rgba(0, 0, 0, 0.35)"; // use normal shadow for inactive buttons

  return (
    <button className={className} style={{ boxShadow }} onClick={onClick}>
      {props.children}
    </button>
  );
};
