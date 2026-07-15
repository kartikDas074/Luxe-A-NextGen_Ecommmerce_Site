"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  User, 
  Briefcase, 
  ShoppingBag, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  Cookie, 
  Share2, 
  UserX, 
  AlertCircle, 
  Server, 
  Database, 
  Mail, 
  Calendar,
  ChevronRight,
  ExternalLink,
  Menu,
  X
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("section-2");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

 
  const tocItems = [
    { id: "section-2", label: "Introduction", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "section-3", label: "Information We Collect", icon: <User className="w-3.5 h-3.5" /> },
    { id: "section-4", label: "How We Use Data", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: "section-5", label: "Information Sharing", icon: <Share2 className="w-3.5 h-3.5" /> },
    { id: "section-6", label: "Cookies Management", icon: <Cookie className="w-3.5 h-3.5" /> },
    { id: "section-7", label: "Data Security Node", icon: <Lock className="w-3.5 h-3.5" /> },
    { id: "section-8", label: "Your Legal Rights", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: "section-9", label: "Seller Privacy Guidelines", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: "section-10", label: "Children's Privacy", icon: <UserX className="w-3.5 h-3.5" /> },
    { id: "section-11", label: "Third-Party Services", icon: <Server className="w-3.5 h-3.5" /> },
    { id: "section-12", label: "Data Retention Laws", icon: <Database className="w-3.5 h-3.5" /> },
    { id: "section-13", label: "Policy Updates", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "section-14", label: "Contact Information", icon: <Mail className="w-3.5 h-3.5" /> }
  ];

 
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // Adjust offset for top navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileNavOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased font-sans overflow-x-hidden">
      
     
      <section className="relative bg-gradient-to-b from-blue-50/60 via-white to-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200/50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/10 rounded-full filter blur-3xl animate-pulse" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
         
            <div className="lg:col-span-8 space-y-5 text-left">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-blue-100 text-blue-700 border border-blue-200/60 uppercase">
                🛡️ Legal Operations Matrix
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight uppercase">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Policy</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-2xl">
                Your privacy matters to us. This Privacy Policy explains how LUXE collects, uses, stores, protects, and shares your personal information while using our marketplace.
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Last Updated: April 15, 2026</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Effective Date: Immediate</span>
              </div>
            </div>

          
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl w-64 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto border border-blue-100">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-xs uppercase tracking-wider">Luxe Safe Harbor</h3>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">System-wide data streams encrypted with TLS 1.3 cryptographic nodes</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Document Outline</span>
        <button 
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
        >
          {mobileNavOpen ? <X className="w-4 h-4 text-gray-900" /> : <Menu className="w-4 h-4 text-gray-900" />}
        </button>
      </div>

   
      {mobileNavOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg px-4 py-3 space-y-1 max-h-[300px] overflow-y-auto animate-fadeIn z-30 relative">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-bold transition-all ${
                activeSection === item.id ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

    
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
        
          <aside className="hidden lg:block lg:col-span-3 sticky top-10 space-y-4 text-left border border-gray-200/80 rounded-2xl bg-white p-5 shadow-xs">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-3">
              Document Index
            </h4>
            <div className="space-y-1.5">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeSection === item.id 
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 pl-4" 
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50/50"
                  }`}
                >
                  <span className={`${activeSection === item.id ? "text-blue-600" : "text-gray-400"}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </aside>

        
          <main className="col-span-1 lg:col-span-9 space-y-16 text-left">
            
           
            <section id="section-2" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">1. Introduction</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  LUXE ("we," "our," or "the Platform") respects every user's privacy. We are committed to safeguarding your data through strict security controls and transparent operations.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  This Privacy Policy applies to buyers, sellers, and general visitors using our multi-vendor marketplace ecosystem. By accessing or using the services of LUXE, you agree to the collection, tracking, and processing mechanisms outlined herein.
                </p>
              </div>
            </section>

           
            <section id="section-3" className="space-y-5 scroll-mt-20">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">2. Information We Collect</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
           
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <User className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-800">Personal Information</h3>
                  </div>
                  <ul className="space-y-2 text-xs font-bold text-gray-500">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Full Name</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Email Address</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Phone Number</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Shipping & Billing Address</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Profile Photo URL</li>
                  </ul>
                </div>

               
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-800">Business Info (Seller)</h3>
                  </div>
                  <ul className="space-y-2 text-xs font-bold text-gray-500">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Registered Business Name</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Commercial Business Address</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Tax Identification Numbers</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Payment & Settlement Account Details</li>
                  </ul>
                </div>

            
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-gray-800">Order Information</h3>
                  </div>
                  <ul className="space-y-2 text-xs font-bold text-gray-500">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Products Purchased History</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Order Tracking IDs & Status</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Return & Refund History</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Shipping & Fulfillment Data</li>
                  </ul>
                </div>

             
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3.5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <h3 className="text-xs font-black uppercase tracking-wider text-gray-800">Payment Information</h3>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-3">
                      All transaction payments are securely processed through Stripe API. LUXE never saves, stores, or processes complete credit card numbers or raw banking parameters in our own database.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            
            <section id="section-4" className="space-y-5 scroll-mt-20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">3. How We Use Data</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Process Orders", desc: "Manage transaction fulfillment and package shipment." },
                  { title: "Manage Accounts", desc: "Verify vendor listings and consumer configurations." },
                  { title: "Improve UI/UX", desc: "Refine client interfaces and catalog algorithms." },
                  { title: "Customer Support", desc: "Resolve help requests via dedicated ticket nodes." },
                  { title: "Fraud Prevention", desc: "Track transaction sequences to block fraudulent entities." },
                  { title: "Order Alerts", desc: "Auto-send real-time status updates and delivery notifications." },
                  { title: "Marketing Updates", desc: "Promotional newsletters sent only with customer consent." },
                  { title: "Platform Security", desc: "Continuous threat vector monitoring and access control." }
                ].map((use, idx) => (
                  <div key={idx} className="bg-white border border-gray-200/80 rounded-xl p-4 space-y-2 text-left shadow-xs">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-900">{use.title}</h4>
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{use.desc}</p>
                  </div>
                ))}
              </div>
            </section>

         
            <section id="section-5" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">4. Information Sharing</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  <strong className="text-gray-900">LUXE does NOT sell users' personal information.</strong> We value ecosystem trust and consumer privacy above everything.
                </p>
                <div className="space-y-2 text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Authorized Data Recipients</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs font-bold text-gray-600">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Payment Processors (Stripe)</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Logistics & Shipping Partners</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Legal Authorities (when required)</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Verified System Service Providers</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="section-6" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">5. Cookies Management</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  We use cookies to optimize interface navigation, maintain shopping cart state memory, and analyze traffic logs dynamically.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Remember Login", "Shopping Cart", "Language Preference", "Performance Analytics"].map((cookieType, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-center text-[10px] font-black uppercase tracking-wider text-gray-500">
                      🍪 {cookieType}
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-start">
                  <button className="bg-gray-950 hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition cursor-pointer active:scale-95">
                    Manage Cookies Preference
                  </button>
                </div>
              </div>
            </section>

          
            <section id="section-7" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">6. Data Security Node</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              
              <div className="bg-gradient-to-tr from-gray-950 via-neutral-900 to-slate-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-lg">
                <div className="space-y-2">
                  <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">Protection Infrastructure</span>
                  <h3 className="text-lg font-black uppercase">Continuous Security Shield</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-neutral-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Complete SSL Encryption Layer</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Stripe-certified Payment Pipelines</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Cryptographic Salt Password Hashing</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Secure Multi-Factor Logins</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Database Security Firewalls</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Automated Threat Detection Systems</div>
                </div>
              </div>
            </section>

         
            <section id="section-8" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">7. Your Legal Rights</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { title: "View & Access", desc: "Request details regarding what personal information is currently registered in our database." },
                  { title: "Update & Correct", desc: "Modify profile details, shipping records, or system preferences at any point." },
                  { title: "Delete & Export", desc: "Trigger account deletion or request a structured data copy format to export." }
                ].map((right, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 text-left shadow-xs">
                    <h4 className="text-xs font-black uppercase tracking-tight text-gray-900">{right.title}</h4>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{right.desc}</p>
                  </div>
                ))}
              </div>
            </section>

        
            <section id="section-9" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">8. Seller Privacy Guidelines</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  We gather specific operational details from merchants registering to sell products on LUXE to verify store legitimacy, secure business transactions, and maintain tax compliance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-gray-600">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Government Business Validation</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Store Profile & Location Information</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Bank Payout Routing Channels</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Aggregated Performance Analytics</div>
                </div>
              </div>
            </section>

          
            <section id="section-10" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <UserX className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">9. Children's Privacy</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex gap-4 items-start shadow-xs">
                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  LUXE is not designed for children under 13 years of age. Users under 13 years old should not use the platform without active parental supervision or legal guardian guidance.
                </p>
              </div>
            </section>

          
            <section id="section-11" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">10. Third-Party Services</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Our system architecture utilizes secure external processors to provide database services, media delivery, shipping routes, and payments:
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Stripe", "Cloudinary", "Google Analytics", "Authorized Logistics Providers"].map((prov, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1">
                      {prov} <ExternalLink className="w-3 h-3 text-gray-400" />
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed pt-2">
                  Please review the specific privacy structures of each respective provider, as they hold independent legal policies.
                </p>
              </div>
            </section>

          
            <section id="section-12" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">11. Data Retention Laws</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  We retain personal information only for as long as required to resolve transactional histories, prevent fraud, fulfill orders, or satisfy tax compliance requirements.
                </p>
              </div>
            </section>

       
            <section id="section-13" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">12. Policy Updates</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  LUXE reserves the right to update this policy documentation at any time. Major revisions will be announced through platform headers or dynamic email campaigns to our active users.
                </p>
              </div>
            </section>

           
            <section id="section-14" className="space-y-4 scroll-mt-20">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">13. Contact Information</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left shadow-xs">
                
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">Privacy Desk Email</span>
                  <a href="mailto:privacy@luxe.com" className="text-xs font-bold text-blue-600 hover:underline block">privacy@luxe.com</a>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">Support Desk Email</span>
                  <a href="mailto:support@luxe.com" className="text-xs font-bold text-blue-600 hover:underline block">support@luxe.com</a>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">Business Hours</span>
                  <p className="text-xs font-bold text-gray-700">Saturday – Thursday</p>
                  <p className="text-[10px] text-gray-400 font-bold">9:00 AM – 9:00 PM</p>
                </div>

              </div>
            </section>

          </main>

        </div>
      </div>

      

    </div>
  );
}