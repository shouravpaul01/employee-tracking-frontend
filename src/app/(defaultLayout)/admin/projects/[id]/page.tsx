"use client"
import ProjectCard from "@/components/Projects/ProjectCard";
import Header from "@/components/shared/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

export default function page() {
  const [tab, setTab] = useState("Overview");
  return (
    <div>
      <Header title="Project Details" backHref="/admin/projects" />
      <div className="container space-y-4">
        <ProjectCard i={3} />
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Overview">Overview</TabsTrigger>
            <TabsTrigger value="Media">Media</TabsTrigger>
            <TabsTrigger value="Team">Team</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
