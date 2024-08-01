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
  conversationId: z.string().optional(),
});

type InstantMessageProps = {
  messageTemplate: {
    senderId: string;
    recipientId: string;
    conversationId: string;
    rentalId: string;
  };
};

export default function InstantMessageForm({
  messageTemplate,
}: InstantMessageProps) {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: '',
      recipientId: messageTemplate.recipientId,
      rentalId: messageTemplate.rentalId,
      conversationId: messageTemplate.conversationId,
    },
  });

  const onsubmit = async (data: createMessageProps) => {
    // console.log(data);
    try {
      const result = await createMessage(data);
      if (result && result.success) {
        // toast.success('Message sent successfully');
        // form.reset(); // Clear the form
        window.location.reload();
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
          className='flex gap-2 items-center w-full'
          onSubmit={form.handleSubmit(onsubmit)}
        >
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => {
              return (
                <FormItem className='flex-1'>
                  <FormControl>
                    <Textarea
                      placeholder='Type a message'
                      {...field}
                      className='w-full h-[5rem]'
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button
            className='bg-white text-black py-6 shadow-none border-black border-[1px] w-[5rem] hover:bg-black/5 my-4 h-[5rem]'
            type='submit'
          >
            Send
          </Button>
        </form>
      </Form>
      <ToastContainer />
    </>
  );
}
