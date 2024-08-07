export const maxDuration = 6000;

('use server');

import twilio from 'twilio';
import User from '../lib/models/User';
import Message from '../lib/models/Message';
import Rental from '@/lib/models/Rental';
import Conversation from '@/lib/models/Conversation';
import Booking from '@/lib/models/Booking';
import Review from '@/lib/models/Review';
import { connectDB } from '@/lib/mongodb';
import { sign } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import {
  createMessageProps,
  FetchedRentalSchema,
  RentalsResponse,
} from '@/lib/types';
import cloudinary from '@/lib/cloudinary';
import mongoose from 'mongoose';

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

export async function deleteCookie(name: string) {
  cookies().delete(name);
}

export const verifyCode = async (phoneNumber: string, code: string) => {
  await connectDB();

  const verificationCheck = await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({ to: phoneNumber, code });

  if (verificationCheck.status === 'approved') {
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({ phoneNumber });
    }

    const token = sign({ userId: user._id }, jwtSecret, {
      expiresIn: '10y',
    });

    cookies().set('authToken', token);

    const hasCompleteDeets = !!user.fullName && !!user.email;
    return { message: 'Phone number verified', token, hasCompleteDeets };
  } else {
    throw new Error('Invalid verification code');
  }
};

export const checkUserDetails = async (phoneNumber: string) => {
  await connectDB();

  const user = await User.findOne({ phoneNumber });

  if (!user) {
    throw new Error('User not found');
  }

  const hasCompleteDeets = !!user.fullName && !!user.email;
  return { hasCompleteDeets };
};

export const updateUserInfo = async (phoneNumber: string, userDetails: any) => {
  await connectDB();

  const user = await User.findOne({ phoneNumber });

  if (!user) {
    throw new Error('User not found');
  }

  user.fullName = userDetails.fullName || user.fullName;
  user.email = userDetails.email || user.email;
  user.image = userDetails.image || user.image;

  await user.save();
};

export const isVerifiedUser = async (): Promise<boolean | null> => {
  await connectDB();

  const authToken = cookies().get('authToken')?.value;
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

export const fetchUsername = async () => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Error finding user info');
    }

    return user.fullName;
  } catch (error) {
    console.error('Error verifying user:', error);
  }
};

export const createMessage = async (data: createMessageProps) => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const senderId = decodedToken.userId;

    let conversation;

    if (data.conversationId) {
      conversation = await Conversation.findById(data.conversationId);
    } else {
      conversation = await Conversation.findOne({
        participants: { $all: [senderId, data.recipientId] },
        rentalId: data.rentalId,
      });
    }

    if (!conversation) {
      const sender = await User.findById(senderId).select('fullName');
      conversation = new Conversation({
        participants: [senderId, data.recipientId],
        recipientName: data.recipientName,
        senderName: sender.fullName,
        rentalId: data.rentalId,
        messages: [],
      });
    }

    // console.log(conversation);

    const message = new Message({
      text: data.text,
      senderId: senderId,
      recipientId: data.recipientId,
      rentalId: data.rentalId,
      conversationId: conversation._id,
      read: false,
    });

    const savedMessage = await message.save();

    conversation.messages.push(savedMessage._id);
    await conversation.save();

    return { success: true, conversationId: conversation._id };
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
};

export const countUnreadMessages = async () => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;

    const unreadMessageCount = await Message.countDocuments({
      recipientId: userId,
      read: false,
    });

    return { unreadMessageCount };
  } catch (error) {
    console.error('Error counting unread message:', error);
    throw error;
  }
};

