import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Product } from '@/types/product';

export const useProducts = (filters?: any) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters?.category && filters.category !== 'all') {
                params.append('category', filters.category);
            }
            if (filters?.search) {
                params.append('search', filters.search);
            }
            if (filters?.sort) {
                params.append('sort', filters.sort);
            }

            const { data } = await api.get<Product[]>(`/products?${params.toString()}`);
            return data;
        },
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data } = await api.get<Product>(`/products/${id}`);
            return data;
        },
        enabled: !!id,
    });
};
