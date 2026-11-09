"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import Image from "next/image";
import { asset } from "@/app/asset/asset";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { signupSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialLogin from "../buttons/SocialLogin";

type FormData = z.infer<typeof signupSchema>;

export function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data);
      toast.success("Success! You can now start exploring Swiftcart");
      reset();
      router.push("/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
        <SocialLogin
          isGoogleLoading={isGoogleLoading}
          isLoading={isLoading}
          setIsGoogleLoading={setIsGoogleLoading}
        />

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-border" />
          <span className="absolute bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
            or
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <Field data-invalid={!!errors.name}>
            <FieldLabel>Full Name</FieldLabel>
            <Input
              {...register("name")}
              aria-invalid={!!errors.name}
              placeholder="John Doe"
              type="text"
              disabled={isLoading || isGoogleLoading}
              className="h-10"
            />
            <FieldError errors={errors.name ? [errors.name] : []} />
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel>Email address</FieldLabel>
            <Input
              {...register("email")}
              aria-invalid={!!errors.email}
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              disabled={isLoading || isGoogleLoading}
              className="h-10"
            />
            <FieldError errors={errors.email ? [errors.email] : []} />
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel>Password</FieldLabel>
            <div className="relative">
              <Input
                {...register("password")}
                aria-invalid={!!errors.password}
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                disabled={isLoading || isGoogleLoading}
                className="h-10 pr-10"
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
            <FieldError errors={errors.password ? [errors.password] : []} />
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
          className="font-semibold text-primary hover:underline ml-1 "
        >
          Sign in
        </Link>
      </div>
    </Card>
  );
}
