import connectDB from "@/lib/db/dbConnection";
import { sendErrorRes, sendSuccessRes } from "@/lib/helper";
import Product from "@/lib/Schemas/productSchem";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    await connectDB();

    const product = await Product.findOne({ slug }).select("-__v").lean();

    if (!product) {
      return sendErrorRes({ status: 404, message: "Product not found" });
    }

    return sendSuccessRes({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error: unknown) {
    return sendErrorRes({
      message: "Failed to fetch product",
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
