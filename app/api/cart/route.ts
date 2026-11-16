import connectDB from "@/lib/db/dbConnection";
import { auth, sendErrorRes, sendSuccessRes } from "@/lib/helper";
import CartItem from "@/lib/Schemas/cartSchema";
import { cartItemSchema } from "@/lib/validations/cartItem.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const item = await req.json();
        const parsedItem = cartItemSchema.safeParse(item);
        if (!parsedItem.success) {
            return sendErrorRes({ status: 400, message: "Invalid cart item data", });
        }
        await connectDB();
        const user = await auth();
        const { product, size, color, quantity } = parsedItem.data;
        const existingItem = await CartItem.findOne({ user: user.id, product, color, size });
        const qty = quantity ?? 1;
        if (existingItem) {
            const updateItem = await CartItem.findOneAndUpdate(
                {
                    user: user.id,
                    product,
                    color,
                    size
                },
                { $inc: { quantity: qty } },
                { new: true }
            )
            return sendSuccessRes({ status: 200, message: "Item quantity updated successfully", data: updateItem })
        }
        const newItem = await CartItem.create({
            user: user.id,
            ...parsedItem.data
        });

        return sendSuccessRes({ status: 201, message: "Item added to cart successfully", data: newItem })
    } catch (error: unknown) {
        return sendErrorRes({ message: "Failed to add item to cart", error: error instanceof Error ? error.message : "Internal Server Error" })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const user = await auth();
        const { product, color, size } = await req.json();
        const result = await CartItem.findOneAndDelete({ user: user.id, product, color, size });
        if (!result) {
            return sendErrorRes({ status: 404, message: "Cart item not found" });
        }
        return sendSuccessRes({ status: 200, message: "Item removed from cart successfully", data: result });
    } catch (error) {
        return sendErrorRes({ message: "Failed to remove item from cart", error: error instanceof Error ? error.message : "Internal Server Error" })
    }
}
