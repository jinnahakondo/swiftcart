import React from "react";
import { Button } from "../ui/button";
import { Handbag } from "lucide-react";

export default function AddtoCartButton() {
  return (
    <Button className="w-full">
      <Handbag /> Add to Cart
    </Button>
  );
}
