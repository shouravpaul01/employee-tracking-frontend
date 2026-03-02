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
  AlertCircle,
  Download,
} from "lucide-react";
import { Project, ProjectStatus } from "@/type";
import PhotoGallery from "@/components/shared/PhotoGallery";

interface VideoType {
  id: string;
  name: string;
  requiredStatus: ProjectStatus;
  propertyName: keyof Project;
  apiStatus: string;
  files: File[];
}

interface UploadState {
  [key: string]: {
    isUploading: boolean;
    error: string | null;
    success: boolean;
  };
}

/**
 * Video configurations mapped to project status
 * Only the video matching the current status can be uploaded
 */
const VIDEO_CONFIGS: VideoType[] = [
  {
    id: "walkthrough",
    name: "Walkthrough Video",
    requiredStatus: "WALKTHROUGH",
    propertyName: "walkthroughVideo",
    apiStatus: "WALKTHROUGH",
    files: [],
  },
  {
    id: "staged",
    name: "Staged Video",
    requiredStatus: "STAGING",
    propertyName: "stagedVideo",
    apiStatus: "STAGED",
    files: [],
  },
  {
    id: "beforeDestage",
    name: "Before Destage Video",
    requiredStatus: "BEFOREDESTAGE",
    propertyName: "beforeDestageVideo",
    apiStatus: "BEFOREDESTAGE",
    files: [],
  },
  {
    id: "destaged",
    name: "Destaged Video",
    requiredStatus: "DESTAGING",
    propertyName: "destagedVideo",
    apiStatus: "DESTAGING",
    files: [],
  },
];

