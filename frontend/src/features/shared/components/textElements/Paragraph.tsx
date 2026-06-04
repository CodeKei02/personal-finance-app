import { ParagraphProps } from "./types";

export const Paragraph: React.FC<ParagraphProps> = ({ children, align }) => {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
  
  return (
    <p className={`text-beigeNormal my-4 tracking-wide ${alignClass}`}>
      {children}
    </p>
  );
};
