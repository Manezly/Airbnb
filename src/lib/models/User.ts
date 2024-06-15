import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: [true, 'Email already exists'],
    },
    fullName: {
      type: String,
    },
    image: {
      type: String,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'rental',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
