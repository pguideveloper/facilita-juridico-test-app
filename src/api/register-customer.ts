import { api } from '@/lib/axios';

export interface Coordinates {
  x: string;
  y: string;
}

export interface RegisterCustomerBody {
  name: string;
  email: string;
  phone: string;
  coordinates: Coordinates;
}

export async function registerCustomer({
  name,
  email,
  phone,
  coordinates,
}: RegisterCustomerBody) {
  await api.post('/customer', {
    name,
    email,
    phone,
    coordinates,
  });
}
