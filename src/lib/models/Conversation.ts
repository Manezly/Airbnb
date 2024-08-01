import { Schema, model, models } from 'mongoose';

const ConversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
      },
    ],
    recipientName: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    rentalId: {
      type: Schema.Types.ObjectId,
      ref: 'Rental',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation =
  models.Conversation || model('Conversation', ConversationSchema);

export default Conversation;
