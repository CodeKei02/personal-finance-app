import { HeadlineProps } from "./types";

export const Headline: React.FC<HeadlineProps> = ({ title }) => {
  return (
    <h1 className="w-full text-preset1 text-greyDark font-extrabold flex justify-between">
      {title}
    </h1>
  );
};
