import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    return Response.json(
      { success: false, message: "You are not logged in" },
      { status: 401 }
    );
  }
  // converting string to Object id ( this is important while using aggregation pipelines)
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]).exec();

    if (!user || user.length === 0) {
      return Response.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Successfully fetched messages",
        messages: user[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return Response.json({
      success: false,
      message: "Something went wrong while fetching messages",
    });
  }
}
