"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full bg-black pt-16 pb-4 px-0">
      {/* Hero Text Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
        {/* Left: Heading */}
        <div className="flex-1">
          <h1 className="text-white text-6xl md:text-6xl font-semibold mb-4 leading-tight">
            Get Capital When <br /> You Need It
          </h1>
        </div>
        {/* Right: Supporting text and button */}
        <div className="flex-1 flex flex-col items-start md:items-end gap-6">
          <p className="text-gray-200 text-lg max-w-md mb-2 mt-8">
            Access up to $500K in flexible financing, extended net terms, and virtual cards—all through Incoxchange, your fast, reliable partner for growth without the hassle.
          </p>
          <Button className="bg-blue-600 text-white px-8 py-3 text-base font-semibold rounded-lg hover:bg-blue-700">
            Get in touch
          </Button>
        </div>
      </div>
      {/* Bento Box Grid - Full Width, 6 columns */}
      <div className="w-full mt-16 px-0">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 px-2 md:px-8"
          style={{ gridAutoRows: 'minmax(160px, 1fr)' }}
        >
          {/* Top Row */}
          <div className="hidden sm:block rounded-2xl overflow-hidden bg-gray-200 lg:col-span-1 lg:row-span-2 flex items-center justify-center bg-[url('/hero1.png')] bg-center bg-no-repeat bg-cover" />
          <div className="rounded-2xl bg-[#3B5CCC] text-white p-8 flex flex-col justify-end lg:col-span-1 lg:row-span-1">
            <h3 className="text-2xl font-semibold mb-2">Boost Your Buying Power</h3>
            <p className="text-base">Unlock extended payment terms and improved cash flow without adding complexity to your process.</p>
          </div>
          <div className="rounded-2xl bg-[#3B5CCC] text-white p-8 flex flex-col justify-end lg:col-span-1 lg:row-span-1">
            <h3 className="text-2xl font-semibold mb-2">Smart Purchasing, Simplified</h3>
            <p className="text-base">Automate approvals, track budgets, and place orders in seconds—no more chasing down receipts or emails.</p>
          </div>
          <div className="hidden sm:block rounded-2xl overflow-hidden bg-gray-200 lg:col-span-1 lg:row-span-2 flex items-center justify-center bg-[url('/hero2.png')] bg-center bg-no-repeat bg-cover" />
          <div className="hidden sm:block rounded-2xl overflow-hidden bg-gray-200 lg:col-span-1 lg:row-span-1 flex items-center justify-center bg-[url('/hero3.png')] bg-center bg-no-repeat bg-cover" />
          <div className="rounded-2xl bg-[#3B5CCC] text-white p-8 flex flex-col justify-end lg:col-span-1 lg:row-span-2">
            <h3 className="text-2xl font-semibold mb-2">Financial Control Built In</h3>
            <p className="text-base">Set custom rules, spending limits, and alerts to make sure every dollar is working smarter, not harder.</p>
          </div>

          {/* Second Row */}
          <div className="rounded-2xl bg-[#5CA8FF] text-white p-8 flex flex-col justify-end lg:col-span-2 lg:row-span-1">
            <h3 className="text-2xl font-semibold mb-2">Clarity Across Every Location</h3>
            <p className="text-base">Gain full visibility into spend, vendor usage, and compliance across your entire portfolio.</p>
          </div>
          <div className="hidden sm:block rounded-2xl overflow-hidden bg-gray-200 lg:col-span-1 lg:row-span-1 flex items-center justify-center bg-[url('/hero4.png')] bg-center bg-no-repeat bg-cover" />
        </div>
      </div>
    </section>
  );
} 