import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState('loading') // loading | done

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval)
                    setTimeout(() => { setPhase('done'); setTimeout(onComplete, 600) }, 300)
                    return 100
                }
                return p + Math.random() * 4 + 1
            })
        }, 40)
        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <AnimatePresence>
            {phase === 'loading' && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{ background: '#020408' }}
                >
                    {/* Stars */}
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: Math.random() * 2 + 1 + 'px',
                                height: Math.random() * 2 + 1 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                opacity: Math.random() * 0.7 + 0.1,
                                animation: `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`,
                                animationDelay: Math.random() * 2 + 's',
                            }}
                        />
                    ))}

                    {/* Planet */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="relative mb-10"
                    >
                        <div
                            className="w-24 h-24 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #a78bfa, #7c3aed, #1e1b4b)',
                                boxShadow: '0 0 60px rgba(139,92,246,0.6), 0 0 120px rgba(139,92,246,0.2)',
                            }}
                        />
                        {/* Ring */}
                        <div
                            className="absolute inset-0 m-auto rounded-full border border-purple-400/30"
                            style={{
                                width: '160px',
                                height: '160px',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) rotateX(70deg)',
                            }}
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold mb-1 tracking-widest"
                        style={{
                            background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        DEVELOPER UNIVERSE
                    </motion.h1>
                    <p className="text-slate-500 text-sm font-mono mb-10 tracking-widest">
                        INITIALIZING GALAXY...
                    </p>

                    {/* Progress bar */}
                    <div className="w-64 h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full loading-bar"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <p className="text-slate-600 text-xs font-mono mt-3">
                        {Math.min(Math.floor(progress), 100)}%
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
