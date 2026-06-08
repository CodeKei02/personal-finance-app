import { Headline } from "@/features/shared/components/textElements/Headline";
import { Container } from "@/features/shared/components/textElements/Container";
import { Header } from "@/features/shared/components/textElements/Header";
import { ListElementsHeader } from "@/features/shared/components/textElements/ListElementsHeader";
import { ListElements } from "@/features/shared/components/textElements/ListElements";
import { Summary } from "@/features/shared/components/textElements/Summary";
import { searchItems, sortItems } from "@/features/shared/utils";
import { useTransactionStore } from "@/store/useTransactionStore";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "@/components";
import { getRecurringData, getTotalAmount } from "./utils/billsUtils";
import { motion } from "motion/react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export const BillsPage = () => {
  const transactions = useTransactionStore((state) => state.all);
  const selectedSearch = useTransactionStore((state) => state.selectedSearch);
  const sortBy = useTransactionStore((state) => state.sortBy);
  const setSelectedSearch = useTransactionStore((state) => state.setSelectedSearch);
  const setSortBy = useTransactionStore((state) => state.setSortBy);
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
        <div className="flex items-center p-8 bg-greyDark rounded-lg text-white my-6 [&_img]:w-[35px] [&_img]:h-[35px] [&_img]:mr-8">
          <img src="/images/icon-recurring-bills.svg" alt="icon-bills" />
          <div className="flex flex-col justify-center items-start [&_p:first-child]:text-xl [&_p:first-child]:font-medium [&_p:last-child]:text-3xl [&_p:last-child]:font-bold">
            <p>Total bills</p>
            <p>${getTotalAmount(recurringBills)}</p>
          </div>
        </div>
        <Summary transactions={transactions} />
        <div className="bg-white my-6 rounded-lg min-h-[200px] p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.1)] [&_div]:flex [&_div]:items-center [&_div]:justify-between [&_div_select]:hidden [&_div_label]:hidden min-[786px]:[&_div_select]:flex min-[786px]:[&_div_label]:flex">
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
                dispatchSearch={(value) => setSelectedSearch(value)}
                dispatchFilter={(value) => setSortBy(value)}
                showSort={showSort}
                setShowSort={setShowSort}
              />
            </Formik>
            <Button
              border="transparent"
              width="auto"
              display="none"
              onClick={() => handleDropdown(showSort, setShowSort)}
            >
              <FilterAltIcon />
            </Button>
          </div>
          <ListElements
            items={currentSort}
            theader={theader}
            isTheader={true}
            repeat="3"
          />
        </div>
      </motion.div>
    </Container>
  );
};
