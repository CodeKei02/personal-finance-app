import { Form } from "formik";
import styled from "styled-components";
import { Input } from "../../../components";
import { breakpoints, colors } from "../../../styles/theme";
import { Dropdown } from "../dropdown";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
const Header = styled(Form)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownContainer = styled.div`
  display: none;

  @media (min-width: 786px) {
    display: flex;
    gap: 1rem;

    div {
      flex-direction: row;
      align-items: center;
      gap: 0.25rem;
      margin-left: 1rem;
    }
  }
`;

const InputSearch = styled.div`
  width: 200px;
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.beigeNormal};
  border-radius: 8px;
  position: relative;

  i {
    position: absolute;
    right: 1rem;
    color: ${colors.beigeNormal};
  }

  input {
    padding: 0px;
    width: 100px;
  }

  input:focus {
    outline: none;
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 300px;

    input {
      width: 150px;
    }
  }
`;

interface ListElementsHeaderProps {
  dispatchSearch: (value: any) => void;
  dispatchFilter: (value: any) => void;
  children?: any;
  children2?: any;
  type: string;
  showSort: boolean;
  setShowSort: (value: boolean) => void;
}
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
    <>
      <Header>
        <InputSearch>
          <Input
            id="search"
            type="search"
            label=""
            name="search"
            placeholder={`Search ${type}`}
            width="220px"
            dispatchAction={(value) => dispatchSearch(value)}
            border="0px"
          />
          <i className="fa fa-search"></i>
        </InputSearch>

        {children}

        <div ref={sortRef}>
          {showSort && (
            <Dropdown
              text="Sort"
              items={sortByFilter}
              dispatchAction={(value) => dispatchFilter(value)}
            />
          )}
        </div>

        <DropdownContainer>
          <Input
            id="sort"
            type="select"
            label="Sort By"
            name="sort"
            placeholder="Select an option"
            options={sortByFilter}
            dispatchAction={(value) => dispatchFilter(value)}
          />

          {children2}
        </DropdownContainer>
      </Header>
    </>
  );
};
