import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CircleX, Eye } from "lucide-react";
import { useState } from "react";
import { RejectedFeedbackForm } from "./RejectedFeedbackForm";
import { Expenses, ExpensesStatus } from "@/type";
import { cn } from "@/lib/utils";
import { statusColors } from "@/constant";
import { useUpdateExpenseStatusMutation } from "@/redux/api/expensesApi";
import { toast } from "sonner";

export default function ExpensesCard({ data }: { data: Expenses }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const {
    id,
    amount,
    status,
    description,
    employee,
    project,
    receiptDocImage,
  } = data;
  const [updateExpenseStatus, { isLoading }] = useUpdateExpenseStatusMutation();
  const handleApproves = async (status: ExpensesStatus) => {
    try {
      await updateExpenseStatus({
        id,
        status,
        feedback: null,
      }).unwrap();

      toast.success(`Expense ${status.toLowerCase()}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Card>
        <CardContent className="px-4 space-y-3">
          {/* Top row: Amount + Status */}
          <div className="flex items-center">
            <span className="text-2xl text-neutral-700 font-bold flex-1">
              ${amount.toFixed(2)}
            </span>
            <Badge
              variant="outline"
              className={cn(`py-1 px-2`, statusColors[status])}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </Badge>
          </div>

          {/* Employee & Project Details */}
          <div className="space-y-1 text-sm">
            <div className="font-medium">{employee?.name}</div>
            <div className="text-muted-foreground">
              {project?.name}, {project?.clientName}
            </div>
            <div className="text-muted-foreground">{description}</div>
          </div>

          {/* View button */}
          <Button variant={"ghost"} size={"sm"}>
            <Eye /> View
          </Button>

          {/* Actions */}
          {
           status==="PENDING" && <div className="flex gap-2 pt-2">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                setSelectedStatus("REJECTED");
                setOpenDialog(true);
              }}
            >
              <CircleX /> Reject
            </Button>

            {/* Approve */}
            <Button
              className="flex-1"
              onClick={() => handleApproves("APPROVED")}
              disabled={isLoading}
            >
              <Check /> Approve
            </Button>
          </div>
          }
        </CardContent>
      </Card>

      <RejectedFeedbackForm
        id={id as string}
        status={selectedStatus as ExpensesStatus}
        openDialog={openDialog}
        onOpenDialogChange={setOpenDialog}
      />
    </>
  );
}
