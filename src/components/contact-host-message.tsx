'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createMessage } from '@/actions/actions';
import { createMessageProps } from '@/lib/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const messageSchema = z.object({
  text: z.string().min(1, { message: 'Please write your message.' }),
  recipientId: z.string(),
  rentalId: z.string(),
  recipientName: z.string(),
  conversationId: z.string().optional(),
});

type ContactHostMessageProps = {
  userName: string;
  rentalId: string;
  hostId: string;
  hostName: string;
  conversationId?: string;
};

export default function ContactHostMessage({
  userName,
  rentalId,
  hostId,
  hostName,
  conversationId,
}: ContactHostMessageProps) {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: '',
      recipientId: hostId,
      recipientName: hostName,
      rentalId: rentalId,
      conversationId: conversationId,
    },
  });

  const onsubmit = async (data: createMessageProps) => {
    // console.log(data);
    try {
      const result = await createMessage(data);
      if (result && result.success) {
        toast.success('Message sent successfully');
        form.reset(); // Clear the form
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send message');
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          className='flex flex-col gap-2'
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={`Hi ${userName}! I'll be visiting...`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button
            className='bg-white text-black py-6 shadow-none border-black border-[1px] w-[9rem] hover:bg-black/5 my-4'
            type='submit'
          >
            Send Message
          </Button>
        </form>
      </Form>
      <ToastContainer />
    </>
  );
}
