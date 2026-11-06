import mongoose, { Schema, type Model } from "mongoose";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export interface IUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: "credentials" | "google";
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

// `Record<never, never>` is `{}`: Mongoose's default query-helpers generic,
// written this way so the empty-object lint rule stays happy.
type UserModel = Model<IUser, Record<never, never>, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: function (): boolean {
        return this.provider === "credentials";
      },
      select: false,
    },
    image: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        delete (ret as { __v?: number }).__v;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePassword = async function (
  candidate: string,
): Promise<boolean> {
  if (!this.password) return false;

  return bcrypt.compare(candidate, this.password);
};

const User: UserModel =
  (mongoose.models.User as UserModel) ||
  mongoose.model("User", userSchema);

export default User;
