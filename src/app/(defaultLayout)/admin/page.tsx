"use client";

import StatsCard from "@/components/admin/overview/StatsCard";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  House,
  Receipt,
  UsersRound,
} from "lucide-react";
import { format } from "date-fns";
import { useGetAdminOverviewQuery } from "@/redux/api/analyticsApi";
import React from "react";
import Loading from "@/components/shared/Loading";
import { statusColors } from "@/constant";
import { formatStatus } from "@/utils/formatStatus";
import { ProjectStatus } from "@/type";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router=useRouter()
  const { data, isLoading, isError } = useGetAdminOverviewQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) return <div className="p-4">Failed to load dashboard.</div>;
  console.log(data);
  const { summary, recentProjects, recentPendingExpenses, teamActivity } =
    data?.data;

  return (
    <div>
      <Header title="Dashboard" subTitle="Welcome back, Sarah" />

      <div className="container mx-auto space-y-4 py-4">
        {
          <>
            <StatsCard
              title="Active Projects"
              value={summary?.totalProjects}
              icon={<House />}
              iconClassName="bg-primary/10 text-primary"
            />

            {/* <StatsCard
          title="Hours Logged"
          value={8} // Replace with actual calculation if available
          icon={<Clock />}
          iconClassName="bg-yellow-100 text-yellow-500"
        /> */}
            <StatsCard
              title="Pending Expenses"
              value={summary?.pendingExpenses}
              icon={<Receipt />}
              iconClassName="bg-purple-50 text-purple-500"
            />
            <StatsCard
              title="Approved Expenses"
              value={summary?.approvedExpenses}
              icon={<CalendarDays />}
              iconClassName="bg-green-50 text-green-500"
            />
            {/* Recent Projects Table */}
            <div className="border rounded-lg ">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base font-semibold text-neutral-700">
                      Recent Projects
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary"
                        onClick={()=>router.push("/admin/projects")}
                      >
                        View All <ChevronRight />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProjects.map((project: any) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <h6 className="font-semibold text-base text-neutral-600">
                            {project.name}
                          </h6>
                          <p className="text-neutral-500">
                            {project.clientName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={`py-1 px-2 ${statusColors[project?.status as ProjectStatus]}`}
                        >
                          {formatStatus(project?.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pending Expenses Table */}
            <div className="border rounded-lg ">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base font-semibold text-neutral-700">
                      Pending Expenses
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary"
                         onClick={()=>router.push("/admin/expenses")}
                      >
                        View All <ChevronRight />
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPendingExpenses.map((expense: any) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div>
                          <h6 className="font-semibold text-base text-neutral-600">
                            {expense.project.name}
                          </h6>
                          <p className="text-neutral-500">
                            {expense.employee.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 border border-primary text-primary py-1 px-2"
                        >
                          {expense.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Team Activity Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                      <UsersRound className="size-4" /> Employee Activity
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamActivity.map((activity: any) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div>
                          <h6 className="font-semibold text-base text-neutral-600">
                            {activity.employee.name}
                          </h6>
                          <p className="text-neutral-500">{activity.role}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={`py-1 px-2 ${
                            activity.status === "CHECKED_IN"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        }
      </div>
    </div>
  );
}
