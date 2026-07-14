'use server'

import { patchMethod } from "../core/sharedAPI"

export const roleUpdata=async(id:string,status:string)=>{
    const result=await patchMethod(`/userRole/${id}`,{"role":status});
    return result;
}