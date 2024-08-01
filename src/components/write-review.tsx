'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Button } from './ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Slider } from '@/components/ui/slider';
import { saveReview } from '@/actions/actions';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

const reviewSchema = z.object({
  rentalId: z.string(),
  comment: z.string().min(1),
  ratings: z.object({
    cleanliness: z.number().min(0).max(5),
    accuracy: z.number().min(0).max(5),
    checkIn: z.number().min(0).max(5),
    communication: z.number().min(0).max(5),
    location: z.number().min(0).max(5),
    value: z.number().min(0).max(5),
  }),
});

type FormData = z.infer<typeof reviewSchema>;

type WriteReviewProps = {
  rentalId: string;
};

export default function WriteReview({ rentalId }: WriteReviewProps) {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const form = useForm<FormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rentalId: rentalId,
      comment: '',
      ratings: {
        cleanliness: 5,
        accuracy: 5,
        checkIn: 5,
        communication: 5,
        location: 5,
        value: 5,
      },
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log('Form Data:', data);
    try {
      const res = await saveReview(data);
      if (res.success) {
        toast.success('Review saved successfully');
        setIsFormVisible(false);
      } else {
        toast.error('Failed to save review');
        console.error('Failed to save review:', res.error);
      }
    } catch (error) {
      toast.error('Error saving review');
      console.error('Error saving review:', error);
    }
  };

  if (!isFormVisible)
    return (
      <span className='text-green-500'>Thank you submitting your review!</span>
    );

  return (
    <>
      <Form {...form}>
        <form
          className='flex flex-col relative'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h3 className='text-2xl font-semibold py-2'>Leave a review</h3>
          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='Please leave a comment'
                    {...field}
                    className=''
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h4 className='my-4 text-lg font-semibold'>
            Rate each aspect of your visit:
          </h4>
          {(
            [
              'cleanliness',
              'accuracy',
              'checkIn',
              'communication',
              'location',
              'value',
            ] as const
          ).map((rating) => (
            <FormField
              key={rating}
              control={form.control}
              name={`ratings.${rating}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md capitalize'>{rating}</FormLabel>
                  <div className='flex items-center gap-2'>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value]}
                        max={5}
                        step={0.1}
                        onValueChange={(value) => field.onChange(value[0])}
                        className='max-w-[20rem]'
                      />
                    </FormControl>
                    <span>{field.value.toFixed(1)}</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className='w-full h-[1px] bg-black/10 my-4' />
          <Button
            className='bg-rose-600 w-full py-6 hover:bg-rose-500 my-2'
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Form>
      <ToastContainer />
    </>
  );
}
