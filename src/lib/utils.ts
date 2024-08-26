import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const headers = {
  'Content-Type': 'application/json',
  'Authorization': '03ec91dc-c802-46b1-9cb1-4df06e40cb36'
};