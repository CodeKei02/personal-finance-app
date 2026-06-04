import { ErrorMessage } from "formik";

interface ErrorMessageProps {
  name: string;
}

export const Error: React.FC<ErrorMessageProps> = ({ name }) => {
  return (
    <ErrorMessage 
      name={name} 
      component="span" 
      className="text-red text-sm font-bold"
    />
  );
};
