"use client";
import ProjectCard from "@/components/projects/ProjectCard";
import Header from "@/components/shared/Header";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import React, { useState } from "react";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  return (
    <div>
      <Header title="Calendar" />

      <div className="container bg-gray-50 h-screen space-y-5">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
          className="rounded-lg border w-full"
        />
        <p className="text-base text-neutral-700 font-bold">
          {selectedDate ? format(selectedDate, "PPP") : "No date selected"}
        </p>
        <ProjectCard i={1} />
      </div>
    </div>
  );
}
