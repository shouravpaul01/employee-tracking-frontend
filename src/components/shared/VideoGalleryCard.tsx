"use client";

import { useState } from "react";
import { Play, Download, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectStatus } from "@/type";

interface VideoItem {
  url: string;
  type: ProjectStatus;
}

interface VideoGalleryProps {
  videos: VideoItem[];
  className?: string;
}

const videoLabelMap:any = {
  WALKTHROUGH: "Walkthrough",
  STAGING: "Staged",
  BEFOREDESTAGE: "Before Destage",
  DESTAGING: "Destaged",
  COMPLETED: "Completed",
};

export default function VideoGalleryCard({
  videos,
  className,
}: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop() || "video.mp4";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <>
      {/* Card */}
      <Card className="border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <VideoIcon className="w-5 h-5 text-primary" />
            <CardTitle>Videos</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {videos.length > 0 ? (
            <div className={`space-y-3 ${className || ""}`}>
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="group relative w-full aspect-video bg-black rounded-xl overflow-hidden border cursor-pointer"
                  onClick={() => setSelectedVideo(video.url)}
                >
                  {/* Video preview */}
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    muted
                  />

                  {/* Label */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur">
                      {videoLabelMap[video.type]}
                    </span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Download */}
                  <div
                    className="absolute bottom-2 right-2 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => handleDownload(video.url)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Placeholder if no videos
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-xl text-muted-foreground">
              <VideoIcon className="w-12 h-12 mb-4" />
              <p className="text-sm font-medium">
                No videos available for this project
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="max-w-4xl p-0 bg-black">
          {selectedVideo && (
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}