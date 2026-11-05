import { NextResponse } from "next/server";

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
  return NextResponse.json({
    success,
    message,
    ...(data && { data }),
    status,
  });
};

export const sendErrorRes = ({
  success = false,
  status = 500,
  message,
  error,
}: sendErrorResType) => {
  return NextResponse.json({
    success,
    message,
    ...(error && process.env.NODE_ENV === "development" && { error }),
    status,
  });
};
