import { Form, Formik } from "formik";
import { Input, Button, Error } from "../../../components";
import { Calendar } from "../calendar";
import { useDispatch, useSelector } from "react-redux";
import { addTransactions } from "../../../store/slices/transactionsSlice";
import { Modal } from "./index";
import { colors, typography } from "../../../styles/theme";
import { useState, useRef } from "react";
import { RootState } from "../../../store/store";
import { useClickOutside } from "../../hooks/useClickOutside";
import * as Yup from "yup";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { isCloseModal } from "../../../store/slices/uiSlice";

interface MyFormValues {
  name: string;
  amount: number;
  category: string;
  date: string;
  transactiontype: string;
  recurring: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Transaction name is required"),
  amount: Yup.number()
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  date: Yup.string().required("Date is required"),
  category: Yup.string().required("Category is required"),
  transactiontype: Yup.string().required("Transaction type is required"),
});

const Span = styled.span`
  color: ${colors.greyNormal};
  font-size: ${typography.textPreset5Bold.size};
  font-weight: ${typography.textPreset5Bold.fontWeight};
  margin-bottom: 0.25rem;
`;

const MessageInput = styled.div`
  color: ${colors.greyNormal};
  font-weight: 500;
  font-size: 0.9rem;
  position: absolute;
  right: 30px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-inline: 0.5rem;
  cursor: pointer;
  margin-top: 1.5rem;

  input {
    margin-right: 0.5rem;
  }
`;

export const TransactionModal = () => {
  const inputs = [
    {
      id: "category",
      label: "Category",
      type: "select",
      placeholder: "Select an option",
      options: [
        "Entertainment",
        "Bills",
        "Groceries",
        "Dining Out",
        "Transportation",
        "Personal Care",
        "Education",
      ],
    },
    {
      id: "amount",
      label: "Amount",
      type: "number",
      placeholder: "e.g $1000",
    },
    {
      id: "isRecurring",
      label: "Recurring",
      type: "checkbox",
      direction: "row",
      marginleft: "2rem",
    },
  ];

  const transactionType = [
    {
      id: "income",
      name: "transactiontype",
      label: "Income",
      type: "radio",
      direction: "column",
    },
    {
      id: "expense",
      name: "transactiontype",
      label: "Expense",
      type: "radio",
      direction: "column",
    },
  ];
  const initialValues: MyFormValues = {
    name: "",
    amount: 0,
    category: "",
    transactiontype: "",
    recurring: false,
    date: "",
  };
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [length, setLength] = useState(0);

  const isOpenModal = useSelector((state: RootState) => state.ui.isModalOpen);

  const dispatch = useDispatch();

  const handleFormSubmit = (values: any, { resetForm, setSubmitting }: any) => {
    const newTransaction = {
      id: uuidv4(),
      name: values.name,
      amount: Number(values.amount),
      category: values.category,
      transactiontype: values.transactiontype,
      recurring: values.recurring,
      date: values.date,
    };

    setTimeout(() => {
      dispatch(addTransactions(newTransaction));
      resetForm();
      setSubmitting(false);
      dispatch(isCloseModal());
    }, 1000);
  };

  useClickOutside(calendarRef, () => setShowCalendar(false));
  return (
    <Modal showModal={isOpenModal} onClose={() => dispatch(isCloseModal())}>
      <h2>Add New Transaction</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Input
              type="text"
              id="name"
              label="Transaction Name"
              name="name"
              placeholder="e.g Urban Services Hub"
              maxLength={30}
              setLength={setLength}
              count={length}
              children={
                <MessageInput style={length == 30 ? { color: colors.red } : {}}>
                  {length} characters of {30}
                </MessageInput>
              }
            />

            <Flex>
              {transactionType.map((input) => (
                <Input
                  key={input.id}
                  id={input.id}
                  value={input.id}
                  type={input.type}
                  label={input.label}
                  name={input.name}
                  direction={input.direction}
                />
              ))}
            </Flex>

            <div ref={calendarRef}>
              <Span>Transaction Date</Span>
              <Button
                background={colors.beigeLight}
                color={colors.beigeNormal}
                weight="500"
                border="transparent"
                size="1.10rem"
                width="100%"
                onClick={() => setShowCalendar(!showCalendar)}
                type="button"
              >
                {selectedDate
                  ? `${selectedDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}`
                  : "Pick a date 📆"}
              </Button>
              {showCalendar && (
                <Calendar
                  onDateSelect={(date) => {
                    setSelectedDate(date);
                    setFieldValue(
                      "date",
                      date?.toLocaleDateString().split("T")[0]
                    );
                  }}
                />
              )}
              <Error name="date" />
            </div>
            {inputs.map((input) => (
              <Input
                key={input.id}
                id={input.id}
                type={input.type}
                label={input.label}
                name={input.id}
                placeholder={input.placeholder}
                direction={input.direction}
                marginleft={input.marginleft}
                options={input.options}
              />
            ))}

            <Button
              background={colors.greyDark}
              backgroundhover={colors.beigeLight}
              color={colors.white}
              border="transparent"
              weight="700"
              size="1rem"
              width="100%"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