export const getUserConversations = async () => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;

    const user = await User.findById(userId).select('fullName');
    const userFullName = user.fullName;

    const conversations = await Conversation.find({
      participants: userId,
    }).sort({ updatedAt: -1 });

    const processedConversations = conversations.map((conversation) => {
      const opponent =
        conversation.recipientName === userFullName
          ? conversation.senderName
          : conversation.recipientName;

      return {
        ...conversation.toObject(),
        opponent,
      };
    });

    // console.log('Conversations:', conversations);

    return JSON.stringify(processedConversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const getMessagesByConversationId = async (conversationId?: string) => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    if (!conversation.participants.includes(userId)) {
      throw new Error('Unauthorised');
    }

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });

    const unreadMessages = messages.filter(
      (message) => !message.read && message.recipientId.toString() === userId
    );

    if (unreadMessages.length > 0) {
      await Message.updateMany(
        { _id: { $in: unreadMessages.map((message) => message._id) } },
        { $set: { read: true } }
      );
    }

    const firstMessage = messages[0];
    const opponentId =
      firstMessage.senderId.toString() !== userId
        ? firstMessage.senderId
        : firstMessage.recipientId;

    const processedMessages1 = JSON.stringify(messages);
    const processedMessages2 = JSON.parse(processedMessages1);

    // If userSender true, the current user is the sender
    const processedMessages = processedMessages2.map((message: any) => {
      const userSender = message.senderId.toString() === userId;

      return {
        ...message,
        userSender,
      };
    });

    const template = {
      senderId: userId,
      recipientId: opponentId,
      conversationId: messages[0].conversationId,
      rentalId: messages[0].rentalId,
    };

    const temp1 = JSON.stringify(template);
    const messageTemplate = JSON.parse(temp1);

    return { processedMessages, messageTemplate };
  } catch (error) {
    console.error('Error fetching messages', error);
    throw error;
  }
};

export const saveToWishlist = async (rentalId: string) => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Add rentalId to the wishlist if it isn't already there
    if (!user.wishlist.includes(rentalId)) {
      user.wishlist.push(rentalId);
      await user.save();
    }

    return { success: true, message: 'Rental added to wishlist' };
  } catch (error) {
    console.error('Error saving to wishlist:', error);
    throw error;
  }
};

export const getUserWishlistRentals = async () => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;

    // Fetch the user's wishlist
    const user = await User.findById(userId).select('wishlist');
    if (!user) {
      throw new Error('User not found');
    }

    const rentalIds = user.wishlist;

    // Fetch the rentals in the wishlist
    const rentals = await Rental.find({ _id: { $in: rentalIds } });

    return rentals;
  } catch (error) {
    console.error('Error fetching wishlist rentals:', error);
    throw error;
  }
};

export const createRental = async (data: any) => {
  try {
    // Connect to DB
    await connectDB();

    // Check cookies & redirect to login if no cookie
    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    // Decode cookie
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    if (!decodedToken || !decodedToken.userId) {
      throw new Error('Invalid auth token');
    }

    // Extract user id from cookie
    data.userId = decodedToken.userId;

    const imageUploadPromises = data.images.map((base64Image: string) => {
      return cloudinary.uploader.upload(base64Image, {
        folder: 'rentals',
      });
    });

    const uploadedImages = await Promise.all(imageUploadPromises);
    const imageUrls = uploadedImages.map(
      (uploadResult) => uploadResult.secure_url
    );
    data.images = imageUrls;

    const rental = new Rental(data);
    await rental.save();

    return {
      message: 'Rental created successfully',
      rentalId: rental._id,
    };
  } catch (error) {
    console.error('Error creating rental:', error);
    throw new Error('Failed to create rental');
  }
};

export const editRental = async (data: FetchedRentalSchema, id: string) => {
  try {
    // console.log('Connecting to DB...');
    await connectDB();

    // console.log('Finding rental by ID:', id);
    const rental = await Rental.findById(id);
    if (!rental) {
      throw new Error('Rental not found');
    }

    const originalImages = rental.images;
    const newImages = data.images;

    const imagesToRemove = originalImages.filter(
      (img: string) => !newImages.includes(img)
    );

    const deleteImagePromises = imagesToRemove.map((imageUrl: string) => {
      if (imageUrl) {
        const publicId = imageUrl.split('/').pop()?.split('.')[0];
        if (publicId) {
          console.log('Deleting image from Cloudinary:', publicId);
          return cloudinary.uploader.destroy(publicId);
        }
      }
      return Promise.resolve();
    });
    await Promise.all(deleteImagePromises);

    const imageUploadPromises = newImages.map((image: string) => {
      if (image.startsWith('data:image')) {
        console.log('Uploading new image to Cloudinary...');
        return cloudinary.uploader.upload(image, {
          folder: 'rentals',
        });
      }
      return Promise.resolve({ secure_url: image });
    });

    const uploadedImages = await Promise.all(imageUploadPromises);
    const imageUrls = uploadedImages.map(
      (uploadResult) => uploadResult.secure_url
    );
    data.images = imageUrls;

    // console.log('Updated images:', data.images);

    // Ensure data._id is set correctly
    if (!data._id) {
      data._id = id;
      console.log('Setting data._id to:', id);
    }

    // Double-check if data._id is still null or undefined
    if (!data._id) {
      throw new Error('data._id is not set. Unable to update rental.');
    }

    console.log('Updating rental with new data...');
    const updatedRental = await Rental.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    console.log('Rental updated successfully:', updatedRental);

    return {
      message: 'Rental updated successfully',
      rentalId: updatedRental._id,
    };
  } catch (error) {
    console.error('Error updating rental:', error);
    throw new Error('Failed to update rental');
  }
};

