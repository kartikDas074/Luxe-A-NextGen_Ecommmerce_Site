"use client";

import React, { useState, useMemo } from "react";
import { CompanyType } from "./page";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Layers, 
  Search, 
  ExternalLink,
  ChevronDown,
  Info,
  SlidersHorizontal,
  Mail,
  Phone,
  MapPin,
  FileSpreadsheet
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { CompnayStatus } from "@/lib/server/companyReg";
import { toast } from "react-toastify";
import { roleUpdata } from "@/lib/server/user";
import { redirect } from "next/navigation";

interface Props {
  initialCompanies: CompanyType[];
}

export default function SellerApprovalDashboard({ initialCompanies }: Props) {
  const {data:session}=useSession();
  const user=session?.user;
  const [companies, setCompanies] = useState<CompanyType[]>(initialCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Statuses");
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
  const [modalActionType, setModalActionType] = useState<"approved" | "rejected" | null>(null);

  // Dynamic calculations for the Stat Cards
  const stats = useMemo(() => {
    const total = companies.length;
    const pending = companies.filter((c) => c.status === "pending").length;
    const approved = companies.filter((c) => c.status === "approved").length;
    const rejected = companies.filter((c) => c.status === "rejected").length;
    return { total, pending, approved, rejected };
  }, [companies]);

  // Handle live filtering
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.businessEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All Statuses" ||
        company.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [companies, searchQuery, statusFilter]);

  // Action status updater (Simulating server save)
  const updateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    setCompanies((prev) =>
      prev.map((c) => {
        const companyId = typeof c._id === "object" ? c._id.$oid : c._id;
        return companyId === id ? { ...c, status: newStatus } : c;
      })
    );
    const result=await CompnayStatus(id,newStatus);
    if(result.success){
        toast.success('you successfully Update the company status');
        if(newStatus=='approved'){
            if(!user)redirect('/unauthorized');
            const result=await roleUpdata(user.id,'seller');
            if(result.success){
                
            }else{
                toast.error('For some reason users role cannot be updated.. Try again Later..');
            }
        }
    }else{
        toast.error('Something Went Wrong Plz try again later');
    }
    setSelectedCompany(null);
    setModalActionType(null);
  };

  return (
    <div className="space-y-8">
      {/* Upper header action section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Seller Approval</h1>
          <p className="text-sm text-gray-500 mt-1">Review and approve new seller applications for the marketplace.</p>
        </div>
        <button className="bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs py-2.5 px-4 rounded-lg border shadow-sm flex items-center gap-2 transition">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          Export Report
        </button>
      </div>

      {/* Grid Stats matching design exactly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending Card */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-[11px] font-black tracking-wider text-gray-400 uppercase">Pending Apps</span>
            <h2 className="text-3xl font-black text-gray-900">{stats.pending}</h2>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Approved Card */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-[11px] font-black tracking-wider text-gray-400 uppercase">Approved Sellers</span>
            <h2 className="text-3xl font-black text-gray-900">{stats.approved}</h2>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-[11px] font-black tracking-wider text-gray-400 uppercase">Rejected</span>
            <h2 className="text-3xl font-black text-gray-900">{stats.rejected}</h2>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Total Card */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-[11px] font-black tracking-wider text-gray-400 uppercase">Total Ecosystem</span>
            <h2 className="text-3xl font-black text-gray-900">{stats.total}</h2>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-gray-600">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Real-time search filters block matching image control design */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Seller name, shop, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm bg-gray-50/50 focus:outline-black"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-48 px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <button className="p-2 border rounded-lg hover:bg-gray-50 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Main Table Setup rendering actual fetched data */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-wider">
                <th className="py-4 px-6">Seller / Shop</th>
                <th className="py-4 px-6">Owner Name</th>
                <th className="py-4 px-6">Business Email</th>
                <th className="py-4 px-6">Country</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => {
                  const companyId = typeof company._id === "object" ? company._id.$oid : company._id;
                  
                  return (
                    <tr key={companyId} className="hover:bg-gray-50/50 transition">
                      {/* Shop Branding block */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={company.shopLogo || "/api/placeholder/100/100"}
                            alt={company.shopName}
                            className="w-10 h-10 rounded-lg object-cover border"
                          />
                          <div>
                            <span className="font-bold text-gray-900 block text-sm leading-tight hover:underline cursor-pointer">
                              {company.shopName}
                            </span>
                            <span className="text-[10px] text-gray-400 font-bold">{company.shopCategory}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-sm font-medium text-gray-700">{company.ownerName}</td>
                      <td className="py-4 px-6 text-sm text-gray-500 break-all">{company.businessEmail}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{company.country}</td>
                      
                      {/* Interactive pill status badge */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          company.status === "approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : company.status === "rejected"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            company.status === "approved" ? "bg-emerald-500" : company.status === "rejected" ? "bg-rose-500" : "bg-amber-500"
                          }`} />
                          {company.status}
                        </span>
                      </td>

                      {/* Detail View + Action buttons row */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedCompany(company)}
                            className="text-xs font-bold text-gray-600 hover:text-black flex items-center gap-1 border px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition"
                          >
                            <Info className="w-3.5 h-3.5" /> Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-gray-400 font-medium">
                    No matching registration requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation & Details Modal Backdrop */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-fade-in">
            
            {/* Shop Banner preview overlay on Modal top */}
            <div className="h-36 bg-slate-900 relative">
              {selectedCompany.shopBanner ? (
                <img src={selectedCompany.shopBanner} alt="banner" className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="w-full h-full bg-slate-800" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-6 flex items-center gap-4 text-white">
                <img
                  src={selectedCompany.shopLogo}
                  alt="logo"
                  className="w-16 h-16 rounded-xl border-2 border-white object-cover bg-white shrink-0"
                />
                <div>
                  <h2 className="text-xl font-black leading-tight">{selectedCompany.shopName}</h2>
                  <p className="text-xs text-gray-200">{selectedCompany.shopCategory}</p>
                </div>
              </div>

              <button
                onClick={() => { setSelectedCompany(null); setModalActionType(null); }}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
              {/* About description */}
              <div>
                <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Description</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl border leading-relaxed">
                  {selectedCompany.shopDescription}
                </p>
              </div>

              {/* Owner and details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Owner Information</h4>
                  <div className="space-y-1.5 text-xs font-semibold text-gray-700">
                    <p className="flex items-center gap-2"><UserIcon className="w-3.5 h-3.5 text-gray-400" /> {selectedCompany.ownerName}</p>
                    <p className="flex items-center gap-2 text-gray-500"><Mail className="w-3.5 h-3.5" /> {selectedCompany.businessEmail}</p>
                    <p className="flex items-center gap-2 text-gray-500"><Phone className="w-3.5 h-3.5" /> {selectedCompany.businessPhone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">HQ Address</h4>
                  <div className="space-y-1 text-xs font-semibold text-gray-700">
                    <p className="flex items-start gap-2 leading-snug">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                      <span>
                        {selectedCompany.businessAddress},<br />
                        {selectedCompany.city}, {selectedCompany.stateProvince} {selectedCompany.postalCode},<br />
                        {selectedCompany.country}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Terms Checkbox Confirmations */}
              <div className="flex gap-4 text-xs font-bold text-gray-600 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                <p>Currency: <span className="text-black font-normal">{selectedCompany.preferredCurrency}</span></p>
                <p>Stripe Setup: <span className="text-emerald-600">Active ✓</span></p>
                <p>Status: <span className="uppercase text-amber-700">{selectedCompany.status}</span></p>
              </div>

              {/* Interactive confirmation nested view */}
              {modalActionType ? (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 animate-fade-in space-y-3">
                  <p className="text-sm font-bold text-gray-900">
                    Are you sure you want to change this seller request to{" "}
                    <span className={modalActionType === "approved" ? "text-emerald-600" : "text-rose-600"}>
                      {modalActionType.toUpperCase()}
                    </span>
                    ?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const id = typeof selectedCompany._id === "object" ? selectedCompany._id.$oid : selectedCompany._id;
                        updateStatus(id, modalActionType);
                      }}
                      className={`text-xs font-bold text-white px-4 py-2 rounded-lg ${
                        modalActionType === "approved" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                      }`}
                    >
                      Yes, Confirm Action
                    </button>
                    <button
                      onClick={() => setModalActionType(null)}
                      className="text-xs font-bold text-gray-600 bg-white hover:bg-gray-100 border px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Footer action controls */}
            {!modalActionType && (
              <div className="bg-gray-50 p-4 px-6 border-t flex justify-between gap-2">
                <button
                  onClick={() => { setSelectedCompany(null); setModalActionType(null); }}
                  className="text-xs font-bold text-gray-500 hover:text-black py-2"
                >
                  Close Detail
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModalActionType("rejected")}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-4 py-2 rounded-lg border border-rose-200 transition"
                  >
                    Reject Seller
                  </button>
                  <button
                    onClick={() => setModalActionType("approved")}
                    className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    Approve Seller
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// Inline fallback for layout UI
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}