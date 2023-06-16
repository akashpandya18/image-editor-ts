import React from "react";

export const Button = (props: any) => {
  const { isActive, onClick, className } = props;

  const boxShadow = isActive
    ? "inset 0 0.063rem 0.063rem 0.063rem rgba(0, 0, 0, 0.1)" // use inset shadow for active button
    : "0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.35)"; // use normal shadow for inactive buttons
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