export async function fetchRentalData(id: string) {
  await connectDB();

  try {
    const rental = await Rental.findById(id);

    if (!rental) {
      console.error('Rental not found for ID:', id);
      throw new Error('Rental not found');
    }

    const userId = rental.userId;
    const user = await User.findById(userId);

    return { rental, user };
  } catch (error) {
    console.error('Error fetching rental data:', error);
    throw new Error('Error fetching rental data');
  }
}

export async function fetchEditData(id: string) {
  await connectDB();

  try {
    const rental = await Rental.findOne({ _id: id }).lean(); // Using .lean() to get plain JS object

    if (!rental) {
      console.error('Rental not found for ID:', id);
      throw new Error('Rental not found');
    }

    // return rental;
    // console.log(JSON.stringify(rental), 'woahfella');
    return JSON.stringify(rental);
  } catch (error) {
    console.error('Error fetching rental data:', error);
    throw new Error('Error fetching rental data');
  }
}

export async function fetchRentalBySearch(
  string: string,
  page: number = 1
): Promise<RentalsResponse> {
  await connectDB();

  try {
    const modifiedString = string.replace(/-/g, ' ');
    const searchPattern = new RegExp(modifiedString, 'i');

    const rentalsPerPage = 2;
    const skip = (page - 1) * rentalsPerPage;

    const query = {
      $or: [
        { title: searchPattern },
        { propertyType: searchPattern },
        { rentalType: searchPattern },
        { 'address.propertyName': searchPattern },
        { 'address.street': searchPattern },
        { 'address.town': searchPattern },
        { 'address.country': searchPattern },
      ],
    };

    const rentals = await Rental.find(query).skip(skip).limit(rentalsPerPage);

    if (!rentals.length) {
      console.error('No rentals found');
    }

    const totalRentals = rentals.length;
    const numberOfPages = Math.ceil(totalRentals / rentalsPerPage);

    const userIds = rentals.map((rental) => rental.userId);
    const users = await User.find({ _id: { $in: userIds } });

    // Create a map of userId to user details for quick lookup
    const userMap = new Map(
      users.map((user) => [user._id.toString(), user.fullName])
    );

    const enhancedRentals = rentals.map((rental) => {
      const userId = rental.userId.toString();
      const fullName = userMap.get(userId);
      return {
        ...rental.toObject(),
        fullName: fullName,
      };
    });

    return { rentals: enhancedRentals, numberOfPages };
  } catch (error) {
    throw new Error('Error fetching rental data by search params');
  }
}

