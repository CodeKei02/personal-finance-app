import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Formik } from "formik";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";
import { TransactionModal } from "./components/TransactionModal";
import { useRef, useState } from "react";
import { ListElements } from "@/features/shared/components/textElements/ListElements";
import { Headline } from "@/features/shared/components/textElements/Headline";
import { Header } from "@/features/shared/components/textElements/Header";
import { Container } from "@/features/shared/components/textElements/Container";
import {
  filterByCategory,
  filterBy,
  searchTransaction,
} from "@/store/slices/transactionsSlice";
import { useClickOutside } from "@/features/shared/hooks/useClickOutside";
import { isOpenModal } from "@/store/slices/uiSlice";
import SortIcon from "@mui/icons-material/Sort";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { searchItems } from "@/features/shared/utils/searchItems";
import { sortItems } from "../shared/utils/sortItems";
import { ListElementsHeader } from "@/features/shared/components/textElements/ListElementsHeader";
import { Dropdown } from "@/features/shared/components/dropdown/Dropdown";
import { openTemplate } from "@/store/slices/uiSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

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

  const currentSearch = searchItems(currentCategory, selectedSearch);
  const currentSort = sortItems(currentSearch, sortBy);
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
      dispatch(openTemplate());
      window.open(googleSheetUrl, "_blank");
    };
    return handleRedirect();
  };

  useClickOutside(categoryRef, () => setShowCategory(false));
  useClickOutside(sortRef, () => setShowSort(false));
  return (
    <Container>
      <Header className="flex gap-4 flex-col md:flex-row">
        <Headline title="Transactions" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <Button
            children="+ Add New Transaction"
            background={colors.greyDark}
            backgroundhover={colors.greyMedium}
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
            backgroundhover={colors.greyMedium}
            color={colors.white}
            border="transparent"
            size={typography.textPreset4Bold.size}
            width="auto"
            onClick={() => googleSheetsButton()}
          />
        </div>
      </Header>
      <TransactionModal />

      <div className="bg-white rounded-[10px] p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.1)] my-8 lg:my-4 lg:mr-4 lg:mt-0">
        {transactions.length > 0 && (
          <div className="flex justify-between items-center gap-4">
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
                dispatchSearch={(value: string) =>
                  dispatch(searchTransaction(value))
                }
                dispatchFilter={(value: string) => dispatch(filterBy(value))}
                showSort={showSort}
                setShowSort={setShowSort}
                children={
                  <div ref={categoryRef}>
                    {showCategory && (
                      <Dropdown
                        text="Category"
                        items={categories}
                        dispatchAction={(value) => filterByCategory(value)}
                        className="bottom-0 right-[20px]"
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
            <div className="flex md:hidden">
              <Button
                children={<SortIcon className="w-4 h-4" />}
                background="transparent"
                color={colors.greyDark}
                border="transparent"
                width="auto"
                onClick={() => handleDropdown(showSort, setShowSort)}
              ></Button>
              <Button
                children={<FilterAltIcon className="w-4 h-4" />}
                background="transparent"
                color={colors.greyDark}
                border="transparent"
                width="auto"
                onClick={() => handleDropdown(showCategory, setShowCategory)}
              ></Button>
            </div>
          </div>
        )}
        <ListElements
          items={currentSort}
          isTheader={true}
          theader={theader}
          isCategory={true}
          repeat="4"
        />

        <div className="flex justify-center gap-4 mt-6 md:justify-between">
          <button
            onClick={handlePrevPage}
            className="w-[60px] h-10 bg-transparent rounded-lg border border-beigeNormal flex items-center justify-center gap-2 cursor-pointer md:w-[100px] md:gap-4"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span className="text-preset4 hidden md:flex">Prev</span>
          </button>
          <ul className="list-none flex items-center gap-2">
            <li className="w-10 h-10 p-2 text-center rounded-lg border border-beigeNormal">
              {currentPage}
            </li>
          </ul>
          <button
            onClick={handleNextPage}
            className="w-[60px] h-10 bg-transparent rounded-lg border border-beigeNormal flex items-center justify-center gap-2 cursor-pointer md:w-[100px] md:gap-4"
          >
            <span className="text-preset4 hidden md:flex">Next</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Container>
  );
};
