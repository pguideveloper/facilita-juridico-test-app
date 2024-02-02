import { api } from '@/lib/axios';

interface Coordinate {
  x: string;
  y: string;
}

export interface GetCustomersResponse {
  customers: {
    id: string;
    name: string;
    email: string;
    phone: string;
    coordinates: Coordinate;
  }[];
}

export async function calculateRoute() {
  const response = await api.get<GetCustomersResponse>('/calculate');
  return response.data;
}
