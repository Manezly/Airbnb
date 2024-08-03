'use client';

import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { Checkbox } from '../ui/checkbox';
import {
  guestFavourites,
  safetyItems,
  standoutAmenities,
} from '@/constants/rental-constants';
import { Input } from '../ui/input';

const typeOfPlace = ['all', 'single', 'entire'] as const;

const filtersSchema = z.object({
  typeOfPlace: z.enum(typeOfPlace),
  minRate: z.number().optional(),
  maxRate: z.number().optional(),
  beds: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  guestFavourites: z.array(z.enum(guestFavourites)).optional(),
  standoutAmenities: z.array(z.enum(standoutAmenities)).optional(),
  safetyItems: z.array(z.enum(safetyItems)).optional(),
});

type FiltersSchema = z.infer<typeof filtersSchema>;

const numOptions = [
  'any',
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
];

type SearchFiltersProps = {
  onApplyFilters: () => void;
};

export default function SearchFilters({ onApplyFilters }: SearchFiltersProps) {
  const form = useForm<FiltersSchema>({
    resolver: zodResolver(filtersSchema),
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedTypeOfPlace, setSelectedTypeOfPlace] = useState(
    searchParams.get('typeOfPlace') || 'all'
  );
  const [selectedBeds, setSelectedBeds] = useState(
    searchParams.get('beds') || 'any'
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState(
    searchParams.get('bedrooms') || 'any'
  );
  const [selectedBathrooms, setSelectedBathrooms] = useState(
    searchParams.get('bathrooms') || 'any'
  );
  const [selectedGuestFavourites, setSelectedGuestFavourites] = useState<
    string[]
  >(searchParams.get('guestFavourites')?.split(',') || []);
  const [selectedStandoutAmenities, setSelectedStandoutAmenities] = useState<
    string[]
  >(searchParams.get('standoutAmenities')?.split(',') || []);
  const [selectedSafetyItems, setSelectedSafetyItems] = useState<string[]>(
    searchParams.get('safetyItems')?.split(',') || []
  );
  const [minRate, setMinRate] = useState<number | undefined>(
    searchParams.get('minRate')
      ? Number(searchParams.get('minRate'))
      : undefined
  );
  const [maxRate, setMaxRate] = useState<number | undefined>(
    searchParams.get('maxRate')
      ? Number(searchParams.get('maxRate'))
      : undefined
  );

  useEffect(() => {
    form.setValue(
      'typeOfPlace',
      selectedTypeOfPlace as FiltersSchema['typeOfPlace']
    );
    form.setValue('beds', selectedBeds);
    form.setValue('bedrooms', selectedBedrooms);
    form.setValue('bathrooms', selectedBathrooms);
    form.setValue(
      'guestFavourites',
      selectedGuestFavourites as FiltersSchema['guestFavourites']
    );
    form.setValue(
      'standoutAmenities',
      selectedStandoutAmenities as FiltersSchema['standoutAmenities']
    );
    form.setValue(
      'safetyItems',
      selectedSafetyItems as FiltersSchema['safetyItems']
    );
    form.setValue('minRate', minRate);
    form.setValue('maxRate', maxRate);
  }, [
    selectedTypeOfPlace,
    selectedBeds,
    selectedBedrooms,
    selectedBathrooms,
    selectedGuestFavourites,
    selectedStandoutAmenities,
    selectedSafetyItems,
    minRate,
    maxRate,
    form,
  ]);

  const handleTypeOfPlaceClick = (type: string) => {
    setSelectedTypeOfPlace(type);
    form.setValue('typeOfPlace', type as FiltersSchema['typeOfPlace']);
  };

  const handleBedsClick = (beds: string) => {
    setSelectedBeds(beds);
    form.setValue('beds', beds);
  };

  const handleBedroomsClick = (bedrooms: string) => {
    setSelectedBedrooms(bedrooms);
    form.setValue('bedrooms', bedrooms);
  };

  const handleBathroomsClick = (bathrooms: string) => {
    setSelectedBathrooms(bathrooms);
    form.setValue('bathrooms', bathrooms);
  };

  const handleGuestFavouritesChange = (favourite: string) => {
    const updatedGuestFavourites = selectedGuestFavourites.includes(favourite)
      ? selectedGuestFavourites.filter((item) => item !== favourite)
      : [...selectedGuestFavourites, favourite];
    setSelectedGuestFavourites(updatedGuestFavourites);
    form.setValue(
      'guestFavourites',
      updatedGuestFavourites as FiltersSchema['guestFavourites']
    );
  };

  const handleStandoutAmenitiesChange = (amenity: string) => {
    const updatedStandoutAmenities = selectedStandoutAmenities.includes(amenity)
      ? selectedStandoutAmenities.filter((item) => item !== amenity)
      : [...selectedStandoutAmenities, amenity];
    setSelectedStandoutAmenities(updatedStandoutAmenities);
    form.setValue(
      'standoutAmenities',
      updatedStandoutAmenities as FiltersSchema['standoutAmenities']
    );
  };

  const handleSafetyItemsChange = (item: string) => {
    const updatedSafetyItems = selectedSafetyItems.includes(item)
      ? selectedSafetyItems.filter((item) => item !== item)
      : [...selectedSafetyItems, item];
    setSelectedSafetyItems(updatedSafetyItems);
    form.setValue(
      'safetyItems',
      updatedSafetyItems as FiltersSchema['safetyItems']
    );
  };

  const onSubmit = (data: FiltersSchema) => {
    const query: { [key: string]: any } = {};

    // Include existing search params
    const existingParams = new URLSearchParams(window.location.search);
    existingParams.forEach((value, key) => {
      query[key] = value;
    });

    // Update query with new filter data
    if (data.typeOfPlace !== 'all') query.typeOfPlace = data.typeOfPlace;
    else delete query.typeOfPlace;

    if (data.minRate !== undefined) query.minRate = data.minRate;
    else delete query.minRate;

    if (data.maxRate !== undefined) query.maxRate = data.maxRate;
    else delete query.maxRate;

    if (data.beds && data.beds !== 'any') query.beds = data.beds;
    else delete query.beds;

    if (data.bedrooms && data.bedrooms !== 'any')
      query.bedrooms = data.bedrooms;
    else delete query.bedrooms;

    if (data.bathrooms && data.bathrooms !== 'any')
      query.bathrooms = data.bathrooms;
    else delete query.bathrooms;

    if (data.guestFavourites?.length)
      query.guestFavourites = data.guestFavourites.join(',');
    else delete query.guestFavourites;

    if (data.standoutAmenities?.length)
      query.standoutAmenities = data.standoutAmenities.join(',');
    else delete query.standoutAmenities;

    if (data.safetyItems?.length)
      query.safetyItems = data.safetyItems.join(',');
    else delete query.safetyItems;

    const searchParams = new URLSearchParams(query);
    router.push(`/?${searchParams.toString()}`);
    onApplyFilters();
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col container-real w-full'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h4 className='text-center font-semibold'>Filters</h4>

        <div className='w-full h-[0.2px] bg-black/20 my-4' />

        <h4 className='text-xl font-semibold mb-2'>Type of place</h4>
        <p className='text-sm '>
          Search rooms, entire homes or any type of place
        </p>

        <div className='flex gap-2 mt-4 px-4'>
          {typeOfPlace.map((type) => (
            <button
              type='button'
              key={type}
              className={`flex-1 rounded py-4 ${
                selectedTypeOfPlace === type
                  ? 'bg-black text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleTypeOfPlaceClick(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className='w-full h-[0.2px] bg-black/20 my-8' />
        {/* <FormField
          control={control}
          name='rates'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Rates (£ per day)</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your daily rate'
                  type='number'
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className='py-6'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <h4 className='text-xl font-semibold mb-6'>Price Range</h4>
        <div className='flex gap-2  px-4 justify-between'>
          <FormField
            control={form.control}
            name='minRate'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-md'>Min Rate (£ per day)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter minimum rate'
                    type='number'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className='py-6'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='maxRate'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-md'>Max Rate (£ per day)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter maximum rate'
                    type='number'
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className='py-6'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='w-full h-[0.2px] bg-black/20 my-8' />

        <h4 className='text-xl font-semibold mb-2'>Beds</h4>
        <div className='flex gap-2 mt-4 px-4'>
          {numOptions.map((option) => (
            <button
              type='button'
              key={option}
              className={`flex-1 rounded py-4 ${
                selectedBeds === option ? 'bg-black text-white' : 'bg-gray-200'
              }`}
              onClick={() => handleBedsClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <h4 className='text-xl font-semibold my-2'>Bedrooms</h4>
        <div className='flex gap-2 mt-4 px-4'>
          {numOptions.map((option) => (
            <button
              type='button'
              key={option}
              className={`flex-1 rounded py-4 ${
                selectedBedrooms === option
                  ? 'bg-black text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleBedroomsClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <h4 className='text-xl font-semibold my-2'>Bathrooms</h4>
        <div className='flex gap-2 mt-4 px-4'>
          {numOptions.map((option) => (
            <button
              type='button'
              key={option}
              className={`flex-1 rounded py-4 ${
                selectedBathrooms === option
                  ? 'bg-black text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleBathroomsClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className='w-full h-[0.2px] bg-black/20 my-8' />

        <FormField
          control={form.control}
          name='guestFavourites'
          render={({ field }) => (
            <>
              <FormLabel className='text-xl font-semibold my-6'>
                Guest Favourites
              </FormLabel>
              {guestFavourites.map((favourite) => (
                <FormItem
                  key={favourite}
                  className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'
                >
                  <FormControl>
                    <Checkbox
                      id={favourite}
                      checked={(field.value ?? []).includes(favourite)}
                      onCheckedChange={() =>
                        handleGuestFavouritesChange(favourite)
                      }
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel htmlFor={favourite}>{favourite}</FormLabel>
                  </div>
                </FormItem>
              ))}
            </>
          )}
        />

        <FormField
          control={form.control}
          name='standoutAmenities'
          render={({ field }) => (
            <>
              <FormLabel className='text-xl font-semibold my-6'>
                Standout Amenities
              </FormLabel>
              {standoutAmenities.map((amenity) => (
                <FormItem
                  key={amenity}
                  className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'
                >
                  <FormControl>
                    <Checkbox
                      id={amenity}
                      checked={(field.value ?? []).includes(amenity)}
                      onCheckedChange={() =>
                        handleStandoutAmenitiesChange(amenity)
                      }
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel htmlFor={amenity}>{amenity}</FormLabel>
                  </div>
                </FormItem>
              ))}
            </>
          )}
        />

        <FormField
          control={form.control}
          name='safetyItems'
          render={({ field }) => (
            <>
              <FormLabel className='text-xl font-semibold my-6'>
                Safety Items
              </FormLabel>
              {safetyItems.map((item) => (
                <FormItem
                  key={item}
                  className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'
                >
                  <FormControl>
                    <Checkbox
                      id={item}
                      checked={(field.value ?? []).includes(item)}
                      onCheckedChange={() => handleSafetyItemsChange(item)}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel htmlFor={item}>{item}</FormLabel>
                  </div>
                </FormItem>
              ))}
            </>
          )}
        />

        <div className='w-full h-[0.2px] bg-black/20 my-8' />

        <div className='w-full'>
          <Button
            className='bg-black/90 w-full py-6 hover:bg-black my-4'
            type='submit'
          >
            Apply filters
          </Button>
        </div>
      </form>
    </Form>
  );
}
