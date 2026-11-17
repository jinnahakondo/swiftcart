import * as z from "zod";

const slug = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Product must have a slug")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug may only contain lowercase letters, numbers and hyphens",
  );

const images = z
  .array(z.string().trim().min(1, "Images cannot be empty"))
  .min(1, "Please provide at least one image");

const sizes = z.array(z.string().trim().min(1, "Sizes cannot be empty"));

const colors = z.array(z.string().trim().min(1, "Colors cannot be empty"));

const baseProductSchema = z.object({
  slug,
  title: z
    .string()
    .trim()
    .min(1, "Product must have a title")
    .max(160, "Title cannot be more than 160 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Product must have a description")
    .max(5000, "Description cannot be more than 5000 characters"),
  price: z.number().min(0, "Price cannot be negative"),
  discountPrice: z.number().min(0, "Discount price cannot be negative"),
  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .default(0),
  brand: z
    .string()
    .trim()
    .min(1, "Product must have a brand")
    .max(80, "Brand cannot be more than 80 characters"),
  images,
  category: z
    .string()
    .trim()
    .min(1, "Product must have a category")
    .max(80, "Category cannot be more than 80 characters"),
  sizes: sizes.default([]),
  colors: colors.default([]),
  bestSelling: z.boolean().default(false),
  rating: z
    .number()
    .min(0, "Rating cannot be less than 0")
    .max(5, "Rating cannot be more than 5")
    .default(0),
  soldCount: z
    .number()
    .int("Sold count must be a whole number")
    .min(0, "Sold count cannot be negative")
    .default(0),
  createdBy: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "createdBy must be a valid ID")
    .optional(),
});

const discountWithinPrice = (data: {
  price?: number;
  discountPrice?: number;
}): boolean =>
  data.price === undefined ||
  data.discountPrice === undefined ||
  data.discountPrice <= data.price;

const discountError = {
  message: "Discount price cannot be higher than the price",
  path: ["discountPrice"],
};

export const createProductSchema = baseProductSchema.refine(
  discountWithinPrice,
  discountError,
);

export const updateProductSchema = baseProductSchema
  .partial()
  .refine(discountWithinPrice, discountError);

export type ProductInput = z.input<typeof createProductSchema>;
export type ProductParsed = z.output<typeof createProductSchema>;
export type ProductUpdateInput = z.input<typeof updateProductSchema>;
