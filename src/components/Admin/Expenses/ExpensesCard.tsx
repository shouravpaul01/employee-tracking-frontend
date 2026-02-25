import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CircleX, Eye } from "lucide-react";

export default function ExpensesCard() {
  return (
    <Card>
      <CardContent className="px-4">
        <div className="space-y-3">
          {/* Top row with amount */}
          <div className="flex items-center">
            <span className="text-2xl text-neutral-700 font-bold flex-1">$45</span>{" "}
            <Badge
              variant="outline"
              
              className="bg-primary/10 border border-primary text-primary py-1 px-2"
            >
              Completed
            </Badge>
          </div>

          {/* Details */}
          <div className="space-y-1 text-sm">
            <div className="font-medium">Mike Rodriguez</div>
            <div className="text-muted-foreground">
              Supplies, 742 Evergreen Terrace
            </div>
            <div className="text-muted-foreground">
              Staging Supplies from Home Depot
            </div>
          </div>
          <Button variant={"ghost"} size={"sm"}><Eye/> View</Button>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="destructive" className="flex-1 ">
            <CircleX/>  Reject
            </Button>
            <Button className="flex-1 "><Check/> Approve</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
