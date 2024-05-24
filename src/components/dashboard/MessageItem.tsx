"use client";

import dayjs from "dayjs";
import { IMessage } from "@/models/Message";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteConfirmationAlert from "./DeleteConfirmationAlert";

type MessageItemProps = {
  message: IMessage & { _id: string };
};

export function MessageItem({ message }: MessageItemProps) {
  return (
    <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <DeleteConfirmationAlert id={message._id} />
        </div>
        <div className="text-sm">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>
    </Card>
  );
}
