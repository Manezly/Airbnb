import { Schema, models, model } from 'mongoose';

const BookingSchema = new Schema(
  {
    rental: {
      type: Schema.Types.ObjectId,
      ref: 'Rental',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    activeBooking: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = models.Booking || model('Booking', BookingSchema);

export default Booking;
