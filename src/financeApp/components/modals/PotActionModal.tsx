import { Form, FormikProps, Formik } from "formik";
import { Modal } from "./Modal";
import { ProgressBar } from "../textElements";
import { Input, Button } from "../../../components";
import { colors } from "../../../styles/theme";
import { updatePotItem } from "../../../store/slices/potsSlice";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../../store/store";

interface Pot {
  id: string;
  potName: string;
  amount: number;
  target: number;
  theme: string;
}

interface PotActionModalProps {
  title: string;
  action: "add" | "withdraw";
  showModal: boolean;
  onClose: () => void;
  selectedPot: Pot;
}

interface FormValues {
  amount: number;
}

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .moreThan(0, "Amount must be greater than 0"),
});

const PotActionModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${colors.greyNormal};
    margin-top: 1rem;
  }

  .pot-form {
    .pot-form__amount,
    .pot-form__target {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h2 {
        font-size: 2rem;
      }
    }
  }
`;

export const PotActionModal: React.FC<PotActionModalProps> = ({
  title,
  action,
  showModal,
  onClose,
  selectedPot,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: FormValues = { amount: 0 };

  const calculateNewAmount = (
    currentAmount: number,
    inputAmount: number
  ): number => {
    return action === "add"
      ? currentAmount + inputAmount
      : action === "withdraw"
      ? currentAmount - inputAmount
      : 0;
  };

  const handleFormSubmit = (values: any, { resetForm, setSubmitting }: any) => {
    const newAmount = calculateNewAmount(selectedPot.amount, values.amount);

    const updatedPot = {
      ...selectedPot,
      id: selectedPot.id,
      amount: newAmount,
    };

    dispatch(updatePotItem(updatedPot))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          resetForm();
          setSubmitting(false);
          onClose();
        }, 1000);
      });
  };

  const getButtonText = (isSubmitting: boolean, action: string): string => {
    if (isSubmitting) return "Processing...";
    return action === "add" ? "Confirm Addition" : "Confirm Withdraw";
  };

  return (
    <Modal showModal={showModal} onClose={onClose}>
      <PotActionModalContainer>
        <h2>{title}</h2>

        <p>
          {action === "add" &&
            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id erat ut nisi efficitur facilisis. Donec ac ligula a nunc efficitur tincidunt."}
          {action === "withdraw" &&
            "Withdraw money from your pot when you need it."}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, values }: FormikProps<FormValues>) => {
            const newAmount = calculateNewAmount(
              selectedPot.amount,
              values.amount || 0
            );

            return (
              <Form>
                <div className="pot-form">
                  <div className="pot-form__amount">
                    <p>
                      <strong>New Amount</strong>
                    </p>
                    <h2>
                      $
                      {newAmount < 0
                        ? "0"
                        : newAmount > selectedPot.target
                        ? selectedPot.target?.toLocaleString()
                        : newAmount.toLocaleString()}
                    </h2>
                  </div>

                  {selectedPot.target && (
                    <div>
                      <ProgressBar
                        amount={newAmount}
                        target={selectedPot.target}
                        backgroundColor={selectedPot.theme}
                      />
                      <div className="pot-form__target">
                        <p>
                          {(
                            (selectedPot.amount * selectedPot.target) /
                            100
                          ).toFixed(2)}
                          %
                        </p>
                        <p>Target of ${selectedPot.target?.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Input
                  id="amount"
                  type="number"
                  label={`Amount to ${action === "add" ? "Add" : "Withdraw"}`}
                  name="amount"
                  placeholder="$ e.g. 2000"
                />

                <Button
                  type="submit"
                  background={colors.greyDark}
                  backgroundhover={colors.greyMedium}
                  color={colors.white}
                  border="transparent"
                  weight="700"
                  size="1rem"
                  width="100%"
                  disabled={isSubmitting}
                >
                  {getButtonText(isSubmitting, action)}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </PotActionModalContainer>
    </Modal>
  );
};
