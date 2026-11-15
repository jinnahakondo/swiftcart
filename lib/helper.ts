import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./authOptions";

type sendSuccessResType = {
  success?: boolean;
  message: string;
  status?: number;
  data?: any;
};
type sendErrorResType = {
  success?: boolean;
  message: string;
  error?: string;
  status?: number;
};

export const sendSuccessRes = ({
  success = true,
  message,
  data,
  status = 200,
}: sendSuccessResType) => {
  return NextResponse.json(
    {
      success,
      message,
      ...(data && { data }),
    },
    { status },
  );
};

export const sendErrorRes = ({
  success = false,
  status = 500,
  message,
  error,
}: sendErrorResType) => {
  return NextResponse.json(
    {
      success,
      message,
      ...(error && process.env.NODE_ENV === "development" && { error }),
    },
    { status },
  );
};

export const auth= async ()=>{
const session =await getServerSession(authOptions);
if(!session || !session.user){
  throw new Error("User is not authenticated");
}
return session.user
}