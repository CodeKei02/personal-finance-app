interface LabelProps {
  text: string;
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
  return (
    <label 
      htmlFor={htmlFor}
      className="text-greyNormal text-preset5Bold font-extrabold mb-1 mr-1"
    >
      {text}
    </label>
  );
};
