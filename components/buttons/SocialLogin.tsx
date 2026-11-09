"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface IProps {
  isGoogleLoading: boolean;
  setIsGoogleLoading: (p: boolean) => void;
  isLoading: boolean;
}

export default function SocialLogin({
  isGoogleLoading,
  isLoading,
  setIsGoogleLoading,
}: IProps) {
  const params = useSearchParams();
  const error = params.get("error");
  useEffect(() => {
    if (error === "CredentialsAccountExists") {
      toast.error(
        "This email is already registered. Please login with your email and password.",
        {
          duration: Infinity,
          closeButton: true,
          position: "bottom-center",
        },
      );
    }
  }, [error]);

  const handleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn("google");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      type="button"
      variant="outline"
      className="w-full h-10 hover:bg-accent"
      disabled={isGoogleLoading || isLoading}
    >
      {isGoogleLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2 text-muted-foreground" />
      ) : (
        <FcGoogle className="mr-2 h-4 w-4" />
      )}
      Continue with Google
    </Button>
  );
}
