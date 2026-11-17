import mongoose, { Schema, type Model, type Types } from "mongoose";

export interface IProduct {
  slug: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  brand: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  bestSelling: boolean;
  rating: number;
  soldCount: number;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

type ProductModel = Model<IProduct, Record<never, never>>;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const productSchema = new Schema<IProduct, ProductModel>(
  {
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [SLUG_PATTERN, "Slug may only contain lowercase letters, numbers and hyphens"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [160, "Title cannot be more than 160 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
      maxlength: [5000, "Description cannot be more than 5000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
      validate: {
        validator: Number.isFinite,
        message: "Price must be a finite number",
      },
    },
    discountPrice: {
      type: Number,
      required: [true, "Please provide a discount price"],
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function (this: unknown, value: number): boolean {
          const price = (this as { price?: number } | undefined)?.price;

          if (typeof price !== "number") return true;

          return value <= price;
        },
        message: "Discount price cannot be higher than the price",
      },
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Stock must be a whole number",
      },
    },
    brand: {
      type: String,
      required: [true, "Please provide a brand"],
      trim: true,
      maxlength: [80, "Brand cannot be more than 80 characters"],
    },
    images: {
      type: [String],
      validate: [
        {
          validator: (images: string[]): boolean => images.length > 0,
          message: "Please provide at least one image",
        },
        {
          validator: (images: string[]): boolean =>
            images.every((image) => image.trim().length > 0),
          message: "Images cannot be empty",
        },
      ],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
      maxlength: [80, "Category cannot be more than 80 characters"],
    },
    sizes: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    bestSelling: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    soldCount: {
      type: Number,
      default: 0,
      min: [0, "Sold count cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Sold count must be a whole number",
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete (ret as { __v?: number }).__v;
        return ret;
      },
    },
  },
);

productSchema.index({ category: 1 });

const Product: ProductModel =
  (mongoose.models.Product as ProductModel) ||
  mongoose.model("Product", productSchema);

export default Product;
