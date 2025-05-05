import { Form, FormikProps, Formik } from "formik";
import { Modal } from "./Modal";
import { ProgressBar } from "../textElements";
import { Input, Button } from "../form";
import { colors } from "../../styles/theme";
import { updatePotItem } from "../../store/slices/potsSlice";
import * as Yup from "yup";
import { useDispatch } from "react-redux";


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

export const PotActionModal: React.FC<PotActionModalProps> = ({
    title,
    action,
    showModal,
    onClose,
    selectedPot,
}) => {
    const dispatch = useDispatch();
    const initialValues: FormValues = { amount: 0 };

    const calculateNewAmount = (currentAmount: number, inputAmount: number): number => {
        return action === "add"
            ? currentAmount + inputAmount
            : currentAmount - inputAmount;
    };

    const calculateProgress = (amount: number, target?: number): number => {
        if (!target || target <= 0) return 0;
        return Math.min(Math.max((amount / target) * 100, 0), 100);
    };

    const handleFormSubmit = (values: any, { resetForm, setSubmitting }: any) => {
        const newAmount = calculateNewAmount(selectedPot.amount, values.amount);

        const updatedPot = {
            ...values,
            id: selectedPot.id,
            amount: newAmount,
        } ;

        dispatch(updatePotItem(updatedPot))
            .unwrap()
            .then(() => {
                setTimeout(() => {
                    resetForm();
                    setSubmitting(false);
                    onClose();
                }, 1000); 
            })
    };

    const getButtonText = (isSubmitting: boolean, action: string): string => {
        if (isSubmitting) return "Processing...";
        return action === "add" ? "Confirm Addition" : "Confirm Withdrawal";
    };

    return (
        <Modal showModal={showModal} onClose={onClose}>
            <div>
                <h2>{title}</h2>

                <p>
                    {action === "add"
                        ? "Add money to your pot to reach your savings goal."
                        : "Withdraw money from your pot when you need it."}
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting, values }: FormikProps<FormValues>) => {
                        const newAmount = calculateNewAmount(selectedPot.amount, values.amount || 0);
                        const progress = calculateProgress(newAmount, selectedPot.target);

                        return (
                            <Form>
                                <div>
                                    <div>
                                        <p> New Amount</p>
                                        <p>{newAmount.toLocaleString()}</p>
                                    </div>

                                    {selectedPot.target && (
                                        <>
                                            <ProgressBar percent={progress} />
                                            <div>
                                                <p>Current: ${selectedPot.amount?.toLocaleString()}</p>
                                                <p>Target: ${selectedPot.target?.toLocaleString()}</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <Input
                                    id="amount"
                                    type="number"
                                    label={`Amount to ${action === "add" ? "Add" : "Withdraw"}`}
                                    name="amount"
                                    placeholder="$ e.g. 2000"
                                //   min="0"
                                //   step="0.01"
                                />

                                <Button
                                    type="submit"
                                    background={colors.greyDark}
                                    backgroundhover={colors.beigeLight}
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
            </div>
        </Modal>
    );
};
