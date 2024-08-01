'use client';

import * as z from 'zod';
import { useForm, UseFormSetValue, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  guestFavourites,
  propertyTypes,
  safetyItems,
  standoutAmenities,
  timeRange,
} from '@/constants/rental-constants';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { createRental } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const addressSchema = z.object({
  propertyName: z.string(),
  street: z.string().min(1),
  town: z.string().min(1),
  postcode: z.string(),
  country: z.string().min(1),
});

const rentalTypes = ['Entire', 'Single', 'Shared'] as const;

const createSchema = z.object({
  images: z.array(z.string().min(5)),
  title: z.string().min(1),
  propertyType: z.enum(propertyTypes),
  rentalType: z.enum(rentalTypes),
  guests: z.string().min(1),
  bedrooms: z.string().min(0),
  beds: z.string().min(1),
  bathrooms: z.string().min(1),
  overview: z.string().min(1),
  description: z.string().min(1),
  guestAccess: z.string().min(0),
  // highlights: z.string(),
  guestFavourites: z.array(z.enum(guestFavourites)).optional(),
  standoutAmenities: z.array(z.enum(standoutAmenities)).optional(),
  safetyItems: z.array(z.enum(safetyItems)).optional(),
  address: addressSchema,
  rates: z.number().min(0),
  cancellation: z.object({
    full: z.number().min(0),
    partial: z.number().min(0),
  }),
  rules: z.object({
    inAfter: z.string(),
    inBefore: z.string(),
    outBefore: z.string(),
    pets: z.boolean(),
    partiesEvents: z.boolean(),
    smoking: z.boolean(),
    additional: z.string().optional(),
  }),
});

type FormData = z.infer<typeof createSchema>;

