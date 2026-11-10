import mongoose, { Schema, type Model, type Types } from "mongoose";


export interface ICartItem {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  product: Types.ObjectId;
  slug: string;
  title: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

type CartItemModel = Model<ICartItem, Record<never, never>>;


const optionalVariant = {
  set: (value?: string): string | undefined => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
  },
};

const cartItemSchema = new Schema<ICartItem, CartItemModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart item must belong to a user"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Cart item must reference a product"],
    },
    slug: {
      type: String,
      required: [true, "Cart item must have a slug"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Cart item must have a title"],
      trim: true,
      maxlength: [120, "Title cannot be more than 120 characters"],
    },
    image: {
      type: String,
      required: [true, "Cart item must have an image"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Cart item must have a price"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: Number.isFinite,
        message: "Price must be a finite number",
      },
    },
    size: {
      type: String,
      ...optionalVariant,
      maxlength: [30, "Size cannot be more than 30 characters"],
    },
    color: {
      type: String,
      ...optionalVariant,
      maxlength: [30, "Color cannot be more than 30 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Cart item must have a quantity"],
      default: 1,
      min: [1, "Quantity must be at least 1"],
      max: [99, "Quantity cannot be more than 99"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number",
      },
    },
  },
  {
    timestamps: true,
  },
);

cartItemSchema.index(
  { user: 1, product: 1, size: 1, color: 1 },
  { unique: true },
);

const CartItem: CartItemModel =
  (mongoose.models.CartItem as CartItemModel) ||
  mongoose.model("CartItem", cartItemSchema);

export default CartItem;
