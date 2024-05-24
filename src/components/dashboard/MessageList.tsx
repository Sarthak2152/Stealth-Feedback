import { IMessage } from "@/models/Message";
import React from "react";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: (IMessage & { _id: string })[];
};
const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageItem key={message._id} message={message} />
        ))
      ) : (
        <p>No messages to display.</p>
      )}
    </div>
  );
};

export default MessageList;
