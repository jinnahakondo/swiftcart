import connectDB from "@/lib/db/dbConnection";
import { auth, sendErrorRes, sendSuccessRes } from "@/lib/helper";
import CartItem from "@/lib/Schemas/cartSchema";
import { NextRequest } from "next/server";


export async function PATCH(req: NextRequest) {
    try {
        const { product, color, size } = await req.json();

        await connectDB();
        const user = await auth();
        const result = await CartItem.findOneAndUpdate(
            { user: user.id, product, color, size },
            { $inc: { quantity: -1 } },
            { returnDocument: "after" }
        );

        if (!result) {
            return sendErrorRes({ status: 404, message: "Cart item not found" });
        }
        return sendSuccessRes({ status: 200, message: "Item quantity decreased successfully", data: result });
    } catch (error: unknown) {
        return sendErrorRes({ message: "Failed to Decrease item quantity", error: error instanceof Error ? error.message : "Internal Server Error" })
    }
}