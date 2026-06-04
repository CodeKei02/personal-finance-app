import { CardHeaderProps } from "./types";

export const CardHeader: React.FC<CardHeaderProps> = ({
  name,
  type,
  handleDropdownToggle,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <div
          style={{ backgroundColor: type.theme }}
          className="w-4 h-4 rounded-full"
        ></div>
        <h2>{name}</h2>
      </div>
      <button 
        onClick={(): void => handleDropdownToggle(type.id)}
        className="bg-transparent border-none cursor-pointer"
      >
        <img src="/images/icon-ellipsis.svg" alt="icon" />
      </button>
    </div>
  );
};
