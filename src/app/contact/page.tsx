"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ChevronDown, 
  CheckCircle, 
  ArrowRight,
 
  Send,
  ShoppingBag,
  RotateCcw,
  CreditCard,
  Truck,
  Store,
  Briefcase,
  Wrench,
  UserCheck,
  Building2,
  Calendar,
  Sparkles
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

export default function ContactUsPage() {
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Issue",
    message: "",
    agreeToPolicy: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreeToPolicy: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    setFormSubmitted(true);
    setTimeout(() => {
     
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Order Issue",
        message: "",
        agreeToPolicy: false
      });
    }, 6000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased font-sans overflow-x-hidden">
      
    
      <section className="relative bg-gradient-to-b from-blue-50/60 via-white to-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gray-200/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-5 right-10 w-96 h-96 bg-indigo-300/10 rounded-full filter blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
           
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest bg-blue-100 text-blue-700 border border-blue-200/60 uppercase">
                🤝 Luxe Support Network
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-none uppercase">
                Let's Get <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">In Touch</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-xl">
                We're here to help. Whether you have a question about an order, becoming a seller, payments, or anything else, our support team is ready to assist you.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-4">
                <a href="#message-form" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl transition duration-300 transform active:scale-95 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer">
                  <MessageSquare className="w-4 h-4" /> Contact Support
                </a>
                <button className="bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl transition duration-300 transform active:scale-95 shadow-xs flex items-center gap-2 cursor-pointer">
                  <Store className="w-4 h-4" /> Become a Seller
                </button>
              </div>
            </div>

            
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-blue-50 to-indigo-50/50 rounded-3xl border border-blue-100/80 p-8 shadow-inner flex items-center justify-center group">
                <div className="absolute top-6 right-6 bg-white border border-gray-100 p-3 rounded-xl shadow-md transform rotate-6 group-hover:rotate-0 transition duration-500">
                  <span className="text-emerald-500 font-black text-xs">● Live Online</span>
                </div>
                
                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xl w-64 space-y-4 text-center relative">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto border border-blue-100">
                    <MessageSquare className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-sm uppercase tracking-wider">Luxe Resolution Center</h3>
                    <p className="text-[10px] text-gray-400 font-medium">Automatic system tracking & support allocations</p>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-4/5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            
            <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition duration-300 text-left flex flex-col justify-between space-y-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-xs">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Office Address</h3>
                <p className="text-sm font-black text-gray-900 leading-snug">123 Marketplace Avenue</p>
                <p className="text-xs text-gray-500 font-medium">Dhaka, Bangladesh</p>
              </div>
            </div>

         
            <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition duration-300 text-left flex flex-col justify-between space-y-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-xs">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Phone Support</h3>
                <p className="text-sm font-black text-gray-900">+880 1700-000000</p>
                <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md inline-block">
                  Sat – Thu: 9 AM – 9 PM
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition duration-300 text-left flex flex-col justify-between space-y-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-xs">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Email Desks</h3>
                <div className="space-y-0.5">
                  <a href="mailto:support@luxe.com" className="text-xs font-bold text-blue-600 hover:underline block">support@luxe.com</a>
                  <a href="mailto:business@luxe.com" className="text-xs font-bold text-gray-600 hover:underline block">business@luxe.com</a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200/60 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition duration-300 text-left flex flex-col justify-between space-y-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-xs">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">Live Chat</h3>
                  <p className="text-[10px] text-gray-500 font-medium">Avg. Response Time: <strong className="text-gray-900 font-black">⚡ Less than 5 min</strong></p>
                </div>
                <button className="w-full bg-gray-950 hover:bg-black text-white text-[10px] font-black uppercase tracking-wider py-2.5 rounded-xl transition cursor-pointer shadow-xs active:scale-95">
                  Start Live Chat
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="message-form" className="py-20 bg-gray-50 border-y border-gray-200/60 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
            
         
            <div className="text-left space-y-2 mb-8 border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Send Us A Message</h2>
              <p className="text-xs text-gray-400 font-medium">Fill out your information and our dedicated support system agent will route your inquiry.</p>
            </div>

           
            {formSubmitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-left animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">Message Received Securely</h4>
                  <p className="text-[11px] text-emerald-800 font-medium mt-0.5">Your ticket ID has been generated in our system database. An agent will contact you shortly.</p>
                </div>
              </div>
            )}

          
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition"
                  />
                </div>

              
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition"
                  />
                </div>

               
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +880 1700-000000" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition"
                  />
                </div>

              
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Select Topic</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition cursor-pointer"
                  >
                    <option value="Order Issue">Order Issue</option>
                    <option value="Seller Support">Seller Support</option>
                    <option value="Payment">Payment</option>
                    <option value="Business Inquiry">Business Inquiry</option>
                    <option value="Report a Problem">Report a Problem</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

              </div>

             
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we assist you today? Please include any order IDs if applicable..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition resize-none"
                />
              </div>

              
              <div className="flex items-center gap-2 text-left">
                <input 
                  type="checkbox" 
                  id="agreeToPolicy"
                  checked={formData.agreeToPolicy}
                  onChange={handleCheckboxChange}
                  required
                  className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="agreeToPolicy" className="text-[11px] text-gray-500 font-bold select-none cursor-pointer">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and terms of information submission.
                </label>
              </div>

             
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition duration-300 transform active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Send Message
              </button>

            </form>

          </div>

        </div>
      </section>

     
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Quick Directory resolution</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Support Categories</h2>
            <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Order Support", desc: "Track live statuses, edit transaction contents, or update packaging.", icon: <ShoppingBag className="w-5 h-5 text-blue-600" /> },
              { title: "Returns & Refunds", desc: "Initiate returns or trace operational bank refund cycles.", icon: <RotateCcw className="w-5 h-5 text-blue-600" /> },
              { title: "Payment Issues", desc: "Troubleshoot failed credit validation cards or Stripe linkages.", icon: <CreditCard className="w-5 h-5 text-blue-600" /> },
              { title: "Shipping Info", desc: "Trace international dispatching corridors or standard delivery times.", icon: <Truck className="w-5 h-5 text-blue-600" /> },
              { title: "Seller Registration", desc: "Set up store accounts, establish product sheets, and publish live.", icon: <Store className="w-5 h-5 text-blue-600" /> },
              { title: "Business Partnership", desc: "Inquire about strategic vendor distributions or wholesale options.", icon: <Briefcase className="w-5 h-5 text-blue-600" /> },
              { title: "Technical Support", desc: "Report issues regarding API frameworks, security profiles, or logins.", icon: <Wrench className="w-5 h-5 text-blue-600" /> },
              { title: "Account Recovery", desc: "Recover access nodes, resolve dual factor authorizations securely.", icon: <UserCheck className="w-5 h-5 text-blue-600" /> }
            ].map((cat, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200/60 rounded-2xl p-5 hover:bg-white hover:shadow-md hover:border-blue-200 transition duration-300 text-left space-y-3 group">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-xs">
                  {cat.icon}
                </div>
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition">{cat.title}</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      
      <section className="py-16 bg-gray-50 border-y border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full filter blur-2xl" />
            
            <div className="md:col-span-8 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Strategic Alliances</span>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Business Partnerships</h2>
              <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xl">
                Luxe empowers sellers, corporate clients, and advertising agents globally. Explore our advertising programs, affiliate pathways, and dedicated bulk corporate sales desks.
              </p>
              <div className="flex flex-wrap gap-4 text-[11px] font-bold text-gray-500 pt-2">
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Become a Seller</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Corporate Sales</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Affiliate Programs</span>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3 shrink-0">
              <div className="text-left md:text-right">
                <span className="text-[9px] font-black uppercase text-gray-400 block">General Inquiries</span>
                <a href="mailto:business@luxe.com" className="text-sm font-black text-blue-600 hover:underline">business@luxe.com</a>
              </div>
              <button className="bg-gray-950 hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-xs hover:shadow-md cursor-pointer flex items-center gap-2 active:scale-95">
                <Store className="w-3.5 h-3.5" /> Become a Seller
              </button>
            </div>

          </div>
        </div>
      </section>

      
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
         
          <div className="lg:col-span-8 bg-gray-50 border border-gray-200 rounded-3xl min-h-[350px] relative overflow-hidden flex items-center justify-center p-6 shadow-inner group">
          
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfdfdf_1px,transparent_1px),linear-gradient(to_bottom,#dfdfdf_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />
            <div className="absolute w-44 h-44 bg-blue-400/20 rounded-full filter blur-2xl" />
            <div className="relative z-10 bg-white border border-gray-200 p-4 rounded-2xl shadow-xl space-y-2 max-w-xs text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto animate-bounce" />
              <h4 className="font-black text-xs uppercase tracking-wider">Luxe HQ Bangladesh</h4>
              <p className="text-[10px] text-gray-400 font-medium">123 Marketplace Avenue, Dhaka</p>
            </div>
          </div>

        
          <div className="lg:col-span-4 bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div className="space-y-2">
                <Building2 className="w-8 h-8 text-blue-600" />
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Head Office</h3>
                <div className="w-8 h-0.5 bg-blue-600 rounded" />
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div className="text-xs">
                    <p className="font-black uppercase text-[10px] text-gray-400">Working Days</p>
                    <p className="font-bold text-gray-700">Saturday – Thursday</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div className="text-xs">
                    <p className="font-black uppercase text-[10px] text-gray-400">Support Hours</p>
                    <p className="font-bold text-gray-700">9:00 AM – 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center text-[10px] font-black text-red-600">F</div>
                  <div className="text-xs">
                    <p className="font-black uppercase text-[10px] text-gray-400">Weekend Office Status</p>
                    <p className="font-bold text-red-600">Friday Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200/60 mt-6 text-[10px] text-gray-400 font-medium">
              System monitoring tools operate 24/7/365 to preserve transaction health.
            </div>
          </div>

        </div>
      </section>

    
      <section className="py-20 bg-gray-50 border-t border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Resolve concerns instantly</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Frequently Asked Questions</h2>
            <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
          </div>

          <div className="space-y-3">
            {[
              { q: "How can I track my order?", a: "Enter your secure user account, head over to the personal tracking matrix or paste your unique shipping code directly into our main routing dashboard." },
              { q: "How do I become a seller?", a: "Apply through our dedicated merchant portal, upload your official business authentication records, and receive activation confirmation within 48 hours." },
              { q: "How do refunds work?", a: "Once merchant return confirmation gets logged into the catalog, our Stripe engine routes refunds back onto your original payment node within 5-10 business days." },
              { q: "How can I contact customer support?", a: "You can open an active communication node via our Live Chat panel, submit the email contact form, or dial our physical support desks directly." },
              { q: "How are payments secured?", a: "Luxe operates utilizing advanced Stripe framework integration. Complete credit, routing, and checking validations run under secure SSL/TLS protocols." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs transition duration-200">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between font-black text-xs uppercase text-gray-800 tracking-wide text-left hover:bg-gray-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-gray-500 font-medium leading-relaxed border-t border-gray-100 pt-3 text-left bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Join our social loops</span>
            <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Connect With Us</h2>
            <div className="w-12 h-1 bg-blue-600 rounded mx-auto" />
            <p className="text-xs text-gray-400 font-medium">Follow us for updates, offers, and new arrivals.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "Facebook", icon: <FaFacebook className="w-5 h-5 text-blue-600" />, link: "#" },
              { label: "Instagram", icon: <BsInstagram className="w-5 h-5 text-pink-600" />, link: "#" },
              { label: "LinkedIn", icon: <LiaLinkedin className="w-5 h-5 text-blue-700" />, link: "#" },
              { label: "Twitter/X", icon: <BsTwitter className="w-5 h-5 text-black" />, link: "#" },
              { label: "YouTube", icon: <BsYoutube className="w-5 h-5 text-red-600" />, link: "#" }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.link}
                className="bg-gray-50 border border-gray-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-3 hover:bg-white hover:shadow-md hover:border-gray-300 transition duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-xs group-hover:scale-110 transition duration-300">
                  {social.icon}
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-gray-800">{social.label}</span>
              </a>
            ))}
          </div>

        </div>
      </section>

      
      <section className="py-12 bg-gray-50 border-t border-gray-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <div className="max-w-md mx-auto space-y-4">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" /> Stay Connected
            </h3>
            <p className="text-xs text-gray-400 font-medium">Subscribe to receive exclusive offers, promotions, and marketplace updates.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-black focus:border-black transition"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition cursor-pointer active:scale-95 shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:6rem] opacity-[0.03]" />
        
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Need Help?</h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium max-w-xl mx-auto leading-relaxed">
            Our dedicated support team is always ready to assist you. Browse our complete online databases or ping live nodes.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="#message-form" className="bg-white hover:bg-gray-100 text-blue-700 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition active:scale-95 cursor-pointer flex items-center gap-1.5">
              Contact Support <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white/80 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition active:scale-95 cursor-pointer flex items-center gap-1.5">
              Browse Help Center
            </button>
          </div>
        </div>
      </section>


    </div>
  );
}