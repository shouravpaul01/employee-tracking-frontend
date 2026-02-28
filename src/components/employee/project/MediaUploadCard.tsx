"use client";

import { useState } from "react";
import { useUpdateProjectMediaMutation } from "@/redux/api/projectApi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  CheckCircle2,
  FileVideo,
  Image as ImageIcon,
} from "lucide-react";

interface VideoType {
  id: string;
  name: string;
  files: File[];
  uploaded: boolean;
  status: string; // Status to send in API
}

export default function MediaUploadCard({ projectId }: { projectId: string }) {
  const [videoTypes, setVideoTypes] = useState<VideoType[]>([
    {
      id: "walkthrough",
      name: "Walkthrough",
      files: [],
      uploaded: false,
      status: "WALKTHROUGH",
    },
    {
      id: "staged",
      name: "Staged",
      files: [],
      uploaded: false,
      status: "STAGED",
    },
    {
      id: "before-destage",
      name: "Before Destage",
      files: [],
      uploaded: false,
      status: "COMPLETED",
    },
    {
      id: "destaged",
      name: "Destaged",
      files: [],
      uploaded: false,
      status: "DESTAGING",
    },
  ]);

  const [photos, setPhotos] = useState<File[]>([]);
  const [updateProjectMedia, { isLoading }] = useUpdateProjectMediaMutation();

  const handleVideoUpload = (
    typeId: string,
    selectedFiles: FileList | null,
  ) => {
    if (!selectedFiles) return;

    setVideoTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.id === typeId
          ? { ...type, files: Array.from(selectedFiles), uploaded: true }
          : type,
      ),
    );
  };

  const handlePhotoUpload = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setPhotos(Array.from(selectedFiles));
  };

  const uploadVideo = async (type: VideoType) => {
    if (!type.files || type.files.length === 0) return;

    const formData = new FormData();
    formData.append("file", type.files[0]); // single video
    formData.append("status", type.status);

    try {
      await updateProjectMedia({ id: projectId, data: formData }).unwrap();
      alert(`${type.name} uploaded successfully`);
    } catch (err) {
      alert(`Failed to upload ${type.name}`);
    }
  };

  const uploadPhotos = async () => {
    if (!photos || photos.length === 0) return;

    const formData = new FormData();
    photos.forEach((file) => formData.append("files", file));
    formData.append("status", "PHOTOS");

    try {
      await updateProjectMedia({ id: projectId, data: formData }).unwrap();
      alert("Photos uploaded successfully");
    } catch (err) {
      alert("Failed to upload photos");
    }
  };

  return (
    <>
      {/* Videos Card */}
      <Card className="border border-border mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileVideo className="w-5 h-5 text-primary" />
            <CardTitle>Videos</CardTitle>
          </div>
          <CardDescription>Upload videos by type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {videoTypes.map((videoType) => (
            <div key={videoType.id} className="relative">
              <label
                htmlFor={`video-${videoType.id}`}
                className={`flex items-center justify-between p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  videoType.uploaded
                    ? "border-green-200 bg-green-50"
                    : "border-border hover:border-primary hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileVideo className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{videoType.name}</p>
                    {videoType.files.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {videoType.files[0].name}
                      </p>
                    )}
                  </div>
                </div>
                {videoType.uploaded ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Upload className="w-5 h-5 text-muted-foreground" />
                )}
              </label>
              <input
                id={`video-${videoType.id}`}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) =>
                  handleVideoUpload(videoType.id, e.target.files)
                }
              />
              {videoType.uploaded && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => uploadVideo(videoType)}
                  className="absolute top-2 right-2 h-8 px-2 text-xs"
                  disabled={isLoading}
                >
                  Upload
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Photos Card */}
      <Card className="border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <CardTitle>Photos</CardTitle>
          </div>
          <CardDescription>Upload your photos</CardDescription>
        </CardHeader>
        <CardContent>
          {photos.length === 0 ? (
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-muted transition-colors"
            >
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Tap to upload Photos
              </p>
            </label>
          ) : (
            <div className="space-y-3">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{photo.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(photo.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={uploadPhotos}
                className="w-full"
                disabled={isLoading}
              >
                Upload All
              </Button>
            </div>
          )}
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handlePhotoUpload(e.target.files)}
          />
        </CardContent>
      </Card>
    </>
  );
}
