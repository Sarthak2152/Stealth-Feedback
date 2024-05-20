import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { signupSchema } from "@/schema/signUpSchema";
import { fromZodError } from "zod-validation-error";
import { hash } from "bcryptjs";
export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success) {
      return Response.json(
        { success: false, message: fromZodError(parsedBody.error).toString() },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ email: parsedBody.data.email });
    if (user) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }
    const newUser = await UserModel.create({
      email: parsedBody.data.email,
      password: await hash(parsedBody.data.password, 10),
      username: parsedBody.data.username,
    });
  } catch (error) {
    console.log("🚀 ~ Error in signup route:", error);
    return Response.json(
      { success: false, message: "Error while signing up" },
      { status: 500 }
    );
  }
}
