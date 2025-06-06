import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Formik } from "formik";
import { Button, Input } from "../../components";
import { breakpoints, colors, typography } from "../../styles/theme/index";
import { TransactionModal } from "../components/modals/index";
import { useRef, useState } from "react";
import {
  ListElements,
  Headline,
  Header,
  Container,
} from "../components/textElements/index";
import {
  filterByCategory,
  filterBy,
  searchTransaction,
} from "../../store/slices/transactionsSlice";
import { useClickOutside } from "../hooks/useClickOutside";
import { isOpenModal } from "../../store/slices/uiSlice";
import styled from "styled-components";
import iconFilterMobile from "../../../public/images/icon-filter-mobile.svg";
import iconSortMobile from "../../../public/images/icon-sort-mobile.svg";

import iconArrowLeft from "../../../public/images/icon-caret-left.svg";
import iconArrowRight from "../../../public/images/icon-caret-right.svg";
import { searchItems, sortItems } from "../utils/index";
import { ListElementsHeader } from "../components/textElements/index";
import { Dropdown } from "../components/dropdown";
import output from "../../../output.json";
import { openTemplate } from "../../store/slices/uiSlice";
import { addTransactions } from "../../store/slices/transactionsSlice";

const Div = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;

  @media (min-width: ${breakpoints.desktop}) {
    margin: 1rem 1rem 0 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Buttons = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    justify-content: space-between;
  }
`;

const ButtonArrow = styled.button`
  width: 60px;
  height: 40px;
  background: transparent;
  border-radius: 0.5rem;
  border: 1px solid ${colors.beigeNormal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;

  img {
    width: 1rem;
    height: 1rem;
  }

  span {
    font-size: ${typography.textPreset4.size};
    display: none;
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 100px;
    gap: 1rem;

    span {
      display: flex;
    }
  }
`;

const ListNumbers = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  li {
    width: 40px;
    height: 40px;
    padding: 0.5rem;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px solid ${colors.beigeNormal};
  }
`;

const HeaderStyled = styled(Header)`
  display: flex;
  gap: 1rem;
  flex-direction: column !important;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export const TransactionsPage = () => {
  const categories = [
    "All Transactions",
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Personal Care",
    "Education",
  ];
  const [showCategory, setShowCategory] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionPerPage = 10;
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const { transactions, selectedCategory, selectedSearch, sortBy } =
    useSelector((state: RootState) => state.transaction);
  const dispatch = useDispatch();

  const indexOfLastTransaction = currentPage * transactionPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const currentCategory = currentTransactions.filter(
    (transaction) =>
      selectedCategory === "All Transactions" ||
      transaction.category === selectedCategory
  );
  const theader = [
    "Recipient/Sender",
    "Category",
    "Transaction Date",
    "Amount",
  ];

  // const combineItems = isTemplateOpen
  //   ? [...currentCategory, ...output]
  //   : currentCategory;

  const currentSearch = searchItems(currentCategory, selectedSearch);
  const currentSort = sortItems(currentSearch, sortBy);
  console.log(currentSort);
  const handleDropdown = (
    show: boolean,
    setShow: (status: boolean) => void
  ): void => {
    setShow(!show);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? (prev -= 1) : (prev = 1)));
  };

  const handleNextPage = () => {
    if (currentTransactions.length > 9) {
      setCurrentPage((next) => (next += 1));
    }
  };

  const googleSheetsButton = () => {
    const googleSheetUrl =
      "https://docs.google.com/spreadsheets/d/1Bkbbsfl6h2Vb91AUn10g1SYM31C_sK1AewZnUHHw80k/edit?usp=sharing";

    const handleRedirect = () => {
      //Hacer testing con handleRedirect para ver si se abre la hoja de calculo sin problemas
      // y también si se juntan los datos de la hoja de calculo con los de la app

      output.forEach((item) => {
        const transaction = {
          id: item.id,
          name: item.name,
          category: item.category,
          date: item.date,
          amount: item.amount,
          recurring: item.recurring,
          transactiontype: item.transactiontype,
        };
        dispatch(addTransactions(transaction));
      });

      dispatch(openTemplate());
      window.open(googleSheetUrl, "_blank");
    };
    return handleRedirect();
  };

  useClickOutside(categoryRef, () => setShowCategory(false));
  useClickOutside(sortRef, () => setShowSort(false));
  return (
    <Container>
      <HeaderStyled>
        <Headline title="Transactions" />
        <HeaderButtons>
          <Button
            children="+ Add New Transaction"
            background={colors.greyDark}
            color={colors.white}
            weight={typography.textPreset4Bold.fontWeight}
            border="transparent"
            size={typography.textPreset4Bold.size}
            width="auto"
            onClick={() => dispatch(isOpenModal())}
          />
          <Button
            children="+Connect my Google Sheets template"
            background={colors.greyDark}
            color={colors.white}
            border="transparent"
            size={typography.textPreset4.size}
            width="auto"
            onClick={() => googleSheetsButton()}
          />
        </HeaderButtons>
      </HeaderStyled>
      <TransactionModal />

      <Div>
        {transactions.length > 0 && (
          <Row>
            <Formik
              initialValues={{
                search: "",
                category: "Groceries",
                sort: "Lastest",
              }}
              onSubmit={() => {}}
            >
              <ListElementsHeader
                type="Transaction"
                dispatchSearch={(value) => dispatch(searchTransaction(value))}
                dispatchFilter={(value) => dispatch(filterBy(value))}
                showSort={showSort}
                setShowSort={setShowSort}
                children={
                  <div ref={categoryRef}>
                    {showCategory && (
                      <Dropdown
                        text="Category"
                        items={categories}
                        dispatchAction={(value) => filterByCategory(value)}
                      />
                    )}
                  </div>
                }
                children2={
                  <Input
                    id="category"
                    type="select"
                    label="Category"
                    name="category"
                    placeholder="Select an option"
                    options={categories}
                    dispatchAction={(value) =>
                      dispatch(filterByCategory(value))
                    }
                  />
                }
              />
            </Formik>
            <Buttons>
              <Button
                children=""
                background={`url("${iconSortMobile}") center no-repeat`}
                color=""
                weight=""
                border="transparent"
                size=""
                width="auto"
                display="none"
                onClick={() => handleDropdown(showSort, setShowSort)}
              ></Button>
              <Button
                children=""
                background={`url("${iconFilterMobile}") center no-repeat`}
                color=""
                weight=""
                border="transparent"
                size=""
                width="auto"
                display="none"
                onClick={() => handleDropdown(showCategory, setShowCategory)}
              ></Button>
            </Buttons>
          </Row>
        )}
        <ListElements
          items={currentSort}
          isTheader={true}
          theader={theader}
          isCategory={true}
          repeat="4"
        />

        <ButtonContainer>
          <ButtonArrow onClick={handlePrevPage}>
            <img src={iconArrowLeft} alt="prev" />
            <span>Prev</span>
          </ButtonArrow>
          <ListNumbers>
            <li>{currentPage}</li>
          </ListNumbers>
          <ButtonArrow onClick={handleNextPage}>
            <span>Next</span>
            <img src={iconArrowRight} alt="next" />
          </ButtonArrow>
        </ButtonContainer>
      </Div>
    </Container>
  );
};
