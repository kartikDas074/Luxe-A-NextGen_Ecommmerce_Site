"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FileText,
  ImageIcon,
  DollarSign,
  Truck,
  Plus,
  Trash2,
  Tag,
  UploadCloud,
  Layers,
  CheckCircle2,
  AlertCircle,
  Eye,
  Info
} from "lucide-react";
import { addProduct } from "@/lib/server/product";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";


interface Specification {
  key: string;
  value: string;
}

interface ProductFormData {
  sellerId: string;
  productName: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  brand: string;
  regularPrice: number | "";
  discountPrice: number | "";
  stock: number | "";
  sku: string;
  images: string[]; 
  shippingCharge: number | "";
  estimatedDelivery: string;
  specifications: Specification[];
  warranty: string;
  variants: any[]; 
  tags: string[];
  status: "active" | "inactive";
  visibility: "public" | "private";
}

export default function AddProductForm() {
 const {data:session}=useSession();
 const user=session?.user;
  
  const [activeStep, setActiveStep] = useState<number>(1);
  const [currentTagInput, setCurrentTagInput] = useState("");
  const [uploading, setUploading] = useState<boolean[]>([false, false, false, false]);

 
  const [formData, setFormData] = useState<ProductFormData>({
    sellerId: "",
    productName: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    brand: "",
    regularPrice: "",
    discountPrice: "",
    stock: 0,
    sku: "",
    images: ["", "", "", ""], 
    shippingCharge: 0,
    estimatedDelivery: "",
    specifications: [{ key: "", value: "" }],
    warranty: "No Warranty",
    variants: [],
    tags: ["New Arrival"],
    status: "active",
    visibility: "public"
  });

 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith("Price") || name === "stock" || name === "shippingCharge"
        ? (value === "" ? "" : Number(value))
        : value,
    }));
  };

 
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

   
    setUploading((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
    uploadData.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        { method: "POST", body: uploadData }
      );
      const data = await res.json();

      if (data.secure_url) {
        setFormData((prev) => {
          const updatedImages = [...prev.images];
          updatedImages[index] = data.secure_url;
          return { ...prev, images: updatedImages };
        });
        toast.success(`Image Slot ${index + 1} synced.`);
      } else {
        throw new Error("Upload Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to route visual resource asset payload.");
    } finally {
      setUploading((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };


  const clearImageSlot = (index: number) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = "";
      return { ...prev, images: updatedImages };
    });
  };

  
  const handleSpecificationChange = (idx: number, field: "key" | "value", value: string) => {
    setFormData((prev) => {
      const updatedSpecs = [...prev.specifications];
      updatedSpecs[idx][field] = value;
      return { ...prev, specifications: updatedSpecs };
    });
  };

  const addSpecificationRow = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const removeSpecificationRow = (idx: number) => {
    if (formData.specifications.length === 1) {
      setFormData((prev) => ({ ...prev, specifications: [{ key: "", value: "" }] }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== idx),
    }));
  };

 
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTagInput.trim() !== "") {
      e.preventDefault();
      if (!formData.tags.includes(currentTagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, currentTagInput.trim()],
        }));
      }
      setCurrentTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== indexToRemove),
    }));
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productName || !formData.category || !formData.regularPrice) {
      toast.error("Required tracking items inside Step 1 or 2 are missing!");
      return;
    }

    if (!formData.images[0]) {
      toast.error("Primary slot image (Index 0) must be defined as base template!");
      return;
    }

    const payload = {
      ...formData,
      sellerId:user?.id||"",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result=await addProduct(payload);
    if(result.success){
         toast.success("Product successfully pushed to operational stream!");
    }
    else{
        toast.error('Something goes wrong ,plz Try to add the product again later');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />

      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        
        
        <div className="bg-neutral-900 px-8 py-10 text-white relative">
          <div className="relative z-10">
            <h1 className="text-2xl font-black tracking-tight">Product Deployment Engine</h1>
            <p className="text-xs text-neutral-400 mt-1">Easily structure data configurations and distribute to storefront visibility matrix.</p>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden sm:block">
            <Layers className="w-24 h-24" />
          </div>
        </div>

       
        <div className="grid grid-cols-3 border-b bg-neutral-50/50">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`py-4 text-center font-bold text-xs uppercase tracking-wider border-b-2 transition flex items-center justify-center gap-2 ${
              activeStep === 1 ? "border-black text-black bg-white" : "border-transparent text-gray-400 hover:text-black"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-800 font-black">1</span>
            Core Details
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`py-4 text-center font-bold text-xs uppercase tracking-wider border-b-2 transition flex items-center justify-center gap-2 ${
              activeStep === 2 ? "border-black text-black bg-white" : "border-transparent text-gray-400 hover:text-black"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-800 font-black">2</span>
            Logistics & Price
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`py-4 text-center font-bold text-xs uppercase tracking-wider border-b-2 transition flex items-center justify-center gap-2 ${
              activeStep === 3 ? "border-black text-black bg-white" : "border-transparent text-gray-400 hover:text-black"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-800 font-black">3</span>
            Specs & Meta
          </button>
        </div>

       
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
         
          {activeStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2 text-neutral-900 border-b pb-2">
                <FileText className="w-4 h-4 text-neutral-500" />
                <h3 className="text-sm font-black uppercase tracking-wider">Basic Description Info</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase">Product Title / Name *</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      placeholder="e.g., Premium Wireless Active Headphones"
                      className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase">Short Hook Description</label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      placeholder="Catchy brief feature summary..."
                      className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase">Category Allocation *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm bg-white focus:outline-black"
                      required
                    >
                      <option value="">Select Target Group</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Apparel & Clothing">Apparel & Clothing</option>
                      <option value="Home Comfort">Home Comfort</option>
                      <option value="Art & Collectibles">Art & Collectibles</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase">Brand Label</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Brand name if applicable..."
                      className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">Comprehensive Full Description</label>
                <textarea
                  name="fullDescription"
                  rows={5}
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Elaborate details, deep asset context, sizing guide parameters..."
                  className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                />
              </div>

              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" /> Media Gallery Stack <span className="text-neutral-400 lowercase">(Max 4 items)</span>
                  </label>
                  <span className="text-[10px] bg-neutral-100 text-neutral-800 font-bold px-2 py-0.5 rounded-full">Index Flat Array Configuration</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {formData.images.map((imgUrl, index) => (
                    <div key={index} className="space-y-1">
                      <div className="border border-neutral-200 rounded-2xl aspect-square flex flex-col items-center justify-center relative overflow-hidden bg-neutral-50/50 hover:bg-neutral-50 group transition">
                        {imgUrl ? (
                          <>
                            <img src={imgUrl} alt={`Asset slot ${index}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => clearImageSlot(index)}
                              className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-lg text-[9px] opacity-0 group-hover:opacity-100 transition"
                            >
                              ✕ Remove
                            </button>
                          </>
                        ) : (
                          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, index)}
                              className="hidden"
                            />
                            {uploading[index] ? (
                              <span className="text-[10px] font-bold text-neutral-500 animate-pulse">Uploading...</span>
                            ) : (
                              <>
                                <UploadCloud className="w-5 h-5 text-gray-400 mb-1" />
                                <span className="text-[10px] font-bold text-gray-500">Slot {index + 1}</span>
                                {index === 0 && <span className="text-[8px] font-black uppercase text-amber-700 mt-0.5 tracking-wide">(Thumbnail)</span>}
                              </>
                            )}
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

       
          {activeStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2 text-neutral-900 border-b pb-2">
                <DollarSign className="w-4 h-4 text-neutral-500" />
                <h3 className="text-sm font-black uppercase tracking-wider">Pricing, Inventory & Distribution channels</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">Regular Price *</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-bold">৳</span>
                    <input
                      type="number"
                      name="regularPrice"
                      value={formData.regularPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="pl-8 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">Discount Price</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-bold">৳</span>
                    <input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="pl-8 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">Stock Capacity Available</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">Inventory Unit SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. LUX-AUDIO-HEADPHONE"
                    className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-neutral-900 border-b pb-2 pt-2">
                <Truck className="w-4 h-4 text-neutral-500" />
                <h3 className="text-sm font-black uppercase tracking-wider">Logistics Control System</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">Flat Shipping Charge</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-bold">৳</span>
                    <input
                      type="number"
                      name="shippingCharge"
                      value={formData.shippingCharge}
                      onChange={handleChange}
                      className="pl-8 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">Estimated Delivery Window</label>
                  <input
                    type="text"
                    name="estimatedDelivery"
                    value={formData.estimatedDelivery}
                    onChange={handleChange}
                    placeholder="e.g., 2-4 business days inside Dhaka"
                    className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-black"
                  />
                </div>
              </div>
            </div>
          )}

        
          {activeStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2 text-neutral-900">
                  <AlertCircle className="w-4 h-4 text-neutral-500" />
                  <h3 className="text-sm font-black uppercase tracking-wider">Product Specifications</h3>
                </div>
                <button
                  type="button"
                  onClick={addSpecificationRow}
                  className="bg-black text-white hover:bg-gray-800 text-[10px] uppercase font-black tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Row
                </button>
              </div>

              <div className="space-y-3">
                {formData.specifications.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 animate-fade-in">
                    <input
                      type="text"
                      placeholder="Property Name (e.g. Battery Capacity)"
                      value={spec.key}
                      onChange={(e) => handleSpecificationChange(idx, "key", e.target.value)}
                      className="w-1/2 border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-black"
                    />
                    <input
                      type="text"
                      placeholder="Property Value (e.g. 4500 mAh)"
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(idx, "value", e.target.value)}
                      className="w-1/2 border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-black"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecificationRow(idx)}
                      className="text-gray-400 hover:text-rose-600 p-2 border border-gray-100 rounded-xl hover:bg-neutral-50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">Warranty Support</label>
                  <select
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-200 rounded-xl p-3 text-sm bg-white focus:outline-black"
                  >
                    <option value="No Warranty">No Warranty Policy</option>
                    <option value="6 Months Replacement">6 Months Local Replacement</option>
                    <option value="1 Year Brand Warranty">1 Year Official Warranty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase">Meta Visibility Matrix</label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <select
                      name="visibility"
                      value={formData.visibility}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-xl p-3 text-sm bg-white focus:outline-black font-semibold text-gray-700"
                    >
                      <option value="public">🌐 Public View</option>
                      <option value="private">🔒 Private/Hidden</option>
                    </select>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-xl p-3 text-sm bg-white focus:outline-black font-semibold text-gray-700"
                    >
                      <option value="active">🟢 Active Inventory</option>
                      <option value="inactive">🔴 Inactive Stock</option>
                    </select>
                  </div>
                </div>
              </div>

             
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Direct Index Tags Mapping
                </label>
                
                <div className="flex flex-wrap gap-1.5 py-1">
                  {formData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-neutral-200"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="text-neutral-400 hover:text-black font-bold ml-0.5 text-[10px]"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Type term and hit Enter key..."
                  value={currentTagInput}
                  onChange={(e) => setCurrentTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="block w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-black"
                />
              </div>
            </div>
          )}

         
          <div className="flex justify-between items-center border-t pt-6 mt-4">
            <button
              type="button"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => prev - 1)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer"
            >
              Back
            </button>

            {activeStep < 3 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => prev + 1)}
                className="bg-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition cursor-pointer"
              >
                Continue Step
              </button>
            ) : (
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 transition shadow-md cursor-pointer animate-pulse"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Data Payload
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}