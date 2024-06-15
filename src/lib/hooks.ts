import { HomeContext } from '@/contexts/home-context-provider';
import { useContext } from 'react';

export function useHomeContext() {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHomeContext must be used within a HomeContextProvider');
  }

  return context;
}
