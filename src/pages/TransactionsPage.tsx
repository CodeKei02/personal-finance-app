import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Form, Formik } from "formik";
import { Button, Input } from "../components/form/index";
import { colors, typography } from "../styles/theme/index";
import { TransactionModal } from "../components/modals/index";
import { useRef, useState } from "react";
import { ListElements, Headline, Header, Container } from "../components/textElements/index"
import { DropdownMobile } from "../components/dropdown/index";
import { filterByCategory, sortBy, searchTransaction } from "../store/slices/transactionsSlice";
import { useClickOutside } from "../hooks/useClickOutside";
import { isOpenModal } from "../store/slices/uiSlice";
import styled from "styled-components";
import iconFilterMobile from "../../public/images/icon-filter-mobile.svg";
import iconSortMobile from "../../public/images/icon-sort-mobile.svg";

const Div = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  margin: 2rem 0;
  max-height: 900px;
  padding: 1rem;
`;

const Formulario = styled(Form)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const DropdownContainer = styled.div`
  display: none;

  @media (min-width: 786px) {
    display: flex;
    gap: 1rem;
  }
`;

const InputSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  border: 1px solid ${colors.beigeNormal};
  border-radius: 8px;
  
  i{
    color: ${colors.beigeNormal};
  }

  input{
    padding: 0px;
  }

  input:focus{
    outline: none;
  }
`;


export const TransactionsPage = () => {
  const categories = ["All Transactions", "Entertainment", "Bills", "Groceries", "Dining Out", "Transportation", "Personal Care", "Education"];
  const sort = ["Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
  const [showCategory, setShowCategory] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const { transactions, selectedCategory, filterBy, selectedSearch, currentList } = useSelector((state: RootState) => state.transactions);
  const dispatch = useDispatch();

  const filteredTransactions = transactions[currentList].filter((transaction) =>
    selectedCategory === "All Transactions" || transaction.category === selectedCategory);

  const searchedTransaction = filteredTransactions.filter((transaction) => transaction.transactionName.toLowerCase().includes(selectedSearch.toLowerCase()));

  const sortedTransactions = [...searchedTransaction].sort((a, b) => {
    switch (filterBy) {
      case "Latest":
        return a.date.localeCompare(b.date);
      case "Oldest":
        return b.date.localeCompare(a.date);
      case "A to Z":
        return a.transactionName.localeCompare(b.transactionName);
      case "Z to A":
        return b.transactionName.localeCompare(a.transactionName);
      case "Highest":
        return Number(b.amount - a.amount);
      case "Lowest":
        return Number(a.amount - b.amount);
    }
  });

  const handleDropdown = (show: boolean, setShow: (status: boolean) => void): void => {
    setShow(!show);
  }

  useClickOutside(categoryRef, () => setShowCategory(false));
  useClickOutside(sortRef, () => setShowSort(false));

  return (
    <Container>
      <Header>
        <Headline title="Transactions" />
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
      </Header>

      <TransactionModal />

      <Div>
        {transactions.length > 0 &&
          (
            <Row>
              <Formik
                initialValues={{ search: "", category: "Groceries", sort: "Lastest" }}
                onSubmit={() => { }}
              >

                <Formulario>
                  <InputSearch>
                    <Input
                      id="search"
                      type="search"
                      label=""
                      name="search"
                      placeholder="Search Transaction"
                      width="220px"
                      dispatchAction={(value) => searchTransaction(value)}
                      border="0px"
                    />
                    <i className="fa fa-search"></i>
                  </InputSearch>

                  <div ref={categoryRef}>
                    {showCategory &&
                      <DropdownMobile text="Category" items={categories} dispatchAction={(value) => filterByCategory(value)} />
                    }
                  </div>
                  <div ref={sortRef}>
                    {showSort && <DropdownMobile text="Sort" items={sort} dispatchAction={(value) => sortBy(value)} />}
                  </div>

                  <DropdownContainer>
                    <Input
                      id="sort"
                      type="select"
                      label="Sort By"
                      name="sort"
                      placeholder="Select an option"
                      options={sort}
                      dispatchAction={(value) => sortBy(value)}
                    />
                    <Input
                      id="category"
                      type="select"
                      label="Category"
                      name="category"
                      placeholder="Select an option"
                      options={categories}
                      dispatchAction={(value) => filterByCategory(value)}
                    />
                  </DropdownContainer>
                </Formulario>
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
          )
        }
        <ListElements items={Array.isArray(sortedTransactions) ? [sortedTransactions] : [[]]} />

      </Div>
      
    </Container>
  )
}
