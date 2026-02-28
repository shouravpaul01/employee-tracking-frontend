"use client";

import Header from "@/components/shared/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Clock, Coffee, Play, Scan, Square } from "lucide-react";
import {
  useGetAssignedProjectsQuery,
  useGetRecentEntriesQuery,
  useGetSingleAssignedProjectQuery,
  useUpdateAttendanceTimeMutation,
} from "@/redux/api/assingedEmployeeApi";
import { AssignedEmployeeRole, AttendanceStatus, Project } from "@/type";
import { format } from "date-fns";
import RecentTimeCard from "@/components/employee/timecard/RecentTimeCard";
import { toast } from "sonner";
import { useGetSingleProjectQuery } from "@/redux/api/projectApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getClockActionControls } from "@/utils/getClockActionControl";

export default function Page() {
  const [now, setNow] = useState(new Date());
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading: isAssignedLoading } = useGetAssignedProjectsQuery({
    date: format(new Date(), "yyyy-MM-dd"),
    limit: 50,
  });

  const projects = data?.data;

  const filterProject = projects?.find(
    (project: any) => project.id === selectedProjectId,
  );
  const filterAssignedProject = filterProject?.assignedEmployees?.find(
    (employee: any) => employee.employeeId === user?.id,
  );

  const { data: recentEntriesRes, isLoading: isRecentEntriesLoading } =
    useGetRecentEntriesQuery({});

  const [updateAttendanceTime, { isLoading }] =
    useUpdateAttendanceTimeMutation();

  const recentEntries = recentEntriesRes?.data;
  const summary = recentEntriesRes?.meta?.weeklySummary;
  const controls = getClockActionControls(filterAssignedProject?.status);
  //  live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const dateString = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  //  attendance handler
  const handleAttendance = async (status: AttendanceStatus) => {
    if (!selectedProjectId) {
      toast.error("Please select a project first");
      return;
    }

    try {
      const res = await updateAttendanceTime({
        id: filterAssignedProject?.id,
        status,
      }).unwrap();
      console.log(res);
      toast.success(res?.message || "Successful");
    } catch (error: any) {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div>
      <Header title="Timecards" />

      <div className="container space-y-4">
        {/* Clock Card */}
        <Card>
          <CardContent className="px-5 space-y-4">
            {/* Time */}
            <div className="text-center">
              <div className="text-3xl font-bold">{timeString}</div>
              <div className="text-sm text-muted-foreground">{dateString}</div>
            </div>

            {/* Select Project */}
            <Select onValueChange={(value) => setSelectedProjectId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    projects?.length > 0
                      ? "Select a Project"
                      : "No assigned projects."
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {projects?.map((project: Project) => (
                  <SelectItem key={project?.id} value={project?.id}>
                    {project?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Break + Clock Out */}
            {filterAssignedProject?.status === "CHECKED_OUT" && (
              <div className="w-full p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                <p className="text-green-600 font-semibold">
                  You have successfully checked out for today
                </p>
                <p className="text-sm text-green-500">
                  Great job! Your work session is completed.
                </p>
              </div>
            )}
            <div className="flex gap-2">
              {/* Check In */}
              {controls.canCheckIn && (
                <Button
                  onClick={() => handleAttendance("CHECKED_IN")}
                  className="w-full"
                >
                  Check In
                </Button>
              )}

              {/* Start Break */}
              {controls.canStartBreak && (
                <Button
                  variant="secondary"
                  onClick={() => handleAttendance("ON_BREAK")}
                  className="flex-1"
                >
                  <Coffee /> Start Break
                </Button>
              )}

              {/* End Break */}
              {controls.canEndBreak && (
                <Button
                  variant="secondary"
                  onClick={() => handleAttendance("BREAK_ENDED")}
                  className="flex-1"
                >
                  <Coffee /> End Break
                </Button>
              )}

              {/* Check Out */}
              {controls.canCheckOut && (
                <Button
                  variant="destructive"
                  onClick={() => handleAttendance("CHECKED_OUT")}
                  className="flex-1"
                >
                  <Scan /> Check Out
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <div className="border rounded-lg p-5 bg-white space-y-4 shadow">
          <div className="flex items-center gap-2.5 text-neutral-700 font-semibold">
            <Clock />
            Weekly Summary
          </div>

          <div className="flex justify-around gap-4">
            <div className="flex flex-col items-center">
              <h4 className="font-semibold text-xl text-neutral-700">
                {summary?.regularHours || 0} h
              </h4>
              <p className="text-sm text-neutral-700">Regular</p>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="font-semibold text-xl text-green-700">
                {summary?.overtimeHours || 0} h
              </h4>
              <p className="text-sm text-neutral-700">Overtime</p>
            </div>

            <div className="flex flex-col items-center">
              <h4 className="font-semibold text-xl text-yellow-500">
                {summary?.doubleOvertimeHours || 0} h
              </h4>
              <p className="text-sm text-neutral-700">Double Overtime</p>
            </div>
          </div>
        </div>

        {/* Recent Entries */}
        <p className="mt-2 text-base text-neutral-700 font-bold">
          Recent Entries
        </p>

        {recentEntries?.length > 0 ? (
          recentEntries.map((item: any) => (
            <RecentTimeCard key={item?.id} data={item} />
          ))
        ) : (
          <p className="text-sm text-neutral-500 text-center py-4">
            No recent activity found today.
          </p>
        )}
      </div>
    </div>
  );
}
