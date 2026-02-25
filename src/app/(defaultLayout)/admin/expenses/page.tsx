"use client"

import ExpensesCard from "@/components/Admin/Expenses/ExpensesCard";
import Header from "@/components/shared/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { expensesStatus } from "@/constant";
import React, { useState } from "react";

export default function page() {
    
  const [tab, setTab] = useState("PENDING");
  return (
    <div>
      <Header title="Expenses" />
      <div className="container space-y-4">
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList className="grid w-full grid-cols-3">
            {expensesStatus?.map((status) => (
              <TabsTrigger key={status} value={status.toUpperCase()}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ExpensesCard />
      </div>
    </div>
  );
}
