import { Schema, models, model } from 'mongoose';

const ReviewSchema = new Schema(
  {
    rentalId: {
      type: Schema.Types.ObjectId,
      ref: 'Rental',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
      default: '',
    },
    ratings: {
      cleanliness: {
        type: Number,
        required: true,
      },
      accuracy: {
        type: Number,
        required: true,
      },
      checkIn: {
        type: Number,
        required: true,
      },
      communication: {
        type: Number,
        required: true,
      },
      location: {
        type: Number,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Review = models.Review || model('Review', ReviewSchema);

export default Review;
