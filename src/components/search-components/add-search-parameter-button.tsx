'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type AddSearchParameterButtonProps = {
  parameter: string;
  value: string;
  children: React.ReactNode;
};

export default function AddSearchParameterButton({
  parameter,
  value,
  children,
}: AddSearchParameterButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const handleClick = () => {
    if (value) {
      currentParams.set(parameter, value);
    } else {
      currentParams.delete(parameter);
    }

    // Remove page parameter when certain parameters are searched/clicked
    if (parameter === 'propertyType' || parameter === 'rentalType') {
      currentParams.delete('page');
    }

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <button onClick={handleClick} className='w-full h-full'>
      {children}
    </button>
  );
}
