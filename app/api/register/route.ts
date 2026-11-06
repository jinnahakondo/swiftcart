import connectDB from "@/lib/db/dbConnection";
import { sendErrorRes, sendSuccessRes } from "@/lib/helper";
import User from "@/lib/Schemas/userSchema";
import { signupSchema } from "@/lib/validations/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => null);
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return sendErrorRes({ status: 400, message: "Invalid input" });
    }

    const isExist = await User.exists({ email: parsed.data.email });
    if (isExist) {
      return sendErrorRes({ status: 409, message: "Email already registered" });
    }

    const user = await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.email,
    });

    const result = await User.create(user);
    return sendSuccessRes({
      status: 201,
      message: "User created",
      data: result,
    });
  } catch (error: unknown) {
    return sendErrorRes({
      message: "Failed to create User",
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
