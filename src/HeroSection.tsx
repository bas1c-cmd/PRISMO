import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { WordsPullUp } from "./AnimationComponents";

interface HeroSectionProps {
  onInquiryClick: () => void;
}

export function HeroSection({ onInquiryClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [hoveredNavIdx, setHoveredNavIdx] = useState<number | null>(null);

  const navItems = [
    { label: "Our story", href: "#about" },
    { label: "Collective", href: "#features" },
    { label: "Workshops", href: "#features" },
    { label: "Programs", href: "#features" },
    { label: "Inquiries", href: "#inquiries", action: onInquiryClick },
  ];

  return (
    <section id="hero" className="w-full h-screen p-4 md:p-6 bg-black relative select-none">
      <div 
        ref={containerRef}
        className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-950 flex flex-col justify-between"
      >
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65 pointer-events-none" />

        {/* Hanging Pill Navbar */}
        <nav 
          id="navbar-pill"
          className="absolute top-0 left-1/2 -translate-x-1/2 z-40 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 shadow-2xl border border-zinc-900 border-t-0"
        >
          <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {navItems.map((item, idx) => {
              const style = {
                color: hoveredNavIdx === idx ? "#E1E0CC" : "rgba(225, 224, 204, 0.8)",
                fontFamily: "Almarai, sans-serif",
              };

              if (item.action) {
                return (
                  <button
                    id={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      item.action();
                    }}
                    onMouseEnter={() => setHoveredNavIdx(idx)}
                    onMouseLeave={() => setHoveredNavIdx(null)}
                    style={style}
                    className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <a
                  id={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                  key={idx}
                  href={item.href}
                  onMouseEnter={() => setHoveredNavIdx(idx)}
                  onMouseLeave={() => setHoveredNavIdx(null)}
                  style={style}
                  className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer"
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Bottom-Aligned Content */}
        <div className="relative mt-auto w-full p-6 sm:p-10 md:p-12 lg:p-16 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
            
            {/* Giant Heading "Prisma*" (8 columns) */}
            <div className="lg:col-span-8 flex items-end">
              <WordsPullUp
                text="Prisma"
                showAsterisk={true}
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.80] tracking-[-0.07em] text-[#E1E0CC] select-none"
              />
            </div>

            {/* Description and CTA (4 columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 justify-end">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#DEDBC8]/70 text-xs sm:text-sm md:text-base leading-[1.3] font-light max-w-sm"
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>

              <motion.button
                id="cta-join-lab"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onClick={onInquiryClick}
                className="group flex items-center justify-between bg-[#DEDBC8] hover:bg-[#E1E0CC] text-black font-semibold text-sm sm:text-base pl-6 pr-1.5 py-1.5 rounded-full transition-all duration-300 self-start w-48 sm:w-52 cursor-pointer shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <span className="tracking-wide">Join the lab</span>
                <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-900 transition-all duration-300 shrink-0">
                  <ArrowRight className="w-5 h-5 text-[#DEDBC8]" />
                </div>
              </motion.button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
