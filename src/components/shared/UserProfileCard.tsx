"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUpdateMeMutation } from "@/redux/api/userApi";
import { ShieldCheck, User, Camera } from "lucide-react";
import React, { useRef } from "react";
import { toast } from "sonner";

export function UserProfileCard({
  wrapperClassName,
  isHideRoleBadge = false,
  isEditableAvatar = false, 
  data,
}: {
  wrapperClassName?: string;
  isHideRoleBadge?: boolean;
  isEditableAvatar?: boolean;
  data: any;
}) {
  const { name, email, role, photo } = data;

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleAvatarClick = () => {
    if (!isEditableAvatar) return;
    fileInputRef.current?.click();
  };


  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("photo", file);

      await updateMe(formData).unwrap();

     
      toast.success("Profile photo updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload");
    }
  };

  return (
    <div className={cn("bg-white border rounded-lg p-5", wrapperClassName)}>
      <div className="flex items-center gap-4">
        

        <div className="relative">
          <Avatar
            className={cn(
              "h-16 w-16 border",
              isEditableAvatar && "cursor-pointer"
            )}
            onClick={handleAvatarClick}
          >
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="bg-primary/20 text-primary text-lg">
              <User />
            </AvatarFallback>
          </Avatar>

          {/* 🔥 camera icon overlay */}
          {isEditableAvatar && (
            <div className="absolute bottom-0 right-0 bg-black/60 p-1 rounded-full">
              <Camera className="size-3 text-white" />
            </div>
          )}

          {/* 🔥 hidden input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* 🔥 Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-0">
            {name || "N/A"}
          </h3>

          <p className="text-neutral-600 py-1 flex items-center gap-2">
            {email}
          </p>

          {!isHideRoleBadge && (
            <div className="text-primary font-semibold flex items-center gap-2">
              <ShieldCheck className="size-5" />
              {role}
            </div>
          )}
        </div>
      </div>

      {/* 🔥 loading overlay (optional) */}
      {isLoading && (
        <div className="text-xs text-gray-500 mt-2">
          Uploading...
        </div>
      )}
    </div>
  );
}