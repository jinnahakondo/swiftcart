import connectDB from "@/lib/db/dbConnection";
import { auth, sendErrorRes, sendSuccessRes } from "@/lib/helper";
import CartItem from "@/lib/Schemas/cartSchema";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const user = await auth();
        const result = await CartItem.deleteMany({ user: user.id });
        if (result.deletedCount === 0) {
            return sendErrorRes({ status: 404, message: "Cart is already empty" });
        }
        return sendSuccessRes({ status: 200, message: "Cart cleared successfully", data: result });
    } catch (error) {
        return sendErrorRes({ message: "Failed to clear cart", error: error instanceof Error ? error.message : "Internal Server Error" })
    }
}