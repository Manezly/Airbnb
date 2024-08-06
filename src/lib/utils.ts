import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withTimeout<T>(
  asyncFn: (...args: any[]) => Promise<T>,
  timeout: number = 9500
) {
  return async (...args: any[]): Promise<T> => {
    return Promise.race([
      asyncFn(...args),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      ),
    ]);
  };
}
