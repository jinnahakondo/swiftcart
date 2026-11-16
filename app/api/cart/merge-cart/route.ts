import connectDB from "@/lib/db/dbConnection";
import { auth, sendErrorRes, sendSuccessRes } from "@/lib/helper";
import CartItem from "@/lib/Schemas/cartSchema";
import { CartItemType } from "@/lib/types/cartType";
import { cartItemSchema } from "@/lib/validations/cartItem.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { cartItems } = await req.json();
        await connectDB();
        const user = await auth();

        const parsedCartItems = cartItemSchema.array().safeDecode(cartItems);
        if (!parsedCartItems.success) {
            return sendErrorRes({ status: 400, message: "Invalid cart items", error: parsedCartItems.error.issues[0]?.message });
        }

        // insert user id to each cart
        const formatedCartItems = parsedCartItems.data.map((item) => ({ ...item, user: user.id }));

        const dbCartItems = await CartItem.find({ user: user.id }).lean();

        const uniqueCartItems = new Map();
        [...dbCartItems, ...formatedCartItems].forEach((item) => {
            const key = `${item.product}-${item.size || ""}-${item.color || ""}`;
            uniqueCartItems.set(key, item);
        })

        const mergedCartItems = Array.from(uniqueCartItems.values());



        await Promise.all(
            mergedCartItems.map(item => {
                const {
                    quantity,
                    isSelected,
                    _id,
                    __v,
                    createdAt,
                    updatedAt,
                    ...insertFields
                } = item;
                console.log({ insertFields })
                return CartItem.findOneAndUpdate(
                    {
                        user: user.id,
                        product: item.product,
                        size: item.size,
                        color: item.color
                    },
                    {
                        $set: {
                            quantity, isSelected
                        },
                        $setOnInsert: {
                            user: user.id,
                            ...insertFields
                        }
                    }, {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
                )
            })
        )

        const updatedCartItems = await CartItem.find({
            user: user.id,
        });

        return sendSuccessRes({ status: 200, message: "Cart items merged successfully", data: updatedCartItems });


    } catch (error: unknown) {
        return sendErrorRes({ status: 500, message: "Internal server error", error: error instanceof Error ? error.message : "Internal Server Error" });
    }
}