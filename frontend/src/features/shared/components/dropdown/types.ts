import { Budget } from "@/features/budgets/types"
import { Pot } from "@/features/pots/types"
import { FormInput } from "@/features/shared/components/modals/type"
import type { ObjectSchema } from "yup";

export interface DropdownEditDeleteProps<T extends { id: string }> {
    method: string;
    title: string;
    paragraph: string;
    category: string;
    item: T;
    name: string;
    ref?: React.Ref<HTMLDivElement>;
    onEdit: (payload: T) => void | Promise<void>;
    onDelete: (value: T) => void | Promise<void>;
    inputs: FormInput[];
    initialValues: Budget | Pot;
    validationSchema: ObjectSchema<Record<string, unknown>>;
}
