export interface RecurringBill {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
  transactiontype: string;
}
