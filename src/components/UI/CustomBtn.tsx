import type { FC } from "react";

interface ICustomBtnProps {
  text: string;
  width: number;
  icon?: string;
  mt?: string;
  className?: string;
  disabled?: boolean;
  onClick?: ()=>void
}

const CustomBtn: FC<ICustomBtnProps> = ({
  text,
  width,
  icon,
  mt,
  className,
  disabled,
  onClick
}) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${className ? className : ""}`}
      style={{ width, marginTop: mt }}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="" />}
      <span>{text}</span>
    </button>
  );
};

export default CustomBtn;
