'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isValidSession = (): boolean => {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    console.error('Token verfication failed', error);
    return false;
  }
};

// Sign out
export const handleSignOut = () => {
  cookies().delete('authToken');

  window.location.href = '/';
};
