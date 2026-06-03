import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ContainerProps } from "./types";

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const isOpen = useSelector((state: RootState) => state.ui.isOpen);

  return (
    <section
      className={`w-full p-4 mt-6 mb-12 lg:grid lg:place-self-end transition-all duration-500 ease-[cubic-bezier(0.01,0.98,0,0.98)] overflow-hidden ${
        isOpen ? "xl:max-w-[80%]" : "xl:max-w-[92%]"
      }`}
    >
      {children}
    </section>
  );
};
