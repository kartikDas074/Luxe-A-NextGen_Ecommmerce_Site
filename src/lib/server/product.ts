'use server'

import { deleteProMethod, patchMethod, postMethod } from "../core/sharedAPI"

export const addProduct=async(data:object)=>{
    const result=await postMethod(`/product`,data);
    return result;
}

export const updateProduct=async(data:object,id:string)=>{
    const result=await patchMethod(`/product/${id}`,data);
    return result;
}


export const deleteMethod=async(id:string)=>{
    const result=await deleteProMethod(`/product/${id}`);
    return result;
}