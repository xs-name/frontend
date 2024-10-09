import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const headers = {
  'Content-Type': 'application/json',
  // 'Authorization': process.env.NEXT_PUBLIC_KEY
};

export const config = {
  headers: { 
    'Content-Type': 'application/json',
    // 'Authorization': process.env.NEXT_PUBLIC_KEY
  },
  withCredentials: true
}