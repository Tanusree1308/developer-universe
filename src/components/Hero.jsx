import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket, ChevronDown } from 'lucide-react'

const techIcons = [
    { label: 'React', color: '#61dafb', angle: 0 },
    { label: 'Node', color: '#68a063', angle: 51 },
    { label: 'Mongo', color: '#4db33d', angle: 102 },
    { label: 'AWS', color: '#ff9900', angle: 153 },
    { label: 'RN', color: '#61dafb', angle: 204 },
    { label: 'Chain', color: '#f7931a', angle: 255 },
    { label: 'Fire', color: '#ffca28', angle: 306 },
]

function OrbitIcon({ label, color, angle, radius, duration }) {
    const rad = (angle * Math.PI) / 180
    const x = Math.cos(rad) * radius
    const y = Math.sin(rad) * radius

    return (
        <motion.div
            className="absolute flex items-center justify-center"
            style={{
                width: 44,
                height: 44,
                left: '50%',
                top: '50%',
                marginLeft: -22,
                marginTop: -22,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    x,
                    y,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
            >
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold glass-strong"
                    style={{
                        border: `1px solid ${color}40`,
                        color,
                        boxShadow: `0 0 12px ${color}40`,
                        fontSize: '9px',
                    }}
                >
                    {label}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Hero() {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center py-20">
                {/* Left */}
                <div className="relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 glass border border-purple-500/20 rounded-full px-4 py-2 mb-8"
                    >
                        <Rocket size={14} className="text-purple-400" />
                        <span className="text-sm text-slate-300 font-medium">
                            Full Stack & Android Developer
                        </span>
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6"
                    >
                        <span className="text-white">Building</span>
                        <br />
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 50%, #f472b6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Digital Worlds
                        </span>
                        <br />
                        <span className="text-white">Beyond</span>
                        <br />
                        <span className="text-slate-400">Imagination</span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg"
                    >
                        I create futuristic web apps, IoT systems, mobile applications, and
                        intelligent digital experiences using modern technologies.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                        className="flex flex-wrap gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                boxShadow: '0 0 30px rgba(139,92,246,0.4)',
                            }}
                        >
                            <span>Explore Universe</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={scrollToProjects}
                            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-slate-300 hover:text-white glass border border-white/10 hover:border-purple-500/40 transition-all duration-300"
                        >
                            View Projects
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right — Planet */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative flex items-center justify-center"
                >
                    <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                        {/* Outer glow rings */}
                        {[1.6, 1.35, 1.15].map((scale, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 m-auto rounded-full border border-purple-500/10"
                                style={{
                                    width: `${scale * 100}%`,
                                    height: `${scale * 100}%`,
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotateX(${60 + i * 5}deg)`,
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15 + i * 8, repeat: Infinity, ease: 'linear' }}
                            />
                        ))}

                        {/* Orbit ring with dashes */}
                        <div
                            className="absolute inset-0 m-auto rounded-full"
                            style={{
                                width: '130%',
                                height: '130%',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) rotateX(72deg)',
                                border: '1px dashed rgba(139,92,246,0.25)',
                            }}
                        />

                        {/* Planet */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 m-auto rounded-full"
                            style={{
                                width: '65%',
                                height: '65%',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'radial-gradient(circle at 35% 30%, #c4b5fd, #7c3aed 40%, #1e1b4b 80%, #0a0520)',
                                boxShadow: '0 0 80px rgba(139,92,246,0.5), 0 0 160px rgba(139,92,246,0.2), inset -20px -20px 40px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* Surface detail */}
                            <div
                                className="absolute inset-0 rounded-full opacity-30"
                                style={{
                                    background: 'radial-gradient(circle at 60% 60%, transparent 40%, rgba(0,0,0,0.6) 100%)',
                                }}
                            />
                        </motion.div>

                        {/* Orbiting tech icons */}
                        {techIcons.map((icon, i) => (
                            <OrbitIcon
                                key={icon.label}
                                {...icon}
                                radius={160}
                                duration={12 + i * 2}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <span className="text-xs font-mono tracking-widest">EXPLORE THE UNIVERSE</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown size={18} />
                </motion.div>
            </motion.div>
        </section>
    )
}