export default function CreateForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      images: [], // Default value for the first image input
      title: '',
      propertyType: 'House',
      rentalType: 'Entire',
      guests: '1',
      bedrooms: '1',
      beds: '1',
      bathrooms: '1',
      overview: '',
      description: '',
      guestAccess: '',
      // highlights: '',
      guestFavourites: [],
      standoutAmenities: [],
      safetyItems: [],
      address: {
        propertyName: '',
        street: '',
        town: '',
        postcode: '',
        country: '',
      },
      rates: 0,
      cancellation: {
        full: 0,
        partial: 0,
      },
      rules: {
        inAfter: '',
        inBefore: '',
        outBefore: '',
        pets: false,
        partiesEvents: false,
        smoking: false,
        additional: '',
      },
    },
  });

  const { control, setValue, watch } = form;

  const handleCheckboxChange = (
    value: string,
    currentValues: string[],
    setValue: UseFormSetValue<FormData>,
    fieldName: Path<FormData>
  ) => {
    const newValue = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setValue(fieldName, newValue);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const currentImages = watch('images');

      // Function to read files as base64
      const readFilesAsDataURL = (files: File[]) => {
        return Promise.all(
          files.map(
            (file) =>
              new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              })
          )
        );
      };

      readFilesAsDataURL(fileArray).then((base64Files) => {
        setValue('images', [...currentImages, ...base64Files]);
      });
    }
  };

  const handleImageClickDelete = (src: string) => {
    const currentImages = watch('images');
    const updateImages = currentImages.filter((image) => image !== src);
    setValue('images', updateImages);
  };

  const createPost = async (data: z.infer<typeof createSchema>) => {
    try {
      const result = await createRental(data);
      console.log('Rental ID:', result?.rentalId);
      router.push(`/rooms/${result?.rentalId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const selectedImages = watch('images');

  // useEffect(() => {
  //   console.log('Form Data:', form.getValues());
  // }, [selectedImages, form]);

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(createPost)}
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-xl'>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Title'
                    type='text'
                    {...field}
                    className='py-6'
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <div>
          <FormLabel className='text-xl'>Images</FormLabel>
          <Input
            type='file'
            onChange={handleImageChange}
            multiple
            className=' mt-2 w-auto flex justify-center items-center hover:cursor-pointer p-4 h-auto hover:border-black hover:bg-black/10'
          />
          {selectedImages && selectedImages.length > 0 && (
            <div className='mt-4'>
              <h4 className='text-lg'>
                Selected Images: {selectedImages.length}
              </h4>
              <ul className='flex flex-wrap gap-5'>
                {selectedImages.map((src, index) => (
                  <li
                    className='list-none'
                    key={`image-${index}`}
                    onClick={() => handleImageClickDelete(src)}
                  >
                    <img src={src} className='w-44 h-44 object-cover' />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name='propertyType'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-xl'>Property Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                    <SelectTrigger>
                      <SelectValue placeholder='Property Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='rentalType'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-xl'>Rental Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                    <SelectTrigger>
                      <SelectValue placeholder='Rental Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rentalTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            );
          }}
        />
        <section className='flex justify-between'>
          <FormField
            control={form.control}
            name='guests'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-xl'>Maximum Guests</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                      <SelectTrigger>
                        <SelectValue placeholder='Maximum Guests' />
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
          <FormField
            control={form.control}
            name='bedrooms'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-xl'>Bedrooms</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                      <SelectTrigger>
                        <SelectValue placeholder='Bedrooms' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {numSelectorArray.map((num) => (
                        <SelectItem key={`${num}+bedrooms`} value={num}>
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
        </section>
        <section className='flex justify-between'>
          <FormField
            control={form.control}
            name='beds'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-xl'>Number of beds</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                      <SelectTrigger>
                        <SelectValue placeholder='Number of beds' />
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
          <FormField
            control={form.control}
            name='bathrooms'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className='text-xl'>Number of bathrooms</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                      <SelectTrigger>
                        <SelectValue placeholder='Number of bathrooms' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {numSelectorArray.map((num) => (
                        <SelectItem key={`${num}+baths`} value={num}>
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
        </section>

        <FormField
          control={form.control}
          name='overview'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-xl'>Overview</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Write a brief overview of the area'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-xl'>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Write a full description of the property'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='guestAccess'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className='text-xl'>Guest Access</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Write a full description of what guests have access to'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        {/* Guest Favourites */}
        <FormField
          control={control}
          name='guestFavourites'
          render={({ field }) => (
            <>
              <FormLabel className='text-xl'>Guest Favourites</FormLabel>
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
                        handleCheckboxChange(
                          favourite,
                          field.value ?? [],
                          setValue,
                          'guestFavourites'
                        )
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

        {/* Standout Amenities */}
        <FormField
          control={control}
          name='standoutAmenities'
          render={({ field }) => (
            <>
              <FormLabel className='text-xl'>Standout Amenities</FormLabel>
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
                        handleCheckboxChange(
                          amenity,
                          field.value ?? [],
                          setValue,
                          'standoutAmenities'
                        )
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

        {/* Safety Items */}
        <FormField
          control={control}
          name='safetyItems'
          render={({ field }) => (
            <>
              <FormLabel className='text-xl'>Safety Items</FormLabel>
              {safetyItems.map((item) => (
                <FormItem
                  key={item}
                  className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'
                >
                  <FormControl>
                    <Checkbox
                      id={item}
                      checked={(field.value ?? []).includes(item)}
                      onCheckedChange={() =>
                        handleCheckboxChange(
                          item,
                          field.value ?? [],
                          setValue,
                          'safetyItems'
                        )
                      }
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

        {/* Address Fields */}
        <FormField
          control={control}
          name='address.propertyName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Property Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Property Name'
                  type='text'
                  {...field}
                  className='py-6'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='address.street'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Street</FormLabel>
              <FormControl>
                <Input
                  placeholder='Street'
                  type='text'
                  {...field}
                  className='py-6'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='address.town'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Town</FormLabel>
              <FormControl>
                <Input
                  placeholder='Town'
                  type='text'
                  {...field}
                  className='py-6'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='address.postcode'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Postcode</FormLabel>
              <FormControl>
                <Input
                  placeholder='Postcode'
                  type='text'
                  {...field}
                  className='py-6'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='address.country'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Country</FormLabel>
              <FormControl>
                <Input
                  placeholder='Country'
                  type='text'
                  {...field}
                  className='py-6'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
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
        />

        <FormField
          control={control}
          name='cancellation.full'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>
                Minimum days for full refund on cancellation
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter full cancellation days'
                  type='number'
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className='py-6'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='cancellation.partial'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>
                Minimum days for partial refund on cancellation (50%)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter partial cancellation days'
                  type='number'
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className='py-6'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <section className='flex justify-between'>
          <div className='flex gap-6'>
            <FormField
              control={control}
              name='rules.inAfter'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Check-in After</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                      <SelectTrigger>
                        <SelectValue placeholder='Select time' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeRange.map((time) => (
                        <SelectItem key={`${time}+after`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='rules.inBefore'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Check-in Before</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                      <SelectTrigger>
                        <SelectValue placeholder='Select time' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeRange.map((time) => (
                        <SelectItem key={`${time}+before`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name='rules.outBefore'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xl'>Check-out Before</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select time' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeRange.map((time) => (
                      <SelectItem key={`${time}+checkout`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            )}
          />
        </section>

        <FormField
          control={control}
          name='rules.pets'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Pets Allowed</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='rules.partiesEvents'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Parties/Events Allowed</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='rules.smoking'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Smoking Allowed</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='rules.additional'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Additional Rules</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter any additional rules'
                  {...field}
                  className='py-6'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='bg-rose-600 w-full py-6 hover:bg-rose-500 my-4'
          type='submit'
        >
          Submit
        </Button>
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
