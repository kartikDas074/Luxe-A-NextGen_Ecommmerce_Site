import { getCompany } from '@/lib/api/Company';
import React from 'react';
import SellerApprovalDashboard from './SellerApprovalDashboard';

// DB context standard types mapping
export interface CompanyType {
  _id: { $oid: string } | string;
  userId: string;
  shopName: string;
  shopDescription: string;
  shopCategory: string;
  shopLogo: string;
  shopBanner: string;
  ownerName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  preferredCurrency: string;
  preferredLanguage: string;
  agreeToStripe: boolean;
  agreeToCommission: boolean;
  agreeToTerms: boolean;
  status: "pending" | "approved" | "rejected";
}

const Page = async () => {
  // Database array payload dynamic fetching
  const result = await getCompany();
  const data=result.data;
  // Array fallback validation
  const companies: CompanyType[] = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SellerApprovalDashboard initialCompanies={companies} />
      </div>
    </div>
  );
};

export default Page;