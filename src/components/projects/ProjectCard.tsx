"use client";
import { Button } from "../ui/button";
import { CalendarDays, Eye, MapPin, SquarePen, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Project } from "@/type";
import { format } from "date-fns";
import { statusColors } from "@/constant";
import { formatStatus } from "@/utils/formatStatus";
import { useState } from "react";
import { CreateProjectFormDialog } from "./CreateProjectFormDialog";

export default function ProjectCard({
  data,
  isClickable,
  isEditButtonHide = true,
  isViewButtonHide = true,
}: {
  data: Project;
  isClickable?: boolean;
  isEditButtonHide?: boolean;
  isViewButtonHide?: boolean;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const {
    id,
    name,
    clientName,
    status,
    createdAt,
    propertyAddress,
    todayAssignedEmployees,
  } = data;

  console.log(id, "dkkjd");
  return (
    <>
      <div className="bg-white p-4 border rounded-lg space-y-2 ">
        <div className="flex">
          <div className="flex-1">
            <h3 className="font-bold text-neutral-700">{name}</h3>
            <p className="text-neutral-600">{clientName}</p>
          </div>
          <div className="flex gap-1 items-center">
            <Badge
              variant="outline"
              className={`py-1 px-2 border ${statusColors[status]}`}
            >
              {formatStatus(status)}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-neutral-600">
            <CalendarDays className="size-4" />
            <p>{format(new Date(createdAt), "dd MMM yyyy")}</p>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-600">
            <Users className="size-4" />
            <p>{todayAssignedEmployees || 0}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-neutral-600">
          <MapPin className="size-4" />
          <p>{propertyAddress}</p>
        </div>
        <div className="flex gap-5">
          {isEditButtonHide && (
            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => setDialogOpen(true)}
            >
              <SquarePen /> Edit
            </Button>
          )}
          {isViewButtonHide && (
            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => router.push(`/admin/projects/${data?.id}`)}
            >
              <Eye /> View
            </Button>
          )}
        </div>
      </div>
      <CreateProjectFormDialog
        project={data}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
