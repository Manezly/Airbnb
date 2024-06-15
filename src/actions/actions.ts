'use server';

import twilio from 'twilio';
import User from '../lib/models/User';
import { connectDB } from '@/lib/mongodb';
import { sign } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import Rental from '@/lib/models/Rental';
import { setCookie, parseCookies } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID as string;

const jwtSecret = process.env.JWT_SECRET as string;

const client = twilio(accountSid, authToken);

export const sendVerificationCode = async (phoneNumber: string) => {
  const verfication = await client.verify.v2
    .services(serviceSid)
    .verifications.create({ to: phoneNumber, channel: 'sms' });

  return verfication.sid;
};

export const verifyCode = async (phoneNumber: string, code: string) => {
  await connectDB();

  const verficationCheck = await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({ to: phoneNumber, code });

  if (verficationCheck.status === 'approved') {
    // Save number to MongoDB
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // User does not exist, create a new user
      console.log('creating user..');
      user = await User.create({ phoneNumber });
    }

    const token = sign({ userId: user._id }, jwtSecret, {
      expiresIn: '12h',
    });

    return { message: 'Phone number verified', token };
  } else {
    throw new Error('Invalid verification vode');
  }
};

export const isVerifiedUser = async (): Promise<boolean | null> => {
  await connectDB();

  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    throw new Error('You are not logged in');
  }

  try {
    const decoded = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user.verified;
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  }
};

export const createRental = async (data: any) => {
  try {
    await connectDB();

    const rental = new Rental(data);
    await rental.save();

    return { message: 'Rental created successfully', rentalId: rental._id };
  } catch (error) {
    console.error('Error creating rental:', error);
    throw new Error('Failed to create rental');
  }
};

export async function fetchRentalData(id) {
  await connectDB();

  try {
    const rental = await Rental.findById(id);

    if (!rental) {
      console.error('Rental not found for ID:', id);
      throw new Error('Rental not found');
    }

    return rental;
  } catch (error) {
    console.error('Error fetching rental data:', error);
    throw new Error('Error fetching rental data');
  }
}
