import React from 'react';
import { getProduct } from '@/lib/api/product';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import ProductTableWrapper from './ProductTableWrapper';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function ProductPage({ searchParams }: PageProps) {
  const session = await getUserSession();
  const user = session?.user;

  if (!user) {
    redirect('/login');
  }

  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const currentSearch = resolvedParams.search || "";

  
  const response = await getProduct({
    id: user.id, 
    page: currentPage,
    limit: 10,  
    search: currentSearch
  });

  const productsData = response?.success ? response.data : [];
  const paginationData = response?.success ? response.pagination : { currentPage: 1, limit: 10, totalProducts: 0, totalPages: 1 };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Product Inventory List</h1>
          </div>
        </div>

        <ProductTableWrapper 
          products={productsData} 
          pagination={paginationData}
          initialSearch={currentSearch}
        />
      </div>
    </div>
  );
}