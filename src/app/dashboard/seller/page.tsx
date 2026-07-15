import { getOrderBySID } from "@/lib/api/order";
import { getProduct } from "@/lib/api/product";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";
import { Package, ShoppingBag, DollarSign, TrendingUp, AlertTriangle, Eye, ArrowUpRight, CheckCircle, Clock } from "lucide-react";

const SellerDashboard = async () => {
  const session = await getUserSession();
  if (!session) redirect("/login");
  const user = session.user;

  const [ordersResult, productsResult] = await Promise.all([
    getOrderBySID(user.id),
    getProduct({ id: user.id, limit: 100 })
  ]);

  const orders = ordersResult?.data || [];
  const products = productsResult?.data || [];

  const totalEarnings = orders
    .filter((order: any) => order.status?.toLowerCase() !== "cancelled")
    .reduce((sum: number, order: any) => sum + (order.grandTotal || 0), 0);

  const lowStockCount = products.filter((prod: any) => (prod.stock || 0) < 10).length;
  const activeProductsCount = products.filter((prod: any) => prod.status === "active").length;
  const pendingOrdersCount = orders.filter((order: any) => order.status?.toLowerCase() === "pending").length;

  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products]
    .map((prod: any) => {
      const productOrders = orders.filter((o: any) => o.productId === prod._id?.$oid || o.productId === prod._id);
      const unitsSold = productOrders.reduce((sum: number, o: any) => sum + (o.quantity || 0), 0);
      const totalRevenue = productOrders.reduce((sum: number, o: any) => sum + (o.grandTotal || 0), 0);
      return { ...prod, unitsSold, totalRevenue };
    })
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] antialiased tracking-tight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-6 gap-4">
          <div>
            <span className="text-[10px] font-black tracking-widest text-neutral-400 uppercase">Control Center</span>
            <h1 className="text-2xl font-black tracking-tight text-neutral-900 mt-0.5">
              Welcome Back, {user.name || "Seller"}
            </h1>
            <p className="text-xs font-medium text-neutral-400 mt-1">
              Here is what is happening with your premium boutique ecosystem metrics today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Net Matrix Revenue</p>
              <h3 className="text-2xl font-mono font-black text-neutral-950">৳{totalEarnings.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 bg-neutral-950 text-white rounded-xl flex items-center justify-center shadow-xs">
              <DollarSign className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Fulfillment Orders</p>
              <h3 className="text-2xl font-mono font-black text-neutral-950">{orders.length}</h3>
            </div>
            <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Vault Inventory</p>
              <h3 className="text-2xl font-mono font-black text-neutral-950">{activeProductsCount} <span className="text-xs text-neutral-400 font-sans font-medium">/ {products.length}</span></h3>
            </div>
            <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Attention Alert</p>
              <h3 className="text-2xl font-mono font-black text-rose-600">{lowStockCount + pendingOrdersCount}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${lowStockCount + pendingOrdersCount > 0 ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-neutral-50 border-neutral-200 text-neutral-400'}`}>
              <AlertTriangle className="w-5 h-5" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black tracking-tight text-neutral-900">Recent Queue Orders</h2>
              <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase bg-neutral-100 px-2 py-0.5 rounded-sm">Real-time Stream</span>
            </div>

            {recentOrders.length === 0 ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center shadow-2xs text-neutral-400 text-xs font-semibold">
                No orders discovered in this dynamic node setup matrix loop.
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order: any) => (
                  <div key={order._id?.$oid || order._id} className="bg-white border border-neutral-100 rounded-2xl p-4 shadow-2xs flex items-center justify-between transition-all duration-200 hover:border-neutral-300 group">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img src={order.featuredImage} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 truncate max-w-[180px] sm:max-w-[240px]">{order.productName}</h4>
                        <p className="text-[10px] font-medium text-neutral-400 mt-0.5 truncate">{order.userName} • {order.selectedColor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="text-xs font-black text-neutral-900 font-mono">৳{order.grandTotal}</p>
                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wide">Qty: {order.quantity}</p>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border rounded-md shrink-0 flex items-center gap-1 ${
                        order.status?.toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}>
                        {order.status?.toLowerCase() === 'pending' ? <Clock className="w-2.5 h-2.5" /> : <CheckCircle className="w-2.5 h-2.5" />}
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black tracking-tight text-neutral-900">Performance Index Leaders</h2>
              <TrendingUp className="w-4 h-4 text-neutral-400" />
            </div>

            {topProducts.length === 0 ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center shadow-2xs text-neutral-400 text-xs font-semibold">
                No performance telemetry log architecture setup metrics.
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xs space-y-4">
                {topProducts.map((prod: any) => (
                  <div key={prod._id?.$oid || prod._id} className="flex items-center justify-between border-b border-neutral-100 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img src={prod.images?.[0] || ""} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 truncate max-w-[140px] sm:max-w-[180px]">{prod.productName}</h4>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold mt-0.5">
                          <span className={`${prod.stock < 10 ? 'text-rose-500' : 'text-neutral-400'}`}>Stock: {prod.stock}</span>
                          <span className="text-neutral-300">•</span>
                          <span className="text-neutral-500 font-mono">৳{prod.discountPrice > 0 ? prod.discountPrice : prod.regularPrice}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-black text-neutral-950 font-mono">৳{prod.totalRevenue}</p>
                      <p className="text-[9px] font-black text-emerald-600 uppercase tracking-wide">{prod.unitsSold} sold</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default SellerDashboard;