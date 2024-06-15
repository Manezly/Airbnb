import { Schema, models, model } from 'mongoose';

const addressSchema = new Schema(
  {
    propertyName: { type: String, required: true },
    street: { type: String, required: true },
    town: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const cancellationSchema = new Schema(
  {
    full: { type: Number, required: true },
    partial: { type: Number, required: true },
  },
  { _id: false }
);

const rulesSchema = new Schema(
  {
    inAfter: { type: String, required: true },
    inBefore: { type: String, required: true },
    outBefore: { type: String, required: true },
    pets: { type: Boolean, required: true },
    partiesEvents: { type: Boolean, required: true },
    smoking: { type: Boolean, required: true },
    additional: { type: String },
  },
  { _id: false }
);

const RentalSchema = new Schema(
  {
    images: [
      {
        type: String,
        // required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    rentalType: {
      type: String,
      required: true,
    },
    guests: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    overview: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlights: [
      {
        type: String,
        // required: true,
      },
    ],
    guestFavourites: [
      {
        type: String,
        required: false,
      },
    ],
    standoutAmenities: [
      {
        type: String,
        required: false,
      },
    ],
    safetyItems: [
      {
        type: String,
        required: false,
      },
    ],
    address: addressSchema,
    rates: {
      type: Number,
      required: true,
    },
    cancellation: cancellationSchema,
    rules: rulesSchema,
  },
  {
    timestamps: true,
  }
);

const Rental = models.Rental || model('Rental', RentalSchema);

export default Rental;