export async function fetchAllRentals(
  filters: {
    propertyType?: string;
    typeOfPlace?: string;
    minRate?: number;
    maxRate?: number;
    beds?: string;
    bedrooms?: string;
    bathrooms?: string;
    guestFavourites?: string[];
    standoutAmenities?: string[];
    safetyItems?: string[];
    fromDate?: string;
    toDate?: string;
    country?: string;
    guests?: string;
    page?: number;
  },
  page: number = 1
): Promise<RentalsResponse> {
  await connectDB();

  try {
    const rentalsPerPage = 2;
    const skip = (page - 1) * rentalsPerPage;

    const query: any = {};
    if (filters.propertyType)
      query.propertyType = { $regex: filters.propertyType, $options: 'i' };
    if (filters.typeOfPlace)
      query.rentalType = { $regex: filters.typeOfPlace, $options: 'i' };
    if (filters.minRate !== undefined || filters.maxRate !== undefined) {
      query.rates = {};
      if (filters.minRate !== undefined) query.rates.$gte = filters.minRate;
      if (filters.maxRate !== undefined) query.rates.$lte = filters.maxRate;
    }
    if (filters.beds) {
      if (filters.beds === '12+') {
        query.beds = '12+';
      } else {
        query.$or = [{ beds: filters.beds }, { beds: '12+' }];
      }
    }
    if (filters.bedrooms) {
      if (filters.bedrooms === '12+') {
        query.bedrooms = '12+';
      } else {
        query.$or = [{ bedsrooms: filters.bedrooms }, { bedrooms: '12+' }];
      }
    }
    if (filters.bathrooms) {
      if (filters.bathrooms === '12+') {
        query.bathrooms = '12+';
      } else {
        query.$or = [{ bathrooms: filters.bathrooms }, { bathrooms: '12+' }];
      }
    }
    if (filters.guestFavourites) {
      query.guestFavourites = {
        $all: filters.guestFavourites.map(
          (favourite) => new RegExp(favourite, 'i')
        ),
      };
    }
    if (filters.standoutAmenities) {
      query.standoutAmenities = {
        $all: filters.standoutAmenities.map(
          (amenity) => new RegExp(amenity, 'i')
        ),
      };
    }
    if (filters.safetyItems) {
      query.safetyItems = {
        $all: filters.safetyItems.map((item) => new RegExp(item, 'i')),
      };
    }
    if (filters.fromDate && filters.toDate) {
      const fromDate = new Date(filters.fromDate);
      const toDate = new Date(filters.toDate);

      // Find bookings that overlap with the date range
      const overlappingBookings = await Booking.find({
        $or: [{ startDate: { $lt: toDate }, endDate: { $gt: fromDate } }],
      }).select('rental');

      const overlappingRentalIds = overlappingBookings.map(
        (booking) => booking.rental
      );

      // Exclude rentals with overlapping bookings
      query._id = { $nin: overlappingRentalIds };
    }
    if (filters.country) {
      query['address.country'] = { $regex: filters.country, $options: 'i' };
    }
    if (filters.guests) {
      if (filters.guests === '12+') {
        query.guests = '12+';
      } else {
        query.$or = [{ guests: filters.guests }, { guests: '12+' }];
      }
    }

    // console.log('The query is:', JSON.stringify(query, null, 2));

    const totalRentals = await Rental.countDocuments(query);
    const numberOfPages = Math.ceil(totalRentals / rentalsPerPage);

    const rentals = await Rental.find(query).skip(skip).limit(rentalsPerPage);

    if (!rentals.length) {
      console.error('No rentals found');
    }

    const userIds = rentals.map((rental) => rental.userId);
    const users = await User.find({ _id: { $in: userIds } });

    const userMap = new Map(
      users.map((user) => [user._id.toString(), user.fullName])
    );

    const enhancedRentals = rentals.map((rental) => {
      const userId = rental.userId.toString();
      const fullName = userMap.get(userId);
      return {
        ...rental.toObject(),
        fullName: fullName,
      };
    });

    return { rentals: enhancedRentals, numberOfPages };
  } catch (error) {
    console.error('Error fetching rental data:', error);
    throw new Error('Error fetching rental data');
  }
}

type saveRentalBookingProps = {
  dateRange: {
    from: Date;
    to: Date;
  };
  rentalId: String;
  guests: String;
};

export const saveRentalBooking = async (data: saveRentalBookingProps) => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }
    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;

    const newBooking = new Booking({
      rental: data.rentalId,
      user: userId,
      startDate: new Date(data.dateRange.from),
      endDate: new Date(data.dateRange.to),
      guests: data.guests,
      activeBooking: true,
    });

    const savedBooking = await newBooking.save();

    return {
      success: true,
      booking: savedBooking,
    };
  } catch (error) {
    console.error('Error making a booking', error);
    return {
      success: false,
      error: 'Failed to save booking',
    };
  }
};

export const fetchUserListings = async () => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      window.location.href = '/login';
      return;
    }

    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;

    const rentals = await Rental.find({ userId });

    if (!rentals.length) {
      console.error('No rentals found for this user');
    }

    return rentals;
  } catch (error) {
    throw new Error('Error fetching user listings');
  }
};

