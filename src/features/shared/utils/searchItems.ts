export const searchItems = <T extends { name: string; date: string; amount: number }>(
  items: T[],
  selectorSearch: string): T[] => {
    return items.filter((item) =>
        (item.name ?? "").toLowerCase().includes(selectorSearch.toLowerCase())
    );
}
