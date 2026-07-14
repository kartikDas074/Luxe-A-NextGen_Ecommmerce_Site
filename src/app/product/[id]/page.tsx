import React from 'react';
import { getProductById } from '@/lib/api/product';
import { ArrowLeft, Package, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ProductDetailClient from './ProductDetailClient';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const response = await getProductById(id);

  if (!response || !response.success || !response.data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md text-center shadow-xs">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-sm font-bold text-slate-900">Resource Profile Missing</h2>
          <p className="text-xs text-slate-500 mt-1">
            The target product identifier does not route to an active database entity instance records.
          </p>
          <Link 
            href="/dashboard/seller/products" 
            className="mt-5 inline-flex items-center gap-1.5 bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const product = response.data;

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8 text-slate-800 tracking-tight antialiased">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation Action Top Dashboard Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200/60 pb-5">
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/seller/products" 
              className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:shadow-xs transition shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-900 text-white font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 fill-amber-400 stroke-none" /> {product.category || "General Core Product"}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">SKU: {product.sku || "N/A"}</span>
              </div>
              <h1 className="text-base font-bold text-slate-900 mt-0.5 tracking-tight">System Specification Profiler</h1>
            </div>
          </div>
        </div>

        {/* Mounting Interactive Dynamic Layout Client Element */}
        <ProductDetailClient product={product} />

      </div>
    </div>
  );
}