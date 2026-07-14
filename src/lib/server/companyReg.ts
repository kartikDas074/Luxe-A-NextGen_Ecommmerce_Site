'use server'
import { postMethod } from "../core/sharedAPI"

export const CompanyReg = async (data: any) => {
  const result = await postMethod("/registerCompany", data);
  return result;
};