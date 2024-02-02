import { useSearchParams } from 'react-router-dom';
import { CustomerFilters } from './components/customers/customers-filter';
import { CustomerTableRow } from './components/customers/customers-table-row';
import { Pagination } from './components/pagination';
import { Button } from './components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from './components/ui/table';
import './global.css';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from './api/get-customers';
import { z } from 'zod';
import { Dialog, DialogTrigger } from './components/ui/dialog';
import { CustomerRoute } from './components/customers/route/customer-route';
import { CreateCustomer } from './components/customers/create-customer';

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1');

  const { data: result } = useQuery({
    queryKey: ['customers', pageIndex, name, email, phone],
    queryFn: () => getCustomers({ pageIndex, name, email, phone }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString());
      return prev;
    });
  }

  return (
    <div className="flex min-h-screen flex-col antialiased p-8">
      <div className="flex items-center justify-center gap-4 p-6">
        <div className="text-3xl text-muted-foreground">Nossos clientes</div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between px-4">
          <CustomerFilters />
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mr-2">
                  Cadastrar cliente
                </Button>
              </DialogTrigger>
              <CreateCustomer />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Definir rota</Button>
              </DialogTrigger>
              <CustomerRoute />
            </Dialog>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
          </TableHeader>
          <TableBody>
            {result &&
              result.customers.map((customer) => {
                return (
                  <CustomerTableRow key={customer.id} customer={customer} />
                );
              })}
          </TableBody>
        </Table>
      </div>
      {result && (
        <Pagination
          pageIndex={result.meta.pageIndex}
          totalCount={result.meta.totalCount}
          perPage={10}
          onPageChange={handlePaginate}
        />
      )}
    </div>
  );
}
