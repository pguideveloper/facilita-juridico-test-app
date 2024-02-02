import { useQuery } from '@tanstack/react-query';
import { DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { calculateRoute } from '@/api/calculate-route';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function CustomerRoute() {
  const { data: result } = useQuery({
    queryKey: ['routes'],
    queryFn: () => calculateRoute(),
  });
  return (
    <DialogContent>
      <DialogHeader className="flex items-center">
        <DialogTitle>Ordem de visita</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Coordenadas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result &&
              result.customers.map((customer) => {
                return (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell className="text-right">
                      x: {customer.coordinates.x} | y: {customer.coordinates.y}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  );
}
