"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoGalleryProps {
  photos: string[];
  className?: string;
}

export default function PhotoGallery({
  photos,
  className,
}: PhotoGalleryProps) {
  if (!photos || photos.length === 0) return null;

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "photo.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`space-y-3 ${
        className || ""
      }`}
    >
      {photos.map((photo, index) => (
        <div
          key={index}
          className="group relative w-full aspect-video bg-muted rounded-xl overflow-hidden border"
        >
          {/* Image */}
          <Image
            src={photo}
            alt={`Photo ${index + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDownload(photo)}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}