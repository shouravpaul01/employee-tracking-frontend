"use client";

import React, { useState, useMemo, useCallback } from "react";
import ExpensesCard from "@/components/admin/expenses/ExpensesCard";
import Header from "@/components/shared/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { expensesStatus } from "@/constant";
import { Loader2 } from "lucide-react";
import { useGetAllExpensesInfiniteInfiniteQuery } from "@/redux/api/expensesApi";
import ExpensesCardSkeleton from "@/components/shared/ExpensesCardSkeleton";

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("PENDING");

  const queryArg = useMemo(() => ({
    status: selectedTab,
    limit: 10,
  }), [selectedTab]);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllExpensesInfiniteInfiniteQuery(queryArg);
 
  const allExpenses = useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data]
  );

  // Infinite scroll handler
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight * 1.2) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="h-screen flex flex-col">
      <Header title="Expenses" />

      <div className="container flex-1 overflow-hidden flex flex-col space-y-4 py-4">
        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            {expensesStatus.map((status) => (
              <TabsTrigger key={status} value={status.toUpperCase()}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Expenses List */}
        <div 
          className="flex-1 space-y-4 "
          onScroll={handleScroll}
        >
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <ExpensesCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {allExpenses.map((expense) => (
                <ExpensesCard key={expense.id} data={expense} />
              ))}

              {allExpenses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No expenses found</p>
                </div>
              )}

              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-gray-500">
                    Loading more...
                  </span>
                </div>
              )}

              {!hasNextPage && allExpenses.length > 0 && (
                <div className="text-center py-4 text-sm text-gray-500">
                  ✨ You've seen all expenses
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}