export default function MediaUploadCard({ project }: { project: Project }) {
  const [uploadStates, setUploadStates] = useState<UploadState>(
    VIDEO_CONFIGS.reduce((acc, video) => {
      acc[video.id] = { isUploading: false, error: null, success: false };
      return acc;
    }, {} as UploadState),
  );

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoUploadState, setPhotoUploadState] = useState({
    isUploading: false,
    error: null as string | null,
    success: false,
  });

  const [updateProjectMedia, { isLoading }] = useUpdateProjectMediaMutation();

  /**
   * Check if a video type is allowed for the current project status
   */
  const isVideoAvailable = (videoConfig: VideoType): boolean => {
    return project?.status === videoConfig.requiredStatus;
  };

  const hasVideoUploaded = (videoConfig: VideoType): boolean => {
    return !!(project?.[videoConfig.propertyName] as any);
  };

  const getStatusMessage = (videoConfig: VideoType): string => {
    if (hasVideoUploaded(videoConfig)) {
      return "Video uploaded ✓";
    }
    if (isVideoAvailable(videoConfig)) {
      return "Ready to upload";
    }
    return `Available when status is ${videoConfig.requiredStatus}`;
  };

  const handleVideoUpload = async (
    videoConfig: VideoType,
    selectedFiles: FileList | null,
  ) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Validate that current status matches required status
    if (!isVideoAvailable(videoConfig)) {
      setUploadStates((prev) => ({
        ...prev,
        [videoConfig.id]: {
          isUploading: false,
          error: `Cannot upload this video. Project must be in ${videoConfig.requiredStatus} status. Current status: ${project?.status}`,
          success: false,
        },
      }));
      return;
    }

    // Start upload
    setUploadStates((prev) => ({
      ...prev,
      [videoConfig.id]: {
        isUploading: true,
        error: null,
        success: false,
      },
    }));

    try {
      const file = selectedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      formData.append(
        "bodyData",
        JSON.stringify({ status: videoConfig.apiStatus }),
      );
      console.log(`Uploading ${videoConfig.name}:`, file.name);

      const response = await updateProjectMedia({
        id: project?.id,
        data: formData,
      }).unwrap();

      console.log(`${videoConfig.name} uploaded successfully:`, response);

      setUploadStates((prev) => ({
        ...prev,
        [videoConfig.id]: {
          isUploading: false,
          error: null,
          success: true,
        },
      }));
    } catch (error) {
      console.error(`Failed to upload ${videoConfig.name}:`, error);

      setUploadStates((prev) => ({
        ...prev,
        [videoConfig.id]: {
          isUploading: false,
          error: `Failed to upload ${videoConfig.name}. Please try again.`,
          success: false,
        },
      }));
    }
  };

  /**
   * Handle photo file selection
   */
  const handlePhotoUpload = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setPhotos(Array.from(selectedFiles));
  };

  /**
   * Upload all selected photos
   */
  const uploadPhotos = async () => {
    if (!photos || photos.length === 0) return;

    setPhotoUploadState({
      isUploading: true,
      error: null,
      success: false,
    });

    try {
      const formData = new FormData();
      photos.forEach((file) => formData.append("files", file));
      formData.append("bodyData", JSON.stringify({ status: "PHOTOS" }));

      console.log(
        "Uploading photos:",
        photos.map((p) => p.name),
      );

      const response = await updateProjectMedia({
        id: project?.id,
        data: formData,
      }).unwrap();

      console.log("Photos uploaded successfully:", response);

      setPhotoUploadState({
        isUploading: false,
        error: null,
        success: true,
      });

      setPhotos([]);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setPhotoUploadState({
          isUploading: false,
          error: null,
          success: false,
        });
      }, 3000);
    } catch (error) {
      console.error("Failed to upload photos:", error);

      setPhotoUploadState({
        isUploading: false,
        error: "Failed to upload photos. Please try again.",
        success: false,
      });
    }
  };

  return (
    <>
      {/* Videos Card */}
      <Card className="border border-border mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileVideo className="w-5 h-5 text-primary" />
            <CardTitle>Project Videos</CardTitle>
          </div>
          <CardDescription>
            Current Status:{" "}
            <span className="font-semibold">{project?.status}</span>
            <br />
            Upload videos matching the project status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {VIDEO_CONFIGS.map((videoConfig) => {
            const isAvailable = isVideoAvailable(videoConfig);
            const isUploaded = hasVideoUploaded(videoConfig);
            const uploadState = uploadStates[videoConfig.id];
            const isProcessing = uploadState.isUploading;

            return (
              <div key={videoConfig.id} className="space-y-2">
                {/* Video Upload Area */}
                <label
                  htmlFor={`video-${videoConfig.id}`}
                  className={`flex items-center justify-between p-4 border-2 border-dashed rounded-lg transition-all duration-200 ${
                    !isAvailable && !isUploaded
                      ? "border-gray-200 bg-gray-50/50 cursor-not-allowed opacity-60"
                      : isUploaded
                        ? "border-green-300 bg-green-50 cursor-pointer hover:border-green-400"
                        : "border-blue-200 bg-blue-50/50 cursor-pointer hover:border-blue-400 hover:bg-blue-100"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileVideo
                      className={`w-5 h-5 flex-shrink-0 ${
                        isUploaded
                          ? "text-green-600"
                          : isAvailable
                            ? "text-blue-600"
                            : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-semibold ${
                          isUploaded
                            ? "text-green-700"
                            : isAvailable
                              ? "text-blue-700"
                              : "text-gray-600"
                        }`}
                      >
                        {videoConfig.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Required Status:{" "}
                        <span className="font-medium">
                          {videoConfig.requiredStatus}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className="flex-shrink-0 ml-3">
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin" />
                    ) : isUploaded ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Upload
                        className={`w-5 h-5 ${
                          isAvailable ? "text-blue-600" : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                </label>

                {/* Hidden File Input */}
                <input
                  id={`video-${videoConfig.id}`}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  disabled={!isAvailable || isProcessing || isUploaded}
                  onChange={(e) =>
                    handleVideoUpload(videoConfig, e.target.files)
                  }
                />

                {/* Status Message */}
                <div className="flex items-start gap-2 px-4">
                  <div className="flex-1">
                    <p
                      className={`text-xs font-medium ${
                        uploadState.error
                          ? "text-red-600"
                          : uploadState.success
                            ? "text-green-600"
                            : isAvailable
                              ? "text-blue-600"
                              : "text-gray-500"
                      }`}
                    >
                      {uploadState.error ||
                        (uploadState.success
                          ? "✓ Upload successful"
                          : getStatusMessage(videoConfig))}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Photos Card */}
      <Card className="border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <CardTitle>Project Photos</CardTitle>
          </div>
          <CardDescription>
            Upload photos for any project status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {project?.photos!.length > 0 && (
            <PhotoGallery photos={project?.photos as string[]} />
          )}
          {photos.length === 0 ? (
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-muted transition-colors"
            >
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-gray-700">Upload Photos</p>
              <p className="text-xs text-muted-foreground">
                Click to select multiple photos
              </p>
            </label>
          ) : (
            <div className="space-y-3">
              {photoUploadState.error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">
                    {photoUploadState.error}
                  </p>
                </div>
              )}

              {photoUploadState.success && (
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-700">
                    Photos uploaded successfully!
                  </p>
                </div>
              )}

              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <ImageIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-700 truncate">
                        {photo.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(photo.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 ml-2" />
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPhotos([])}
                  className="flex-1"
                  disabled={photoUploadState.isUploading}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={uploadPhotos}
                  className="flex-1"
                  disabled={photoUploadState.isUploading}
                >
                  {photoUploadState.isUploading ? "Uploading..." : "Upload All"}
                </Button>
              </div>
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
