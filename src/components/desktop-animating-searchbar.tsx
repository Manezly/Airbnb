'use client';

import { useHomeContext } from '@/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './ui/form';
import { Calendar } from './ui/calendar';

const countries = ["I'm flexible", 'United Kingdom', 'France', 'Spain'];

const guestsOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '12+'];

const disableBeforeDate = new Date();

const filterSchema = z.object({
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .nullable(),
  country: z.string().optional(),
  guests: z.number().optional(),
});

type FormData = z.infer<typeof filterSchema>;

export default function DesktopAnimatingSearchBar() {
  const {
    setStaysOpen,
    setExperiencesOpen,
    staysOpen,
    experiencesOpen,
    navbarExpand,
    setNavbarExpand,
  } = useHomeContext();

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const datePickerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);

  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    new URLSearchParams(window.location.search).get('country') || "I'm flexible"
  );
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const fromDateParam = searchParams.get('fromDate');
  const toDateParam = searchParams.get('toDate');
  const initialDateRange =
    fromDateParam && toDateParam
      ? {
          from: new Date(fromDateParam),
          to: new Date(toDateParam),
        }
      : undefined;

  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState<number | undefined>(
    searchParams.get('guests')
      ? parseInt(searchParams.get('guests') || '0', 10) // Provide a default value of '0' if it is null
      : undefined
  );
  const guestsDropdownRef = useRef<HTMLDivElement>(null);

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
    const handleClickOutside = (e: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(e.target as Node)
      ) {
        setDatePickerOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setCountryDropdownOpen(false);
      }
      if (
        guestsDropdownRef.current &&
        !guestsDropdownRef.current.contains(e.target as Node)
      ) {
        setGuestsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      dateRange: initialDateRange || null,
      country: selectedCountry === "I'm flexible" ? undefined : selectedCountry,
      guests: selectedGuests,
    },
  });

  const { setValue, watch } = form;

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setValue('country', country === "I'm flexible" ? undefined : country);
    setCountryDropdownOpen(false);
  };

  const handleGuestsSelect = (guests: number | string) => {
    let guestsValue: number | undefined;
    if (guests === '12+') {
      guestsValue = 13;
    } else if (guests === 0) {
      guestsValue = undefined;
    } else {
      guestsValue = Number(guests);
    }
    setSelectedGuests(guestsValue);
    setValue('guests', guestsValue);
    setGuestsDropdownOpen(false);
  };

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setValue('dateRange', range as any);
  };

  const handleSubmit = (data: FormData) => {
    if (data.dateRange?.from) {
      searchParams.set('fromDate', data.dateRange.from.toISOString());
    } else {
      searchParams.delete('fromDate');
    }
    if (data.dateRange?.to) {
      searchParams.set('toDate', data.dateRange.to.toISOString());
    } else {
      searchParams.delete('toDate');
    }
    if (data.country) {
      searchParams.set('country', data.country);
    } else {
      searchParams.delete('country');
    }
    if (data.guests) {
      const guestsValue = data.guests === 13 ? '12+' : data.guests.toString();
      searchParams.set('guests', guestsValue);
    } else {
      searchParams.delete('guests');
    }
    router.push(`/?${searchParams.toString()}`);
  };

  return (
    <section
      className={`grow-searchbar absolute -translate-x-1/2 left-[280px] top-[-5px] lg:left-1/2 flex flex-col gap-6 z-10 ${
        navbarExpand ? 'shifted' : ''
      }`}
    >
      <div className='heading-buttons flex justify-center gap-5'>
        <button
          className={staysOpen ? 'font-bold' : ''}
          onClick={() => {
            setStaysOpen(true);
            setExperiencesOpen(false);
          }}
        >
          Stays
        </button>
        <button
          className={experiencesOpen ? 'font-bold' : ''}
          onClick={() => {
            setStaysOpen(false);
            setExperiencesOpen(true);
          }}
        >
          Experiences
        </button>
        <Link href='/'>Online Experiences</Link>
      </div>

      <div className='bar rounded-full border-solid border border-black/10 search-shadow'>
        <div
          onClick={() => setNavbarExpand(true)}
          className='flex items-center gap-3 border-black w-full h-full rounded-full text-sm'
        >
          <div className='small-text hidden'>
            <span className='pl-5 border-r pr-3'>Anywhere</span>
            <span className='pl-5 border-r pr-3'>Any week</span>
            <span className='pl-5 opacity-70'>Add guests</span>
          </div>
          {!navbarExpand && (
            <button
              type='submit'
              className='magnifine-button bg-rose-500 p-3 rounded-full absolute right-[2%] bot-0'
            >
              <MagnifyingGlassIcon className='size-6 filter brightness-0 invert' />
            </button>
          )}

          <Form {...form}>
            <form
              className={`flex flex-col ${
                navbarExpand ? 'w-full h-full' : ''
              } relative`}
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {staysOpen && (
                <div className='large-buttons flex text-xs h-full w-full items-center'>
                  <button
                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    className='flex flex-col pl-8 pr-20  rounded-full hover:bg-black/5 justify-center h-full'
                  >
                    <span className='font-medium'>Where</span>
                    <span
                      className={`${
                        selectedCountry === undefined ||
                        selectedCountry === "I'm flexible"
                          ? 'opacity-80'
                          : 'font-bold'
                      }`}
                    >
                      {selectedCountry === undefined ||
                      selectedCountry === "I'm flexible"
                        ? 'Search destinations'
                        : selectedCountry}
                    </span>
                  </button>
                  {countryDropdownOpen && (
                    <div
                      className='absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-[1000]'
                      ref={countryDropdownRef}
                    >
                      {countries.map((country) => (
                        <div
                          key={country}
                          className='cursor-pointer p-2 hover:bg-gray-200'
                          onClick={() => handleCountrySelect(country)}
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
                  <button
                    type='button'
                    onClick={() =>
                      setDatePickerOpen((datePickerOpen) => !datePickerOpen)
                    }
                    className='flex flex-col pl-6 pr-7 justify-center rounded-full hover:bg-black/5 h-full'
                  >
                    <span className='font-medium'>Check in</span>
                    <span
                      className={`${
                        !dateRange?.from ? 'opacity-80' : 'font-bold'
                      }`}
                    >
                      {dateRange?.from
                        ? dateRange.from.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                          })
                        : 'Add dates'}
                    </span>
                  </button>
                  <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
                  <button
                    type='button'
                    onClick={() =>
                      setDatePickerOpen((datePickerOpen) => !datePickerOpen)
                    }
                    className='flex flex-col pl-6 pr-7 justify-center rounded-full hover:bg-black/5 h-full'
                  >
                    <span className='font-medium'>Check out</span>
                    <span
                      className={`${
                        !dateRange?.to ? 'opacity-80' : 'font-bold'
                      }`}
                    >
                      {dateRange?.to
                        ? dateRange.to.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                          })
                        : 'Add dates'}
                    </span>
                  </button>
                  {datePickerOpen && (
                    <div
                      className='absolute top-20 left-0 right-0 mx-auto bg-white h-[30rem] z-[10000] rounded-md shadow-lg'
                      ref={datePickerRef}
                    >
                      <Calendar
                        mode='range'
                        selected={dateRange}
                        onSelect={handleSelect}
                        className='rounded-md'
                        disabled={[{ before: disableBeforeDate }]}
                      />
                    </div>
                  )}

                  <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />

                  <button
                    onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}
                    className='flex flex-col pl-6 justify-center rounded-full hover:bg-black/5 pr-auto flex-1 h-full'
                  >
                    <span className='font-medium'>Who</span>
                    <span
                      className={`${
                        selectedGuests === undefined
                          ? 'opacity-80'
                          : 'font-bold'
                      }`}
                    >
                      {selectedGuests === undefined
                        ? 'Add guests'
                        : selectedGuests === 13
                        ? '12+'
                        : selectedGuests}
                    </span>
                  </button>
                  {guestsDropdownOpen && (
                    <div
                      className='absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-[1000]'
                      ref={guestsDropdownRef}
                    >
                      {guestsOptions.map((guests) => (
                        <div
                          key={guests}
                          className='cursor-pointer p-2 hover:bg-gray-200'
                          onClick={() => handleGuestsSelect(guests)}
                        >
                          {guests}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {experiencesOpen && (
                <div className='large-buttons flex text-xs h-full w-full items-center'>
                  <button className='flex flex-col pl-8 pr-auto  rounded-full hover:bg-black/5 justify-center h-full flex-1'>
                    <span className='font-medium'>Where</span>
                    <span className='opacity-80'>Search destinations</span>
                  </button>
                  <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
                  <button className='flex flex-col pl-6 pr-auto justify-center rounded-full hover:bg-black/5 h-full flex-1'>
                    <span className='font-medium'>Date</span>
                    <span className='opacity-80'>Add dates</span>
                  </button>
                  <div className='h-[30%] w-[0.1rem] bg-black/5 justify-center flex' />
                  <button className='flex flex-col pl-6 justify-center rounded-full hover:bg-black/5 pr-auto flex-1 h-full'>
                    <span className='font-medium'>Who</span>
                    <span className='opacity-80'>Add guests</span>
                  </button>
                </div>
              )}

              {navbarExpand && (
                <button
                  type='submit'
                  className='magnifine-button bg-rose-500 p-3 rounded-full absolute right-[2%] bot-0 top-[0.4rem]'
                >
                  <MagnifyingGlassIcon className='size-6 filter brightness-0 invert' />
                </button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
