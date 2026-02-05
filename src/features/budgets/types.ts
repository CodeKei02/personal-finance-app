export interface Budget {
  id: string;
  category: string;
  maximum: number;
  theme: string;
}

export interface ItemsInput {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface FormBudgets {
  budgets?: ItemsInput[];
  validationSchema: any;
}