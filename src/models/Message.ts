import mongoose, { Schema } from "mongoose";

export interface IMessage {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const MessageModel =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
