'use client';

import React from 'react';


export interface ShopDashboardProps {
  shopData: {
    _id: { $oid: string };
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
    status: 'pending' | 'approved' | 'rejected';
  };
}

export default function Company({ shopData }: ShopDashboardProps) {
  const isPending = shopData.status === 'pending';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen text-gray-800 antialiased">
      
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Shop</h1>
          <p className="text-sm text-gray-500">View your shop profile, branding, and business information.</p>
        </div>
        
        <button 
          disabled={isPending}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border shadow-sm transition-all ${
            isPending 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
              : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
          }`}
        >
          ✏️ Edit Shop
        </button>
      </div>

      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
   
        <div className="h-48 md:h-60 w-full bg-gray-200 relative">
          {shopData.shopBanner ? (
            <img 
              src={shopData.shopBanner} 
              alt="Shop Banner" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Banner Set</div>
          )}
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 mb-5">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow overflow-hidden flex items-center justify-center">
              {shopData.shopLogo ? (
                <img 
                  src={shopData.shopLogo} 
                  alt="Shop Logo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-300 text-xs">No Logo</span>
              )}
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-gray-900">{shopData.shopName}</h2>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm ${
                  isPending 
                    ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  ● {shopData.status}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-400 mt-0.5">{shopData.shopCategory}</p>
            </div>
          </div>

     
          <div className="border-t pt-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Shop Description</h4>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              {shopData.shopDescription || "No custom description updated yet."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Products', val: isPending ? '0' : '142', growth: isPending ? '0.0%' : '+12.5%', up: true },
          { label: 'Total Orders', val: isPending ? '0' : '1,205', growth: isPending ? '0.0%' : '+8.2%', up: true },
          { label: 'Total Revenue', val: isPending ? '$0.00' : '$64,320', growth: isPending ? '0.0%' : '+15%', up: true },
          { label: 'Average Rating', val: isPending ? '—' : '4.9 ★★★★★', growth: isPending ? 'No reviews' : '98% Positive', up: true },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
            <p className="text-lg font-black text-gray-900 mt-1">{item.val}</p>
            <p className={`text-[11px] font-medium mt-1 ${isPending ? 'text-gray-400' : 'text-emerald-600'}`}>
              {isPending ? '' : '↗ '} {item.growth}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
      
        <div className="lg:col-span-2 space-y-6">
          
       
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
              📋 Business Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
              <div>
                <span className="text-gray-400 block font-medium uppercase tracking-wider text-[10px]">Owner Name</span>
                <span className="font-semibold text-gray-800 text-sm mt-0.5 block">{shopData.ownerName}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium uppercase tracking-wider text-[10px]">Business Email</span>
                <span className="font-semibold text-gray-800 text-sm mt-0.5 block break-all">{shopData.businessEmail}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium uppercase tracking-wider text-[10px]">Phone</span>
                <span className="font-semibold text-gray-800 text-sm mt-0.5 block">{shopData.businessPhone}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium uppercase tracking-wider text-[10px]">Address</span>
                <span className="font-semibold text-gray-800 text-sm mt-0.5 block">{shopData.businessAddress}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium uppercase tracking-wider text-[10px]">City</span>
                <span className="font-semibold text-gray-800 text-sm mt-0.5 block">{shopData.city}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium uppercase tracking-wider text-[10px]">State / Province</span>
                <span className="font-semibold text-gray-800 text-sm mt-0.5 block">{shopData.stateProvince}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium uppercase tracking-wider text-[10px]">Country</span>
                <span className="font-semibold text-gray-800 text-sm mt-0.5 block">{shopData.country}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-medium uppercase tracking-wider text-[10px]">Postal Code</span>
                <span className="font-semibold text-gray-800 text-sm mt-0.5 block">{shopData.postalCode}</span>
              </div>
            </div>
          </div>

          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4 border-b pb-2">
              ⚙️ Marketplace Preferences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-xl p-3 flex items-center gap-3 bg-gray-50/50">
                <span className="text-xl">💵</span>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Preferred Currency</span>
                  <span className="text-xs font-bold text-gray-800">{shopData.preferredCurrency}</span>
                </div>
              </div>
              <div className="border rounded-xl p-3 flex items-center gap-3 bg-gray-50/50">
                <span className="text-xl">🌐</span>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Preferred Language</span>
                  <span className="text-xs font-bold text-gray-800">{shopData.preferredLanguage}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        
        <div className="space-y-4">
          

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2">Marketplace Agreement</h3>
            
            <div className="space-y-2.5 text-xs font-medium text-gray-700">
              <div className="flex items-center justify-between">
                <span>Seller Terms Accepted</span>
                <span className={shopData.agreeToTerms ? "text-green-600 font-bold text-sm" : "text-gray-300"}>✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Stripe Payment Policy Accepted</span>
                <span className={shopData.agreeToStripe ? "text-green-600 font-bold text-sm" : "text-gray-300"}>✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Marketplace Commission Blueprint</span>
                <span className={shopData.agreeToCommission ? "text-green-600 font-bold text-sm" : "text-gray-300"}>✓</span>
              </div>
            </div>

            
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-blue-800 space-y-2 mt-4">
              <p className="font-bold flex items-center gap-1">🛡️ Payment Processing</p>
              <p className="leading-relaxed">
                All payouts are routed via secure channels. Your selected base operation currency parameter is configured to standard schedules.
              </p>
            </div>
          </div>

         
          <div className="space-y-2">
            
           
            {isPending && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-center text-xs font-semibold text-amber-800 mb-2">
                🔒 System features are locked until admin verification completes.
              </div>
            )}

           
            <button 
              disabled={isPending}
              className={`w-full py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-between px-4 ${
                isPending 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300/40 shadow-none' 
                  : 'bg-black text-white hover:bg-gray-900'
              }`}
            >
              <span>➕ Add New Product</span>
              <span className="opacity-60">❯</span>
            </button>

            <button 
              disabled={isPending}
              className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between px-4 ${
                isPending 
                  ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed shadow-none' 
                  : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <span>📦 View Products</span>
              <span className="text-gray-400">❯</span>
            </button>

           
            <button 
              disabled={isPending}
              className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between px-4 ${
                isPending 
                  ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed shadow-none' 
                  : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <span>📊 Analytics Dashboard</span>
              <span className="text-gray-400">❯</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}