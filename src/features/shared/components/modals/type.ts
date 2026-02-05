import * as Yup from "yup";
import type { AsyncThunk } from "@reduxjs/toolkit";

export interface ThemeOption {
    name: string;
    value: string;
    used?: boolean;
}

export type FormInputType =
    | "text"
    | "number"
    | "search"
    | "checkbox"
    | "select"
    | "submit"
    | "radio";

export interface FormInput {
    id: string;
    type: FormInputType;
    label: string;
    name: string;
    amount?: number;
    placeholder?: string;
    options?: string[];
    validation?: Yup.StringSchema | Yup.NumberSchema | Yup.BooleanSchema | Yup.DateSchema;
}

export interface PlanModalProps<T extends Record<string, unknown> = Record<string, unknown>, P = T> {
    type?: string;
    title: string;
    paragraph: string;
    buttonText: string;
    inputs: FormInput[];
    initialValues: T;
    validationSchema: Yup.ObjectSchema<Record<string, unknown>>;
    themeOptions?: ThemeOption[];
    showModal: boolean;
    dispatchAction: AsyncThunk<any, P, object>;
    usedColors?: string[];
    onClose: () => void;
    onSubmitCallback?: (values: T) => P;
}
