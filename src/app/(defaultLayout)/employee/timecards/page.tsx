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
import { Coffee, Play, Square } from "lucide-react";

export default function Page() {
  const [now, setNow] = useState(new Date());

  // ⏰ live clock
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

  return (
    <div>
      <Header title="Timecards" />
      <div className="container space-y-4">
        <Card>
          <CardContent className="px-5 space-y-4">
            {/* Time */}
            <div className="text-center ">
              <div className="text-3xl font-bold">{timeString}</div>
              <div className="text-sm text-muted-foreground">{dateString}</div>
            </div>

            {/* Select */}
            <Select>
              <SelectTrigger className=" w-full">
                <SelectValue placeholder="Select a Project" />
              </SelectTrigger>

              <SelectContent className="w-full">
                <SelectItem value="project1">Del Mar Coastal Villa</SelectItem>
                <SelectItem value="project2">Downtown Office</SelectItem>
              </SelectContent>
            </Select>

            {/* Button */}
            <Button className="w-full ">
              <Play /> Clock In
            </Button>
            {/* <div className="flex gap-3 w-full">
              <Button className="flex-1">
                <Coffee className="mr-2 size-4" /> Start Break
              </Button>
              <Button className="flex-1">
                <Coffee className="mr-2 size-4" /> End Break
              </Button>
              <Button className="flex-1">
                <Square className="mr-2 size-4" /> Clock Out
              </Button>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
