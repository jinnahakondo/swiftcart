import * as z from "zod";

const variant = z
  .string()
  .trim()
  .max(30, "Size/Color cannot be more than 30 characters")
  .transform((value) => (value ? value : undefined))
  .optional();

export const cartItemSchema = z.object({
  // product: z
  //   .string()
  //   .regex(/^[0-9a-fA-F]{24}$/, "Product must be a valid ID"), // TODO: switch to ObjectId ref
  product: z.string().trim().min(1, "Cart item must reference a product"),
  slug: z.string().trim().min(1, "Cart item must have a slug"),
  title: z
    .string()
    .trim()
    .min(1, "Cart item must have a title")
    .max(120, "Title cannot be more than 120 characters"),
  image: z.string().trim().min(1, "Cart item must have an image"),
  price: z.number().min(0, "Price cannot be negative"),
  size: variant,
  color: variant,
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(99, "Quantity cannot be more than 99")
    .default(1),
  isSelected: z.boolean().default(false),
});

export type CartItemInput = z.input<typeof cartItemSchema>;
export type CartItemParsed = z.output<typeof cartItemSchema>;
