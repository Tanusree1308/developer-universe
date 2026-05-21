import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Code2, Cpu, Trophy, Brain, Atom } from 'lucide-react'

const milestones = [
    {
        icon: GraduationCap,
        year: '2024',
        title: 'Started B.Tech in CSE',
        desc: 'Began Computer Science Engineering journey, diving deep into programming fundamentals, data structures, and algorithms.',
        color: '#a78bfa',
    },
    {
        icon: Code2,
        year: '2024',
        title: 'Learned Full Stack Development',
        desc: 'Mastered React, Node.js, MongoDB, and built complete web applications from scratch with modern UI/UX.',
        color: '#38bdf8',
    },
    {
        icon: Trophy,
        year: '2024',
        title: 'Won InnovIT Competition',
        desc: 'Secured 3rd Prize at InnovIT for the Smart Baby Incubator project — a milestone in innovation and engineering.',
        color: '#fbbf24',
    },
    {
        icon: Cpu,
        year: '2025',
        title: 'Built IoT Projects',
        desc: 'Developed Smart Baby Incubator and Pond Monitoring System using ESP32, Firebase, and real-time sensor networks.',
        color: '#34d399',
    },
    {
        icon: Brain,
        year: '2025',
        title: 'Exploring Deep Learning & AI',
        desc: 'Diving into neural networks, deep learning architectures, and building AI-powered intelligent systems.',
        color: '#f472b6',
    },
    {
        icon: Atom,
        year: '2026',
        title: 'Exploring Quantum Computing',
        desc: 'Currently in 3rd year, venturing into quantum algorithms, qubits, and the future of computational science.',
        color: '#fb923c',
    },
]

function TimelineItem({ item, index, isLeft }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const Icon = item.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.7 }}
            className={`flex items-center gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-12`}
        >
            <div className="flex-1">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-strong rounded-2xl p-6 relative overflow-hidden group"
                    style={{ border: `1px solid ${item.color}20` }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px ${item.color}20` }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                >
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: `linear-gradient(90deg, transparent, ${item.color}60, transparent)` }}
                    />
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                        >
                            <Icon size={18} style={{ color: item.color }} />
                        </div>
                        <span
                            className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                            style={{ background: `${item.color}15`, color: item.color }}
                        >
                            {item.year}
                        </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                    className="w-5 h-5 rounded-full relative"
                    style={{ background: item.color, boxShadow: `0 0 20px ${item.color}` }}
                >
                    <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: item.color, opacity: 0.3 }}
                    />
                </motion.div>
            </div>

            <div className="flex-1 hidden md:block" />
        </motion.div>
    )
}

export default function Journey() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    return (
        <section id="journey" className="relative py-28 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono text-pink-400 tracking-widest uppercase mb-4 block">
                        — Journey —
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        My{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #f472b6, #a78bfa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Odyssey
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto">
                        A timeline of milestones, discoveries, and achievements across the digital cosmos.
                    </p>
                </motion.div>

                <div className="relative">
                    <div
                        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
                        style={{
                            background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.4), rgba(6,182,212,0.4), transparent)',
                        }}
                    />
                    {milestones.map((item, i) => (
                        <TimelineItem key={item.title} item={item} index={i} isLeft={i % 2 === 0} />
                    ))}
                </div>
            </div>
        </section>
    )
}
