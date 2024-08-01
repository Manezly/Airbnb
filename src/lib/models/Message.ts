import { Schema, models, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rentalId: {
      type: Schema.Types.ObjectId,
      ref: 'Rental',
      required: true,
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
