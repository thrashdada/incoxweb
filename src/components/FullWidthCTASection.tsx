"use client";

import { Button } from "@/components/ui/button";

export function FullWidthCTASection() {
  return (
    <section className="w-full bg-[#2B7BFA] py-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center px-4">
        <h2 className="text-white text-5xl md:text-6xl font-semibold mb-6">Clarity Drives Control</h2>
        <p className="text-white text-lg md:text-xl mb-10 max-w-2xl">
          Discover how complete visibility into your business spend helps you make smarter decisions and reduce costs with Incoxchange.
        </p>
        <Button className="bg-black text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-gray-900">
          Get started
        </Button>
      </div>
    </section>
  );
} 