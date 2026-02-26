"use client";
import { CreateExpenseFormDialog } from "@/components/employee/expenses/CreateExpensesFormDialog";
import { ExpenseCard } from "@/components/employee/expenses/ExpensesCard";
import Header from "@/components/shared/Header";
import StateCount from "@/components/shared/StateCount";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX, Clock, Plus, User } from "lucide-react";
import React, { useState } from "react";

export default function page() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  return (
    <>
      <div>
        <Header
          title="Expenses"
          rightContent={
            <Button
              variant={"ghost"}
              size={"icon-sm"}
              className="rounded-full text-primary hover:text-primary cursor-pointer "
              onClick={() => setCreateDialogOpen(true)}
            >
              <Plus className="size-6" />
            </Button>
          }
        />
        <div className="container space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <StateCount
              title="Pending"
              count={"$45.50"}
              icon={<Clock />}
              iconClassName="bg-amber-100! text-amber-600"
            />
            <StateCount
              title="Approved"
              count={"$45.50"}
              icon={<CircleCheckBig />}
              iconClassName="bg-green-100! text-green-600"
            />
            <StateCount
              title="Rejected"
              count={"$45.50"}
              icon={<CircleX />}
              iconClassName="bg-red-100! text-red-600"
            />
          </div>
          <h5 className="font-semibold text-lg">Recent Entries</h5>

          <ExpenseCard
            icon={<User />}
            title="Supplies"
            address="742 Evergreen Terrace"
            description="Staging supplies from House Depot"
            amount={45}
            status="Approved"
            note="Please provide itemized receipt"
          />
        </div>
      </div>
      <CreateExpenseFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}
