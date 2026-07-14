"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Store,
  User,
  FileText,
  CheckCircle,
  UploadCloud,
  ArrowRight,
  ArrowLeft,
  Building,
  Check,
} from "lucide-react";
import { CompanyReg } from "@/lib/server/companyReg";
import { useRouter } from "next/navigation";

interface FormData {
  userId:string,
  shopName: string;
  shopDescription: string;
  shopCategory: string;
  shopLogo: string;
  shopBanner: string;
  ownerName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  preferredCurrency: string;
  preferredLanguage: string;
  agreeToStripe: boolean;
  agreeToCommission: boolean;
  agreeToTerms: boolean;
  status: "pending" | "approved" | "rejected";
}

export default function Registration({ userId }: { userId: string }) {
  const [step, setStep] = useState<number>(1);
  const [uploading, setUploading] = useState<{
    logo: boolean;
    banner: boolean;
  }>({
    logo: false,
    banner: false,
  });

  const [formData, setFormData] = useState<FormData>({
    userId:userId,
    shopName: "",
    shopDescription: "",
    shopCategory: "",
    shopLogo: "",
    shopBanner: "",
    ownerName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "United States",
    preferredCurrency: "USD",
    preferredLanguage: "English (US)",
    agreeToStripe: false,
    agreeToCommission: false,
    agreeToTerms: false,
    status: "pending",
  });

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "logo") setLogoPreview(URL.createObjectURL(file));
    if (type === "banner") setBannerPreview(URL.createObjectURL(file));

    setUploading((prev) => ({ ...prev, [type]: true }));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
    data.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUD_NAME}`);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data },
      );
      const resData = await res.json();

      if (resData.secure_url) {
        setFormData((prev) => ({
          ...prev,
          [type === "logo" ? "shopLogo" : "shopBanner"]: resData.secure_url,
        }));
        toast.success(
          `${type === "logo" ? "Shop Logo" : "Shop Banner"} uploaded successfully!`,
        );
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error("There is a problem uploading the image");
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      if (
        !formData.shopName ||
        !formData.shopDescription ||
        !formData.shopCategory ||
        !formData.shopLogo ||
        !formData.shopBanner
      ) {
        toast.error(
          "Please fill in all shop information fields and upload required visuals.",
        );
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.ownerName ||
        !formData.businessEmail ||
        !formData.businessPhone ||
        !formData.businessAddress ||
        !formData.city ||
        !formData.stateProvince ||
        !formData.postalCode
      ) {
        toast.error(
          "Please fill up all owner and business placement information fields.",
        );
        return false;
      }
    } else if (step === 3) {
      if (
        !formData.agreeToStripe ||
        !formData.agreeToCommission ||
        !formData.agreeToTerms
      ) {
        toast.error(
          "You must agree to all conditions and policies to proceed.",
        );
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  const router=useRouter();
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
       const result=await CompanyReg(formData);
      if(result.success){
        toast.success('Your Register company request is successfully submited. Wait for the company Verifaction by admin.')
        router.refresh();
      }else{
        toast.error('Something Goes Wrong Plz try again Later');
        router.refresh();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
      />

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-10">
        {step <= 4 && (
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center sm:text-left">
              Become a Seller
            </h1>
            <p className="mt-2 text-sm text-gray-600 text-center sm:text-left">
              Start selling your products by creating your shop. Complete the
              application below for review and approval.
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
              {[
                { label: "Shop Information", icon: Store, currentStep: 1 },
                { label: "Business Information", icon: User, currentStep: 2 },
                { label: "Verification", icon: FileText, currentStep: 3 },
                { label: "Review & Submit", icon: CheckCircle, currentStep: 4 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center w-full sm:w-auto">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition ${
                        step >= item.currentStep
                          ? "bg-black border-black text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {step > item.currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        item.currentStep
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${step >= item.currentStep ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className="hidden sm:block flex-1 h-0.5 bg-gray-200 w-12 mx-4" />
                  )}
                </div>
              ))}
            </div>
            <hr className="mt-8 border-gray-200" />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div className="border border-gray-100 p-6 rounded-xl bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <Store className="w-5 h-5 text-gray-600" /> Shop Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      placeholder="e.g. Minimalist Home Decor"
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Shop Description
                    </label>
                    <textarea
                      name="shopDescription"
                      rows={3}
                      value={formData.shopDescription}
                      onChange={handleChange}
                      placeholder="Describe your brand and what makes your products unique..."
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Shop Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        "Art & Collectibles",
                        "Fashion & Accessories",
                        "Home & Living",
                      ].map((cat) => (
                        <label
                          key={cat}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer text-sm font-medium transition ${
                            formData.shopCategory === cat
                              ? "border-black bg-gray-50"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shopCategory"
                            value={cat}
                            checked={formData.shopCategory === cat}
                            onChange={handleChange}
                            className="mr-2 accent-black"
                          />
                          {cat}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Logo Picker */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Shop Logo Upload
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "logo")}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="mx-auto h-20 w-20 object-cover rounded-md"
                          />
                        ) : (
                          <div className="space-y-1 text-gray-500">
                            <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="text-xs font-medium">
                              Drag and drop or click to upload logo
                            </p>
                            <p className="text-[10px] text-gray-400">
                              Recommended: 500x500px PNG/JPG
                            </p>
                          </div>
                        )}
                        {uploading.logo && (
                          <p className="text-xs text-blue-500 mt-1">
                            Uploading...
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Banner Picker */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Shop Banner Upload
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "banner")}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {bannerPreview ? (
                          <img
                            src={bannerPreview}
                            alt="Banner preview"
                            className="mx-auto h-20 w-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="space-y-1 text-gray-500">
                            <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="text-xs font-medium">
                              Drag and drop or click to upload banner
                            </p>
                            <p className="text-[10px] text-gray-400">
                              Recommended: 1200x400px
                            </p>
                          </div>
                        )}
                        {uploading.banner && (
                          <p className="text-xs text-blue-500 mt-1">
                            Uploading...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 p-6 rounded-xl bg-gray-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Preferred Currency
                  </label>
                  <select
                    name="preferredCurrency"
                    value={formData.preferredCurrency}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-black"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="BDT">BDT - Bangladeshi Taka</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Preferred Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-black"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Bengali">Bengali</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-black text-white px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="border border-gray-100 p-6 rounded-xl bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <Building className="w-5 h-5 text-gray-600" /> Business
                  Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Owner Full Name
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Business Email
                    </label>
                    <input
                      type="email"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      placeholder="contact@business.com"
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Business Phone Number
                    </label>
                    <input
                      type="text"
                      name="businessPhone"
                      value={formData.businessPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Business Address
                    </label>
                    <input
                      type="text"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                      placeholder="123 Business St"
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleChange}
                      placeholder="State"
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="12345"
                      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-black"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-black"
                  >
                    <option value="United States">United States</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-black text-white px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-800 transition"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 border border-gray-200 p-6 rounded-xl bg-white space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Seller Agreement & Payment Policy
                </h2>
                <p className="text-xs text-gray-500">
                  Review and accept the marketplace payment policies before
                  activating your account.
                </p>

                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 border-t pt-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      01 Free Registration
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Sellers can list products at no upfront cost. There are no
                      monthly subscription fees for basic merchant accounts on
                      the platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      02 Commission-Based Sales
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Platform retains a flat 12% commission on all successful
                      sales. This fee covers payment processing, platform
                      maintenance, and fraud security checks.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      03 Payout Schedules
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Funds are settled into your nominated account every
                      Tuesday for all orders marked as "Delivered" at least 3
                      days prior.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      04 Authenticity Requirements
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      All premium or customized architectural layout templates
                      must maintain proper licensing models.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 p-6 rounded-xl bg-gray-50/50 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-2">
                    <div className="w-2 h-2 mt-1.5 bg-blue-600 rounded-full shrink-0" />
                    <p className="text-[11px] text-blue-800 font-medium">
                      Secure Integration: All payments are processed securely
                      through Stripe technology.
                    </p>
                  </div>

                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                    Seller Confirmation
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-start gap-2.5 p-3 bg-white border rounded-lg cursor-pointer text-xs text-gray-700">
                      <input
                        type="checkbox"
                        name="agreeToStripe"
                        checked={formData.agreeToStripe}
                        onChange={handleCheckboxChange}
                        className="mt-0.5 accent-black shrink-0"
                      />
                      <span>
                        I understand that all customer payments are processed
                        securely through Stripe.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 bg-white border rounded-lg cursor-pointer text-xs text-gray-700">
                      <input
                        type="checkbox"
                        name="agreeToCommission"
                        checked={formData.agreeToCommission}
                        onChange={handleCheckboxChange}
                        className="mt-0.5 accent-black shrink-0"
                      />
                      <span>
                        I understand that platform deducts a 12% commission from
                        every successful sale.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 p-3 bg-white border rounded-lg cursor-pointer text-xs text-gray-700">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleCheckboxChange}
                        className="mt-0.5 accent-black shrink-0"
                      />
                      <span>
                        I agree to all Seller Terms & Marketplace Policies.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-black text-white py-2.5 rounded-lg font-medium text-xs text-center block hover:bg-gray-800 transition"
                  >
                    Continue to Review
                  </button>
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-xs text-center block bg-white hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="border border-yellow-200 bg-yellow-50/50 p-4 rounded-lg text-sm text-yellow-800 font-medium">
                ⚠️ Please double-check all details below before finalizing.
                Submitting will register your profile immediately into our
                validation workspace.
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-900 text-white p-4 font-bold text-sm flex items-center justify-between">
                  <span>Application Summary Review</span>
                  <span className="bg-yellow-500 text-black px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase">
                    Initial Status: Pending
                  </span>
                </div>

                <div className="p-6 space-y-6 bg-white">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-1 mb-3">
                      Shop Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-gray-500 block">
                          Name & Category
                        </span>
                        <p className="text-sm font-semibold text-gray-900">
                          {formData.shopName}
                        </p>
                        <p className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1">
                          {formData.shopCategory}
                        </p>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <span className="text-xs text-gray-500 block">
                          Description
                        </span>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {formData.shopDescription}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {formData.shopLogo && (
                        <div>
                          <span className="text-xs text-gray-500 block mb-1">
                            Logo Asset
                          </span>
                          <img
                            src={formData.shopLogo}
                            alt="Logo"
                            className="h-16 w-16 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                      {formData.shopBanner && (
                        <div>
                          <span className="text-xs text-gray-500 block mb-1">
                            Banner Asset
                          </span>
                          <img
                            src={formData.shopBanner}
                            alt="Banner"
                            className="h-16 w-full max-w-xs object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-1 mb-3">
                      Corporate & Placement Info
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 block">
                          Owner Name
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          {formData.ownerName}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block">
                          Contact Email
                        </span>
                        <p className="text-sm font-medium text-gray-900 break-all">
                          {formData.businessEmail}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block">
                          Phone
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          {formData.businessPhone}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block">
                          Location
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          {formData.city}, {formData.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-1 mb-3">
                      System Constants
                    </h3>
                    <div className="flex gap-6 text-xs font-semibold text-gray-700">
                      <p>
                        Currency:{" "}
                        <span className="text-black font-normal">
                          {formData.preferredCurrency}
                        </span>
                      </p>
                      <p>
                        Language:{" "}
                        <span className="text-black font-normal">
                          {formData.preferredLanguage}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Edit
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-800 transition shadow-md"
                >
                  Accept & Activate Seller Account
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
