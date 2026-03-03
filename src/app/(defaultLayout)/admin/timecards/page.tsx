"use client";

import EmployeeWeeklyHourCard from "@/components/admin/timecards/EmployeeWeeklyHourCard";
import EmployeeWeeklyHourCardSkeleton from "@/components/shared/EmployeeWeeklyHourCardSkeleton";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { useGetEmployeesWeeklySummeryQuery } from "@/redux/api/assingedEmployeeApi";
import { useState } from "react";

export default function Page() {
  const { data, isLoading } = useGetEmployeesWeeklySummeryQuery({
    limit: 300,
  });

  const [isExporting, setIsExporting] = useState(false);

  const weeklySummary = data?.data || [];

  //  ADP Payroll Compatible CSV Export
  const handleExportCSV = async () => {
    if (!weeklySummary.length) return;

    setIsExporting(true);

    try {
      // ADP Standard Format Headers
      const headers = [
        "Employee Name",
        "Employee ID",
        "Email",
        "Regular Hours",
        "Overtime (1.5x)",
        "Double Time (2x)",
        "Total Hours",
        "Pay Period",
      ];

      // Current pay period (Week)
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const payPeriod = `${weekStart.toLocaleDateString("en-US")} - ${weekEnd.toLocaleDateString("en-US")}`;

      // Employee rows
      const rows = weeklySummary.map((item:any) => [
        `"${item.employee.name}"`,
        item.employee.id,
        item.employee.email,
        Number(item.normalHours).toFixed(2),
        Number(item.overtimeHours).toFixed(2),
        Number(item.doubleOvertimeHours).toFixed(2),
        Number(item.totalHours).toFixed(2),
        payPeriod,
      ]);

      // Calculate totals
      const totalRegular = weeklySummary.reduce(
        (sum:number, item:any) => sum + Number(item.normalHours),
        0
      );
      const totalOvertime = weeklySummary.reduce(
        (sum:number, item:any) => sum + Number(item.overtimeHours),
        0
      );
      const totalDoubleOT = weeklySummary.reduce(
        (sum:number, item:any) => sum + Number(item.doubleOvertimeHours),
        0
      );
      const grandTotal = totalRegular + totalOvertime + totalDoubleOT;

      // Summary section
      const summaryRows = [
        [],
        ["PAYROLL SUMMARY"],
        ["Pay Period", payPeriod],
        ["Total Employees", weeklySummary.length],
        [],
        ["HOURS BREAKDOWN"],
        ["Total Regular Hours (1x)", totalRegular.toFixed(2)],
        ["Total Overtime Hours (1.5x)", totalOvertime.toFixed(2)],
        ["Total Double Time Hours (2x)", totalDoubleOT.toFixed(2)],
        ["Grand Total Hours", grandTotal.toFixed(2)],
        [],
        ["PAYROLL CALCULATIONS"],
        [
          "Regular Pay",
          `=SUM(D2:D${1 + weeklySummary.length})`,
          "(Multiply by hourly rate)",
        ],
        [
          "Overtime Pay",
          `=SUM(E2:E${1 + weeklySummary.length})*1.5`,
          "(1.5x hourly rate)",
        ],
        [
          "Double Time Pay",
          `=SUM(F2:F${1 + weeklySummary.length})*2`,
          "(2x hourly rate)",
        ],
        [],
        ["Generated on", new Date().toLocaleString("en-US")],
      ];

      // Combine all data
      const csvContent = [headers, ...rows, ...summaryRows]
        .map((row) => row.join(","))
        .join("\n");

      // Create and download file
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fileName = `ADP-Payroll-Export-${new Date().toISOString().split("T")[0]}.csv`;

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export CSV. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div>
      <Header title="Timecards" />

      <div className="container space-y-4">
        <div className="bg-white border rounded-lg p-3">
          <h1 className="font-semibold text-neutral-700 mb-2">
            Employee Weekly Hours
          </h1>

          <div className="space-y-3">
            {/* ✅ Skeleton */}
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <EmployeeWeeklyHourCardSkeleton key={i} />
              ))}

            {/* ✅ Empty State */}
            {!isLoading && weeklySummary.length === 0 && (
              <p className="text-sm text-gray-500">No data found</p>
            )}

            {/* ✅ Data */}
            {!isLoading &&
              weeklySummary.map((item:any) => (
                <EmployeeWeeklyHourCard
                  key={item.employee.id}
                  data={item}
                />
              ))}
          </div>
        </div>

        {/* ✅ Export Button - ADP Compatible */}
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={handleExportCSV}
          disabled={isExporting || weeklySummary.length === 0}
        >
          {isExporting ? "Exporting..." : "📊 Export to ADP Payroll"}
        </Button>

        {/* ✅ Info Text */}
        {!isLoading && weeklySummary.length > 0 && (
          <p className="text-xs text-gray-500 text-center">
            Exports {weeklySummary.length} employee(s) in ADP-compatible format
          </p>
        )}
      </div>
    </div>
  );
}