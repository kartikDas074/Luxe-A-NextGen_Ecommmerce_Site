"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
      
        const response = await getProduct({ limit: 4, status: "active" });
        if (response?.success && response?.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-950" />
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-16 sm:py-24 border-t border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
      
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 mb-3">
            Featured Arrivals
          </h2>
          <p className="text-xs sm:text-sm font-medium text-neutral-400">
            Meticulously selected for your discerning taste.
          </p>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => {
        
            const hasDiscount = 
              typeof product.discountPrice === "number" && product.discountPrice > 0;
            
           
            const discountPercentage = hasDiscount 
              ? Math.round(((product.regularPrice - (product.discountPrice as number)) / product.regularPrice) * 100)
              : 0;

        
            const displayImage = product.images && product.images.length > 0 
              ? product.images[0] 
              : "/Assets/placeholder.png";

            return (
              <div 
                key={product._id} 
                className="group relative flex flex-col justify-between rounded-2xl bg-white p-3 border border-neutral-100 shadow-xs transition-all duration-300 hover:shadow-md"
              >
            
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100">
                  <img
                    src={displayImage}
                    alt={product.productName}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  
              
                  {hasDiscount && (
                    <span className="absolute top-3 left-3 rounded-md bg-rose-600 px-2 py-1 text-[10px] font-black tracking-wider text-white uppercase">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

              
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                 
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 truncate">
                        {product.brand || "Premium Luxury"}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-950">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>4.8</span>
                      </div>
                    </div>

                   
                    <h3 className="text-sm font-bold text-neutral-900 line-clamp-2 min-h-[40px] leading-snug mb-2">
                      {product.productName}
                    </h3>
                  </div>

                 
                  <div className="mt-2 space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-neutral-950">
                        ${hasDiscount ? product.discountPrice : product.regularPrice}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs font-bold text-neutral-300 line-through">
                          ${product.regularPrice}
                        </span>
                      )}
                    </div>

                 
                    <Link
                      href={`/product/${product._id}`}
                      className="block w-full rounded-xl bg-neutral-950 py-3 text-center text-xs font-bold text-white transition-all duration-200 hover:bg-neutral-800 active:scale-[0.98]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 group text-xs font-black tracking-widest uppercase text-neutral-950 hover:text-neutral-700 transition-colors"
          >
            View All Collection
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}