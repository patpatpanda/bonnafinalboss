'use client'

import { motion } from 'framer-motion'

export default function YeehawReveal() {
  const letters = 'YEEHAW'.split('')

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1, 0.97, 1.02, 1],
      }}
      transition={{
        delay: 1.15,
        duration: 0.35,
        ease: 'easeOut',
      }}
      className="
        mt-3
        flex
        justify-center
        overflow-hidden
        text-2xl
        font-black
        uppercase
        leading-none
        tracking-[0.08em]
        text-white
        sm:text-3xl
        md:mt-4
        md:text-4xl
        lg:text-5xl
      "
      style={{
        fontFamily: 'Georgia, Times New Roman, serif',
      }}
      aria-label="Yeehaw"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{
            opacity: 0,
            y: 35,
            rotate: 8,
            scale: 0.75,
            filter: 'blur(6px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.45,
            delay: 0.35 + index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  )
}