import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";
import { TransactionModal } from "./components/TransactionModal";
import { ListElements } from "@/features/shared/components/textElements/ListElements";
import { Headline } from "@/features/shared/components/textElements/Headline";
import { Header } from "@/features/shared/components/textElements/Header";
import { Container } from "@/features/shared/components/textElements/Container";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useUiStore } from "@/store/useUiStore";
import { useClickOutside } from "@/features/shared/hooks/useClickOutside";
import SortIcon from "@mui/icons-material/Sort";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListElementsHeader } from "@/features/shared/components/textElements/ListElementsHeader";
import { Dropdown } from "@/features/shared/components/dropdown/Dropdown";
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
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);

  const openModal = useUiStore((state) => state.openModal);

  const list = useTransactionStore((state) => state.list);
  const total = useTransactionStore((state) => state.total);
  const page = useTransactionStore((state) => state.page);
  const totalPages = useTransactionStore((state) => state.totalPages);
  const selectedCategory = useTransactionStore((state) => state.selectedCategory);
  const selectedSearch = useTransactionStore((state) => state.selectedSearch);
  const sortBy = useTransactionStore((state) => state.sortBy);
  const setPage = useTransactionStore((state) => state.setPage);
  const setSelectedCategory = useTransactionStore((state) => state.setSelectedCategory);
  const setSelectedSearch = useTransactionStore((state) => state.setSelectedSearch);
  const setSortBy = useTransactionStore((state) => state.setSortBy);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);

  // Server-side pagination: refetch whenever the page, filters, or sort change.
  useEffect(() => {
    void fetchTransactions();
  }, [page, selectedCategory, selectedSearch, sortBy, fetchTransactions]);

  const theader = ["Recipient/Sender", "Category", "Transaction Date", "Amount"];

  const handleDropdown = (
    show: boolean,
    setShow: (status: boolean) => void
  ): void => {
    setShow(!show);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
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
            onClick={() => openModal()}
          />
        </div>
      </Header>
      <TransactionModal />

      <div className="bg-white rounded-[10px] p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.1)] my-8 lg:my-4 lg:mr-4 lg:mt-0">
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
              dispatchSearch={(value: string) => setSelectedSearch(value)}
              dispatchFilter={(value: string) => setSortBy(value)}
              showSort={showSort}
              setShowSort={setShowSort}
              children={
                <div ref={categoryRef}>
                  {showCategory && (
                    <Dropdown
                      text="Category"
                      items={categories}
                      dispatchAction={(value) => setSelectedCategory(value)}
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
                  dispatchAction={(value) => setSelectedCategory(value)}
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

        <ListElements
          items={list}
          isTheader={true}
          theader={theader}
          isCategory={true}
          repeat="4"
        />

        <div className="flex justify-center gap-4 mt-6 md:justify-between">
          <button
            onClick={handlePrevPage}
            disabled={page <= 1}
            className="w-[60px] h-10 bg-transparent rounded-lg border border-beigeNormal flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed md:w-[100px] md:gap-4"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span className="text-preset4 hidden md:flex">Prev</span>
          </button>
          <ul className="list-none flex items-center gap-2">
            <li className="h-10 px-3 flex items-center text-center rounded-lg border border-beigeNormal">
              {page} / {totalPages} ({total})
            </li>
          </ul>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages}
            className="w-[60px] h-10 bg-transparent rounded-lg border border-beigeNormal flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed md:w-[100px] md:gap-4"
          >
            <span className="text-preset4 hidden md:flex">Next</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Container>
  );
};
