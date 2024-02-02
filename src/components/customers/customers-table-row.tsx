import { TableCell, TableRow } from '../ui/table';

interface CustomerTableRowProps {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

export function CustomerTableRow({ customer }: CustomerTableRowProps) {
  return (
    <TableRow>
      <TableCell>{customer.name}</TableCell>
      <TableCell>{customer.email}</TableCell>
      <TableCell>{customer.phone}</TableCell>
    </TableRow>
  );
}
