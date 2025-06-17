"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    company: "Luckycharm",
    logo: "/logos/Logomark-9.png",
    color: "from-blue-500 to-blue-400",
    quote: "Incoxchange helped us centralize spend across 40+ buildings. We've saved hours in admin time and tens of thousands in vendor costs.",
  },
  {
    company: "Sisyphus",
    logo: "/logos/Logomark.png",
    color: "from-indigo-600 to-blue-700",
    quote: "We expanded into two new markets this year—and Incoxchange's financing gave us the flexibility to move fast without cash flow concerns.",
  },
  {
    company: "Capsule",
    logo: "/logos/Logomark-2.png",
    color: "from-blue-300 to-blue-400",
    quote: "With Incoxchange's net terms and bulk purchasing tools, we've been able to stock critical materials in advance and avoid costly delays.",
  },
  {
    company: "Foresight",
    logo: "/logos/Logomark-3.png",
    color: "from-blue-500 to-blue-400",
    quote: "Having capital available in days, not weeks, has helped us complete renovations on schedule and take on larger projects with confidence.",
  },
  // Dummy testimonials for scroll effect
  {
    company: "Brightpath",
    logo: "/logos/Logomark-4.png",
    color: "from-blue-400 to-blue-500",
    quote: "Brightpath streamlined our procurement and improved our cash flow instantly!",
  },
  {
    company: "Vertex",
    logo: "/logos/Logomark-5.png",
    color: "from-indigo-500 to-blue-600",
    quote: "Vertex relies on Incoxchange for fast, reliable financing and vendor payments.",
  },
  {
    company: "Summit",
    logo: "/logos/Logomark-6.png",
    color: "from-blue-400 to-blue-600",
    quote: "Summit's growth accelerated thanks to Incoxchange's flexible terms.",
  },
  {
    company: "Northstar",
    logo: "/logos/Logomark-7.png",
    color: "from-blue-500 to-blue-700",
    quote: "Northstar can now take on bigger projects with confidence and speed.",
  },
];

const CARDS_TO_SHOW = 3;
const CARD_WIDTH = 404; // px, so 3*404 + 2*32 = 1280px

export function TestimonialSection() {
  const [start, setStart] = useState(0);
  const canGoLeft = start > 0;
  const canGoRight = start + CARDS_TO_SHOW < testimonials.length;
  const visibleTestimonials = testimonials.slice(start, start + CARDS_TO_SHOW);

  return (
    <section className="bg-[#181A1B] py-24 px-6">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 md:mb-2">
              Trusted by Forward-Thinking Property Management Companies
            </h2>
            <p className="text-gray-300 max-w-2xl">
              Leading organizations partner with us to simplify procurement, improve cash flow, and scale with confidence. Here's how they're making it happen:
            </p>
          </div>
          <div className="flex gap-3 self-start">
            <Button variant="ghost" className="bg-[#232526] text-white border border-[#232526] hover:bg-[#232526]/80">
              Our customers
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Get Started
            </Button>
          </div>
        </div>

        {/* Carousel Row */}
        <div className="flex justify-center">
          <div className="flex gap-8">
            {visibleTestimonials.map((t, idx) => (
              <div
                key={t.company + idx}
                className={`flex flex-col rounded-2xl w-[404px] h-[370px] bg-gradient-to-br ${t.color} p-4 shadow-lg transition-transform`}
              >
                <div className="flex items-center gap-3 mb-8">
                  {/* Placeholder for logo, replace with your SVGs */}
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Image src={t.logo} alt={t.company} width={40} height={40} />
                  </div>
                  <span className="text-white text-xl font-semibold">{t.company}</span>
                </div>
                <div className="bg-black/20 rounded-xl p-6 mt-auto">
                  <div className="text-white font-semibold mb-2">{t.company}</div>
                  <div className="text-white text-base">“{t.quote}”</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows at the bottom */}
        <div className="flex justify-left gap-4 mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => canGoLeft && setStart(start - 1)}
            disabled={!canGoLeft}
            className="rounded-full border border-[#232526] bg-[#232526] text-white hover:bg-[#232526]/80 disabled:opacity-40"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => canGoRight && setStart(start + 1)}
            disabled={!canGoRight}
            className="rounded-full border border-[#232526] bg-[#232526] text-white hover:bg-[#232526]/80 disabled:opacity-40"
          >
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}