export function sortItems<T extends { name: string; date: string; amount: number }>(
  items: T[],
  selectorSort: string
): T[] {
  return [...items].sort((a, b) => {
    switch (selectorSort) {
      case "Latest":
        return a.date.localeCompare(b.date);
      case "Oldest":
        return b.date.localeCompare(a.date);
      case "A to Z":
        return a.name.localeCompare(b.name);
      case "Z to A":
        return b.name.localeCompare(a.name);
      case "Highest":
        return Number(b.amount) - Number(a.amount);
      case "Lowest":
        return Number(a.amount) - Number(b.amount);
      default:
        return 0;
    }
  });
}