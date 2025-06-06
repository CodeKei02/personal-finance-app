interface Transaction {
    id: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
}

export function getRecurringData(transactions: Transaction[]) {
  return transactions.filter((transaction) => transaction.recurring);
}

export function getRecurringBills(recurringData: Transaction[]) {
  return recurringData.filter(
    (transaction) => transaction.recurring && transaction.amount < 0
  );
}

export const getPaidBills = (recurringData: Transaction[]) => {
  return recurringData.filter(
    (transaction) => new Date(transaction.date) < new Date()
  );
}

export function getUpcomingBills(recurringData: Transaction[]) {
  return recurringData.filter(
    (transaction) => new Date(transaction.date) >= new Date()
  );
}

export function getDueSoonBills(recurringData: Transaction[]) {
  const today = new Date();
  return recurringData.filter((transaction) => {
    const dueDate = new Date(transaction.date);
    const diffInDay = (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diffInDay <= 3 && diffInDay >= 0;
  });
}

export function getTotalAmount(bills: Transaction[]) {
  return bills.reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0).toFixed(2);
}
