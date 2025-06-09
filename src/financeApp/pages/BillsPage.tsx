import styled from "styled-components";
import {
  Headline,
  Container,
  Header,
  ListElementsHeader,
  ListElements,
  Summary,
} from "../components/textElements";
import { colors } from "../../styles/theme";
import imageBills from "../../../public/images/icon-recurring-bills.svg";
import { searchItems, sortItems } from "../utils";
import {
  filterBy,
  searchTransaction,
} from "../../store/slices/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "../../components";
import iconSortMobile from "../../../public/images/icon-sort-mobile.svg";
import { RootState } from "../../store/store";
import { getRecurringData, getTotalAmount } from "../utils/billsUtils";
import { motion } from "motion/react";
const TotalBillsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: ${colors.greyDark};
  border-radius: 8px;
  color: ${colors.white};
  margin: 1.5rem 0;

  img {
    width: 35px;
    height: 35px;
    margin-right: 2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    p:first-child {
      font-size: 1.2rem;
      font-weight: 500;
    }

    p:last-child {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;

const ListContainer = styled.div`
  background-color: ${colors.white};
  margin: 1.5rem 0;
  border-radius: 8px;
  min-height: 200px;
  padding: 1rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    select,
    label {
      display: none;
    }
  }

  @media (min-width: 786px) {
    div select,
    label {
      display: flex;
    }
  }
`;

export const BillsPage = () => {
  const dispatch = useDispatch();
  const { transactions, selectedSearch, sortBy } = useSelector(
    (state: RootState) => state.transaction
  );
  const [showSort, setShowSort] = useState(false);
  const handleDropdown = (
    show: boolean,
    setShow: (status: boolean) => void
  ): void => {
    setShow(!show);
  };

  const recurringBills = getRecurringData(transactions);

  const currentSearch = searchItems(recurringBills, selectedSearch);
  const currentSort = sortItems(currentSearch, sortBy);

  const theader = ["Bill Title", "Due Date", "Amount"];
  return (
    <Container>
      <Header>
        <Headline title="Recurring Bills" />
      </Header>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <TotalBillsContainer>
          <img src={imageBills} alt="icon-bills" />
          <div>
            <p>Total bills</p>
            <p>${getTotalAmount(recurringBills)}</p>
          </div>
        </TotalBillsContainer>
        <Summary transactions={transactions} />
        <ListContainer>
          <div>
            <Formik
              initialValues={{
                search: "",
                filter: "All",
              }}
              onSubmit={() => {}}
            >
              <ListElementsHeader
                type="Bills"
                dispatchSearch={(value) => dispatch(searchTransaction(value))}
                dispatchFilter={(value) => dispatch(filterBy(value))}
                showSort={showSort}
                setShowSort={setShowSort}
              />
            </Formik>
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
          </div>
          <ListElements
            items={currentSort}
            theader={theader}
            isTheader={true}
            repeat="3"
          />
        </ListContainer>
      </motion.div>
    </Container>
  );
};
