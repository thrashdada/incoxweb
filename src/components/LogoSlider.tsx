"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const logos = [
  { src: '/logos/logo1.png', alt: 'Company 1' },
  { src: '/logos/logo2.png', alt: 'Company 2' },
  { src: '/logos/logo3.png', alt: 'Company 3' },
  { src: '/logos/logo4.png', alt: 'Company 4' },
  { src: '/logos/logo5.png', alt: 'Company 5' },
  { src: '/logos/logo6.png', alt: 'Company 6' },
];

export function LogoSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleAnimationEnd = () => {
      if (slider) {
        slider.style.animation = 'none';
        slider.offsetHeight; // Trigger reflow
        slider.style.animation = 'scroll 30s linear infinite';
      }
    };

    slider.addEventListener('animationend', handleAnimationEnd);
    return () => slider.removeEventListener('animationend', handleAnimationEnd);
  }, []);

  return (
    <div className="w-full overflow-hidden py-12">
      <div className="relative flex">
        <div
          ref={sliderRef}
          className="flex animate-scroll space-x-16"
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center justify-center w-32 h-16 relative"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center justify-center w-32 h-16 relative"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="object-contain"
              />
            </div>
          ))}
          {/* Third set for smoother transition */}
          {logos.map((logo, index) => (
            <div
              key={`third-${index}`}
              className="flex items-center justify-center w-32 h-16 relative"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 