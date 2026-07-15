'use server'

import { getMethod } from "../core/sharedAPI"

export const getOrderBySID=async(id:string)=>{
    const result=await getMethod(`/order?sellerId=${id}`);
    return result;
}

export const getOrderByUID=async(id:string)=>{
    const result=await getMethod(`/order?userId=${id}`);
    return result;
}