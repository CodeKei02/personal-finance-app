import type { AsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";
import type { UnknownAction } from "@reduxjs/toolkit";
import { Budget } from "@/features/budgets/types"
import { Pot } from "@/features/pots/types"
import { FormInput } from "@/features/shared/components/modals/type"

export interface DropdownEditDeleteProps<T extends { id: string }> {
    method: string;
    title: string;
    paragraph: string;
    category: string;
    item: T;
    name: string;
    ref?: React.Ref<HTMLDivElement>;
    onEdit: AsyncThunk<any, T, object>;
    onDelete: (value: T) => UnknownAction | AsyncThunkAction<any, any, object>;
    inputs: FormInput[];
    initialValues: Budget | Pot;
    validationSchema: any;
}