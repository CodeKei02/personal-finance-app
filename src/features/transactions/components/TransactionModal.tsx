import { Form, Formik } from "formik";
import { Input, Button, Error } from "@/components";
import { Calendar } from "@/features/shared/components/calendar/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { addTransactions } from "@/store/slices/transactionsSlice";
import { Modal } from "@/features/shared/components/modals/Modal";
import { colors } from "@/styles/colors";
import { useState, useRef } from "react";
import { RootState } from "@/store/store";
import { useClickOutside } from "@/features/shared/hooks/useClickOutside";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { isCloseModal } from "@/store/slices/uiSlice";

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

export const TransactionModal = () => {
  const inputs: Array<{
    id: string;
    label: string;
    name?: string;
    type: "select" | "number" | "checkbox";
    placeholder?: string;
    options?: string[];
    direction?: "row" | "column";
    marginleft?: string;
  }> = [
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

  const transactionType: Array<{
    id: string;
    name: string;
    label: string;
    type: "radio";
    direction: "column";
  }> = [
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
                <div
                  className="text-greyNormal font-medium text-sm absolute right-[30px]"
                  style={length == 30 ? { color: colors.red } : {}}
                >
                  {length} characters of {30}
                </div>
              }
            />

            <div className="flex justify-evenly px-2 cursor-pointer mt-6 [&_input]:mr-2">
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
            </div>

            <div ref={calendarRef}>
              <span className="text-greyNormal text-preset5Bold font-extrabold mb-1">
                Transaction Date
              </span>
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
                  onDateSelect={(date: Date | undefined) => {
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
