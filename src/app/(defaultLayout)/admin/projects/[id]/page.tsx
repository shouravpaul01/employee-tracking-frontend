"use client";
import ProjectCard from "@/components/projects/ProjectCard";
import AccessInfoCard from "@/components/shared/InfoCard";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSingleProjectQuery } from "@/redux/api/projectApi";
import { Project, User } from "@/type";
import { ChevronRight, Lock, Plus, UserRound } from "lucide-react";
import React, { use, useState } from "react";
import InfoCard from "@/components/shared/InfoCard";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { AssignEmployeeFormDialog } from "@/components/admin/assignedEmployee/AssignEmpolyeeFormDialog";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [tab, setTab] = useState("Overview");
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading } = useGetSingleProjectQuery(id, { skip: !id });
  const project: Project = data?.data;
  const assignedEmployees: any = project?.assignedEmployees;
  if (isLoading) {
    return <Loading />;
  }
  return (
   <>
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

        {tab == "Overview" && (
          <>
            {project?.accessInfo && (
              <InfoCard
                title="Access Information"
                info={project?.accessInfo}
                icon={<Lock className="size-5" />}
              />
            )}
            <Card className="p-4! gap-2">
              <CardHeader className="flex items-center p-0">
                <CardTitle className="flex-1 text-neutral-600">
                  Assigned Employees
                </CardTitle>

                <CardAction>
                  <Button
                    variant={"ghost"}
                    size={"icon-sm"}
                    onClick={() => setTab("Team")}
                  >
                    <ChevronRight />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="p-0">
                <AvatarGroup className="grayscale">
                  {assignedEmployees?.map((employee:User) => (
                    <Avatar key={employee?.id} className="size-16">
                      <AvatarImage src={employee?.photo} alt={employee?.name} />
                      <AvatarFallback>
                        <UserRound />
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {assignedEmployees?.length > 3 && (
                    <AvatarGroupCount>+ {-3}</AvatarGroupCount>
                  )}
                </AvatarGroup>
              </CardContent>
            </Card>
          </>
        )}
        {tab == "Team" && (
          <>
            <Card className="p-4! gap-2">
              <CardHeader className="flex items-center p-0">
                <CardTitle className="flex-1 text-neutral-600">
                  Assigned Employees
                </CardTitle>

                <CardAction>
                  <Button
                    variant={"ghost"}
                    size={"icon-sm"}
                    onClick={() => setTab("Team")}
                  >
                    <ChevronRight />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="p-0">
                <AvatarGroup className="grayscale">
                  {assignedEmployees?.map((employee:User) => (
                    <Avatar key={employee?.id} className="size-16">
                      <AvatarImage src={employee?.photo} alt={employee?.name} />
                      <AvatarFallback>
                        <UserRound />
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {assignedEmployees?.length > 3 && (
                    <AvatarGroupCount>+ {-3}</AvatarGroupCount>
                  )}
                </AvatarGroup>
              </CardContent>
              <CardFooter className="p-0 mt-3">
                <Button variant={"outline"} className="w-full" onClick={()=>setOpenDialog(true)}><Plus/> Add Employee</Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
    <AssignEmployeeFormDialog projectId={project?.id} open={openDialog} onOpenChange={setOpenDialog} />
   </>
  );
}
