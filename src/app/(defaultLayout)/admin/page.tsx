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
  User,
  UsersRound,
} from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div>
      <Header title="Dashboard" subTitle="Welcome back, Sarah" />
      <div className="container space-y-4">
        <StatsCard
          title="Active Project"
          value={8}
          icon={<House />}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatsCard
          title="This Week"
          value={8}
          icon={<CalendarDays />}
          iconClassName="bg-green-50 text-green-500"
        />
        <StatsCard
          title="Hours Logged"
          value={8}
          icon={<Clock />}
          iconClassName="bg-yellow-100 text-yellow-500"
        />
        <StatsCard
          title="Pending Expenses"
          value={8}
          icon={<Receipt />}
          iconClassName="bg-purple-50 text-purple-500"
        />
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-base font-semibold text-neutral-700">
                  All Projects
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-primary hover:text-primary"
                  >
                    {" "}
                    View All <ChevronRight />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell>
                  <div>
                    <h6 className="font-semibold text-base text-neutral-600">
                      742 Evergreen Terrace
                    </h6>
                    <p className="text-neutral-500">Anderson Realty</p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 border border-primary text-primary py-1 px-2"
                  >
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-base font-semibold text-neutral-700">
                 Pending Approvals
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-primary hover:text-primary"
                  >
                    {" "}
                    View All <ChevronRight />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell>
                  <div>
                    <h6 className="font-semibold text-base text-neutral-600">
                      742 Evergreen Terrace
                    </h6>
                    <p className="text-neutral-500">Anderson Realty</p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 border border-primary text-primary py-1 px-2"
                  >
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-base font-semibold text-neutral-700 flex items-center gap-3">
                 <UsersRound className="size-4"/> Employee Activity
                </TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell>
                  <div>
                    <h6 className="font-semibold text-base text-neutral-600">
                      742 Evergreen Terrace
                    </h6>
                    <p className="text-neutral-500">Anderson Realty</p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 border border-primary text-primary py-1 px-2"
                  >
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
