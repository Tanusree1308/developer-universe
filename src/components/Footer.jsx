import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer
            className="relative py-16 px-6 overflow-hidden flex flex-col items-center justify-center text-center"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d0520 0%, #020408 60%)' }}
        >
            {/* Stars */}
            {[...Array(40)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: Math.random() * 2 + 0.5 + 'px',
                        height: Math.random() * 2 + 0.5 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        opacity: Math.random() * 0.5 + 0.1,
                        animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                        animationDelay: Math.random() * 3 + 's',
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <div
                    className="w-12 h-12 rounded-full mx-auto mb-6"
                    style={{
                        background: 'radial-gradient(circle at 35% 30%, #fff7a0, #ffcc00 30%, #ff8800 70%, #cc4400 100%)',
                        boxShadow: '0 0 30px #ffaa00, 0 0 60px #ff880040',
                    }}
                />
                <p className="text-slate-500 text-sm font-mono tracking-widest mb-2">
                    THE UNIVERSE IS INFINITE
                </p>
                <p className="text-slate-700 text-xs">
                    Developer Universe · {new Date().getFullYear()}
                </p>
            </motion.div>
        </footer>
    )
}
