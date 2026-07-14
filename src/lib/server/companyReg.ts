'use server'
import { patchMethod, postMethod } from "../core/sharedAPI"

export const CompanyReg = async (data: any) => {
  const result = await postMethod("/registerCompany", data);
  return result;
};


export const CompnayStatus=async(id:string,status:string)=>{
    const result=await patchMethod(`/company/${id}`,{"status":status});
    return result;
}