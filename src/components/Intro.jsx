import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Intro() {
    const sunRef = useRef(null)

    return (
        <section
            id="intro"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, #0d0520 0%, #020408 70%)' }}
        >
            {/* Deep space nebula layers */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 20% 30%, rgba(120,40,200,0.12) 0%, transparent 55%)',
                }} />
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 80% 70%, rgba(6,182,212,0.08) 0%, transparent 50%)',
                }} />
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 60% 20%, rgba(236,72,153,0.06) 0%, transparent 45%)',
                }} />
            </div>

            {/* Animated Sun in center */}
            <motion.div
                ref={sunRef}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
                className="relative mb-16"
            >
                {/* Corona pulses */}
                {[2.8, 2.2, 1.7].map((s, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: 120 * s, height: 120 * s,
                            top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)',
                            background: `radial-gradient(circle, transparent 40%, rgba(255,${140 - i * 30},0,${0.06 - i * 0.015}) 70%, transparent 100%)`,
                            border: `1px solid rgba(255,160,0,${0.1 - i * 0.025})`,
                        }}
                        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.5 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                ))}

                {/* Sun body */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="relative rounded-full"
                    style={{
                        width: 120, height: 120,
                        background: 'radial-gradient(circle at 35% 30%, #fff7a0, #ffcc00 25%, #ff8800 60%, #cc4400 100%)',
                        boxShadow: '0 0 60px #ffaa00, 0 0 120px #ff880060, 0 0 200px #ff440030',
                    }}
                >
                    {/* Surface swirl */}
                    <div className="absolute inset-0 rounded-full opacity-30" style={{
                        background: 'conic-gradient(from 0deg, transparent, rgba(255,200,0,0.3), transparent, rgba(255,100,0,0.2), transparent)',
                    }} />
                    {/* Specular */}
                    <div className="absolute rounded-full" style={{
                        width: '40%', height: '35%', top: '12%', left: '18%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 100%)',
                    }} />
                </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.9 }}
                className="text-center px-6 max-w-3xl"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-xs font-mono tracking-[0.3em] text-purple-400 uppercase mb-5"
                >
                    — Developer Universe —
                </motion.p>

                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                    <span className="text-white">Our </span>
                    <span style={{
                        background: 'linear-gradient(135deg, #ffcc00, #ff6600, #ff4488)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>Solar System</span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-4">
                    A star. Eight planets. Billions of years of cosmic history.
                </p>
                <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
                    Scroll down to journey through each world — from the scorched surface of Mercury to the frozen winds of Neptune.
                </p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <span className="text-xs font-mono tracking-widest">BEGIN THE JOURNEY</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    )
}
