import styled from "styled-components";
import { ErrorMessage } from "formik";
import { colors } from "../../styles/theme";

const StyledErrorMessage = styled(ErrorMessage)`
  color: ${colors.red};
`;

interface ErrorMessageProps {
    name: string;
}

export const Error: React.FC<ErrorMessageProps> = ({name}) => {
  return (
    <StyledErrorMessage name={name} component="span" />
  )
}
