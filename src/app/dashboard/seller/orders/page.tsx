import { getOrderBySID } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { Package, MapPin, Calendar, Layers } from 'lucide-react';

const page = async () => {
  const session = await getUserSession();
  if (!session) redirect('/login');
  
  const user = session.user;
  const result = await getOrderBySID(user.id);
  const orders = result?.data || [];

  const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] antialiased tracking-tight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900">
              Seller Order Management
            </h1>
            <p className="text-xs font-medium text-neutral-400 mt-1">
              Manage and track all customer purchases placed for your store products.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2.5 rounded-xl shadow-2xs shrink-0 w-fit">
            <Layers className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-bold text-neutral-700">
              Total Orders: {orders.length}
            </span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-16 text-center max-w-md mx-auto shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <Package className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-neutral-900">No Orders Received</h3>
              <p className="text-xs font-medium text-neutral-400">
                You haven't received any orders for your products yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50/70 border-b border-neutral-200 text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                    <th className="py-4 px-6">Product Details</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Fulfillment</th>
                    <th className="py-4 px-6 text-right">Revenue</th>
                    <th className="py-4 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs font-medium">
                  {orders.map((order: any) => (
                    <tr key={order._id?.$oid || order._id} className="hover:bg-neutral-50/40 transition-colors">
                      
                      <td className="py-5 px-6 max-w-xs">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden p-1 shrink-0">
                            <img 
                              src={order.featuredImage} 
                              alt={order.productName} 
                              className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-neutral-900 truncate max-w-[180px]">
                              {order.productName}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-semibold text-neutral-400 uppercase">
                              <span>SKU: {order.sku}</span>
                              <span>•</span>
                              <span className="text-neutral-600 bg-neutral-100 px-1 py-0.25 rounded-xs">
                                {order.selectedColor}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 px-6">
                        <div className="space-y-0.5">
                          <p className="font-bold text-neutral-900">{order.userName}</p>
                          <p className="text-[10px] text-neutral-400 font-mono">{order.userEmail}</p>
                        </div>
                      </td>

                      <td className="py-5 px-6 space-y-1">
                        <div className="flex items-center gap-1.5 text-neutral-600 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="capitalize">{order.deliveryRegion?.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>ETA: {order.estimatedDelivery}</span>
                        </div>
                      </td>

                      <td className="py-5 px-6 text-right space-y-0.5">
                        <p className="font-black text-neutral-900 font-mono">৳{order.grandTotal}</p>
                        <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wide">
                          ৳{order.unitPrice} × {order.quantity}
                        </p>
                      </td>

                      <td className="py-5 px-6 text-center">
                        <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 border rounded-md ${getStatusStyles(order.status)}`}>
                          {order.status}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default page;