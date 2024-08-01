import { fetchEditData } from '@/actions/actions';
import RentalEditForm from '@/components/rental-edit-form';
import React from 'react';

type paramsType = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: paramsType) {
  const rentalId = params.id;
  const rentalEditData = await fetchEditData(rentalId);
  const parsedData = JSON.parse(rentalEditData);
  console.log(parsedData);
  return <RentalEditForm initialData={parsedData} />;
}
