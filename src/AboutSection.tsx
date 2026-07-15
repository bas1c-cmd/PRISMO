import { WordsPullUpMultiStyle, ScrollRevealParagraph } from "./AnimationComponents";

export function AboutSection() {
  const aboutSegments = [
    { text: "I am Marcus Chen, ", className: "font-normal" },
    { text: "a self-taught director. ", className: "italic font-serif text-[#DEDBC8]" },
    { text: "I have skills in color grading, visual effects, and narrative design.", className: "font-normal" }
  ];

  return (
    <section 
      id="about" 
      className="w-full bg-black py-16 sm:py-24 px-4 sm:px-6 md:px-8 flex justify-center items-center"
    >
      <div 
        id="about-card"
        className="w-full max-w-6xl bg-[#101010] rounded-2xl md:rounded-[2rem] p-8 sm:p-12 md:p-16 lg:p-20 text-center flex flex-col items-center gap-6 sm:gap-8 md:gap-10 border border-zinc-900 overflow-hidden relative shadow-2xl"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#DEDBC8]/3 rounded-full blur-[100px] pointer-events-none" />

        {/* Top small label */}
        <span 
          id="about-label"
          className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold select-none bg-primary/5 px-3 py-1 rounded-full border border-primary/10"
        >
          Visual arts
        </span>

        {/* Multi-styled pull-up heading */}
        <div className="z-10 w-full max-w-3xl">
          <WordsPullUpMultiStyle
            segments={aboutSegments}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] sm:leading-[0.95] tracking-tight text-primary font-light"
            stagger={0.08}
          />
        </div>

        {/* Scroll-linked letter opacity paragraph */}
        <div className="z-10 w-full max-w-2xl mt-4 sm:mt-6">
          <ScrollRevealParagraph
            text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
            className="text-[#DEDBC8] text-sm sm:text-base md:text-lg leading-[1.6] font-light text-center antialiased"
          />
        </div>
      </div>
    </section>
  );
}
