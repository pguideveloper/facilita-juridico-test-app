import { Search, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';

const customerFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

type CustomerFilterSchema = z.infer<typeof customerFilterSchema>;

export function CustomerFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');

  const { register, handleSubmit, reset } = useForm<CustomerFilterSchema>({
    resolver: zodResolver(customerFilterSchema),
    defaultValues: {
      name: name ?? '',
      email: email ?? '',
      phone: phone ?? '',
    },
  });

  function handleFilter({ name, email, phone }: CustomerFilterSchema) {
    setSearchParams((state) => {
      if (name) {
        state.set('name', name);
      } else {
        state.delete('name');
      }

      if (email) {
        state.set('email', email);
      } else {
        state.delete('email');
      }

      if (phone) {
        state.set('phone', phone);
      } else {
        state.delete('phone');
      }

      state.set('page', '1');

      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('name');
      state.delete('email');
      state.delete('phone');
      state.delete('page');

      return state;
    });

    reset({
      name: '',
      email: '',
      phone: '',
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-auto"
        {...register('name')}
      />
      <Input
        placeholder="E-mail do cliente"
        className="h-8 w-auto"
        {...register('email')}
      />
      <Input
        placeholder="Telefone do cliente"
        className="h-8 w-auto"
        {...register('phone')}
      />

      <Button type="submit" variant="outline" size="sm">
        <Search className="mr-2 h-4 w-4" />
        Filtrar
      </Button>

      <Button
        onClick={handleClearFilters}
        type="button"
        variant="destructive"
        size="sm"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtro
      </Button>
    </form>
  );
}
