import { Transaction } from "@/features/transactions/types";

export interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export interface ContainerProps {
    children?: React.ReactNode;
}

export interface HeadlineProps {
    title: string;
}

export interface ParagraphProps {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
}

export interface ThemeItem {
    id: string;
    theme: string;
}

export interface CardHeaderProps {
    type: ThemeItem;
    name: string;
    handleDropdownToggle: (value: string) => void;
}

export interface ListItem {
    id: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    transactiontype: string;
    recurring: boolean;
}

export interface ListElementsProps {
    items: ListItem[];
    theader?: string[];
    isCategory?: boolean;
    isTheader?: boolean;
    repeat: string;
}

export interface ListElementsHeaderProps {
    dispatchSearch: (value: string) => void;
    dispatchFilter: (value: string) => void;
    children?: React.ReactNode;
    children2?: React.ReactNode;
    type: string;
    showSort: boolean;
    setShowSort: (value: boolean) => void;
}

export interface SummaryProps {
    transactions: Transaction[];
}

export interface ProgressBarProps {
    backgroundColor: string;
    amount: number;
    target: number;
}

export interface MotionProps {
    children: React.ReactNode;
    card: string | number;
    index: number;
    style?: React.CSSProperties;
}
