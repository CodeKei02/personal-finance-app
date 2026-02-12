export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
  transactiontype: string;
}

export type SortBy = 'Latest' | 'Oldest' | 'A to Z' | 'Z to A' | 'Highest' | 'Lowest';
