import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Zap, Heart } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="relative border-t border-white/5 py-12 px-6 overflow-hidden">
            {/* Animated stars */}
            {[...Array(30)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: Math.random() * 1.5 + 0.5 + 'px',
                        height: Math.random() * 1.5 + 0.5 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        opacity: Math.random() * 0.4 + 0.1,
                        animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                        animationDelay: Math.random() * 3 + 's',
                    }}
                />
            ))}

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                        >
                            <Zap size={14} className="text-white" />
                        </div>
                        <span
                            className="font-bold"
                            style={{
                                background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Tanusree.dev
                        </span>
                    </div>

                    {/* Credit */}
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <span>Designed & Developed by</span>
                        <span
                            className="font-semibold"
                            style={{
                                background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Tanusree
                        </span>
                        <span>with</span>
                        <Heart size={12} className="text-pink-500" fill="#ec4899" />
                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-3">
                        <motion.a
                            href="https://github.com/Tanusree1308"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -2 }}
                            className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white border border-white/8 hover:border-purple-500/40 transition-all duration-200"
                        >
                            <Github size={15} />
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/gaddam-tanusree-a6758b349"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -2 }}
                            className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white border border-white/8 hover:border-cyan-500/40 transition-all duration-200"
                        >
                            <Linkedin size={15} />
                        </motion.a>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-slate-600 text-xs font-mono">
                        © 2024 Developer Universe · A journey through the cosmos
                    </p>
                </div>
            </div>
        </footer>
    )
}
