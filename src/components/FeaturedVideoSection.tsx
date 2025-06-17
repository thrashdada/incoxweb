"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function FeaturedVideoSection() {
  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Heading, text, button */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
              Fuel Your Growth with<br />Flexible Financing
            </h2>
            <p className="text-gray-600 mb-6">
              Incoxchange gives you access to business financing with competitive rates starting at just 5%, and repayment terms designed to fit your cash flow—not the other way around.
            </p>
            <Button className="bg-blue-600 text-white px-6 py-2 text-base">Learn more</Button>
          </div>

          {/* Right: Feature list */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">
              Use funding your way — from property upgrades to bulk inventory
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                <span className="text-gray-700">Fast approvals in as little as 4 days</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                <span className="text-gray-700">Simple application process with minimal paperwork</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                <span className="text-gray-700">Transparent pricing—no hidden fees, no delays, no red tape</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Video player */}
        <div className="flex justify-center mt-16">
          <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-lg bg-black">
            <video
              controls
              poster="/featured-thumbnail.png"
              className="w-full h-[340px] object-cover bg-black"
            >
              <source src="/featured-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
} 