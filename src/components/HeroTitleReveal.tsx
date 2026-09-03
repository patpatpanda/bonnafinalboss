'use client'

import { motion } from 'framer-motion'

type HeroTitleRevealProps = {
  text: string
}

export default function HeroTitleReveal({
  text,
}: HeroTitleRevealProps) {
  const words = text.split(' ')

  return (
    <h1
      className="
        max-w-5xl
        text-5xl
        font-black
        uppercase
        leading-[0.84]
        tracking-[-0.05em]
        text-white
        sm:text-6xl
        md:text-8xl
        lg:text-[7.5rem]
      "
      style={{
        fontFamily: 'Georgia, Times New Roman, serif',
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{
            opacity: 0,
            y: 45,
            filter: 'blur(12px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.7,
            delay: 0.35 + index * 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-[0.22em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}