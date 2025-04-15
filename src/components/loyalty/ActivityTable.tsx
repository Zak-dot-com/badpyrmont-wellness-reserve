
import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Transaction {
  id: string;
  transaction_type: string;
  points: number;
  description: string;
  created_at: string;
}

interface ActivityTableProps {
  transactions: Transaction[];
}

const ActivityTable = ({ transactions }: ActivityTableProps) => {
  const [filter, setFilter] = useState<string>("all");
  
  // Apply filter
  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter(t => t.transaction_type === filter);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="earn">Points Earned</SelectItem>
            <SelectItem value="redemption">Redemptions</SelectItem>
            <SelectItem value="bonus">Bonus Points</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {format(new Date(transaction.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={`text-right font-medium ${transaction.points >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.points >= 0 ? "+" : ""}{transaction.points}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ActivityTable;
