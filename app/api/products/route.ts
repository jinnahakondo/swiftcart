import connectDB from "@/lib/db/dbConnection";
import { sendErrorRes, sendSuccessRes } from "@/lib/helper";
import Product from "@/lib/Schemas/productSchem";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const products = await Product.find()
      .select("-__v")
      .sort({ createdAt: -1 })
      .lean();

    return sendSuccessRes({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error: unknown) {
    return sendErrorRes({
      message: "Failed to fetch products",
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
