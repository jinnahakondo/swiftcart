"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "../ui/field";
import Image from "next/image";
import { asset } from "@/app/asset/asset";
import Link from "next/link";
import { signIn } from "next-auth/react";

export function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup submitted");
  };

  return (
    <Card className="w-full max-w-sm p-6 ">
      {/* Header / Brand Badge */}
      <CardHeader className="flex flex-col items-center justify-center text-center space-y-2 pb-2 p-0">
        <Image src={asset.logo} width={40} height={40} alt="logo" />
        <CardTitle className="text-xl font-bold tracking-tight">
          Create an Account
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Enter your details below to create your account.
        </CardDescription>
      </CardHeader>

      {/* Main Content Body */}
      <CardContent className="space-y-4 py-4 p-0">
        {/* Social Signup Button */}
        <Button
          onClick={() => signIn("google")}
          type="button"
          variant="outline"
          className="w-full h-10 hover:bg-accent flex items-center justify-center gap-2"
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <FcGoogle className="h-4 w-4" />
          )}
          Sign up with Google
        </Button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-border" />
          <span className="absolute bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
            or
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Field>
            <FieldLabel>Full Name</FieldLabel>
            <Input
              placeholder="John Doe"
              type="text"
              autoComplete="name"
              disabled={isLoading || isGoogleLoading}
              className="h-10"
              required
            />
          </Field>

          <Field>
            <FieldLabel>Email address</FieldLabel>
            <Input
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              disabled={isLoading || isGoogleLoading}
              className="h-10"
              required
            />
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <div className="relative">
              <Input
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                disabled={isLoading || isGoogleLoading}
                className="h-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <div className="relative">
              <Input
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                disabled={isLoading || isGoogleLoading}
                className="h-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          <Button
            type="submit"
            variant="default"
            className="w-full h-10 font-medium"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Create Account
          </Button>
        </form>
      </CardContent>

      {/* Footer Link */}
      <div className="pt-4 text-center text-xs text-muted-foreground border-t border-border justify-center ">
        Already have an account?{" "}
        <Link
          href="/login"
          //   onClick={(e) => e.preventDefault()}
          className="font-semibold text-primary hover:underline ml-1 "
        >
          Sign in
        </Link>
      </div>
    </Card>
  );
}
