import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
    { name: 'HTML', level: 95, color: '#f97316' },
    { name: 'CSS', level: 90, color: '#38bdf8' },
    { name: 'JavaScript', level: 88, color: '#fbbf24' },
    { name: 'React', level: 85, color: '#61dafb' },
    { name: 'Node.js', level: 80, color: '#68a063' },
    { name: 'MongoDB', level: 78, color: '#4db33d' },
    { name: 'MySQL', level: 75, color: '#00758f' },
    { name: 'Firebase', level: 80, color: '#ffca28' },
    { name: 'AWS', level: 65, color: '#ff9900' },
    { name: 'GitHub', level: 88, color: '#a78bfa' },
    { name: 'Python', level: 75, color: '#3b82f6' },
    { name: 'TensorFlow', level: 60, color: '#f472b6' },
    { name: 'Quantum', level: 40, color: '#fb923c' },
]

const positions = [
    { x: 0.15, y: 0.2 }, { x: 0.35, y: 0.1 }, { x: 0.55, y: 0.18 },
    { x: 0.75, y: 0.08 }, { x: 0.88, y: 0.25 }, { x: 0.78, y: 0.45 },
    { x: 0.92, y: 0.62 }, { x: 0.68, y: 0.72 }, { x: 0.48, y: 0.82 },
    { x: 0.28, y: 0.75 }, { x: 0.08, y: 0.65 }, { x: 0.18, y: 0.45 },
    { x: 0.5, y: 0.48 },
]

const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0], [12, 2], [12, 7], [12, 9], [5, 12]
]

function ConstellationCanvas({ width, height, hoveredIndex }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, width, height)
        const pts = positions.map(p => ({ x: p.x * width, y: p.y * height }))
        connections.forEach(([a, b]) => {
            const isActive = hoveredIndex === a || hoveredIndex === b
            ctx.beginPath()
            ctx.moveTo(pts[a].x, pts[a].y)
            ctx.lineTo(pts[b].x, pts[b].y)
            ctx.strokeStyle = isActive ? `rgba(167,139,250,0.5)` : `rgba(167,139,250,0.12)`
            ctx.lineWidth = isActive ? 1.5 : 0.8
            ctx.stroke()
        })
    }, [width, height, hoveredIndex])

    return (
        <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0 pointer-events-none" />
    )
}

function SkillNode({ skill, pos, index, containerW, containerH, onHover, isHovered }) {
    const x = pos.x * containerW
    const y = pos.y * containerH

    return (
        <motion.div
            className="absolute flex flex-col items-center cursor-default"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.06, type: 'spring', stiffness: 200 }}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
        >
            <motion.div
                animate={isHovered ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                className="absolute rounded-full"
                style={{
                    width: 40, height: 40,
                    background: `radial-gradient(circle, ${skill.color}30, transparent)`,
                    border: `1px solid ${skill.color}40`,
                }}
            />
            <div
                className="w-4 h-4 rounded-full relative z-10"
                style={{
                    background: skill.color,
                    boxShadow: `0 0 ${isHovered ? 20 : 8}px ${skill.color}`,
                    transition: 'box-shadow 0.3s',
                }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.6 }}
                className="mt-2 text-center"
            >
                <div className="text-xs font-semibold text-white whitespace-nowrap">{skill.name}</div>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-mono mt-0.5"
                        style={{ color: skill.color }}
                    >
                        {skill.level}%
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}

export default function Skills() {
    const ref = useRef(null)
    const containerRef = useRef(null)
    const inView = useInView(ref, { once: true })
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [dims, setDims] = useState({ w: 800, h: 400 })

    useEffect(() => {
        const update = () => {
            if (containerRef.current) {
                setDims({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight })
            }
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    return (
        <section id="skills" className="relative py-28 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4 block">
                        — Skills Constellation —
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        Tech{' '}
                        <span style={{ background: 'linear-gradient(135deg, #38bdf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Galaxy
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto">Hover over the stars to explore my skill universe.</p>
                </motion.div>

                <div ref={containerRef} className="relative glass rounded-3xl border border-white/5 overflow-hidden" style={{ height: '480px' }}>
                    <ConstellationCanvas width={dims.w} height={dims.h} hoveredIndex={hoveredIndex} />
                    {skills.map((skill, i) => (
                        <SkillNode
                            key={skill.name}
                            skill={skill}
                            pos={positions[i]}
                            index={i}
                            containerW={dims.w}
                            containerH={dims.h}
                            onHover={setHoveredIndex}
                            isHovered={hoveredIndex === i}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="glass rounded-xl p-4"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                                <span className="text-xs font-mono" style={{ color: skill.color }}>{skill.level}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: `${skill.level}%` } : {}}
                                    transition={{ delay: 0.5 + i * 0.05, duration: 1, ease: 'easeOut' }}
                                    className="h-full rounded-full"
                                    style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
