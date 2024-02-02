import { api } from '@/lib/axios';

interface Coordinate {
  x: string;
  y: string;
}

export interface GetCustomersQuery {
  pageIndex?: number | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface GetCustomersResponse {
  customers: {
    id: string;
    name: string;
    email: string;
    phone: string;
    coordinates: Coordinate;
  }[];
  meta: {
    pageIndex: number;
    totalCount: number;
  };
}

export async function getCustomers({
  pageIndex,
  name,
  email,
  phone,
}: GetCustomersQuery) {
  const response = await api.get<GetCustomersResponse>('/customer', {
    params: {
      pageIndex: pageIndex || 0,
      name,
      email,
      phone,
    },
  });

  return response.data;
}
