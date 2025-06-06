import styled from "styled-components";

interface ButtonProps {
  children: any;
  background?: string;
  backgroundhover?: string;
  color?: string;
  weight?: string;
  border?: string;
  size?: string;
  width?: string;
  display?: string;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const StyledButton = styled.button<ButtonProps>`
  background: ${({ background = "transparent" }) => background};
  color: ${({ color = "black" }) => color};
  font-weight: ${({ weight = "800" }) => weight};
  font-size: ${({ size = "1rem" }) => size};
  border: 1px solid ${({ border = "black" }) => border};
  width: ${({ width = "auto" }) => width};
  height: max-content;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
    background-color: #f0f0f0;
    `}

  &:hover {
    background-color: ${({ backgroundhover = "transparent" }) =>
      backgroundhover};
  }

  @media (min-width: 786px) {
    display: ${({ display = "block" }) => display};
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  background,
  backgroundhover,
  color,
  weight,
  border,
  size,
  width,
  display,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton
      background={background}
      backgroundhover={backgroundhover}
      color={color}
      border={border}
      weight={weight}
      size={size}
      width={width}
      disabled={disabled}
      display={display}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
