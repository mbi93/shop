import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import api from './api';
import type { IProduct } from '../types';

interface IParams {
    sortVal: string,
    searchVal: string,
    limit: number,
    offset: number
}

export const useGetProducts = ({sortVal, searchVal, limit, offset}: IParams)=>{
    return useQuery({
        queryKey: ['products', sortVal, searchVal, limit, offset],
        queryFn: ()=> api.get(`/products?ordering=${sortVal}&search=${searchVal}&limit=${limit}&offset=${offset}`),
        select: (response)=> response.data
    })
}

export const useGetProductById = (id: string | undefined): UseQueryResult<IProduct> =>{
    return useQuery({
        queryKey: ['single', id],
        queryFn: ()=> api.get(`/products/${id}`),
        select: (response)=> response.data,
        enabled: !!id
    })
}