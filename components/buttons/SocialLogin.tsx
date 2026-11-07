"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

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
  const handleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const res = await signIn("google", { redirect: false, callbackUrl: "/" });

      if (!res?.url) {
        toast.error("Something went wrong");
        setIsGoogleLoading(false);
        return;
      }

      window.location.href = res.url;
    } catch {
      toast.error("Something went wrong");
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
