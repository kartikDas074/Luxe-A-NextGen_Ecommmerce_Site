"use client";

import React, { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Package, Loader2, Eye, Edit2, Trash2, X, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import { deleteMethod, updateProduct } from "@/lib/server/product";
import Link from "next/link";

interface ProductTableWrapperProps {
  products: any[];
  pagination: {
    currentPage: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
  };
  initialSearch: string;
}

export default function ProductTableWrapper({ products, pagination, initialSearch }: ProductTableWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(initialSearch);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [editFormData, setEditFormData] = useState({
    regularPrice: "",
    discountPrice: "",
    stock: "",
    shippingCharge: "",
    warranty: "",
    status: "",
    visibility: ""
  });

  
  const updateNavigationParams = (targetPage: number, searchKeyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (targetPage > 1) {
      params.set("page", String(targetPage));
    } else {
      params.delete("page");
    }

    if (searchKeyword.trim() !== "") {
      params.set("search", searchKeyword);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNavigationParams(1, searchInput); // Reset pagination back to dynamic first layer page boundary on target context change
  };

 
  const itemLimit = pagination.limit || 10;
  const totalItemsCount = pagination.totalProducts || 0;
  const startItemIndex = totalItemsCount === 0 ? 0 : (pagination.currentPage - 1) * itemLimit + 1;
  const endItemIndex = Math.min(pagination.currentPage * itemLimit, totalItemsCount);

 
  const openEditModal = (product: any) => {
    setSelectedProduct(product);
    setEditFormData({
      regularPrice: product.regularPrice || "",
      discountPrice: product.discountPrice || "",
      stock: product.stock !== undefined ? product.stock : "",
      shippingCharge: product.shippingCharge !== undefined ? product.shippingCharge : "",
      warranty: product.warranty || "No Warranty",
      status: product.status || "active",
      visibility: product.visibility || "public"
    });
    setIsEditOpen(true);
  };

  const openDeleteModal = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      console.log("Saving dynamic instance target property values:", selectedProduct._id, editFormData);
      const result=await updateProduct(editFormData,selectedProduct._id.toString());
      if(result.success){
        toast.success("Product parameters system successfully targeted & updated!");
      }else{
        toast.error('Something went wrong.Plz try again Later');
      }
      
      setIsEditOpen(false);
      router.refresh();
    } catch (err) {
      toast.error("Failed executing parameter updates.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setModalLoading(true);
    try {
      console.log("Destructing matching database target tracking node container:", selectedProduct._id);
      const result=await deleteMethod(selectedProduct._id.toString());
      if(result.success){
         toast.success("Product inventory completely wiped out.");
      }
      else{
        toast.error('Something went wrong .\n Try again later');
      }
      setIsDeleteOpen(false);
      router.refresh();
    } catch (err) {
      toast.error("Pipeline breakdown tearing context node instances.");
    } finally {
      setModalLoading(false);
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock <= 0) return "bg-rose-100 text-rose-800 border-rose-200";
    if (stock <= 10) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  return (
    <div className="space-y-4">
      
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resource keyword parameter string..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-xs font-semibold focus:outline-slate-900 placeholder-slate-400 text-slate-900"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 rounded-lg transition flex items-center gap-1.5 shadow cursor-pointer"
          >
            {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Filter Array
          </button>
        </form>
      </div>

     
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden relative shadow-sm">
        {isPending && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
            <Loader2 className="w-7 h-7 text-slate-900 animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6 text-slate-700">Product</th>
                <th className="py-3.5 px-4 text-slate-700">SKU</th>
                <th className="py-3.5 px-4 text-slate-700">Stock Metric</th>
                <th className="py-3.5 px-4 text-slate-700">Price Configuration</th>
                <th className="py-3.5 px-4 text-slate-700 text-center">Context Matrix</th>
                <th className="py-3.5 px-6 text-right text-slate-700">Actions Panel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-bold">
                    <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No products matching targeted data arrays discovered inside dashboard node.
                  </td>
                </tr>
              ) : (
                products.map((item: any) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {item.images?.[0] ? (
                          <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="truncate max-w-[220px]">
                        <p className="font-bold text-slate-900 truncate tracking-tight">{item.productName}</p>
                        <p className="text-[10px] text-slate-400 truncate font-semibold mt-0.5">{item.category}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{item.sku || "—"}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStockBadge(item.stock ?? 0)}`}>
                        Available: {item.stock ?? 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">৳{item.regularPrice}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] bg-slate-100 text-slate-800 border px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                        {item.status} / {item.visibility}
                      </span>
                    </td>

                  
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5 ">
                        <Link className=" cursor-pointer" href={`/product/${item._id.toString()}`}>
                           <button
                          type="button"
                          onClick={() => router.push(`/product/${item._id}`)}
                          className="p-1.5 hover:text-black hover:bg-slate-100 text-slate-500 rounded-md border border-slate-200 bg-white transition shadow-sm cursor-pointer"
                          title="View system instance details path routing mapping context"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        </Link>
                        
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="p-1.5 hover:text-amber-700 hover:bg-amber-50 text-slate-500 rounded-md border border-slate-200 bg-white transition shadow-sm cursor-pointer"
                          title="Open mutation control parameter configuration panel"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(item)}
                          className="p-1.5 hover:text-rose-700 hover:bg-rose-50 text-slate-500 rounded-md border border-slate-200 bg-white transition shadow-sm cursor-pointer"
                          title="Trigger absolute removal sequence payload mapping layer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

       
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <span className="font-bold text-slate-900">{startItemIndex}</span> to{" "}
            <span className="font-bold text-slate-900">{endItemIndex}</span> of{" "}
            <span className="font-bold text-slate-900">{totalItemsCount}</span> products
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pagination.currentPage <= 1 || isPending}
              onClick={() => updateNavigationParams(pagination.currentPage - 1, searchInput)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:pointer-events-none shadow-sm cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pagination.currentPage >= pagination.totalPages || isPending}
              onClick={() => updateNavigationParams(pagination.currentPage + 1, searchInput)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:pointer-events-none shadow-sm cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

      </div>

    
      {isEditOpen && selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden transform scale-100 transition-all">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider">Update Product Config Registry</h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">DB ID Parameter: {selectedProduct._id}</p>
              </div>
              <button type="button" onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-white transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Product Scope Name (Immutable)</label>
                <input
                  type="text"
                  value={selectedProduct.productName}
                  disabled
                  className="mt-1 block w-full border border-slate-200 rounded-lg p-2.5 text-xs font-bold bg-slate-50 text-slate-500 cursor-not-allowed outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-700 tracking-wider">Regular Price (৳) *</label>
                  <input
                    type="number"
                    value={editFormData.regularPrice}
                    onChange={(e) => setEditFormData({...editFormData, regularPrice: e.target.value})}
                    className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-xs focus:outline-black font-semibold text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-700 tracking-wider">Discount Price (৳)</label>
                  <input
                    type="number"
                    value={editFormData.discountPrice}
                    onChange={(e) => setEditFormData({...editFormData, discountPrice: e.target.value})}
                    className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-xs focus:outline-black font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-700 tracking-wider">Stock Available Qty</label>
                  <input
                    type="number"
                    value={editFormData.stock}
                    onChange={(e) => setEditFormData({...editFormData, stock: e.target.value})}
                    className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-xs focus:outline-black font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-700 tracking-wider">Flat Shipping Charge (৳)</label>
                  <input
                    type="number"
                    value={editFormData.shippingCharge}
                    onChange={(e) => setEditFormData({...editFormData, shippingCharge: e.target.value})}
                    className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-xs focus:outline-black font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-700 tracking-wider">Warranty Statement Parameters</label>
                <select
                  value={editFormData.warranty}
                  onChange={(e) => setEditFormData({...editFormData, warranty: e.target.value})}
                  className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-xs bg-white font-semibold text-slate-800 focus:outline-black"
                >
                  <option value="No Warranty">No Warranty Policy</option>
                  <option value="6 Months Replacement">6 Months Local Replacement</option>
                  <option value="1 Year Brand Warranty">1 Year Official Brand Warranty</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-700 tracking-wider">Inventory Unit Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-xs bg-white font-semibold text-slate-800 focus:outline-black"
                  >
                    <option value="active">🟢 Active Marketplace</option>
                    <option value="inactive">🔴 Inactive/Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-700 tracking-wider">Visibility Matrix Filter</label>
                  <select
                    value={editFormData.visibility}
                    onChange={(e) => setEditFormData({...editFormData, visibility: e.target.value})}
                    className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-xs bg-white font-semibold text-slate-800 focus:outline-black"
                  >
                    <option value="public">🌐 Public Stream</option>
                    <option value="private">🔒 Private/Hidden Matrix</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-lg hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  {modalLoading && <Loader2 className="w-3 animate-spin" />}
                  Save Configurations
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      {isDeleteOpen && selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-rose-900">Confirm Structural Teardown</h4>
                  <p className="text-[10px] text-rose-700 font-medium">This transaction cannot be rolled back.</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Are you sure you want to completely purge <strong className="text-slate-900 font-bold">"{selectedProduct.productName}"</strong> instance from the distribution stream ledger?
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  disabled={modalLoading}
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-600 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={modalLoading}
                  onClick={handleDeleteConfirm}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-5 py-2 rounded-lg transition shadow-md flex items-center gap-1 cursor-pointer"
                >
                  {modalLoading && <Loader2 className="w-3 animate-spin" />}
                  Confirm Purge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}