"use client";

import React, { useState } from "react";
import Header from "@/components/shared/Header";
import { ExpenseCard } from "@/components/employee/expenses/ExpensesCard";
import { CreateExpenseFormDialog } from "@/components/employee/expenses/CreateExpensesFormDialog";
import { useGetMyExpensesInfiniteInfiniteQuery } from "@/redux/api/expensesApi";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX, Clock, Plus } from "lucide-react";
import StateCount from "@/components/shared/StateCount";

export default function EmployeeExpensesPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Infinite query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    isLoading,
  } = useGetMyExpensesInfiniteInfiniteQuery(
    { limit: 10 }, // optional query args
    { refetchOnMountOrArgChange: true },
  );

  // Flatten paginated data
  const expenses = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];
  const summery = data?.pages[0]?.meta?.summery;

  return (
    <>
      <Header
        title="Expenses"
        rightContent={
          <Button
            variant="ghost"
            size={"icon-sm"}
            className="rounded-full text-primary"
            onClick={() => setCreateDialogOpen(true)}
          >
            <Plus className="size-6" />
          </Button>
        }
      />

      <div className="container space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {" "}
          <StateCount
            title="Pending"
            count={`$${summery?.PENDING || 0}`}
            icon={<Clock />}
            iconClassName="bg-amber-100! text-amber-600"
          />{" "}
          <StateCount
            title="Approved"
            count={`$${summery?.APPROVED || 0}`}
            icon={<CircleCheckBig />}
            iconClassName="bg-green-100! text-green-600"
          />{" "}
          <StateCount
            title="Rejected"
            count={`$${summery?.REJECTED || 0}`}
            icon={<CircleX />}
            iconClassName="bg-red-100! text-red-600"
          />{" "}
        </div>
        <h5 className="font-semibold text-lg">Recent Entries</h5>

        {isLoading ? (
          <p className="text-center py-10 text-gray-500">Loading expenses...</p>
        ) : expenses.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No expenses found for you today.
          </p>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <ExpenseCard key={expense.id} data={expense} />
            ))}
            {hasNextPage && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <CreateExpenseFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}
