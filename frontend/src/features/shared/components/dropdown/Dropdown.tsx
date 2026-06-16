import { useState } from "react";

interface DropdownProps {
  text: string;
  items: string[];
  className?: string;
  dispatchAction: (value: string) => void | Promise<void>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  text,
  items,
  className = "right-[45px] top-[200px]",
  dispatchAction,
}) => {
  const [selected, setSelected] = useState(text);

  const handleSelect = (value: string) => {
    setSelected(value);
    dispatchAction(value);
  };
  return (
    <div
      className={`${className} w-max bg-white text-greyDark absolute p-4 shadow-[0px_0px_5px_0px_rgba(32,31,36,1)] rounded-lg flex flex-col items-start gap-1`}
    >
      <span className="text-preset4Bold font-extrabold">{selected}</span>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleSelect(item)}
          className="bg-transparent border-0 text-greyDark cursor-pointer"
        >
          {item}
        </button>
      ))}
    </div>
  );
};
