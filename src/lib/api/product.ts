'use server'

import { getMethod } from "../core/sharedAPI"

interface GetProductParams {
  id?: string;
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  status?: "active" | "draft" | "out_of_stock";
  visibility?: "public" | "private" | "hidden";
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const getProduct = async (params: GetProductParams = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const result = await getMethod(`/product?${query.toString()}`);

  return result;
};

export const getProductById=async(id:string)=>{
    const result=await getMethod(`/product/${id}`);
    return result;
}