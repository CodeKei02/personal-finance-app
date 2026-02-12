import { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <div
      className={`flex gap-4 mb-8 justify-between lg:my-0 lg:mr-4 lg:mb-4 ${className}`}
    >
      {children}
    </div>
  );
};
