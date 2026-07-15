import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "motion/react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  stagger?: number;
}

export function WordsPullUp({ text, className, showAsterisk, stagger = 0.08 }: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.9,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className || ""}`}
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-1 relative">
            <motion.span
              variants={wordVariants}
              className="inline-block relative"
            >
              {word}
              {isLastWord && showAsterisk && (
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] pointer-events-none">
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </motion.div>
  );
}

interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
  stagger?: number;
}

export function WordsPullUpMultiStyle({ segments, className, stagger = 0.08 }: WordsPullUpMultiStyleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Flat map segments to words, keeping their specific styles
  const wordsWithStyles = segments.flatMap((segment) => {
    if (!segment.text) return [];
    const words = segment.text.split(" ");
    return words.map((word) => ({
      word,
      className: segment.className || "",
    }));
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.9,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center ${className || ""}`}
    >
      {wordsWithStyles.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-1">
          <motion.span
            variants={wordVariants}
            className={`inline-block ${item.className}`}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

interface AnimatedLetterProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  key?: React.Key | any;
}

export function AnimatedLetter({ char, index, total, progress }: AnimatedLetterProps) {
  const charProgress = index / total;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);
  
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

interface ScrollRevealParagraphProps {
  text: string;
  className?: string;
}

export function ScrollRevealParagraph({ text, className }: ScrollRevealParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.82", "end 0.25"],
  });

  const words = text.split(" ");
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wIdx) => {
        const wordChars = word.split("");
        if (wIdx < words.length - 1) {
          wordChars.push(" ");
        }
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char, cIdx) => {
              const index = charIndex++;
              return (
                <AnimatedLetter
                  key={cIdx}
                  char={char}
                  index={index}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              );
            })}
          </span>
        );
      })}
    </div>
  );
}
