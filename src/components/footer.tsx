import { Mail } from 'lucide-react';
import React from 'react';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { LiaLinkedin } from 'react-icons/lia';

const Footer = () => {
    return (
        <div>
          <footer className="bg-gray-900 text-gray-400 text-xs border-t border-gray-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Vector Column */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="text-white font-black text-xl tracking-widest">LUXE.</div>
            <p className="text-gray-500 font-medium leading-relaxed max-w-sm">
              Next generation secure multi-vendor distribution ecosystem enabling trusted commercial exchanges across comprehensive pipelines.
            </p>
            <div className="flex gap-3.5 pt-2">
              <a href="#" className="hover:text-white transition"><FaFacebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition"><BsTwitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition"><BsInstagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition"><LiaLinkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links Matrix */}
          <div className="md:col-span-2 text-left space-y-3">
            <h5 className="text-white font-black uppercase tracking-wider text-[10px]">Company</h5>
            <ul className="space-y-2 font-bold">
              <li><a href="#" className="hover:text-white transition">About LUXE</a></li>
              <li><a href="#" className="hover:text-white transition">Carrers</a></li>
              <li><a href="#" className="hover:text-white transition">Press Hub</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 text-left space-y-3">
            <h5 className="text-white font-black uppercase tracking-wider text-[10px]">Marketplace</h5>
            <ul className="space-y-2 font-bold">
              <li><a href="#" className="hover:text-white transition">All Categories</a></li>
              <li><a href="#" className="hover:text-white transition">Verified Shops</a></li>
              <li><a href="#" className="hover:text-white transition">Campaign Deals</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 text-left space-y-3">
            <h5 className="text-white font-black uppercase tracking-wider text-[10px]">Support</h5>
            <ul className="space-y-2 font-bold">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Seller Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Segment */}
          <div className="md:col-span-2 text-left space-y-3">
            <h5 className="text-white font-black uppercase tracking-wider text-[10px]">Newsletter</h5>
            <p className="text-gray-500 font-medium leading-relaxed">Subscribe to target optimization notifications.</p>
            <div className="relative mt-2">
              <input 
                type="email" 
                placeholder="Your email..." 
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-3 pr-9 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 transition"
              />
              <button className="absolute right-2 top-2 text-gray-400 hover:text-white transition cursor-pointer">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Legal Node */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 font-bold text-[11px]">
          <div>© {new Date().getFullYear()} LUXE Inc. All system tracking data reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition">Security Framework</a>
            <a href="#" className="hover:text-gray-400 transition">Ecosystem Service SLA</a>
          </div>
        </div>
      </footer>   
        </div>
    );
};

export default Footer;