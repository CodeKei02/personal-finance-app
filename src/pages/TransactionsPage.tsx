import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Form, Formik } from "formik";
import { Button, Input } from "../components/form/index";
import { breakpoints, colors, typography } from "../styles/theme/index";
import { TransactionModal } from "../components/modals/index";
import { useRef, useState } from "react";
import { ListElements, Headline, Header, Container } from "../components/textElements/index"
import { Dropdown } from "../components/dropdown/index";
import { filterByCategory, filterBy, searchTransaction } from "../store/slices/transactionsSlice";
import { useClickOutside } from "../hooks/useClickOutside";
import { isOpenModal } from "../store/slices/uiSlice";
import styled from "styled-components";
import iconFilterMobile from "../../public/images/icon-filter-mobile.svg";
import iconSortMobile from "../../public/images/icon-sort-mobile.svg";
import iconArrowLeft from "../../public/images/icon-caret-left.svg"
import iconArrowRight from "../../public/images/icon-caret-right.svg"

const Div = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  margin: 2rem 0;
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

    div{
      flex-direction: row;
      align-items: center;
      gap: .25rem;
      margin-left: 1rem;
    }
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width:${breakpoints.tablet}){
    justify-content: space-between;
  }
`;

const ButtonArrow = styled.button`
  width: 60px;
  height: 40px;
  background: transparent;
  border-radius: .5rem;
  border: 1px solid ${colors.beigeNormal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  cursor: pointer;
  
  img{
    width: 1rem;
    height: 1rem;
  }

  span{
    font-size: ${typography.textPreset4.size};
    display: none;
  }

  @media (min-width: ${breakpoints.tablet}){
    width: 100px;
    gap: 1rem;
    
    span{
      display: flex;
    }
  }
`;

const ListNumbers = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: .5rem;
  
  li{
    width: 40px;
    height: 40px;
    padding: .5rem;
    text-align: center;
    border-radius: .5rem;
    border: 1px solid ${colors.beigeNormal};
  }
`;

export const TransactionsPage = () => {
  const categories = ["All Transactions", "Entertainment", "Bills", "Groceries", "Dining Out", "Transportation", "Personal Care", "Education"];
  const sortByFilter = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
  const [showCategory, setShowCategory] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionPerPage = 10;
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const { transactions, selectedCategory, selectedSearch, sortBy } = useSelector((state: RootState) => state.transaction);
  const dispatch = useDispatch();

  const indexOfLastTransaction = currentPage * transactionPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const currentCategory = currentTransactions.filter((transaction) => selectedCategory === 'All Transactions' || transaction.category === selectedCategory)

  const currentSearch = currentCategory.filter((transaction) => transaction.transactionName.toLowerCase().includes(selectedSearch.toLowerCase()));

  const currentSort = currentSearch.sort((a, b) => {
    switch (sortBy) {
      case "Latest":
        return a.date.localeCompare(b.date)

      case "Oldest":
        return b.date.localeCompare(a.date)

      case "A to Z":
        return a.transactionName.localeCompare(b.transactionName)

      case "Z to A":
        return b.transactionName.localeCompare(a.transactionName)

      case "Highest":
        return Number(b.amount) - Number(a.amount)

      case "Lowest":
        return Number(a.amount) - Number(b.amount)
    }
  })

  const handleDropdown = (show: boolean, setShow: (status: boolean) => void): void => {
    setShow(!show);
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev > 1 ? prev -= 1 : prev = 1);
  }

  const handleNextPage = () => {
    if (currentTransactions.length > 9) {
      setCurrentPage((next) => next += 1);
    }
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
                      <Dropdown text="Category" items={categories} dispatchAction={(value) => filterByCategory(value)} />
                    }
                  </div>
                  <div ref={sortRef}>
                    {showSort && <Dropdown text="Sort" items={sortByFilter} dispatchAction={(value) => filterBy(value)} />}
                  </div>

                  <DropdownContainer>
                    <Input
                      id="sort"
                      type="select"
                      label="Sort By"
                      name="sort"
                      placeholder="Select an option"
                      options={sortByFilter}
                      dispatchAction={(value) => filterBy(value)}
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
        <ListElements items={currentSort} />

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
  )
}
