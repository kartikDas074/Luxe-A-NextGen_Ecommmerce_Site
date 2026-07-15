"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Store, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  UserCheck, 
  ThumbsUp, 
  Headphones, 
  Smartphone, 
  TrendingUp,
  Award, 
  Eye, 
  Zap, 
  Heart, 
  Lock, 
  BarChart3, 
  Users,
  ChevronRight, 
  ChevronDown, 
  Star, 
  Mail, 
  ArrowRight,
  Package,
  Layers,
  CheckCircle2
} from "lucide-react";


export default function AboutUsPage() {
 
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

 
  const stats = [
    { value: "50,000+", label: "Products", icon: <Package className="w-5 h-5 text-blue-600" /> },
    { value: "8,000+", label: "Happy Customers", icon: <Heart className="w-5 h-5 text-blue-600" /> },
    { value: "1,200+", label: "Verified Sellers", icon: <Store className="w-5 h-5 text-blue-600" /> },
    { value: "99%", label: "Satisfaction Rate", icon: <ThumbsUp className="w-5 h-5 text-blue-600" /> },
    { value: "25+", label: "Categories", icon: <Layers className="w-5 h-5 text-blue-600" /> }
  ];

 
  const sellerBenefits = [
    "Free Seller Registration", "Easy Store Management", 
    "Secure Stripe Payments", "Advanced Seller Dashboard", 
    "Inventory Management Tools", "Real-time Order Tracking", 
    "Deep Sales Analytics", "Business Growth Opportunities"
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased font-sans overflow-x-hidden">
      
     
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
       
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full filter blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
           
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-blue-100 text-blue-700 border border-blue-200 uppercase">
                🚀 Welcome to LUXE Universe
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-none uppercase">
                Redefining Online <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Shopping Experience</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                LUXE is more than an online marketplace. We empower businesses, support verified sellers, and deliver an exceptional shopping experience for millions of customers through quality products, secure payments, and fast delivery.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition duration-300 transform active:scale-95 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer">
                  <ShoppingBag className="w-4 h-4" /> Start Shopping
                </button>
                <button className="bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition duration-300 transform active:scale-95 shadow-xs flex items-center gap-2 cursor-pointer">
                  <Store className="w-4 h-4" /> Become a Seller
                </button>
              </div>
            </div>

          
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="relative w-full max-w-lg aspect-square bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl border border-blue-100 p-8 shadow-inner flex items-center justify-center group">
               
                <div className="absolute top-8 left-8 bg-white border border-gray-100 p-4 rounded-2xl shadow-md transform -rotate-6 group-hover:rotate-0 transition duration-500">
                  <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="text-[10px] font-black uppercase tracking-wider mt-2">100% Verified</p>
                </div>
                <div className="absolute bottom-8 right-8 bg-white border border-gray-100 p-4 rounded-2xl shadow-md transform rotate-6 group-hover:rotate-0 transition duration-500">
                  <CreditCard className="w-8 h-8 text-blue-500 mx-auto" />
                  <p className="text-[10px] font-black uppercase tracking-wider mt-2">Stripe Secured</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl w-64 text-center">
                  <ShoppingBag className="w-16 h-16 text-blue-600 mx-auto animate-bounce" />
                  <div className="mt-4 font-black text-xl tracking-tight">LUXE HUB</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Multi-Vendor Mesh Network</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

     
      <section className="py-20 bg-white border-y border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
           
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-center gap-4 relative shadow-xs">
                <div className="flex items-center gap-3 bg-white p-3 border border-gray-100 rounded-xl shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-auto">System Operational</span>
                </div>
                <div className="bg-white p-4 border border-gray-100 rounded-xl space-y-2 shadow-xs">
                  <div className="h-2 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-blue-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
                <div className="bg-white p-4 border border-gray-100 rounded-xl space-y-2 shadow-xs">
                  <div className="h-2 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-indigo-100 rounded w-4/5" />
                </div>
              </div>
            </div>

          
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">Core Engine Architecture</span>
              <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Who We Are</h2>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <p className="text-base text-gray-600 font-medium leading-relaxed pt-2">
                LUXE is a next-generation multi-vendor marketplace designed to create trust between buyers and sellers. 
              </p>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Our platform enables verified businesses to showcase their products while customers enjoy secure shopping, transparent pricing, fast delivery, and reliable customer service.
              </p>
            </div>

          </div>
        </div>
      </section>

     
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
         
          <div className="bg-white border border-gray-200/80 rounded-2xl p-8 shadow-xs hover:shadow-lg transition duration-300 relative overflow-hidden text-left flex flex-col justify-between group">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Our Mission</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed italic group-hover:text-gray-600 transition">
                "Our mission is to empower businesses of every size by providing a secure, scalable, and customer-focused marketplace where quality products meet exceptional service."
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-8 shadow-xs hover:shadow-lg transition duration-300 relative overflow-hidden text-left flex flex-col justify-between group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Our Vision</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed italic group-hover:text-gray-600 transition">
                "Our vision is to become one of the most trusted global online marketplaces by creating opportunities for entrepreneurs and delivering happiness to customers."
              </p>
            </div>
          </div>

        </div>
      </section>

  
      <section className="py-20 bg-white border-t border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Engine Features</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Why Choose LUXE</h2>
            <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {[
              { title: "Verified Sellers", desc: "Every seller is reviewed before joining our marketplace.", icon: <UserCheck className="w-5 h-5 text-blue-600" /> },
              { title: "Secure Payments", desc: "Safe online payment ecosystems with full Stripe matrix validation.", icon: <Lock className="w-5 h-5 text-blue-600" /> },
              { title: "Fast Delivery", desc: "Reliable shipping partners operating on strict SLA standards.", icon: <Truck className="w-5 h-5 text-blue-600" /> },
              { title: "Buyer Protection", desc: "Secure purchases packed with customer-friendly policies.", icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
              { title: "Quality Products", desc: "Only trusted businesses with verified supply lineages can sell.", icon: <Award className="w-5 h-5 text-blue-600" /> },
              { title: "24/7 Customer Support", desc: "Dedicated core support nodes whenever customers need help.", icon: <Headphones className="w-5 h-5 text-blue-600" /> },
              { title: "Modern Experience", desc: "Highly optimized responsive UI with absolute layout flow.", icon: <Smartphone className="w-5 h-5 text-blue-600" /> },
              { title: "Growing Marketplace", desc: "Thousands of products deployed across highly diverse categories.", icon: <TrendingUp className="w-5 h-5 text-blue-600" /> }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 hover:bg-white hover:shadow-md hover:border-blue-200 transition duration-300 text-left space-y-3">
                <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-xs">
                  {feature.icon}
                </div>
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">{feature.title}</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gray-50 border-y border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Foundational DNA</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Our Values</h2>
            <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Trust", "Transparency", "Innovation", "Customer Satisfaction", "Quality", "Security", "Growth", "Community"].map((val, idx) => (
              <div key={idx} className="bg-white border border-gray-200/80 rounded-xl p-4 text-center hover:border-black transition duration-200 font-bold text-xs uppercase tracking-wider text-gray-800 shadow-xs">
                {val}
              </div>
            ))}
          </div>

        </div>
      </section>

     
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-neutral-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-950/40 via-transparent to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 items-center text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2 flex flex-col items-center justify-center">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">{stat.value}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-20 bg-gray-50 border-t border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Pipeline Pipeline Workflow</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">How LUXE Works</h2>
            <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: "Step 1", title: "Seller Registration", desc: "Businesses submit targeted applications to become verified vendor elements.", icon: <Store className="w-5 h-5 text-blue-600" /> },
              { step: "Step 2", title: "Verification", desc: "LUXE security blocks review documentation matrix and pipeline details.", icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
              { step: "Step 3", title: "Product Listing", desc: "Approved sellers push active inventories to global network storefront catalogs.", icon: <Package className="w-5 h-5 text-blue-600" /> },
              { step: "Step 4", title: "Secure Shopping", desc: "Global end-users browse, execute purchases via encrypted processing links.", icon: <ShoppingBag className="w-5 h-5 text-blue-600" /> }
            ].map((node, idx) => (
              <div key={idx} className="bg-white border border-gray-200/80 rounded-2xl p-6 text-left space-y-4 shadow-xs relative group hover:border-blue-600 transition duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded">
                    {node.step}
                  </span>
                  {idx < 3 && (
                    <ChevronRight className="w-4 h-4 text-gray-300 hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-20 bg-gray-50 rounded-full border border-gray-200" />
                  )}
                </div>
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center">
                  {node.icon}
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">{node.title}</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

   
      <section className="py-20 bg-white border-y border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-tr from-gray-50 to-blue-50/30 border border-gray-200/80 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Merchant Protocol Incentive</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Why Sell On LUXE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {sellerBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer active:scale-95">
                <Store className="w-4 h-4" /> Become a Seller Now
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md max-w-xs space-y-4 w-full">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-black uppercase tracking-wider">Merchant Console</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold"><span>Total Net Payout</span> <span>Live Tracking</span></div>
                <div className="text-2xl font-black font-mono">৳4,85,900</div>
                <div className="w-full bg-gray-100 h-2 rounded overflow-hidden"><div className="bg-emerald-500 h-full w-3/4 rounded" /></div>
              </div>
            </div>
          </div>

        </div>
      </section>

   
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <Zap className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Our Executive Oath</h3>
          <p className="text-sm sm:text-base text-gray-700 font-bold max-w-2xl mx-auto leading-relaxed">
            "We promise to maintain a marketplace built on trust, transparency, fairness, and innovation while continuously improving the shopping experience for every customer and seller."
          </p>
        </div>
      </section>

     
      <section className="py-20 bg-white border-t border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Ecosystem Reviews</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Customer Testimonials</h2>
            <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Tahmid Rahman", role: "Tech Consultant", text: "LUXE er delivery speed and product authentic checking setup extreme standard. Marketplace a genuine products pawa jay ekhon." },
              { name: "Nusrat Jahan", role: "Boutique Owner", text: "Seller dashboard functions khub seamless. Inventory management theke shuru kore Stripe automation automatic clear data flow provide kore." },
              { name: "Abrar Fahim", role: "Daily Consumer", text: "Electronics categories and customer protection rules extremely fair. Customer service panel validation standard real-time handle hoy." }
            ].map((review, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6 text-left space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed italic">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-4">
                  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs uppercase shadow-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-black text-gray-900">{review.name}</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    
      <section className="py-20 bg-gray-50 border-t border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Support Knowledgebase</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Frequently Asked Questions</h2>
            <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
          </div>

          <div className="space-y-3">
            {[
              { q: "What is LUXE?", a: "LUXE is an advanced next-gen multi-vendor e-commerce platform mapping certified micro-sellers and major business entities directly to end consumers with absolute safety parameters." },
              { q: "How do I become a seller?", a: "Simply trigger the 'Become a Seller' interface protocol, deploy your authentication matrices, tax paperwork details, and await processing team feedback within 24-48 hours." },
              { q: "How are payments secured?", a: "All operational payment operations undergo strict cryptographic segmentation via native Stripe API routing. No credit details hit persistent memory." },
              { q: "Can I return products?", a: "Yes, our generalized Buyer Protection framework guarantees a fluid item returns capability window on items failing vendor profile standards." },
              { q: "How does seller verification work?", a: "The validation node tracks registration integrity, storage location capabilities, item origin, and past transaction feedback tracking before issuing green badges." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs transition duration-200">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between font-black text-xs uppercase text-gray-800 tracking-wide text-left hover:bg-gray-50 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-gray-500 font-medium leading-relaxed border-t border-gray-50 pt-3 text-left bg-gray-50/50 animate-fadeIn">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:6rem] opacity-[0.03]" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Join the LUXE Community Today</h2>
            <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
              Whether you're looking for amazing products or planning to grow your business online, LUXE is the perfect marketplace ecosystem for you.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button className="bg-white hover:bg-gray-100 text-blue-700 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition active:scale-95 cursor-pointer flex items-center gap-1.5">
                Start Shopping <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white/80 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition active:scale-95 cursor-pointer flex items-center gap-1.5">
                Become a Seller <Store className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}