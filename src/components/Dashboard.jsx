import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, Thermometer, Droplets, Wind, TrendingUp, Wifi } from 'lucide-react'

function MiniChart({ color, values }) {
    const max = Math.max(...values)
    const w = 120
    const h = 40
    const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - (v / max) * h}`)
    const path = `M ${pts.join(' L ')}`
    const fill = `M 0,${h} L ${pts.join(' L ')} L ${w},${h} Z`

    return (
        <svg width={w} height={h} className="overflow-visible">
            <defs>
                <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={fill} fill={`url(#grad-${color})`} />
            <path d={path} stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
    )
}

const sensorCards = [
    { icon: Thermometer, label: 'Temperature', value: '36.8°C', status: 'Normal', color: '#f472b6', data: [34, 35, 36, 36.5, 36.8, 36.6, 36.8] },
    { icon: Droplets, label: 'Humidity', value: '68%', status: 'Optimal', color: '#38bdf8', data: [60, 63, 65, 67, 68, 67, 68] },
    { icon: Activity, label: 'Heart Rate', value: '142 bpm', status: 'Stable', color: '#a78bfa', data: [138, 140, 142, 141, 143, 142, 142] },
    { icon: Wind, label: 'O₂ Level', value: '98%', status: 'Excellent', color: '#34d399', data: [95, 96, 97, 97, 98, 98, 98] },
]

const analyticsData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]

export default function Dashboard() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="relative py-28 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono text-green-400 tracking-widest uppercase mb-4 block">
                        — Featured Dashboard —
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        Live{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #34d399, #38bdf8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Command Center
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto">
                        Real-time monitoring dashboards built for IoT and analytics systems.
                    </p>
                </motion.div>

                {/* Dashboard mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="glass-strong rounded-3xl border border-white/8 overflow-hidden"
                    style={{ boxShadow: '0 0 80px rgba(52,211,153,0.08)' }}
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                            </div>
                            <span className="text-xs font-mono text-slate-500">smart-incubator.dashboard</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Wifi size={12} className="text-green-400" />
                            <span className="text-xs text-green-400 font-mono">LIVE</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        </div>
                    </div>

                    <div className="p-6 grid lg:grid-cols-3 gap-6">
                        {/* Sensor cards */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                            {sensorCards.map((card, i) => {
                                const Icon = card.icon
                                return (
                                    <motion.div
                                        key={card.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="glass rounded-2xl p-4 relative overflow-hidden"
                                        style={{ border: `1px solid ${card.color}20` }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Icon size={14} style={{ color: card.color }} />
                                                <span className="text-xs text-slate-400">{card.label}</span>
                                            </div>
                                            <span
                                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                                style={{ background: `${card.color}15`, color: card.color }}
                                            >
                                                {card.status}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-black text-white mb-3">{card.value}</div>
                                        <MiniChart color={card.color} values={card.data} />
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Analytics panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5 }}
                            className="glass rounded-2xl p-5 border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-semibold text-white">Analytics</span>
                                <TrendingUp size={14} className="text-purple-400" />
                            </div>

                            {/* Bar chart */}
                            <div className="flex items-end gap-1.5 h-32 mb-4">
                                {analyticsData.map((v, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={inView ? { height: `${v}%` } : {}}
                                        transition={{ delay: 0.6 + i * 0.05, duration: 0.6 }}
                                        className="flex-1 rounded-t-sm"
                                        style={{
                                            background: `linear-gradient(to top, #7c3aed, #06b6d4)`,
                                            opacity: 0.6 + (v / 100) * 0.4,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="space-y-3">
                                {[
                                    { label: 'Uptime', value: '99.8%', color: '#34d399' },
                                    { label: 'Alerts', value: '2 today', color: '#fbbf24' },
                                    { label: 'Data Points', value: '14.2K', color: '#a78bfa' },
                                ].map(item => (
                                    <div key={item.label} className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">{item.label}</span>
                                        <span className="text-xs font-mono font-bold" style={{ color: item.color }}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
