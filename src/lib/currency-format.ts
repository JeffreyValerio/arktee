export const currencyFormat = (
  value: number,
  currency: "CRC" | "USD" = "CRC"
) => {
  const formatter = new Intl.NumberFormat("en-CR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};
