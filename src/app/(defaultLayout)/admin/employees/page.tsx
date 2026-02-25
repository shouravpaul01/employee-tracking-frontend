import Header from "@/components/shared/Header";
import { UserProfileCard } from "@/components/shared/UserProfileCard";
import {
  Table,
  TableBody,
 
  TableCell,
 
  TableRow,
} from "@/components/ui/table";

export default function page() {
  return (
    <div>
      <Header title="Employees" backHref="/profile" />
      <div className="container space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableBody>
              {[1, 2].map((item) => (
                <TableRow key={item} className="hover:bg-transparent">
                  <TableCell className="p-4">
                    <UserProfileCard wrapperClassName="p-0! border-none" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
