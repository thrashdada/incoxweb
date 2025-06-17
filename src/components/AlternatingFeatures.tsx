"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Unlock Cash Flow with Flexible Net Terms",
    description: "Get the breathing room your business needs by extending payments to any vendor—without chasing down terms or juggling due dates.",
    image: "/images/feat1.png",
    benefits: [
      "Extend payments by 30, 45, or 60 days based on your needs",
      "Apply universal net terms across your entire vendor network",
      "Keep your existing vendor agreements intact, no disruptions"
    ]
  },
  {
    title: "Streamline Spend with Incoxchange Virtual Cards",
    description: "Simplify how you pay for digital tools, services, and campaigns while gaining full control and visibility over every transaction.",
    image: "/images/feat2.png",
    benefits: [
      "Apply net terms even when paying via virtual cards",
      "Cut accounts payable costs with automatic invoice matching",
      "Track and report spending in real time across your organization",
      "Set spend limits by card to ensure compliance and control"
    ]
  }
];

export function AlternatingFeatures() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-16 mb-24 last:mb-0`}
          >
            {/* Text Content */}
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-medium text-gray-900">{feature.title}</h2>
              <p className="text-lg text-gray-600">{feature.description}</p>
              <ul className="space-y-4 text-gray-800">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="flex-1 relative aspect-[4/3] w-full">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 