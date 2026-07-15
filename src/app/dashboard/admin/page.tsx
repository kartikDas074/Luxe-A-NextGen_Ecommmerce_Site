import { getCompany } from "@/lib/api/Company";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import { 
  Building2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Layers, 
  ExternalLink,
  ShieldAlert,
  Calendar,
  Sparkles
} from "lucide-react";

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

const page = async () => {
  const result = await getCompany();
  const data = result.data;
  const companies: CompanyType[] = Array.isArray(data) ? data : [];
  
  const session = await getUserSession();
  if (!session) redirect("/login");
  const user = session.user;

  const totalShops = companies.length;
  const approvedShops = companies.filter(c => c.status === "approved").length;
  const pendingShops = companies.filter(c => c.status === "pending").length;
  const rejectedShops = companies.filter(c => c.status === "rejected").length;

  const getStatusStyles = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-neutral-50 text-neutral-700 border-neutral-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] antialiased tracking-tight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">System Administration</span>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 mt-0.5">
              Merchant & Shop Audits
            </h1>
            <p className="text-xs font-medium text-neutral-400 mt-1">
              Verify, authorize, and manage global merchant store profiles.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2.5 rounded-xl shadow-2xs shrink-0 w-fit">
            <Layers className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-bold text-neutral-700">
              Database Nodes: {totalShops}
            </span>
          </div>
        </div>

        {/* Classy & Glossy Welcome Box */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-100 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-300 font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>Admin Panel Active</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Welcome back, {user.name || "Administrator"}!
              </h2>
              <p className="text-xs md:text-sm font-medium text-neutral-400 leading-relaxed">
                You currently have <span className="text-amber-400 font-bold">{pendingShops} pending store applications</span> awaiting system validation. Ensure all credentials, Stripe compliance settings, and layout variables meet standard protocols before approval.
              </p>
            </div>
            <div className="hidden md:flex shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 items-center justify-center text-white shadow-inner">
              <Building2 className="w-8 h-8 text-neutral-200" />
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Total Merchants</p>
              <h3 className="text-2xl font-mono font-black text-neutral-950">{totalShops}</h3>
            </div>
            <div className="w-12 h-12 bg-neutral-950 text-white rounded-xl flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Approved Hubs</p>
              <h3 className="text-2xl font-mono font-black text-emerald-600">{approvedShops}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Pending Verification</p>
              <h3 className="text-2xl font-mono font-black text-amber-600">{pendingShops}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Rejected Archives</p>
              <h3 className="text-2xl font-mono font-black text-rose-600">{rejectedShops}</h3>
            </div>
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Main Shops Table */}
        {companies.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-16 text-center max-w-md mx-auto shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-neutral-900">No Companies Registered</h3>
              <p className="text-xs font-medium text-neutral-400">
                There are no dynamic merchant setup records currently existing in the database pipeline.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50/70 border-b border-neutral-200 text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                    <th className="py-4 px-6">Boutique Store</th>
                    <th className="py-4 px-6">Merchant Principal</th>
                    <th className="py-4 px-6">Category & Currency</th>
                    <th className="py-4 px-6">Geo Location</th>
                    <th className="py-4 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs font-medium">
                  {companies.map((company) => {
                    const companyId = typeof company._id === "object" && company._id !== null && "$oid" in company._id
                      ? company._id.$oid
                      : (company._id as string);

                    return (
                      <tr key={companyId} className="hover:bg-neutral-50/40 transition-colors">
                        
                        <td className="py-5 px-6 max-w-sm">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden p-1 shrink-0">
                              {company.shopLogo ? (
                                <img 
                                  src={company.shopLogo} 
                                  alt={company.shopName} 
                                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                                />
                              ) : (
                                <Building2 className="w-6 h-6 text-neutral-300" />
                              )}
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="font-bold text-neutral-900 truncate max-w-[200px]">
                                {company.shopName}
                              </h4>
                              <p className="text-[10px] text-neutral-400 line-clamp-1 max-w-[220px]">
                                {company.shopDescription || "No catalog summary metadata declared."}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6">
                          <div className="space-y-1">
                            <p className="font-bold text-neutral-900">{company.ownerName}</p>
                            <div className="flex flex-col gap-0.5 text-[10px] text-neutral-400 font-semibold uppercase">
                              <div className="flex items-center gap-1 font-mono tracking-tight">
                                <Mail className="w-3 h-3 text-neutral-300 shrink-0" />
                                <span>{company.businessEmail}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-neutral-300 shrink-0" />
                                <span>{company.businessPhone}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6">
                          <div className="space-y-1">
                            <span className="inline-block text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded-xs">
                              {company.shopCategory}
                            </span>
                            <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                              <span>Currency: {company.preferredCurrency}</span>
                              <span>•</span>
                              <span>{company.preferredLanguage}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6 space-y-1">
                          <div className="flex items-center gap-1 text-neutral-600 font-semibold max-w-[180px]">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <span className="truncate">{company.businessAddress}</span>
                          </div>
                          <p className="text-[10px] text-neutral-400">
                            {company.city}, {company.country}
                          </p>
                        </td>

                        <td className="py-5 px-6 text-center">
                          <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 border rounded-md ${getStatusStyles(company.status)}`}>
                            {company.status}
                          </span>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-100 pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200 shrink-0 shadow-inner">
              <ShieldAlert className="w-5 h-5 text-neutral-100" />
            </div>
            <div className="relative z-10">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Security Auditing</h4>
              <p className="text-[11px] font-medium text-neutral-400 mt-0.5 leading-relaxed">
                All merchant onboarding processes agree and configure to security terms.
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-100 pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200 shrink-0 shadow-inner">
              <Calendar className="w-5 h-5 text-neutral-100" />
            </div>
            <div className="relative z-10">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">System Parameters</h4>
              <p className="text-[11px] font-medium text-neutral-400 mt-0.5 leading-relaxed">
                Stripe validation configurations verified via encrypted security pipelines.
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-100 pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200 shrink-0 shadow-inner">
              <ExternalLink className="w-5 h-5 text-neutral-100" />
            </div>
            <div className="relative z-10">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Gateway Agreements</h4>
              <p className="text-[11px] font-medium text-neutral-400 mt-0.5 leading-relaxed">
                Merchants strictly agree to platform commission protocols.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default page;