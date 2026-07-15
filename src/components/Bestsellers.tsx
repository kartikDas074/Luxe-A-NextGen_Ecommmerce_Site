"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProduct } from "@/lib/api/product"; 

export interface IProduct {
  _id: string; // MongoDB Document ID
  sellerId: string;
  productName: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  brand: string;
  regularPrice: number;
  discountPrice: number | "";
  stock: number;
  sku: string;
  images: string[];
  shippingCharge: number;
  estimatedDelivery: string;
  specifications: {
    key: string;
    value: string;
  }[];
  warranty: string;
  variants: string[];
  tags: string[];
  status: "active" | "draft" | "out_of_stock";
  visibility: "public" | "private" | "hidden";
  createdAt: string;
  updatedAt: string;
}


export default function Bestsellers() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
       
        const response = await getProduct({ page: 2, limit: 4, status: "active" });
        if (response?.success && response?.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Failed to load bestsellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center bg-neutral-50/40">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-950" />
      </div>
    );
  }

  return (
    <section className="w-full bg-neutral-50/60 py-16 sm:py-24 border-t border-b border-neutral-100/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
     
        <div className="flex items-center justify-between mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">
            Our Bestsellers
          </h2>
          
     
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => {
            const hasDiscount = typeof product.discountPrice === "number" && product.discountPrice > 0;
            const displayImage = product.images && product.images.length > 0 
              ? product.images[0] 
              : "/Assets/placeholder.png";

            const badgeNumber = index + 1;

            return (
              <Link 
                key={product._id} 
                href={`/product/${product._id}`}
                className="group flex flex-col cursor-pointer"
              >
              
                <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-xs">
                  <img
                    src={displayImage}
                    alt={product.productName}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  
                
                  <span className="absolute top-4 left-4 rounded-full bg-black px-3 py-1 text-[9px] font-black tracking-widest text-white uppercase shadow-sm">
                    #{badgeNumber} Best Seller
                  </span>
                </div>

            
                <div className="mt-4 space-y-1 px-1">
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors truncate">
                    {product.productName}
                  </h3>
                  
                 
                  <p className="text-[11px] font-medium text-neutral-400">
                    {1.9 - (index * 0.2)}k+ Sales this month
                  </p>

              
                  <div className="pt-1 flex items-baseline gap-2">
                    <span className="text-sm font-black text-neutral-950">
                      ${hasDiscount ? product.discountPrice : product.regularPrice}.00
                    </span>
                    {hasDiscount && (
                      <span className="text-xs font-semibold text-neutral-300 line-through">
                        ${product.regularPrice}.00
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}