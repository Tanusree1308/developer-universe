import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
    {
        name: 'Prof. Ramesh Kumar',
        role: 'Faculty Mentor, CSE Dept.',
        text: 'Tanusree demonstrates exceptional problem-solving skills. Her IoT projects show a rare blend of hardware and software expertise that sets her apart.',
        stars: 5,
        color: '#a78bfa',
    },
    {
        name: 'InnovIT Jury Panel',
        role: 'Competition Judges',
        text: 'The Smart Baby Incubator project was technically impressive and socially impactful. A well-deserved recognition for outstanding innovation.',
        stars: 5,
        color: '#38bdf8',
    },
    {
        name: 'Arjun Mehta',
        role: 'Senior Developer, Tech Startup',
        text: 'Working with Tanusree on the full-stack project was seamless. Her code quality, attention to detail, and delivery speed are top-notch.',
        stars: 5,
        color: '#f472b6',
    },
]

function TestimonialCard({ t, index }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="glass-strong rounded-2xl p-6 relative overflow-hidden group"
            style={{ border: `1px solid ${t.color}20` }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px ${t.color}15` }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
        >
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${t.color}50, transparent)` }}
            />

            <Quote size={24} className="mb-4 opacity-30" style={{ color: t.color }} />

            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

            <div className="flex items-center justify-between">
                <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{t.role}</div>
                </div>
                <div className="flex gap-0.5">
                    {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} size={12} fill={t.color} style={{ color: t.color }} />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default function Testimonials() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    return (
        <section className="relative py-28 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono text-yellow-400 tracking-widest uppercase mb-4 block">
                        — Testimonials —
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        What They{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #fbbf24, #f472b6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Say
                        </span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={t.name} t={t} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