export const fetchActiveBookingsForRental = async (rentalId: string) => {
  try {
    await connectDB();

    const activeBookings = await Booking.find({
      rental: rentalId,
      activeBooking: true,
    });

    const plainBookings = activeBookings.map((booking) => ({
      rental: booking.rental.toString(),
      user: booking.user.toString(),
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
    }));

    // console.log(plainBookings);

    return {
      success: true,
      bookings: plainBookings,
    };
  } catch (error) {
    console.error('Error fetching active bookings', error);
  }
};

type reviewDataProps = {
  comment: String;
  ratings: {
    accuracy: Number;
    checkIn: Number;
    cleanliness: Number;
    communication: Number;
    location: Number;
    value: Number;
  };
  rentalId: String;
};

export const saveReview = async (data: reviewDataProps) => {
  try {
    await connectDB();

    const authToken = cookies().get('authToken')?.value;
    if (!authToken) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const decodedToken = jwt.verify(authToken, jwtSecret) as jwt.JwtPayload & {
      userId: string;
    };

    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    const newReview = new Review({
      rentalId: data.rentalId,
      user: userId,
      fullName: user.fullName,
      comment: data.comment,
      ratings: data.ratings,
    });

    const savedReview = await newReview.save();

    return {
      success: true,
      review: savedReview,
    };
  } catch (error) {
    console.error('Error saving review', error);
    return {
      success: false,
      error: 'Failed to save review',
    };
  }
};

export async function fetchRentalReviews(rentalId: string, limit?: number) {
  try {
    await connectDB();

    // Fetch reviews for a specific rental
    let reviewsQuery = Review.find({
      rentalId: new mongoose.Types.ObjectId(rentalId),
    }).populate('user', 'fullName createdAt');

    if (limit) {
      reviewsQuery = reviewsQuery.limit(limit);
    }

    const reviews = await reviewsQuery;

    // Calculate average ratings and count reviews
    const aggregationResult = await Review.aggregate([
      { $match: { rentalId: new mongoose.Types.ObjectId(rentalId) } },
      {
        $group: {
          _id: '$rentalId',
          cleanlinessAvg: { $avg: '$ratings.cleanliness' },
          accuracyAvg: { $avg: '$ratings.accuracy' },
          checkInAvg: { $avg: '$ratings.checkIn' },
          communicationAvg: { $avg: '$ratings.communication' },
          locationAvg: { $avg: '$ratings.location' },
          valueAvg: { $avg: '$ratings.value' },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    const aggregationData =
      aggregationResult.length > 0 ? aggregationResult[0] : null;

    return {
      reviews: reviews.map((review) => review.toObject()),
      averages: {
        cleanlinessAvg: aggregationData?.cleanlinessAvg || 0,
        accuracyAvg: aggregationData?.accuracyAvg || 0,
        checkInAvg: aggregationData?.checkInAvg || 0,
        communicationAvg: aggregationData?.communicationAvg || 0,
        locationAvg: aggregationData?.locationAvg || 0,
        valueAvg: aggregationData?.valueAvg || 0,
      },
      reviewCount: aggregationData?.reviewCount || 0,
    };
  } catch (error) {
    console.error('Error fetching reviews', error);
    return {
      success: false,
      error: 'Failed to fetch reviews',
    };
  }
}

export const fetchReviewsAndRentalByHostId = async (userId: string) => {
  try {
    connectDB();

    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found');
      return;
    }

    const rentals = await Rental.find({ userId });

    if (!rentals.length) {
      console.error('No rentals found for this user');
      return;
    }

    const rentalIds = rentals.map((rental) => rental._id);
    const reviews = await Review.find({ rentalId: { $in: rentalIds } });

    return { user, rentals, reviews };
  } catch (error) {
    console.error('Error fetching reviews', error);
  }
};

// Fetch geocode coords for google maps
export async function fetchGeocodeCoords(address: string) {
  const encodedAddress = encodeURIComponent(address);

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch geocode data');
    }

    const coords = await res.json();

    if (coords.status !== 'OK') {
      throw new Error('Geocode API error');
    }

    return coords;
  } catch (error) {
    console.error('Error fetching geocode coordinates:', error);
    throw error;
  }
}
