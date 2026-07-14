'use server'

import { getMethod } from "../core/sharedAPI"

export const getComapnyById=async(userId:string)=>{
    const result=await getMethod(`/company?userId=${userId}`);
    return result;
}

export const getCompany=async()=>{
    const result=await getMethod(`/company`);
    return result;
}