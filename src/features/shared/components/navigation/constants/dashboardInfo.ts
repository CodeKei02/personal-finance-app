import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import PaidIcon from '@mui/icons-material/Paid';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Dashboard } from "@/features/shared/components/navigation/types"

export const dashboardInfo: Dashboard[] = [
    {
        id: "1",
        title: "Overview",
        path: "/finance/overview",
        image: HomeFilledIcon
    },
    {
        id: "2",
        title: "Transactions",
        path: "/finance/transactions",
        image: ImportExportIcon
    },
    {
        id: "3",
        title: "Budgets",
        path: "/finance/budgets",
        image: DonutSmallIcon,
    },
    {
        id: "4",
        title: "Pots",
        path: "/finance/pots",
        image: PaidIcon
    },
    {
        id: "5",
        title: "Recurring Bills",
        path: "/finance/bills",
        image: CreditCardIcon
    },
];