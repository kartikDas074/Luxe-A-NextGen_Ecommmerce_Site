'use server'

import { postMethod } from "../core/sharedAPI";

export const addOrder=async(data:object)=>{
    const result=await postMethod(`/order`,data);
    return result;
}

