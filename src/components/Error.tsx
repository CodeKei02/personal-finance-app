import styled from "styled-components";
import { ErrorMessage } from "formik";
import { colors } from "../styles/theme";

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${colors.red};
  font-size: 0.8rem;
  font-weight: 700;
`;

interface ErrorMessageProps {
  name: string;
}

export const Error: React.FC<ErrorMessageProps> = ({ name }) => {
  return <StyledErrorMessage name={name} component="span" />;
};
