"use client";

import Image from "next/image";
import { LogoSlider } from "@/components/LogoSlider";

const companies = [
  { name: "Wildcrafted", logo: "/logos/wildcrafted.png" },
  { name: "Magnolia", logo: "/logos/magnolia.png" },
  { name: "Stacked Lab", logo: "/logos/stackedlab.png" },
  { name: "WarpSpeed", logo: "/logos/warpspeed.png" },
  { name: "Clandestine", logo: "/logos/clandestine.png" },
  { name: "Shutterframe", logo: "/logos/shutterframe.png" },
  { name: "Powersurge", logo: "/logos/powersurge.png" },
];

export function SocialProofSection() {
  return (
    <section className="w-full bg-[#181A1B] py-24 px-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-center">
          <div className="md:col-span-2">
            <div className="text-gray-300 font-semibold mb-2 text-base">Trusted by 4,000+ companies</div>
            <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mb-0">
              A Reliable Partner for Property Management Teams
            </h2>
          </div>
          <div className="text-gray-400 text-lg">
            Smart spending drives growth—and that's why leading property managers choose Incoxchange to streamline their purchasing and payment workflows.
          </div>
        </div>
      </div>
      <LogoSlider />
    </section>
  );
} 