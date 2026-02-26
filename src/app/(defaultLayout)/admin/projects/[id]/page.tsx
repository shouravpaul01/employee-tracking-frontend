"use client"
import ProjectCard from "@/components/projects/ProjectCard";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSingleProjectQuery } from "@/redux/api/projectApi";
import React, { use, useState } from "react";

export default function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id}=use(params)
  console.log(id,"ami")
  const [tab, setTab] = useState("Overview");
  const {data,isLoading}=useGetSingleProjectQuery(id,{skip:!id})
  const project=data?.data

  if (isLoading) {
    return <Loading/>
  }
  return (
    <div>
      <Header title="Project Details" backHref="/admin/projects" />
      <div className="container space-y-4">
        <ProjectCard data={project} />
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
