import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toStringfy<T>(data: T):string {
  const jsonString = JSON.stringify(data, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );

  return jsonString
}
