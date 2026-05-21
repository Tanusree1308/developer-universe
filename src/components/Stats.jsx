import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Smartphone, Cpu, Link } from 'lucide-react'

const stats = [
    { icon: Code2, value: '10+', label: 'Projects Built', color: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
    { icon: Code2, value: 'Full Stack', label: 'Developer', color: '#38bdf8', glow: 'rgba(56,189,248,0.3)' },
    { icon: Smartphone, value: 'Android', label: 'App Developer', color: '#f472b6', glow: 'rgba(244,114,182,0.3)' },
    { icon: Cpu, value: 'IoT', label: 'Innovator', color: '#34d399', glow: 'rgba(52,211,153,0.3)' },
    { icon: Link, value: 'Blockchain', label: 'Learner', color: '#fb923c', glow: 'rgba(251,146,60,0.3)' },
]

function StatCard({ icon: Icon, value, label, color, glow, index }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-strong rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden group cursor-default"
            style={{
                border: `1px solid ${color}20`,
                transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px ${glow}` }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
        >
            {/* Background glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 70%)` }}
            />

            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
            >
                <Icon size={22} style={{ color }} />
            </div>

            <div
                className="text-2xl font-black mb-1 relative z-10"
                style={{ color }}
            >
                {value}
            </div>
            <div className="text-slate-400 text-sm font-medium relative z-10">{label}</div>
        </motion.div>
    )
}

export default function Stats() {
    return (
        <section className="relative py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {stats.map((s, i) => (
                        <StatCard key={s.label} {...s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
