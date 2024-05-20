import { IMessage } from "@/models/Message";

export type ApiResponse = {
  success: boolean;
  message: string;
  acceptingMessage?: boolean;
  messages?: IMessage[];
  error?: any;
};
