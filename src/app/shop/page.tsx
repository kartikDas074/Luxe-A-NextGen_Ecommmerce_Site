"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getProduct } from "@/lib/api/product";
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ShoppingBag, 
  Eye, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Star
} from "lucide-react";
import Link from "next/link";

export default function ConsumerShopPage() {
 
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  
  const [sortBy, setSortBy] = useState("default");
  
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 12
  });

  
  const fetchShopProducts = useCallback(async (activePage: number, cat: string, brnd: string) => {
    setLoading(true);
    try {
      const params: any = {
        page: activePage,
        limit: 12,
        status: "active",
        visibility: "public"
      };

      if (search.trim()) params.search = search;
      if (cat) params.category = cat;
      if (brnd) params.brand = brnd;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await getProduct(params);
      
      if (res && res.success) {
        setProducts(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (err) {
      console.error("Shop Catalog Extraction Error: ", err);
    } finally {
      setLoading(false);
    }
  }, [search, minPrice, maxPrice]); 

 
  useEffect(() => {
    let active = true;

    const performFetch = async () => {
      if (active) {
        await fetchShopProducts(page, category, brand);
      }
    };

    performFetch();

    return () => {
      active = false;
    };
  }, [page, category, brand, fetchShopProducts]);

 
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchShopProducts(1, category, brand);
  };

 
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
    setSortBy("default");
  };

 
  const getSortedProducts = () => {
    if (!products || products.length === 0) return [];
    const internalList = [...products];
    if (sortBy === "price-low") {
      return internalList.sort((a, b) => {
        const priceA = Number(a.regularPrice || 0) - Number(a.discountPrice || 0);
        const priceB = Number(b.regularPrice || 0) - Number(b.discountPrice || 0);
        return priceA - priceB;
      });
    }
    if (sortBy === "price-high") {
      return internalList.sort((a, b) => {
        const priceA = Number(a.regularPrice || 0) - Number(a.discountPrice || 0);
        const priceB = Number(b.regularPrice || 0) - Number(b.discountPrice || 0);
        return priceB - priceA;
      });
    }
    return internalList;
  };

  const currentVisibleProducts = getSortedProducts();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased tracking-tight">
     
      <div className="bg-gradient-to-r from-neutral-950 via-gray-900 to-neutral-900 text-white border-b border-gray-800 py-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/50 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 uppercase">
            ⚡ Mega Marketplace Open
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">The Modern Catalog</h1>
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest max-w-lg mx-auto">
            Browse Premium Handpicked Creations & Essential Tech Ecosystem Units
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          
          <div className="lg:col-span-3 bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-2 text-gray-800">
                <SlidersHorizontal className="w-3.5 h-3.5 text-black" /> Filter Options
              </h3>
              <button 
                onClick={resetFilters}
                className="text-[10px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset All
              </button>
            </div>

           
            <form onSubmit={handleSearchSubmit} className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block text-left">Search Keyword</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Headphone, Mouse..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-9 py-2 text-xs font-bold text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition"
                />
                <button type="submit" className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black cursor-pointer transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

          
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block text-left">Category System</label>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

           
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block text-left">Brand Lineage</label>
              <select
                value={brand}
                onChange={(e) => { setBrand(e.target.value); setPage(1); }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition cursor-pointer"
              >
                <option value="">All Brands</option>
                <option value="Ona">Ona</option>
                <option value="Sony">Sony</option>
                <option value="Apple">Apple</option>
              </select>
            </div>

          
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 block text-left">Price Boundary Ledger (৳)</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" 
                  placeholder="Min ৳" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition"
                />
                <input 
                  type="number" 
                  placeholder="Max ৳" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition"
                />
              </div>
              <button 
                onClick={() => { setPage(1); fetchShopProducts(1, category, brand); }}
                className="w-full bg-gray-950 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl transition mt-2 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Apply Range Filter
              </button>
            </div>

            
            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Super Fast Courier Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Genuine Guaranteed Product</span>
              </div>
            </div>
          </div>

       
          <div className="lg:col-span-9 space-y-6">
          
            <div className="bg-white border border-gray-200/80 rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="text-xs text-gray-500 font-bold text-left">
                Showing <span className="text-black font-black">{currentVisibleProducts.length}</span> of <span className="text-black font-black">{pagination.totalProducts}</span> Premium Entities
              </div>
              
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition cursor-pointer"
                >
                  <option value="default">Sort by: Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

           
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 space-y-4 animate-pulse shadow-xs">
                    <div className="w-full aspect-square bg-gray-100 rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                      <div className="h-4 bg-gray-100 rounded w-5/6" />
                    </div>
                    <div className="h-8 bg-gray-100 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            ) : currentVisibleProducts.length === 0 ? (
              <div className="bg-white border border-gray-200/80 rounded-2xl p-16 text-center shadow-xs">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4 stroke-[1.5]" />
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">No Products Found</h3>
                <p className="text-xs text-gray-400 mt-1.5 max-w-sm mx-auto">No products matched the active filtering parameters in this session.</p>
                <button 
                  onClick={resetFilters} 
                  className="mt-5 inline-flex items-center gap-2 bg-gray-950 text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-black transition shadow-xs cursor-pointer active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentVisibleProducts.map((product) => {
                  const itemUnitPrice = Number(product.regularPrice || 0) - Number(product.discountPrice || 0);
                  const displayImage = Array.isArray(product.images) && product.images[0] !== "" ? product.images[0] : "";
                  const uniqueTag = Array.isArray(product.tags) && product.tags.length > 0 ? product.tags[0] : null;

                  return (
                    <div 
                      key={product._id} 
                      className="bg-white border border-gray-200/60 rounded-2xl p-4 shadow-xs hover:shadow-lg hover:border-gray-300/80 group transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                    >
                      {uniqueTag && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white font-bold uppercase tracking-widest text-[8px] px-2 py-0.5 rounded-sm z-10 flex items-center gap-1 shadow-sm">
                          <Tag className="w-2 h-2 fill-current" /> {uniqueTag}
                        </span>
                      )}

                      <div className="w-full aspect-square bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center p-6 overflow-hidden relative group">
                        {displayImage ? (
                          <img 
                            src={displayImage} 
                            alt={product.productName} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <ShoppingBag className="w-10 h-10 text-gray-200 stroke-[1.5]" />
                        )}

                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-2 backdrop-blur-[1px]">
                          <Link 
                            href={`/product/${product._id}`}
                            className="bg-white hover:bg-black text-black hover:text-white p-2.5 rounded-full shadow-md transition transform translate-y-2 group-hover:translate-y-0 duration-300 flex items-center justify-center cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider">{product.brand || "System Core"}</span>
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                              <Star className="w-3 h-3 fill-current" /> 4.8
                            </span>
                          </div>
                          
                          <h4 className="text-xs font-black text-gray-900 tracking-tight leading-tight group-hover:text-black line-clamp-1 text-left">
                            {product.productName}
                          </h4>
                          
                          <p className="text-[10px] text-gray-400 font-medium line-clamp-2 leading-relaxed text-left">
                            {product.shortDescription}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-3">
                          <div className="flex flex-col items-start">
                            <span className="text-[8px] font-black uppercase tracking-wider text-gray-400">Net Price</span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-black text-black font-mono">৳{itemUnitPrice}</span>
                              {Number(product.discountPrice) > 0 && (
                                <span className="text-[10px] line-through font-bold text-gray-400 font-mono">৳{product.regularPrice}</span>
                              )}
                            </div>
                          </div>

                          <Link 
                            href={`/product/${product._id}`}
                            className="bg-gray-950 hover:bg-black text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

           
            {pagination.totalPages > 1 && (
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 flex items-center justify-between shadow-xs mt-8">
                <button
                  disabled={page <= 1 || loading}
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl hover:border-black text-xs font-bold text-gray-700 hover:text-black transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                    const pageIndex = idx + 1;
                    return (
                      <button
                        key={pageIndex}
                        onClick={() => setPage(pageIndex)}
                        disabled={loading}
                        className={`w-8 h-8 flex items-center justify-center text-xs font-black rounded-lg transition ${
                          pagination.currentPage === pageIndex
                            ? "bg-black text-white shadow-xs"
                            : "border border-gray-100 hover:border-gray-400 text-gray-600 hover:text-black cursor-pointer"
                        }`}
                      >
                        {pageIndex}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={page >= pagination.totalPages || loading}
                  onClick={() => setPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl hover:border-black text-xs font-bold text-gray-700 hover:text-black transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}