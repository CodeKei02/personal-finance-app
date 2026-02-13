import type {
  FormInput,
  FormInputType,
} from "@/features/shared/components/modals/type";

export interface Budget {
  id: string;
  category: string;
  maximum: number;
  theme: string;
}

export interface ItemsInput {
  id: string;
  type: FormInputType;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface FormBudgets {
  budgets?: FormInput[];
  validationSchema: any;
}