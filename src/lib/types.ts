import {
  guestFavourites,
  propertyTypes,
  rentalTypes,
  safetyItems,
  standoutAmenities,
  timeRange,
} from '@/constants/rental-constants';
import { ObjectId } from 'mongodb';

export type Address = {
  propertyName: string;
  street: string;
  town: string;
  postcode: string;
  country: string;
};

export type Rules = {
  inAfter: string;
  inBefore: string;
  outBefore: string;
  pets: boolean;
  partiesEvents: boolean;
  smoking: boolean;
  additional: string;
};

export type TRental = {
  _id: ObjectId;
  userId?: ObjectId;
  images: string[];
  title: string;
  propertyType: string;
  rentalType: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  reviews: string[];
  overview: string;
  description: string;
  guestAccess: string;
  highlights: string[];
  guestFavourites: string[];
  standoutAmenities: string[];
  safetyItems: string[];
  address: Address;
  rates: number;
  cancellation: { full: number; partial: number };
  rules: Rules;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  fullName: string;
};

export type RentalsResponse = {
  rentals: TRental[];
  numberOfPages: number;
};

type PropertyType = (typeof propertyTypes)[number];
type RentalType = (typeof rentalTypes)[number];
export type GuestFavourite = (typeof guestFavourites)[number];
type StandoutAmenity = (typeof standoutAmenities)[number];
type SafetyItem = (typeof safetyItems)[number];
type TimeRange = (typeof timeRange)[number];

export type RentalFormSchema = {
  images: string[];
  title: string;
  propertyType: PropertyType;
  rentalType: RentalType;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  overview: string;
  description: string;
  guestAccess: string;
  guestFavourites?: GuestFavourite[];
  standoutAmenities?: StandoutAmenity[];
  safetyItems?: SafetyItem[];
  address: Address;
  rates: number;
  cancellation: {
    full: number;
    partial: number;
  };
  rules: {
    inAfter: TimeRange;
    inBefore: TimeRange;
    outBefore: TimeRange;
    pets: boolean;
    partiesEvents: boolean;
    smoking: boolean;
    additional?: string;
  };
};

export type FetchedRentalSchema = RentalFormSchema & {
  userId: string;
  _id: string;
};

export type createMessageProps = {
  text: string;
  recipientId: string;
  recipientName?: string;
  rentalId: string;
  conversationId?: string;
};

export type MessageBoxProps = {
  conversationId?: string;
};

export type UserDataProps = {
  _id: string;
  phoneNumber: string;
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  email: string;
  fullName: string;
};
