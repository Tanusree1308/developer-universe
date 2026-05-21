import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Baby, Waves, Brain, Smartphone } from 'lucide-react'

const projects = [
    {
        icon: Baby,
        title: 'Smart Baby Incubator',
        description: 'Real-time sensor monitoring system for neonatal care with live data visualization and alerts.',
        tags: ['ESP32', 'Firebase', 'Node.js', 'IoT'],
        badge: '🏆 3rd Prize InnovIT',
        color: '#a78bfa',
        glow: 'rgba(167,139,250,0.25)',
        accent: '#7c3aed',
    },
    {
        icon: Waves,
        title: 'Pond Monitoring System',
        description: 'pH, dissolved oxygen, turbidity, and temperature tracking with real-time analytics dashboard.',
        tags: ['IoT', 'Analytics', 'Sensors', 'Dashboard'],
        badge: null,
        color: '#38bdf8',
        glow: 'rgba(56,189,248,0.25)',
        accent: '#0284c7',
    },
    {
        icon: Brain,
        title: 'Deep Learning Project',
        description: 'AI-powered intelligent system with modern responsive UI and advanced neural network architecture.',
        tags: ['Python', 'TensorFlow', 'AI', 'React'],
        badge: null,
        color: '#f472b6',
        glow: 'rgba(244,114,182,0.25)',
        accent: '#db2777',
    },
    {
        icon: Smartphone,
        title: 'React Native CRUD App',
        description: 'Mobile application with MongoDB Atlas backend, full authentication and CRUD operations.',
        tags: ['React Native', 'MongoDB', 'Node.js', 'Auth'],
        badge: null,
        color: '#34d399',
        glow: 'rgba(52,211,153,0.25)',
        accent: '#059669',
    },
]

function ProjectCard({ project, index }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const Icon = project.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            whileHover={{ y: -12 }}
            className="glass-strong rounded-2xl p-6 relative overflow-hidden group cursor-default flex flex-col"
            style={{ border: `1px solid ${project.color}20` }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 50px ${project.glow}` }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
        >
            {/* Top glow */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
            />

            {/* Background gradient */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}06, transparent 60%)` }}
            />

            {/* Floating animation */}
            <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 flex flex-col flex-1"
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                    >
                        <Icon size={22} style={{ color: project.color }} />
                    </div>
                    {project.badge && (
                        <span
                            className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{
                                background: `${project.color}15`,
                                color: project.color,
                                border: `1px solid ${project.color}30`,
                            }}
                        >
                            {project.badge}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full font-mono"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: '#94a3b8',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Button */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl w-full justify-center transition-all duration-200"
                    style={{
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}30`,
                        color: project.color,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${project.color}25` }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${project.color}15` }}
                >
                    View Project <ExternalLink size={14} />
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default function Projects() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    return (
        <section id="projects" className="relative py-28 px-6">
            {/* Section glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
            />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-4 block">
                        — Project Universe —
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        Stellar{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Creations
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Each project is a universe of its own — built with precision, passion, and cutting-edge technology.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.title} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
