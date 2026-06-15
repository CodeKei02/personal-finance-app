import { useCurrencyStore, type CurrencyCode } from "@/store/useCurrencyStore";

const OPTIONS: { code: CurrencyCode; label: string }[] = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "VES", label: "VES (Bs)" },
];

export const CurrencySelector = () => {
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-greyDark">
      <span className="hidden sm:inline">Currency</span>
      <select
        value={currency}
        onChange={(e) => void setCurrency(e.target.value as CurrencyCode)}
        className="rounded-lg border border-beigeNormal bg-white py-2 px-3 text-greyDark cursor-pointer"
      >
        {OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
