"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full bg-[#181A1B] text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        {/* Left: Logo and tagline */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/logo.svg" alt="incoxchange" width={32} height={32} />
            <span className="text-2xl font-bold text-white">incoxchange</span>
          </div>
          <div className="text-gray-400 mb-8">Get Capital When You Need It</div>
          <div className="mt-auto text-sm text-gray-500">© 2025 VZN LAB. All rights reserved.</div>
        </div>

        {/* Center: Navigation */}
        <div className="flex-1 flex flex-row gap-16 justify-center">
          <div>
            <div className="font-semibold text-white mb-4">Product</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Overview</a></li>
              <li><a href="#" className="hover:underline">Features</a></li>
              <li className="flex items-center gap-2">
                <a href="#" className="hover:underline">Solutions</a>
                <span className="text-xs bg-gray-700 text-white rounded px-2 py-0.5">New</span>
              </li>
              <li><a href="#" className="hover:underline">Tutorials</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Releases</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-4">Resources</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Newsletter</a></li>
              <li><a href="#" className="hover:underline">Events</a></li>
              <li><a href="#" className="hover:underline">Help centre</a></li>
              <li><a href="#" className="hover:underline">Tutorials</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Right: Subscribe */}
        <div className="flex-1 min-w-[260px] flex flex-col gap-4">
          <div className="font-semibold text-white mb-4">Stay up to date</div>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md bg-transparent border border-gray-600 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" className="bg-[#2B7BFA] text-white px-6 font-semibold hover:bg-blue-700">Subscribe</Button>
          </form>
        </div>
      </div>
      {/* Bottom: Legal links */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-end gap-4 mt-8 px-2">
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
      </div>
    </footer>
  );
} 