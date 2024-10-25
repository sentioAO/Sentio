"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../Components/ui/hero-highlight";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl  px-4 md:text-4xl lg:text-5xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
       style={{fontFamily:"'Roboto'"}}>
        With code audits, nothing&apos;s clear. Everything is complex. Everything
        is a{" "}
        <Highlight className="text-black dark:text-white">
          function, of a function, of a function.
        </Highlight><br/>
        <button
          className="px-4 py-2 bg-[#9966ff] rounded-lg text-sm hover:bg-white hover:text-[#9966ff] transition-colors duration-300"
          onClick={() => {
           
            window.scrollTo(0, document.body.scrollHeight);
          }}
        >
          Get Sentio Audit
        </button>
      </motion.h1>
    </HeroHighlight>
  );
}
