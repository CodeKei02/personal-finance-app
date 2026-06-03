import { Form } from "formik";
import { Input } from "@/components/Input";
import { Dropdown } from "../dropdown/Dropdown";
import { useRef } from "react";
import { useClickOutside } from "@/features/shared/hooks/useClickOutside";
import { ListElementsHeaderProps } from "./types";

export const ListElementsHeader: React.FC<ListElementsHeaderProps> = ({
  dispatchSearch,
  dispatchFilter,
  children,
  children2,
  type,
  showSort,
  setShowSort,
}) => {
  const sortRef = useRef<HTMLDivElement | null>(null);
  const sortByFilter = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
  ];

  useClickOutside(sortRef, () => setShowSort(false));
  return (
    <Form className="w-full flex justify-between items-center">
      <div className="w-[200px] px-4 py-0 flex items-center border border-beigeNormal rounded-lg relative md:w-[300px]">
        <div className="flex-1">
          <Input
            id="search"
            type="search"
            label=""
            name="search"
            placeholder={`Search ${type}`}
            width="100%"
            border="none"
            onChange={(value) => dispatchSearch(String(value))}
            className="outline-none focus:outline-none focus:border-none focus:ring-0 h-4"
          />
        </div>
        <i className="fa fa-search absolute right-4 text-beigeNormal"></i>
      </div>

      {children}

      <div ref={sortRef} className="relative">
        {showSort && (
          <Dropdown
            text="Sort"
            items={sortByFilter}
            dispatchAction={(value: string) => dispatchFilter(value)}
            className="w-100 lg:top-[50px] lg:left-[400px] xl:left-[550px]"
          />
        )}
      </div>

      <div className="hidden md:flex md:gap-4">
        <div className="flex-row items-center gap-1 ml-4 w-50">
          <Input
            id="sort"
            type="select"
            label="Sort By"
            name="sort"
            placeholder="Select an option"
            options={sortByFilter}
            onChange={(value) => dispatchFilter(String(value))}
            className="px-2"
          />
        </div>

        {children2}
      </div>
    </Form>
  );
};
