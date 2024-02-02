import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { registerCustomer } from '@/api/register-customer';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import { queryClient } from '@/lib/react-query';

export function CreateCustomer() {
  const { toast } = useToast();
  const createCustomerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    coordinates: z.object({
      x: z.string(),
      y: z.string(),
    }),
  });

  type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateCustomerSchema>({
    resolver: zodResolver(createCustomerSchema),
  });

  const { mutateAsync: createCustomer } = useMutation({
    mutationFn: registerCustomer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
  });

  async function handleCreateCustomer(data: CreateCustomerSchema) {
    try {
      await createCustomer({
        name: data.name,
        email: data.email,
        phone: data.phone,
        coordinates: data.coordinates,
      });
      toast({
        description: 'Cliente cadastrado com sucesso!',
      });
    } catch {
      toast({
        variant: 'destructive',
        description: 'Erro ao cadastrar o cliente, tente novamente :(',
      });
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastro de cliente</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateCustomer)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              placeholder="Nome do cliente"
              className="col-span-3"
              id="name"
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="email">
              E-mail
            </Label>
            <Input
              placeholder="E-mail do cliente"
              className="col-span-3"
              id="email"
              type="email"
              {...register('email')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="phone">
              Telefone
            </Label>
            <Input
              placeholder="Telefone do cliente"
              className="col-span-3"
              id="phone"
              {...register('phone')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Coordenadas</Label>
            <Input
              placeholder="X"
              className="h-8 w-auto"
              type="number"
              {...register('coordinates.x')}
            />
            <Input
              placeholder="Y"
              className="h-8 w-auto"
              type="number"
              {...register('coordinates.y')}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="default"
            size="sm"
            disabled={isSubmitting}
          >
            Criar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
