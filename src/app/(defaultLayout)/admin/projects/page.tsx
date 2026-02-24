"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BadgePlus,
  CalendarDays,
  MapPin,
  SearchIcon,
  SquarePen,
  Users,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import ProjectCard from "@/components/Projects/ProjectCard";
import { CreateProjectFormDialog } from "@/components/Projects/CreateProjectFormDialog";

export default function Page() {
  const [activeTab, setActiveTab] = useState("All");
   const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const projectStatus = [
    "Walkthrough",
    "Staging",
    "Destaging",
    "Completed",
    "Pending",
  ];

  return (
    <div>
      <div className="container flex border-b items-center py-2">
        <h1 className="flex-1 text-lg font-semibold">Projects</h1>
        <Button
          variant={"ghost"}
          size={"icon-sm"}
          className="rounded-full text-primary hover:text-primary cursor-pointer"
          onClick={()=>setCreateDialogOpen(true)}
        >
          <BadgePlus className="size-6" />
        </Button>
      </div>

      <div className="container py-3 space-y-5">
        <InputGroup className="h-12">
          <InputGroupInput placeholder="Search..." className="h-12" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Tabs
          defaultValue="All"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Horizontal ScrollArea */}
          <ScrollArea className="w-full whitespace-nowrap rounded-md pb-2">
            <div className="flex w-max space-x-2 p-1">
              <TabsList className="inline-flex h-auto p-0 bg-transparent gap-2 border-0">
                <TabsTrigger
                  value="All"
                  className="whitespace-nowrap px-4 py-1 text-sm font-medium rounded-full flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:bg-gray-800 dark:data-[state=inactive]:text-gray-300 transition-all duration-200"
                >
                  All
                </TabsTrigger>

                {projectStatus.map((status) => (
                  <TabsTrigger
                    key={status}
                    value={status}
                    className="whitespace-nowrap px-4 py-1 text-sm font-medium rounded-full flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 dark:data-[state=inactive]:bg-gray-800 dark:data-[state=inactive]:text-gray-300 transition-all duration-200"
                  >
                    {status}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </Tabs>
        <div className=" space-y-4 pb-10">
          {[...Array(10)].map((_, i) => (
            <ProjectCard key={i} i={i}/>
          ))}
        </div>
      </div>
      <CreateProjectFormDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
}
