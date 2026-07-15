"use client";

import React, { useState, useEffect } from "react";
import { 
  Scale, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  ShieldAlert, 
  ShoppingBag, 
  Truck, 
  DollarSign, 
  AlertTriangle, 
  FileText, 
  Lock, 
  ArrowRight,
  Menu,
  X,
  RefreshCw,
  Mail,
  HelpCircle,
  FileSignature
} from "lucide-react";

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("section-2");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

 
  const tocItems = [
    { id: "section-2", label: "Acceptance of Terms", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: "section-3", label: "User Accounts", icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: "section-4", label: "Buyer Responsibilities", icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: "section-5", label: "Seller Responsibilities", icon: <Scale className="w-3.5 h-3.5" /> },
    { id: "section-6", label: "Product Listings", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "section-7", label: "Orders & Payments", icon: <DollarSign className="w-3.5 h-3.5" /> },
    { id: "section-8", label: "Shipping & Delivery", icon: <Truck className="w-3.5 h-3.5" /> },
    { id: "section-9", label: "Returns & Refunds", icon: <RefreshCw className="w-3.5 h-3.5" /> },
    { id: "section-10", label: "Seller Commission", icon: <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: "section-11", label: "Prohibited Activities", icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: "section-12", label: "Intellectual Property", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "section-13", label: "Account Suspension", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    { id: "section-14", label: "Limitation of Liability", icon: <Scale className="w-3.5 h-3.5" /> },
    { id: "section-15", label: "Privacy Framework", icon: <Lock className="w-3.5 h-3.5" /> },
    { id: "section-16", label: "Changes to Terms", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "section-17", label: "Contact Information", icon: <Mail className="w-3.5 h-3.5" /> }
  ];

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
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
      const offset = 95; // Top navbar offset
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
      
      
      <section className="relative bg-gradient-to-b from-blue-50/50 via-white to-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200/60 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        <div className="absolute top-12 left-12 w-80 h-80 bg-blue-300/10 rounded-full filter blur-3xl animate-pulse" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
        
            <div className="lg:col-span-8 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-blue-100 text-blue-700 border border-blue-200 uppercase">
                🏛️ LUXE Agreement Matrix
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight uppercase">
                Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Conditions</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-2xl">
                Please read these Terms & Conditions carefully before using the LUXE Marketplace. By accessing or using our platform, you agree to comply with these terms.
              </p>
              
              <div className="flex flex-wrap gap-5 text-xs font-bold text-gray-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Last Updated: July 15, 2026</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Effective Date: Immediate</span>
              </div>
            </div>

        
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl w-72 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto border border-blue-100">
                  <Scale className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-xs uppercase tracking-wider text-gray-900">Legal Agreement</h3>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                    Binding terms governing commercial usage and marketplace relations on LUXE.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Document Sections</span>
        <button 
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
        >
          {mobileNavOpen ? <X className="w-4 h-4 text-gray-900" /> : <Menu className="w-4 h-4 text-gray-900" />}
        </button>
      </div>

     
      {mobileNavOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg px-4 py-3 space-y-1 max-h-[320px] overflow-y-auto z-30 relative">
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
            <div className="space-y-1.5 max-h-[75vh] overflow-y-auto pr-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
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
            
            
            <section id="section-2" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">1. Acceptance of Terms</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  By registering an account, browsing product listings, executing checkout purchases, or applying as a verified marketplace seller, you explicitly agree to align with and be bound by these Terms & Conditions.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  If you or your legal business entity do not agree with any structural terms or conditions listed within this operational matrix, you must immediately discontinue using the LUXE platform.
                </p>
              </div>
            </section>

            
            <section id="section-3" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">2. User Accounts & Verification</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  To utilize our specialized purchase paths and merchant tools, you must register a certified account. You guarantee that all provided profile records are fully accurate, up to date, and authentic.
                </p>
                <ul className="space-y-3 pt-2 text-xs font-bold text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Account Security: You are solely responsible for maintaining the confidentiality of your security credentials.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Zero Sharing Policy: Users must not share, rent, or lease their account credentials to any unauthorized third parties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Suspicious Operations: LUXE reserves the right to immediately suspend, deactivate, or purge any account flagged with suspicious, unauthorized, or fraudulent activities.</span>
                  </li>
                </ul>
              </div>
            </section>

          
            <section id="section-4" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">3. Buyer Responsibilities</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  As an active buyer navigating the LUXE Marketplace ecosystem, you acknowledge, represent, and agree to the following obligations:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    "Provide 100% accurate, verifiable, and complete shipping and contact info.",
                    "Process checkout payments solely using our supported and verified payment options.",
                    "Avoid any malicious activity, platform exploit attempts, or automated data scraping.",
                    "Respect the unique store profiles, response rates, and return windows set by sellers.",
                    "Comply with all domestic, local, and international commercial regulations and laws."
                  ].map((resp, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-2 items-start">
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">0{idx + 1}</span>
                      <p className="text-[11px] text-gray-500 font-bold leading-relaxed">{resp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

       
            <section id="section-5" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">4. Seller Responsibilities</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Verified sellers operating within LUXE are obligated to uphold the absolute highest standards of retail, trade, and customer service.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs font-bold text-gray-600">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Deliver 100% accurate product descriptions</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Upload genuine high-resolution imagery</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Maintain real-time accurate inventory levels</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Deliver packages strictly within promised lead times</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Provide rapid, respectful consumer chat support</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Honor stated return frameworks and guarantees</div>
                  <div className="flex items-center gap-2 border-t border-red-50 pt-2 col-span-1 sm:col-span-2 text-red-600">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" /> 
                    <span>Strictly prohibited: selling counterfeit, illicit, illegal, or unauthorized products.</span>
                  </div>
                </div>
              </div>
            </section>

        
            <section id="section-6" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">5. Product Listings</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  All listings, catalog tags, product variables, pricing, and availability parameters are provided and updated directly by independent sellers on our platform.
                </p>
                <ul className="space-y-2 text-xs font-bold text-gray-500 list-disc list-inside">
                  <li>Store pricing parameters are subject to sudden shifts without any prior notification.</li>
                  <li>Product images are representative; slight aesthetic variances in color and texture may exist.</li>
                  <li>LUXE maintains active legal jurisdiction to remove any product page violating policy criteria.</li>
                </ul>
              </div>
            </section>

            <section id="section-7" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">6. Orders & Payments</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Orders are officially processed and confirmed in our database only after successful authorization from our payment partner.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  All platform payments are handled directly using Stripe's end-to-end encrypted compliance pipeline. LUXE never saves, reads, or operates full raw credit card information on our database nodes. Suspended or interrupted transactions will fail to generate confirmed orders.
                </p>
              </div>
            </section>

          
            <section id="section-8" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">7. Shipping & Delivery</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Expected shipping durations are directly formulated and hosted by individual sellers based on the regional coordinates of our logistics networks.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Delays caused by local political occurrences, customs clearances, national weather events, or major carrier disruptions are outside LUXE's direct accountability. Detailed tracking keys will be generated and provided upon distribution.
                </p>
              </div>
            </section>

          
            <section id="section-9" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">8. Returns & Refunds</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Returned products are subject to detailed condition evaluations by the original seller and the designated LUXE compliance desk prior to approval.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Upon approval, refunds are issued directly to the buyer's payment gateway account. Specialized custom products, physical print-on-demand pieces, and non-refundable digital goods are not eligible for return.
                </p>
              </div>
            </section>

           
            <section id="section-10" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">9. Seller Commission Scale</h2>
              </div>
              <div className="w-12 h-1 bg-emerald-500 rounded" />
              
              <div className="bg-gradient-to-tr from-emerald-950 to-emerald-900 border border-emerald-800 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-md">
                <div className="space-y-1">
                  <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase">Transparent Marketplace Fees</span>
                  <h3 className="text-lg font-black uppercase">Start Your Store with Zero Financial Barriers</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {["100% Free Store Setup", "No Subscription Fees", "Zero Setup Fees", "No Hidden Charges"].map((val, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/5 text-center">
                      <p className="text-xs font-black uppercase text-emerald-100">{val}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-emerald-100/80 font-medium leading-relaxed">
                  LUXE operates solely on a dynamic revenue share model. We deduct a small commission only from successfully finalized and completed consumer sales. Commission percentages are dynamic and vary depending on specific category rules. Commission balances are settled prior to seller payout disbursement cycles.
                </p>
              </div>
            </section>

           
            <section id="section-11" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">10. Prohibited Activities</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  The following user behaviors are strictly prohibited on the platform and will trigger instant account suspension, terminal blacklisting, and legal intervention:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    "Selling Counterfeits",
                    "Distributing Illicit Goods",
                    "Fake Merchant Details",
                    "Manipulating Ratings",
                    "Payment Exploitation",
                    "Cyberattacks / Botnets",
                    "Spamming Shoppers",
                    "Unauthorized Server Access"
                  ].map((act, idx) => (
                    <div key={idx} className="bg-red-50/50 border border-red-100 rounded-xl p-3 text-center text-[10px] font-black uppercase tracking-tight text-red-700">
                      🚫 {act}
                    </div>
                  ))}
                </div>
              </div>
            </section>

           
            <section id="section-12" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">11. Intellectual Property</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  All branding, marketplace logos, visual themes, core styling, frontend frameworks, algorithms, and intellectual property nodes hosted on LUXE belong exclusively to LUXE.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Specific seller-generated graphic elements, original product descriptions, and registered logos uploaded by vendors remain the exclusive property of their respective creators. Any unauthorized commercial reuse or copying of our proprietary designs is legally prohibited.
                </p>
              </div>
            </section>

            
            <section id="section-13" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">12. Account Suspension & Demotion</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  LUXE retains complete and absolute authority to suspend accounts, deactivate store fronts, remove product catalogs, and cancel pending operations.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  We may initiate account termination immediately for users who engage in systematic policy violations, store quality neglect, safety threats, or fraud.
                </p>
              </div>
            </section>

         
            <section id="section-14" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">13. Limitation of Liability</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  LUXE operates strictly as a connection facilitator between third-party buyers and sellers.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  We strive to maintain a secure, active, and fully reliable multi-vendor platform. However, LUXE is not legally liable for indirect financial losses, quality defects, shipment delays, product discrepancies, or damages resulting from external, third-party logistics.
                </p>
              </div>
            </section>

         
            <section id="section-15" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">14. Privacy Framework</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  All personal data generated on the platform is processed in accordance with our official Privacy Policy.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  All transaction nodes are protected using enterprise-grade Secure Sockets Layer (SSL) encryption, and all card processing is handled safely via Stripe API interfaces.
                </p>
              </div>
            </section>

           
            <section id="section-16" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">15. Changes to Terms</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  LUXE reserves the right to revise or update these Terms & Conditions at any point. Major revisions will be announced through platform headers or dynamic email campaigns to our active users.
                </p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Your continued use of our marketplace services after terms are updated indicates complete acceptance of the updated terms.
                </p>
              </div>
            </section>

           
            <section id="section-17" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">16. Contact Information</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left shadow-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">Legal Support</span>
                  <a href="mailto:legal@luxe.com" className="text-xs font-bold text-blue-600 hover:underline block">legal@luxe.com</a>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">Customer Support</span>
                  <a href="mailto:support@luxe.com" className="text-xs font-bold text-blue-600 hover:underline block">support@luxe.com</a>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400">Business Support</span>
                  <a href="mailto:business@luxe.com" className="text-xs font-bold text-blue-600 hover:underline block">business@luxe.com</a>
                </div>
                <div className="space-y-1 sm:col-span-3 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-black uppercase text-gray-400">Working Hours</span>
                  <p className="text-xs font-bold text-gray-700">Saturday – Thursday, 9:00 AM – 9:00 PM</p>
                </div>
              </div>
            </section>

           
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Related Policies</h2>
              </div>
              <div className="w-12 h-1 bg-blue-600 rounded" />
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Privacy Policy", link: "/privacy" },
                  { name: "Seller Policy", link: "/seller-policy" },
                  { name: "Return & Refund Policy", link: "/returns" },
                  { name: "Shipping Policy", link: "/shipping" },
                  { name: "Contact Us", link: "/contact" },
                  { name: "Help Center", link: "/help" }
                ].map((policy, idx) => (
                  <a 
                    key={idx} 
                    href={policy.link} 
                    className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between text-left transition shadow-2xs hover:shadow-xs group"
                  >
                    <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition">{policy.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </section>

           
            <section className="pt-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-700 rounded-3xl p-6 sm:p-8 text-white text-center space-y-4 shadow-lg">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
                  <FileSignature className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-black uppercase tracking-wider">Final Acknowledgement</h3>
                <p className="text-xs text-blue-100 font-bold max-w-xl mx-auto leading-relaxed">
                  By using LUXE Marketplace, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
                </p>
              </div>
            </section>

          </main>

        </div>
      </div>


    </div>
  );
}