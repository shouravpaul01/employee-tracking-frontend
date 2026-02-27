"use client";
import React, { useState, useMemo, useCallback } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectCardSkeleton from "@/components/shared/ProjectCardSkeleton";
import Header from "@/components/shared/Header";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useGetAssignedProjectsInfiniteInfiniteQuery } from "@/redux/api/assingedEmployeeApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const { user } = useAppSelector((state: RootState) => state.auth);
  const role = user?.role;
  // Format selected date for query
  const queryArg = useMemo(
    () => ({
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
      limit: 10,
    }),
    [selectedDate],
  );

  // Infinite query hook for assigned projects
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAssignedProjectsInfiniteInfiniteQuery(queryArg);

  const allProjects = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  // Infinite scroll handler
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

      if (scrollHeight - scrollTop <= clientHeight * 1.2) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  return (
    <div className="h-screen flex flex-col">
      <Header title="Calendar" />

      <div className="container flex-1 overflow-hidden flex flex-col space-y-4 py-4">
        {/* Calendar */}

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
          className="rounded-lg border w-full"
        />
        <p className="mt-2 text-base text-neutral-700 font-bold">
          {selectedDate ? format(selectedDate, "PPP") : "No date selected"}
        </p>

        {/* Projects List */}
        <div className="flex-1 space-y-4 " onScroll={handleScroll}>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {allProjects.map((project) => (
                <ProjectCard key={project.id} data={project} isClickable  isEditButtonHide={role=='ADMIN'}/>
              ))}

              {allProjects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    {role === "ADMIN"
                      ? "No projects found for this date"
                      : "No  projects assigned  for this date"}
                  </p>
                </div>
              )}

              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-gray-500">
                    Loading more...
                  </span>
                </div>
              )}

              {!hasNextPage && allProjects.length > 0 && (
                <div className="text-center py-4 text-sm text-gray-500">
                  ✨ You've seen all projects
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
