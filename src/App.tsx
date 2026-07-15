import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Check, Sparkles, Send, Video, LayoutGrid, Eye, Radio } from "lucide-react";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { FeaturesSection } from "./FeaturesSection";

type ModalType = "inquiry" | "feature" | null;

interface FeatureDetails {
  title: string;
  icon: string;
  subtitle: string;
  description: string;
  benefits: string[];
}

export default function App() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetails | null>(null);
  
  // Inquiry form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formInterest, setFormInterest] = useState("Visual Arts");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Features detailed info
  const featureData: Record<string, FeatureDetails> = {
    "Project Storyboard.": {
      title: "Project Storyboard.",
      subtitle: "Cinematic planning engine",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
      description: "Map out your entire narrative with precise aspect ratios, responsive grid compositions, and dynamic visual scripting. Prisma's storyboard engine is crafted specifically for directors who translate emotion to film.",
      benefits: [
        "Frame-by-frame narrative orchestration.",
        "Interactive timeline staging with drag-and-drop mechanics.",
        "Dynamic aspect ratio bounds (2.39:1, 16:9, 1:1, 9:16).",
        "Direct export to Premiere Pro, DaVinci, and storyboard sheets."
      ]
    },
    "Smart Critiques.": {
      title: "Smart Critiques.",
      subtitle: "Aesthetic feedback network",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
      description: "Receive instant frame-accurate visual critique. Prisma's Smart Critique tool analyzes composition, tonal balances, and spatial geometry to ensure every visual asset stands at professional, gallery-grade caliber.",
      benefits: [
        "Aesthetic color harmony and balance checks.",
        "Collaborative frame pin-point commenting panels.",
        "Luminance and rule-of-thirds composition warnings.",
        "AI-assisted suggestions for grading reference files."
      ]
    },
    "Immersion Capsule.": {
      title: "Immersion Capsule.",
      subtitle: "Zero-noise focal space",
      icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
      description: "Enter a pristine psychological flow state. The Immersion Capsule silences external interference, adapts ambient focal lighting in sync with your desktop environment, and streams high-fidelity spatial frequency landscapes.",
      benefits: [
        "System-level notification shielding and silence locks.",
        "Generative binaural atmospheric soundscapes.",
        "Screen-synchronized color temperature glow matching.",
        "Time-blocked focal limits paired with workspace tasks."
      ]
    }
  };

  const handleInquiryOpen = () => {
    setFormSubmitted(false);
    setFormName("");
    setFormEmail("");
    setFormInterest("Visual Arts");
    setFormMessage("");
    setModalType("inquiry");
  };

  const handleFeatureOpen = (title: string) => {
    const data = featureData[title];
    if (data) {
      setSelectedFeature(data);
      setModalType("feature");
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedFeature(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setIsSubmitting(true);
    // Simulate API posting
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-black text-[#E1E0CC] selection:bg-primary selection:text-black">
      
      {/* 3 Core Sections */}
      <HeroSection onInquiryClick={handleInquiryOpen} />
      <AboutSection />
      <FeaturesSection onLearnMoreClick={handleFeatureOpen} />

      {/* Elegant Minimal Footer */}
      <footer id="footer-minimal" className="w-full bg-black py-12 px-6 border-t border-zinc-950 text-center text-gray-500 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 PRISMA STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-primary transition-colors duration-200">OUR STORY</a>
            <a href="#features" className="hover:text-primary transition-colors duration-200">LAB WORKFLOWS</a>
            <button onClick={handleInquiryOpen} className="hover:text-primary transition-colors duration-200 cursor-pointer">INQUIRE</button>
          </div>
        </div>
      </footer>

      {/* Unified Overlay Modal System */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div
              id="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              id="modal-body"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#101010] border border-zinc-900 rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl z-10 overflow-hidden"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                id="modal-close"
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-gray-400 hover:text-[#E1E0CC] flex items-center justify-center transition-all duration-200 cursor-pointer border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Inquiry Modal */}
              {modalType === "inquiry" && (
                <div id="inquiry-content">
                  {!formSubmitted ? (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-[10px] uppercase font-mono tracking-widest text-primary">Lab Portal</span>
                        </div>
                        <h3 className="text-2xl font-medium tracking-tight text-[#E1E0CC] mt-1">
                          Join the lab.
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm font-light mt-0.5 leading-relaxed">
                          Submit your inquiry to synchronize with the creative collective.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 mt-2">
                        {/* Name Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-gray-400 text-xs font-mono uppercase tracking-wider">Your Name</label>
                          <input
                            id="input-name"
                            type="text"
                            required
                            placeholder="Marcus Aurelius"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="bg-zinc-900/80 border border-zinc-800/80 focus:border-primary/50 text-[#E1E0CC] text-sm px-4 py-3 rounded-xl outline-none transition-all duration-300"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-gray-400 text-xs font-mono uppercase tracking-wider">Email Address</label>
                          <input
                            id="input-email"
                            type="email"
                            required
                            placeholder="marcus@collective.com"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            className="bg-zinc-900/80 border border-zinc-800/80 focus:border-primary/50 text-[#E1E0CC] text-sm px-4 py-3 rounded-xl outline-none transition-all duration-300"
                          />
                        </div>

                        {/* Interest Selector */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-gray-400 text-xs font-mono uppercase tracking-wider">Focal Interest</label>
                          <select
                            id="select-interest"
                            value={formInterest}
                            onChange={(e) => setFormInterest(e.target.value)}
                            className="bg-zinc-900/80 border border-zinc-800/80 focus:border-primary/50 text-[#E1E0CC] text-sm px-4 py-3 rounded-xl outline-none transition-all duration-300 cursor-pointer appearance-none"
                          >
                            <option value="Visual Arts">Visual Arts & Film</option>
                            <option value="Color Grading">DaVinci Grading</option>
                            <option value="VFX">VFX & Spatial Render</option>
                            <option value="Collaborations">Brand Collaboration</option>
                          </select>
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-gray-400 text-xs font-mono uppercase tracking-wider">Message</label>
                          <textarea
                            id="textarea-message"
                            rows={3}
                            placeholder="Tell us about your visual hunger..."
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            className="bg-zinc-900/80 border border-zinc-800/80 focus:border-primary/50 text-[#E1E0CC] text-sm px-4 py-3 rounded-xl outline-none transition-all duration-300 resize-none"
                          />
                        </div>
                      </div>

                      <button
                        id="btn-submit-inquiry"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#DEDBC8] hover:bg-[#E1E0CC] text-black font-semibold text-sm py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-[0.99] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Transmit Inquiry</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <motion.div 
                      id="inquiry-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center text-center py-8 gap-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xl">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-xl font-medium text-[#E1E0CC]">Transmission Complete.</h4>
                        <p className="text-gray-500 text-sm font-light mt-1 max-w-sm">
                          Thank you, <span className="text-primary font-medium">{formName}</span>. Your creative signals have been calibrated. Our team will correspond shortly.
                        </p>
                      </div>
                      <button
                        id="btn-success-close"
                        onClick={handleCloseModal}
                        className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-primary text-xs font-mono tracking-wider px-6 py-2.5 rounded-full transition-all duration-200 mt-2 cursor-pointer"
                      >
                        CLOSE ARCHIVE
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Feature Modal */}
              {modalType === "feature" && selectedFeature && (
                <div id="feature-detail-content" className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedFeature.icon}
                      alt={selectedFeature.title}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-800 bg-zinc-900"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <span className="text-primary text-[10px] font-mono uppercase tracking-widest">{selectedFeature.subtitle}</span>
                      <h3 className="text-2xl font-medium text-[#E1E0CC] tracking-tight mt-0.5">{selectedFeature.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {selectedFeature.description}
                  </p>

                  <div className="flex flex-col gap-3.5 mt-2 bg-zinc-900/50 p-5 rounded-2xl border border-zinc-900">
                    <h4 className="text-[#E1E0CC] text-xs font-semibold uppercase tracking-wider font-mono">Core Capability Breakdown</h4>
                    <ul className="flex flex-col gap-2.5">
                      {selectedFeature.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-gray-400 font-light">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      id="feature-inquire-cta"
                      onClick={() => {
                        setFormSubmitted(false);
                        setModalType("inquiry");
                      }}
                      className="flex-1 bg-primary hover:bg-[#E1E0CC] text-black font-semibold text-sm py-3 rounded-xl transition-all duration-300 text-center cursor-pointer active:scale-[0.99]"
                    >
                      Inquire on workflow
                    </button>
                    <button
                      id="feature-close-cta"
                      onClick={handleCloseModal}
                      className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 text-gray-400 hover:text-[#E1E0CC] text-sm transition-all duration-300 cursor-pointer"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
