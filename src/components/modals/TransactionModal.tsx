import { Form, Formik } from "formik";
import { Input, Button, Calendar, Error } from "../form/index";
import { useDispatch, useSelector } from "react-redux";
import { addTransactions } from "../../store/slices/transactionsSlice";
import { Modal } from "./index";
import { colors, typography } from "../../styles/theme";
import { useState, useRef } from "react";
import { RootState } from "../../store/store";
import { useClickOutside } from "../../hooks/useClickOutside";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

interface MyFormValues {
  transactionName: string;
  amount: number;
  category: string;
  date: string;
  recurring: boolean;
}

const validationSchema = Yup.object({
  transactionName: Yup.string().required("Transaction name is required"),
  amount: Yup.number().positive("Amount must be greater than 0").required("Amount is required"),
  date: Yup.string().required("Date is required"),
  category: Yup.string().required("Category is required"),
});

const Span = styled.span`
  color: ${colors.greyNormal};
  font-size: ${typography.textPreset5Bold.size};
  font-weight: ${typography.textPreset5Bold.fontWeight};
  margin-bottom: 0.25rem;
`;


export const TransactionModal: React.FC = () => {
  const categories = ["Entertainment", "Bills", "Groceries", "Dining Out", "Transportation", "Personal Care", "Education"];
  const initialValues: MyFormValues = { transactionName: "", amount: 0, category: "", recurring: false, date: ""};
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const isOpenModal = useSelector((state: RootState) => state.ui.isModalOpen)
  const dispatch = useDispatch();

  useClickOutside(calendarRef, () => setShowCalendar(false));

  return (
    <Modal showModal={isOpenModal} >
      <h2>Add New Transaction</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const newTransaction = {
            id: uuidv4(),
            transactionName: values.transactionName,
            amount: values.amount,
            category: values.category,
            date: values.date,
          };

          dispatch(addTransactions(newTransaction));
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue }) => (

          <Form>
            <Input type="text" id="transactionName" label="Transaction Name" name="transactionName" placeholder="e.g Urban Services Hub" />

            <div ref={calendarRef}>
              <Span>Transaction Date</Span>
              <Button background={colors.beigeLight} color={colors.beigeNormal} weight="500" border="transparent" size="1.10rem" width="100%"
                onClick={() => setShowCalendar(!showCalendar)} type="button"
              >
                {selectedDate ? `${selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}` : "Pick a date 📆"}
              </Button>
              {showCalendar && <Calendar onDateSelect={(date) => {
                setSelectedDate(date);
                setFieldValue("date", date?.toLocaleDateString().split("T")[0]);
              }} />}
              <Error name="date" />
            </div>


            <Input
              id="category"
              type="select"
              label="Category"
              name="category"
              placeholder="Select an option"
              options={categories}
            />

            <Input 
              type="number" 
              id="amount" 
              label="Amount" 
              name="amount" 
              placeholder="e.g $1000" 
            />

            <Input 
              type="checkbox" 
              id="recurring" 
              label="Recurring" 
              name="recurring" 
              placeholder="" 
              direction="row" 
              marginleft="2rem" 
              />

            <Button background={colors.greyDark} backgroundhover={colors.beigeLight} color={colors.white} border="transparent" weight="700" size="1rem" width="100%" type="submit" disabled={isSubmitting} >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

