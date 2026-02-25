import Header from "@/components/shared/Header";
import EmployeeWeeklyHourCard from "@/components/Timecards/Admin/EmployeeWeeklyHourCard";
import { Button } from "@/components/ui/button";


export default function page() {
  return (
    <div>
      <Header title="Timecards" />
      <div className="container space-y-4">
        <div className="bg-white border rounded-lg p-3 ">
          <h1 className="font-semibold text-neutral-700 mb-2">
            Employee Weekly Hours
          </h1>
          <div className="space-y-3">
            <EmployeeWeeklyHourCard />
            <EmployeeWeeklyHourCard />
          </div>
        </div>
        <Button variant={"outline"} className="w-full cursor-pointer">Export CSV for ADP</Button>
      </div>
    </div>
  );
}
