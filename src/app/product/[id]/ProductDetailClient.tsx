"use client";

import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Truck, Star, Heart, Check, Minus, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

interface ProductDetailClientProps {
  product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Safe filtering for image storage parsing arrays
  const activeImages = Array.isArray(product.images) 
    ? product.images.filter((img: string) => img && img.trim() !== "")
    : [];

  const [mainImage, setMainImage] = useState(activeImages[0] || "");
  const [selectedColor, setSelectedColor] = useState("Midnight Black");
  const [quantity, setQuantity] = useState(1);
  const [deliveryRegion, setDeliveryRegion] = useState("inside-dhaka");
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  const baseRegularPrice = Number(product.regularPrice || 345);
  const discountAmount = Number(product.discountPrice || 35); 
  const currentProductUnitPrice = baseRegularPrice - discountAmount; 
  
  const itemsSubtotalAmount = currentProductUnitPrice * quantity;
  const standardShippingCharge = deliveryRegion === "inside-dhaka" ? Number(product.shippingCharge || 20) : Number(product.shippingCharge || 20) + 60;
  const estimatedTotalInvoice = itemsSubtotalAmount + standardShippingCharge;

  const handleSimulatedCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.stock <= 0) {
      toast.error("Product variant is currently out of stock structural levels.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(`Order processing complete! Grand Total: ৳${estimatedTotalInvoice}`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] antialiased tracking-tight pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
     
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
       
          <div className="lg:col-span-7 space-y-12">
            
           
            <div className="grid grid-cols-12 gap-4 items-start">
        
              {activeImages.length > 1 && (
                <div className="col-span-2 space-y-3 max-h-[450px] overflow-y-auto no-scrollbar">
                  {activeImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMainImage(img)}
                      className={`w-full aspect-square bg-[#F3F4F6] border rounded-lg overflow-hidden flex items-center justify-center p-1 transition ${
                        mainImage === img ? 'border-[#111111] ring-1 ring-[#111111]' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
              
             
              <div className={`bg-[#F9FAFB] rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden group ${
                activeImages.length > 1 ? 'col-span-10' : 'col-span-12'
              } aspect-square p-8`}>
                <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest bg-[#111111] text-white px-2.5 py-1 rounded-sm">
                  NEW COLLECTION
                </span>
                {mainImage ? (
                  <img 
                    src={mainImage} 
                    alt={product.productName} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-102"
                  />
                ) : (
                  <ShoppingBag className="w-16 h-16 text-gray-200 stroke-[1]" />
                )}
              </div>
            </div>

          
            <div className="space-y-6 pt-4">
              <h3 className="text-xs font-black uppercase tracking-widest border-b border-gray-100 pb-3 text-left">
                Product Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.isArray(product.specifications) && product.specifications.map((spec: any, idx: number) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-xs space-y-1">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{spec.key}</p>
                    <p className="text-xs font-black text-gray-900">{spec.value}</p>
                  </div>
                ))}
                {!product.specifications?.length && (
                  <>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-xs"><p className="text-[9px] font-bold text-gray-400 uppercase">BATTERY</p><p className="text-xs font-black">4500mAh</p></div>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-xs"><p className="text-[9px] font-bold text-gray-400 uppercase">NOISE CANCEL</p><p className="text-xs font-black">40dB ANC</p></div>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-xs"><p className="text-[9px] font-bold text-gray-400 uppercase">WEIGHT</p><p className="text-xs font-black">260g</p></div>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-xs"><p className="text-[9px] font-bold text-gray-400 uppercase">CONNECTIVITY</p><p className="text-xs font-black">v5.3 LE</p></div>
                  </>
                )}
              </div>
            </div>

          
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-gray-900 text-left">Designed for Immersion</h3>
              <p className="text-xs font-medium text-gray-500 leading-relaxed text-left whitespace-pre-line">
                {product.fullDescription || "The dynamic structural configurations provide premium hand-stitched features alignment tracking systems built purposefully for unmatched industry-leading outputs configuration setup log models."}
              </p>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-8">
            
          
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                <span className="text-[#3B82F6] font-bold hover:underline cursor-pointer">{product.brand || "Ona"}</span>
                <span>•</span>
                <div className="flex items-center text-amber-400 gap-0.5"><Star className="w-3 h-3 fill-current" /> <span className="text-gray-900 text-[11px] font-bold ml-0.5">4.8 (1,242 reviews)</span></div>
              </div>

              <h1 className="text-2xl font-black tracking-tight text-gray-900 leading-none">
                {product.productName || "Wireless Headphone"}
              </h1>

             
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-black text-gray-900">৳{currentProductUnitPrice}</span>
                <span className="text-xs font-semibold text-gray-400 line-through">৳{baseRegularPrice}</span>
                <span className="text-[10px] font-black text-rose-500 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded-sm">
                  {Math.round((discountAmount/baseRegularPrice)*100)}% OFF
                </span>
              </div>

          
              <p className="text-xs text-gray-500 leading-relaxed font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                {product.shortDescription || "Experience uncompromising audio quality. Combines studio-grade sound with all-day comfort and industry-leading performance mechanics."}
              </p>

             
              <div className="grid grid-cols-2 gap-2.5 text-[11px] font-bold text-gray-600 bg-gray-50/50 p-3 rounded-xl border border-dashed border-gray-200">
                <div className="flex items-center gap-2">✓ High sound quality</div>
                <div className="flex items-center gap-2">✓ High battery life</div>
                <div className="flex items-center gap-2">✓ Comfortable fit</div>
                <div className="flex items-center gap-2">✓ Long lifetime</div>
              </div>

          
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Select Finish Color</label>
                <div className="flex items-center gap-3">
                  {[
                    { id: "Midnight Black", hex: "bg-[#111111]" },
                    { id: "Steel Blue", hex: "bg-[#7E96B7]" },
                    { id: "Chalk White", hex: "bg-[#EAEAEA]" }
                  ].map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-6 h-6 rounded-full ${color.hex} relative border border-white flex items-center justify-center transition hover:scale-105 cursor-pointer ring-offset-2 ${
                        selectedColor === color.id ? 'ring-2 ring-gray-900' : ''
                      }`}
                    >
                      {selectedColor === color.id && <Check className="w-3 h-3 text-white mix-blend-difference" />}
                    </button>
                  ))}
                </div>
              </div>

              
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold">
                <div className="flex items-center gap-2.5 bg-white border border-gray-100 p-3 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">WARRANTY</p>
                    <p className="text-gray-900 font-bold text-[10px]">{product.warranty || "6 Months Warranty"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-white border border-gray-100 p-3 rounded-xl">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">LOGISTICS DELIVER</p>
                    <p className="text-gray-900 font-bold text-[10px]">{product.estimatedDelivery || "2-4 Business Days"}</p>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl/5 space-y-5 relative">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <h3 className="text-xs font-black uppercase text-gray-900 tracking-wider">Set Order Checkout</h3>
                <span className="text-[9px] font-mono text-gray-400 bg-gray-50 border px-1.5 py-0.5 rounded">
                  Stock Matrix: {product.stock || 55} left
                </span>
              </div>

              <form onSubmit={handleSimulatedCheckout} className="space-y-4">
                
               
                <div>
                  <label className="block text-[9px] font-black uppercase text-gray-400 tracking-wider mb-1 text-left">
                    Shipping Region Route *
                  </label>
                  <select
                    value={deliveryRegion}
                    onChange={(e) => setDeliveryRegion(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:bg-white focus:outline-[#111111] transition"
                  >
                    <option value="inside-dhaka">🚚 Local Hub (Inside Dhaka Base Rate)</option>
                    <option value="outside-dhaka">🌐 Global Outpost (Outside Dhaka Matrix +৳60)</option>
                  </select>
                </div>

               
                <div className="flex items-center justify-between gap-4 pt-1">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider text-left">Quantity</span>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 shrink-0">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(prev => prev - 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-40 select-none cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center text-xs font-black text-gray-900">{quantity}</span>
                    <button
                      type="button"
                      disabled={quantity >= (product.stock || 55)}
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-40 select-none cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

               
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2 text-xs font-semibold text-gray-500">
                  <div className="flex justify-between items-center">
                    <span>Item Subtotal ({quantity}x)</span>
                    <span className="text-gray-900 font-bold font-mono">৳{itemsSubtotalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping Freight Matrix</span>
                    <span className="text-gray-900 font-bold font-mono">৳{standardShippingCharge}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-2 mt-1 text-gray-900">
                    <span className="text-[10px] font-black uppercase tracking-wide">Estimated Total Invoice</span>
                    <span className="text-sm font-black font-mono">৳{estimatedTotalInvoice}</span>
                  </div>
                </div>

              
                <div className="grid grid-cols-12 gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || product.stock <= 0}
                    className="col-span-10 bg-[#111111] hover:bg-black disabled:bg-gray-200 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Order Now"
                    )}
                  </button>
                  <button
                    type="button"
                    className="col-span-2 border border-gray-200 hover:border-gray-900 rounded-xl flex items-center justify-center bg-white text-gray-700 hover:text-gray-900 transition shadow-xs group cursor-pointer"
                  >
                    <Heart className="w-4 h-4 transition duration-300 group-hover:scale-110 group-hover:fill-rose-500 group-hover:stroke-rose-500" />
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}