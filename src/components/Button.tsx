import { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  background?: string;
  backgroundhover?: string;
  color?: string;
  weight?: string;
  border?: string;
  size?: string;
  width?: string;
  display?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  background = "transparent",
  backgroundhover,
  color = "black",
  weight = "800",
  border = "black",
  size = "1rem",
  width = "auto",
  display = "block",
  disabled,
  type = "button",
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getDisplayClass = () => {
    if (display === "none") return "hidden md:block";
    return "block";
  };

  return (
    <button
      type={type}
      className={`
        h-max px-4 py-4 rounded-lg cursor-pointer
        ${getDisplayClass()}
        ${disabled ? "cursor-not-allowed opacity-50 pointer-events-none bg-gray-200" : ""}
        ${isHovered && backgroundhover ? "" : ""}
      `}
      style={{
        background: isHovered && backgroundhover ? backgroundhover : background,
        color: color,
        fontWeight: weight,
        fontSize: size,
        border: `1px solid ${border}`,
        width: width,
      }}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {children}
    </button>
  );
};
