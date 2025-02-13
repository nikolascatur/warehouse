import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toStringfy<T>(data: T): string {
  const jsonString = JSON.stringify(data, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  return jsonString;
}
export const formatCurrency = (
  value: number,
  locale = "id-ID",
  currency = "IDR"
) => {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

export const isValideForm = (...value: (string | undefined)[]) => {
  const check = value.filter((item) => item === undefined);
  return check.length == 0;
};

export const stringToNumber = (value: string|undefined) => {
    if(!isNaN(Number(value))) {
      return Number(value);
    } else {
      return 0;
    }
}
