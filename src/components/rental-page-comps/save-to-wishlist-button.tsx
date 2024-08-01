'use client';

import { saveToWishlist } from '@/actions/actions';
import Image from 'next/image';

type SaveToWishListButtonProps = {
  rentalId: string;
};

export default function SaveToWishListButton({
  rentalId,
}: SaveToWishListButtonProps) {
  const handleWishlistSave = async (rentalId: string) => {
    try {
      const result = await saveToWishlist(rentalId);
      if (result && result.success) {
        alert('Rental added to wishlist');
      } else {
        alert('Failed to add rental to wishlist');
      }
    } catch (error) {
      console.error('Error adding rental to wishlist:', error);
    }
  };
  return (
    <button
      onClick={() => handleWishlistSave(rentalId)}
      className='opacity-80 flex items-center gap-2 underline rounded-md hover:bg-black/5 p-2'
    >
      <Image
        src='data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNy4yMzQgMy4wMDRjLTIuNjUyIDAtNS4yMzQgMS44MjktNS4yMzQgNS4xNzcgMCAzLjcyNSA0LjM0NSA3LjcyNyA5LjMwMyAxMi41NC4xOTQuMTg5LjQ0Ni4yODMuNjk3LjI4M3MuNTAzLS4wOTQuNjk3LS4yODNjNC45NzctNC44MzEgOS4zMDMtOC44MTQgOS4zMDMtMTIuNTQgMC0zLjM1My0yLjU4LTUuMTY4LTUuMjI5LTUuMTY4LTEuODM2IDAtMy42NDYuODY2LTQuNzcxIDIuNTU0LTEuMTMtMS42OTYtMi45MzUtMi41NjMtNC43NjYtMi41NjN6bTAgMS41YzEuOTkuMDAxIDMuMjAyIDEuMzUzIDQuMTU1IDIuNy4xNC4xOTguMzY4LjMxNi42MTEuMzE3LjI0MyAwIC40NzEtLjExNy42MTItLjMxNC45NTUtMS4zMzkgMi4xOS0yLjY5NCA0LjE1OS0yLjY5NCAxLjc5NiAwIDMuNzI5IDEuMTQ4IDMuNzI5IDMuNjY4IDAgMi42NzEtMi44ODEgNS42NzMtOC41IDExLjEyNy01LjQ1NC01LjI4NS04LjUtOC4zODktOC41LTExLjEyNyAwLTEuMTI1LjM4OS0yLjA2OSAxLjEyNC0yLjcyNy42NzMtLjYwNCAxLjYyNS0uOTUgMi42MS0uOTV6IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4='
        width={15}
        height={15}
        alt='share post'
      />
      Save
    </button>
  );
}
