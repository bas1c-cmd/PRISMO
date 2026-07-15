import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { WordsPullUpMultiStyle } from "./AnimationComponents";

interface FeaturesSectionProps {
  onLearnMoreClick: (featureTitle: string) => void;
}

export function FeaturesSection({ onLearnMoreClick }: FeaturesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const headerSegments = [
    { text: "Studio-grade workflows for visionary creators. ", className: "text-[#E1E0CC] font-normal block mb-1" },
    { text: "Built for pure vision. Powered by art.", className: "text-gray-500 font-normal block" }
  ];

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const features = [
    {
      id: "storyboard",
      title: "Project Storyboard.",
      number: "01",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
      items: [
        "Interactive dynamic timelines",
        "Shot composition templates",
        "Real-time keyframe markup",
        "Automated aspect ratios",
      ],
    },
    {
      id: "critiques",
      title: "Smart Critiques.",
      number: "02",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
      items: [
        "Instant frame AI critiques",
        "Detailed visual creative notes",
        "Figma & Premiere integrations",
      ],
    },
    {
      id: "capsule",
      title: "Immersion Capsule.",
      number: "03",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
      items: [
        "Automatic notification silencing",
        "Adaptive ambient soundscapes",
        "Seamless calendar syncing",
      ],
    },
  ];

  return (
    <section 
      id="features" 
      className="w-full bg-black py-20 sm:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden select-none"
    >
      {/* Subtle background noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        
        {/* Header Text */}
        <div id="features-header" className="text-center md:text-left max-w-2xl">
          <WordsPullUpMultiStyle
            segments={headerSegments}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug tracking-tight"
            stagger={0.06}
          />
        </div>

        {/* 4-Column Bento Card Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1"
        >
          {/* Card 1 - Video Card */}
          <motion.div
            id="feature-card-video"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative rounded-2xl overflow-hidden lg:h-[480px] h-[340px] bg-zinc-950 border border-zinc-900 group shadow-2xl"
          >
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <h4 className="text-[#E1E0CC] text-xl sm:text-2xl font-medium tracking-tight">
                Your creative canvas.
              </h4>
            </div>
          </motion.div>

          {/* Card 2, 3, 4 - Information Cards */}
          {features.map((feat, index) => (
            <motion.div
              id={`feature-card-${feat.id}`}
              key={feat.id}
              custom={index + 1}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="bg-[#212121] rounded-2xl p-6 sm:p-8 flex flex-col justify-between lg:h-[480px] min-h-[380px] border border-zinc-900 group transition-all duration-300 hover:bg-[#252525] hover:border-zinc-800 shadow-2xl"
            >
              {/* Card Top Information */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <img
                    src={feat.icon}
                    alt={feat.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover bg-zinc-900 border border-zinc-800"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-gray-500 font-mono text-xs sm:text-sm select-none">({feat.number})</span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                    {feat.title}
                  </h3>
                </div>

                {/* Checklist items */}
                <ul className="flex flex-col gap-3.5 mt-2">
                  {feat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-gray-400 font-light leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Bottom: Learn More */}
              <div className="pt-6 border-t border-zinc-800/60 flex justify-between items-center mt-6">
                <button 
                  id={`learn-more-${feat.id}`}
                  onClick={() => onLearnMoreClick(feat.title)}
                  className="text-primary hover:text-[#E1E0CC] text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer text-left"
                >
                  Learn more
                </button>
                <button
                  id={`learn-more-btn-${feat.id}`}
                  onClick={() => onLearnMoreClick(feat.title)}
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
