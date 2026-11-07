export { auth as proxy } from "./app/auth";

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|svg|webp)$).*)",
  ],
};
