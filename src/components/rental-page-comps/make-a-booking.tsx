'use client';

import { Calendar } from '@/components/ui/calendar';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import {
  saveRentalBooking,
  fetchActiveBookingsForRental,
} from '@/actions/actions';

// Generate the current date
const disableBeforeDate = new Date();

const bookingSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  rentalId: z.string(),
  guests: z.string().min(1),
});

type FormData = z.infer<typeof bookingSchema>;

type MakeABookingProps = {
  rates: string;
  rentalId: string;
};

export default function MakeABooking({ rates, rentalId }: MakeABookingProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [availableToDates, setAvailableToDates] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [disabledDateRanges, setDisabledDateRanges] = useState<DateRange[]>([]);

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const datePickerHandler = (e: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(e.target as Node)
      ) {
        setDatePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', datePickerHandler);

    return () => {
      document.removeEventListener('mousedown', datePickerHandler);
    };
  }, []);

  useEffect(() => {
    const fetchActiveBookings = async () => {
      try {
        const res = await fetchActiveBookingsForRental(rentalId);
        if (res?.success) {
          const bookings = res.bookings.map((booking) => ({
            from: new Date(booking.startDate),
            to: new Date(booking.endDate),
          }));
          setDisabledDateRanges(bookings);
        } else {
          console.error('Failed to fetch active bookings');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchActiveBookings();
  }, [rentalId]);

  const form = useForm<FormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      dateRange: { from: undefined, to: undefined },
      guests: '1',
      rentalId: rentalId,
    },
  });

  const { setValue, watch } = form;
  const selectedDates = watch('dateRange');

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setValue('dateRange', range as any); // Update form field value
    if (range?.from) {
      // console.log('Selected date range:', range);

      const nextDisabledRange = disabledDateRanges
        .filter((dr) => dr.from && range.from && dr.from > range.from)
        .sort((a, b) => (a.from?.getTime() ?? 0) - (b.from?.getTime() ?? 0))[0];

      setAvailableToDates({
        from: range.from,
        to: nextDisabledRange
          ? new Date(
              (nextDisabledRange.from?.getTime() ?? 0) - 24 * 60 * 60 * 1000
            )
          : undefined,
      });

      if (range.to) {
        setDatePickerOpen(false);
      }
    } else {
      setAvailableToDates({});
    }
  };

  const calculateNights = (from: Date, to: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const diffDays = Math.round(
      Math.abs((to.getTime() - from.getTime()) / oneDay)
    );
    return diffDays;
  };

  const nights =
    selectedDates?.from && selectedDates?.to
      ? calculateNights(selectedDates.from, selectedDates.to)
      : 0;

  const totalCost = nights * +rates;

  const onSubmit = async (data: FormData) => {
    console.log('Form Data:', data);
    try {
      const res = await saveRentalBooking(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col relative'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className='pb-2'>
          <span className='font-medium text-xl'>£{rates} </span>night
        </p>

        <button
          onClick={() => setDatePickerOpen((datePickerOpen) => !datePickerOpen)}
          className='w-full h-14 flex border-black/10 border-[1px] rounded-md z-20'
        >
          <div className='w-[50%] h-full flex flex-col text-left justify-center p-2 '>
            <span className='text-[0.6rem] font-semibold'>CHECK-IN</span>
            <span className='opacity-80 text-sm'>
              {selectedDates?.from
                ? selectedDates.from.toLocaleDateString()
                : 'Select'}
            </span>
          </div>
          <div className='h-full w-[1px] bg-black/10' />
          <div className='w-[50%] h-full flex flex-col text-left justify-center p-2'>
            <span className='text-[0.6rem] font-semibold'>CHECK-OUT</span>
            <span className='opacity-80 text-sm'>
              {selectedDates?.to
                ? selectedDates.to.toLocaleDateString()
                : 'Select'}
            </span>
          </div>
        </button>
        {datePickerOpen && (
          <div
            className='absolute -right-10 top-5 z-10 flex justify-center w-[30rem] bg-white border-2 rounded-lg shadow-md pt-24 pb-4'
            ref={datePickerRef}
          >
            <Calendar
              mode='range'
              selected={dateRange}
              onSelect={handleSelect}
              className='rounded-md'
              disabled={[
                { before: disableBeforeDate },
                ...disabledDateRanges.map((range) => ({
                  from: range.from,
                  to: range.to,
                })),
                ...(availableToDates.from && availableToDates.to
                  ? [
                      {
                        before: availableToDates.from,
                        after: availableToDates.to,
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name='guests'
          render={({ field }) => {
            return (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl className='py-7 text-md focus:border-[1.2px] focus:border-black'>
                    <SelectTrigger>
                      <div className='w-[50%] h-full flex flex-col text-left justify-center '>
                        <span className='text-[0.6rem] font-semibold'>
                          GUESTS
                        </span>
                        <span className='opacity-80 text-sm'>
                          {field.value}
                        </span>
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {numSelectorArray.map((num) => (
                      <SelectItem key={`${num}+guest`} value={num}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            );
          }}
        />

        <Button
          className='bg-rose-600 w-full py-6 hover:bg-rose-500 my-2'
          type='submit'
        >
          Submit
        </Button>
        <p className='opacity-80 text-center pb-2 text-sm'>
          You won&apos;t be charged yet
        </p>
        <div className='flex justify-between opacity-80'>
          <p className='underline tracking-tight'>
            £{rates} x {nights} nights
          </p>
          <p>£{totalCost}</p>
        </div>
        <div className='w-full h-[1px] bg-black/10 my-4' />
        <div className='flex justify-between font-semibold'>
          <span>Total</span>
          <span>£{totalCost}</span>
        </div>
      </form>
    </Form>
  );
}

const numSelectorArray = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12+',
] as const;
