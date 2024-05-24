import React from "react";
import { MessageItem } from "./MessageItem";
import { Message } from "@/types/messages";
import MessageModel from "@/models/Message";
type MessageListProps = {
  userId: string;
};
const MessageList = async ({ userId }: MessageListProps) => {
  try {
    const messages = await MessageModel.find({ user: userId }).sort({
      createdAt: -1,
    });

    const plainMessages: Message[] = messages.map((item) => ({
      _id: item.id,
      content: item.content,
      createdAt: item.createdAt,
    }));
    return (
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {plainMessages.length > 0 ? (
          plainMessages.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    );
  } catch (error: any) {
    return (
      <div className="flex h-64 w-full flex-col bg-muted/40 px-2 sm:px-6 py-8 ">
        <div>
          <h3>Failed to fetch user messages</h3>
          <p>{error?.message || "Please try again later"}</p>
        </div>
      </div>
    );
  }
};

export default MessageList;