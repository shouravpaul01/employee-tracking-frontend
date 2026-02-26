"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logoSrc from "../../../public/logo.png";

interface LoadingProps {
  message?: string;
  size?: number; // size of dashed circle
  className?: string;
}

export default function Loading({
  message = "Loading...",
  size = 80,
  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen w-full py-10",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* Dashed spinning border */}
        <div
          className="absolute border-2 border-dashed border-gray-400 rounded-full animate-spin"
          style={{ width: size, height: size }}
        />

        {/* Logo centered */}
        <div className="relative size-24 mt-8 animate-pulse" >
          <Image
            src={logoSrc}
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Optional loading text */}
      <p className="mt-2 text-gray-600 text-center">{message}</p>
    </div>
  );
}