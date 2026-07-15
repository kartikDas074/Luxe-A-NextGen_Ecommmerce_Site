import { getOrderByUID } from '@/lib/api/order';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { ShoppingBag, MapPin, Calendar, Layers, ShieldCheck, Tag, ArrowRight, CheckCircle, Clock } from 'lucide-react';

const CustomerDashboard = async () => {
  const session = await getUserSession();
  if (!session) redirect('/login');
  
  const user = session.user;
  const result = await getOrderByUID(user.id);
  const orders = result?.data || [];

  const totalSpent = orders
    .filter((order: any) => order.status?.toLowerCase() !== 'cancelled')
    .reduce((sum: number, order: any) => sum + (order.grandTotal || 0), 0);

  const pendingOrdersCount = orders.filter((order: any) => order.status?.toLowerCase() === 'pending').length;
  const deliveredOrdersCount = orders.filter((order: any) => order.status?.toLowerCase() === 'delivered').length;

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Customer Portal</span>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 mt-0.5">
              Welcome back, {user.name || "Customer"}
            </h1>
            <p className="text-xs font-medium text-neutral-400 mt-1">
              Check your delivery status, track ongoing invoices, and explore your premium purchases.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2.5 rounded-xl shadow-2xs shrink-0 w-fit">
            <Layers className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-bold text-neutral-700">
              Total Placed: {orders.length}
            </span>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Total Investment</p>
              <h3 className="text-2xl font-mono font-black text-neutral-950">৳{totalSpent.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 bg-neutral-950 text-white rounded-xl flex items-center justify-center shadow-xs">
              <span className="text-xs font-black">৳</span>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Incoming Transits</p>
              <h3 className="text-2xl font-mono font-black text-neutral-950">{pendingOrdersCount}</h3>
            </div>
            <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Successful Delivers</p>
              <h3 className="text-2xl font-mono font-black text-neutral-950">{deliveredOrdersCount}</h3>
            </div>
            <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Main Orders Table */}
        {orders.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-16 text-center max-w-md mx-auto shadow-2xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-neutral-900">No Orders Placed Yet</h3>
              <p className="text-xs font-medium text-neutral-400">
                Explore our custom collections to start setting up your digital catalog.
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
                    <th className="py-4 px-6">Brand / Origin</th>
                    <th className="py-4 px-6">Shipping Outpost</th>
                    <th className="py-4 px-6 text-right">Payment Invoice</th>
                    <th className="py-4 px-6 text-center">Order Status</th>
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
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-neutral-800 font-bold">
                            <Tag className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{order.brand || 'Boutique Exclusive'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-semibold uppercase">
                            <span>Category: {order.category}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 px-6 space-y-1">
                        <div className="flex items-center gap-1.5 text-neutral-600 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="capitalize">{order.deliveryRegion?.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Estimated: {order.estimatedDelivery}</span>
                        </div>
                      </td>

                      <td className="py-5 px-6 text-right space-y-0.5">
                        <p className="font-black text-neutral-900 font-mono">৳{order.grandTotal}</p>
                        <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wide">
                          ৳{order.unitPrice} × {order.quantity} (+৳{order.shippingCharge} delivery)
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

        {/* Glossy Black Glassy Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="relative group overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-100 pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200 shrink-0 shadow-inner">
              <ShieldCheck className="w-5 h-5 text-neutral-100" />
            </div>
            <div className="relative z-10">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Secure Purchases</h4>
              <p className="text-[11px] font-medium text-neutral-400 mt-0.5 leading-relaxed">
                All order sessions are encrypted and monitored.
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-100 pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200 shrink-0 shadow-inner">
              <Calendar className="w-5 h-5 text-neutral-100" />
            </div>
            <div className="relative z-10">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">On-time Dispatch</h4>
              <p className="text-[11px] font-medium text-neutral-400 mt-0.5 leading-relaxed">
                Sellers package and ship inside scheduled delivery window.
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-100 pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-200 shrink-0 shadow-inner">
              <ShoppingBag className="w-5 h-5 text-neutral-100" />
            </div>
            <div className="relative z-10">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">24/7 Portal Support</h4>
              <p className="text-[11px] font-medium text-neutral-400 mt-0.5 leading-relaxed">
                Contact store merchant directly from product page.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;