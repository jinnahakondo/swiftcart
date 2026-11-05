import connectDB from "@/lib/db/dbConnection";
import { sendErrorRes, sendSuccessRes } from "@/lib/helper";
import User from "@/lib/Schemas/userSchema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userInfo = await req.json();

    const result = await User.create(userInfo);
    return sendSuccessRes({ message: "User created", data: result });
  } catch (error: any) {
    return sendErrorRes({
      message: "Failed to create User",
      error: error.message,
    });
  }
}
