'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { OTPInput, SlotProps } from 'input-otp';
import { cn } from '@/lib/utils';
import { sendVerificationCode, verifyCode } from '@/actions/actions';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  phoneNumber: z.string().refine((value) => value.length === 10, {
    message: 'Phone number must be exactly 10 digits',
  }),
  countryRegion: z.string(),
});

export default function AuthenticateForm() {
  const [verificationScreen, setVerificationScreen] = useState(false);
  const [phonenumber, setPhonenumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  // const [otpValid, SetOtpValid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verficationErrorMessage, setVerificationErrorMessage] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  const handleContinue = (values: z.infer<typeof formSchema>) => {
    const phone = '+44' + values.phoneNumber;
    setPhonenumber(phone);
    sendVerificationCode(phone);
    setVerificationScreen(true);
  };

  const onComplete = async () => {
    setIsVerifying(true);

    try {
      const result = await verifyCode(phonenumber, otpValue);

      if (result.token) {
        localStorage.setItem('authToken', result.token);
        window.location.href = '/';
        console.log('redirected');
      } else {
        setVerificationErrorMessage(
          result.message || 'Verification failed, please try again.'
        );
      }
    } catch (error) {
      setVerificationErrorMessage('Verification failed, please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (verificationScreen) {
    return (
      <>
        <OTPInput
          maxLength={6}
          value={otpValue}
          onChange={(value) => {
            setOtpValue(value);
          }}
          onComplete={onComplete}
          containerClassName='group flex items-center has-[:disabled]:opacity-30'
          render={({ slots }) => (
            <>
              <div className='flex'>
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>

              <FakeDash />

              <div className='flex'>
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />
        {isVerifying && <p>Verifying...</p>}
        {verficationErrorMessage && (
          <p className='text-rose-800'>verficationErrorMessage</p>
        )}
      </>
    );
  } else {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleContinue)}
          className='flex flex-col gap-2'
        >
          <FormField
            control={form.control}
            name='countryRegion'
            render={({ field }) => {
              return (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl className='py-6 text-md focus:border-[1.2px] focus:border-black'>
                      <SelectTrigger>
                        <SelectValue placeholder='Country/Region' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='UK'>United Kingdon (+44)</SelectItem>
                      <SelectItem value='USA'>United States (+1)</SelectItem>
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Phone number'
                      type='tel'
                      {...field}
                      className='py-6 text-md focus:border-[1.2px] focus:border-black'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            className='bg-rose-600 w-full py-6 hover:bg-rose-500 my-4'
            type='submit'
          >
            Continue
          </Button>

          <div className='flex items-center opacity-50'>
            <div className='h-[0.1px] flex-1 bg-black'></div>
            <p className='text-xs px-4'>or</p>
            <div className='h-[0.1px] flex-1 bg-black'></div>
          </div>

          <Button className='bg-white py-6 w-full hover:bg-black/5 text-black border-[1px] border-black my-4 px-4 relative'>
            <Image
              src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwdjI0aDI0di0yNGgtMjR6bTE2IDdoLTEuOTIzYy0uNjE2IDAtMS4wNzcuMjUyLTEuMDc3Ljg4OXYxLjExMWgzbC0uMjM5IDNoLTIuNzYxdjhoLTN2LThoLTJ2LTNoMnYtMS45MjNjMC0yLjAyMiAxLjA2NC0zLjA3NyAzLjQ2MS0zLjA3N2gyLjUzOXYzeiIvPjwvc3ZnPg=='
              height={21}
              width={21}
              alt='facebook icon'
              className='absolute left-8'
            />
            Continue with Facebook
          </Button>

          <Button className='bg-white py-6 w-full hover:bg-black/5 text-black border-[1px] border-black px-4 relative'>
            <Image
              src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwdjI0aDI0di0yNGgtMjR6bTguNjY3IDE2LjY2N2MtMi41ODEgMC00LjY2Ny0yLjA4Ny00LjY2Ny00LjY2N3MyLjA4Ni00LjY2NyA0LjY2Ny00LjY2N2MxLjI2IDAgMi4zMTMuNDYgMy4xMjcgMS4yMmwtMS4yNjcgMS4yMmMtLjM0Ny0uMzMzLS45NTQtLjcyLTEuODYtLjcyLTEuNTkzIDAtMi44OTMgMS4zMi0yLjg5MyAyLjk0N3MxLjMgMi45NDcgMi44OTMgMi45NDdjMS44NDcgMCAyLjU0LTEuMzI3IDIuNjQ3LTIuMDEzaC0yLjY0N3YtMS42aDQuNDA2Yy4wNDEuMjMzLjA3NC40NjcuMDc0Ljc3MyAwIDIuNjY2LTEuNzg3IDQuNTYtNC40OCA0LjU2em0xMS4zMzMtNGgtMnYyaC0xLjMzM3YtMmgtMnYtMS4zMzNoMnYtMmgxLjMzM3YyaDJ2MS4zMzN6Ii8+PC9zdmc+'
              height={21}
              width={21}
              alt='facebook icon'
              className='absolute left-8'
            />
            Continue with Google
          </Button>

          <Button className='bg-white py-6 w-full hover:bg-black/5 text-black border-[1px] border-black my-4 px-4 relative'>
            <Image
              src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjIgMTcuNjA3Yy0uNzg2IDIuMjgtMy4xMzkgNi4zMTctNS41NjMgNi4zNjEtMS42MDguMDMxLTIuMTI1LS45NTMtMy45NjMtLjk1My0xLjgzNyAwLTIuNDEyLjkyMy0zLjkzMi45ODMtMi41NzIuMDk5LTYuNTQyLTUuODI3LTYuNTQyLTEwLjk5NSAwLTQuNzQ3IDMuMzA4LTcuMSA2LjE5OC03LjE0MyAxLjU1LS4wMjggMy4wMTQgMS4wNDUgMy45NTkgMS4wNDUuOTQ5IDAgMi43MjctMS4yOSA0LjU5Ni0xLjEwMS43ODIuMDMzIDIuOTc5LjMxNSA0LjM4OSAyLjM3Ny0zLjc0MSAyLjQ0Mi0zLjE1OCA3LjU0OS44NTggOS40MjZ6bS01LjIyMi0xNy42MDdjLTIuODI2LjExNC01LjEzMiAzLjA3OS00LjgxIDUuNTMxIDIuNjEyLjIwMyA1LjExOC0yLjcyNSA0LjgxLTUuNTMxeiIvPjwvc3ZnPg=='
              height={21}
              width={21}
              alt='facebook icon'
              className='absolute left-8'
            />
            Continue with Apple
          </Button>

          <Button className='bg-white py-6 w-full hover:bg-black/5 text-black border-[1px] border-black px-4 relative'>
            <Image
              src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyMWgtMjR2LTE4aDI0djE4em0tMjMtMTYuNDc3djE1LjQ3N2gyMnYtMTUuNDc3bC0xMC45OTkgMTAtMTEuMDAxLTEwem0yMS4wODktLjUyM2gtMjAuMTc2bDEwLjA4OCA5LjE3MSAxMC4wODgtOS4xNzF6Ii8+PC9zdmc+'
              height={21}
              width={21}
              alt='facebook icon'
              className='absolute left-8'
            />
            Continue with email
          </Button>
        </form>
      </Form>
    );
  }
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative w-10 h-14 text-[2rem]',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
        'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
        'outline outline-0 outline-accent-foreground/20',
        { 'outline-4 outline-accent-foreground': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className='absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink'>
      <div className='w-px h-8 bg-black' />
    </div>
  );
}

// Inspired by Stripe's MFA input.
function FakeDash() {
  return (
    <div className='flex w-10 justify-center items-center'>
      <div className='w-3 h-1 rounded-full bg-border bg-black' />
    </div>
  );
}
