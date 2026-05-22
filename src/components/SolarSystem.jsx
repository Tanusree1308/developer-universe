import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const planets = [
    {
        name: 'Mercury',
        radius: 10,
        orbitRadius: 90,
        speed: 4.7,
        color: '#b5b5b5',
        glow: '#c8c8c8',
        gradient: ['#8a8a8a', '#c8c8c8', '#6e6e6e'],
        bg: 'from-slate-900 via-slate-800 to-zinc-900',
        accent: '#b5b5b5',
        description: 'The smallest and fastest planet, racing around the Sun in just 88 days. A scorched world of extremes — blazing hot by day, freezing cold by night, with a surface scarred by ancient craters.',
        facts: ['Diameter: 4,879 km', 'Orbit: 88 Earth days', 'Temp: -180°C to 430°C', 'No atmosphere'],
    },
    {
        name: 'Venus',
        radius: 16,
        orbitRadius: 140,
        speed: 3.5,
        color: '#e8c97a',
        glow: '#f5d98a',
        gradient: ['#c8a040', '#f0d080', '#a07020'],
        bg: 'from-yellow-950 via-amber-900 to-orange-950',
        accent: '#f5d98a',
        description: 'Earth\'s twin in size but a hellish inferno beneath thick toxic clouds. The hottest planet in the solar system, with crushing atmospheric pressure and sulfuric acid rain.',
        facts: ['Diameter: 12,104 km', 'Orbit: 225 Earth days', 'Temp: 465°C average', 'Rotates backwards'],
    },
    {
        name: 'Earth',
        radius: 17,
        orbitRadius: 200,
        speed: 2.9,
        color: '#4a9eff',
        glow: '#6ab4ff',
        gradient: ['#1a6b3c', '#4a9eff', '#2d5a8e'],
        bg: 'from-blue-950 via-cyan-900 to-teal-950',
        accent: '#4a9eff',
        description: 'Our pale blue dot — the only known harbor of life in the cosmos. A perfect balance of water, atmosphere, and distance from the Sun that makes all existence possible.',
        facts: ['Diameter: 12,742 km', 'Orbit: 365.25 days', 'Temp: -88°C to 58°C', '71% water surface'],
    },
    {
        name: 'Mars',
        radius: 13,
        orbitRadius: 265,
        speed: 2.4,
        color: '#e05a2b',
        glow: '#ff7040',
        gradient: ['#8b2500', '#e05a2b', '#c04020'],
        bg: 'from-red-950 via-rose-900 to-orange-950',
        accent: '#ff7040',
        description: 'The Red Planet — humanity\'s next frontier. Home to Olympus Mons, the tallest volcano in the solar system, and Valles Marineris, a canyon that dwarfs the Grand Canyon.',
        facts: ['Diameter: 6,779 km', 'Orbit: 687 Earth days', 'Temp: -125°C to 20°C', '2 moons: Phobos & Deimos'],
    },
    {
        name: 'Jupiter',
        radius: 36,
        orbitRadius: 360,
        speed: 1.3,
        color: '#c88b3a',
        glow: '#e8a850',
        gradient: ['#8b5a1a', '#c88b3a', '#e8c080', '#a06828'],
        bg: 'from-amber-950 via-orange-900 to-yellow-950',
        accent: '#e8a850',
        description: 'The king of planets — a colossal gas giant so massive it could swallow all other planets combined. Its Great Red Spot is a storm that has raged for over 350 years.',
        facts: ['Diameter: 139,820 km', 'Orbit: 12 Earth years', '79 known moons', 'Great Red Spot storm'],
    },
    {
        name: 'Saturn',
        radius: 30,
        orbitRadius: 460,
        speed: 0.97,
        color: '#e8d5a0',
        glow: '#f0e0b0',
        gradient: ['#b09040', '#e8d5a0', '#c8b060'],
        bg: 'from-yellow-950 via-amber-950 to-stone-900',
        accent: '#f0e0b0',
        hasRing: true,
        description: 'The jewel of the solar system, adorned with magnificent rings of ice and rock. Saturn\'s rings span 282,000 km but are only about 10 meters thick — a cosmic miracle of physics.',
        facts: ['Diameter: 116,460 km', 'Orbit: 29 Earth years', '83 known moons', 'Rings: 282,000 km wide'],
    },
    {
        name: 'Uranus',
        radius: 22,
        orbitRadius: 545,
        speed: 0.68,
        color: '#7de8e8',
        glow: '#a0f0f0',
        gradient: ['#40a0a0', '#7de8e8', '#50c8c8'],
        bg: 'from-cyan-950 via-teal-900 to-sky-950',
        accent: '#7de8e8',
        description: 'The ice giant that rolls through space on its side — tilted at 98 degrees, it orbits the Sun like a spinning top knocked over. Its blue-green hue comes from methane in its atmosphere.',
        facts: ['Diameter: 50,724 km', 'Orbit: 84 Earth years', '27 known moons', 'Tilted 98° on its axis'],
    },
    {
        name: 'Neptune',
        radius: 20,
        orbitRadius: 620,
        speed: 0.54,
        color: '#4060e8',
        glow: '#6080ff',
        gradient: ['#1a2880', '#4060e8', '#2040c0'],
        bg: 'from-blue-950 via-indigo-900 to-violet-950',
        accent: '#6080ff',
        description: 'The windiest world in the solar system, with storms raging at 2,100 km/h. This distant ice giant was predicted mathematically before it was ever seen through a telescope.',
        facts: ['Diameter: 49,244 km', 'Orbit: 165 Earth years', '16 known moons', 'Winds: 2,100 km/h'],
    },
]

// 3D Sun component using CSS
function Sun3D() {
    return (
        <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
            {/* Corona rings */}
            {[1.8, 1.5, 1.25].map((scale, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: 100 * scale,
                        height: 100 * scale,
                        background: `radial-gradient(circle, transparent 40%, rgba(255,${160 - i * 30},0,${0.08 - i * 0.02}) 70%, transparent 100%)`,
                        border: `1px solid rgba(255,180,0,${0.15 - i * 0.04})`,
                    }}
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2 + i, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
            {/* Sun body */}
            <div
                className="relative rounded-full z-10"
                style={{
                    width: 100,
                    height: 100,
                    background: 'radial-gradient(circle at 35% 30%, #fff7a0, #ffcc00 30%, #ff8800 65%, #cc4400 100%)',
                    boxShadow: '0 0 40px #ffaa00, 0 0 80px #ff880080, 0 0 120px #ff440040',
                }}
            >
                {/* Surface texture */}
                <div
                    className="absolute inset-0 rounded-full opacity-40"
                    style={{
                        background: 'radial-gradient(circle at 60% 60%, transparent 30%, rgba(200,80,0,0.6) 100%)',
                    }}
                />
                {/* Flare */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255,255,200,0.5) 0%, transparent 50%)' }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        </div>
    )
}

// Individual planet 3D sphere
function Planet3D({ planet, size }) {
    const [g1, g2, g3] = planet.gradient
    return (
        <div
            className="rounded-full relative"
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle at 35% 30%, ${g2}, ${g1} 50%, ${g3 || g1} 100%)`,
                boxShadow: `0 0 ${size * 0.6}px ${planet.glow}60, inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0,0,0,0.6)`,
                flexShrink: 0,
            }}
        >
            {/* Highlight */}
            <div
                className="absolute rounded-full"
                style={{
                    width: '40%', height: '35%',
                    top: '12%', left: '18%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 100%)',
                }}
            />
            {/* Saturn ring */}
            {planet.hasRing && (
                <div
                    className="absolute"
                    style={{
                        width: size * 2.4,
                        height: size * 0.5,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotateX(70deg)',
                        border: `${size * 0.08}px solid rgba(232,213,160,0.5)`,
                        borderRadius: '50%',
                        boxShadow: `0 0 8px rgba(232,213,160,0.3)`,
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    )
}

// Orbit path canvas
function OrbitCanvas({ planets, width, height, cx, cy }) {
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, width, height)
        planets.forEach(p => {
            ctx.beginPath()
            ctx.ellipse(cx, cy, p.orbitRadius, p.orbitRadius * 0.28, 0, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255,255,255,0.06)'
            ctx.lineWidth = 1
            ctx.setLineDash([4, 8])
            ctx.stroke()
            ctx.setLineDash([])
        })
    }, [width, height, cx, cy])
    return <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0 pointer-events-none" />
}

export default function SolarSystem() {
    const sectionRef = useRef(null)
    const inView = useInView(sectionRef, { once: true })
    const [selected, setSelected] = useState(null)
    const [time, setTime] = useState(0)
    const animRef = useRef(null)
    const containerRef = useRef(null)
    const [dims, setDims] = useState({ w: 1200, h: 420 })

    useEffect(() => {
        const update = () => {
            if (containerRef.current) {
                setDims({ w: containerRef.current.offsetWidth, h: Math.min(containerRef.current.offsetWidth * 0.38, 420) })
            }
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    useEffect(() => {
        let start = null
        const animate = (ts) => {
            if (!start) start = ts
            setTime((ts - start) / 1000)
            animRef.current = requestAnimationFrame(animate)
        }
        animRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animRef.current)
    }, [])

    const cx = dims.w * 0.08 + 50
    const cy = dims.h / 2

    const getPlanetPos = (planet) => {
        const angle = (time * planet.speed * 0.3) % (Math.PI * 2)
        return {
            x: cx + Math.cos(angle) * planet.orbitRadius,
            y: cy + Math.sin(angle) * planet.orbitRadius * 0.28,
        }
    }

    const activePlanet = selected !== null ? planets[selected] : null

    return (
        <section ref={sectionRef} className="relative py-20 px-4 overflow-hidden">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                className="text-center mb-12"
            >
                <span className="text-xs font-mono text-orange-400 tracking-widest uppercase mb-4 block">
                    — Our Solar System —
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                    The{' '}
                    <span style={{ background: 'linear-gradient(135deg, #ffcc00, #ff6600, #ff4488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Cosmic Family
                    </span>
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto">
                    Eight worlds orbiting a star — each unique, each extraordinary. Click any planet to explore its universe.
                </p>
            </motion.div>

            {/* Solar system canvas */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                ref={containerRef}
                className="relative w-full overflow-hidden rounded-3xl glass border border-white/5"
                style={{ height: dims.h, minHeight: 280 }}
            >
                <OrbitCanvas planets={planets} width={dims.w} height={dims.h} cx={cx} cy={cy} />

                {/* Sun */}
                <div
                    className="absolute"
                    style={{ left: cx, top: cy, transform: 'translate(-50%, -50%)', zIndex: 10 }}
                >
                    <Sun3D />
                </div>

                {/* Planets */}
                {planets.map((planet, i) => {
                    const pos = getPlanetPos(planet)
                    const size = Math.max(planet.radius * (dims.w / 1200) * 1.8, 10)
                    const isSelected = selected === i

                    return (
                        <motion.div
                            key={planet.name}
                            className="absolute cursor-pointer"
                            style={{
                                left: pos.x,
                                top: pos.y,
                                transform: 'translate(-50%, -50%)',
                                zIndex: isSelected ? 20 : 5,
                            }}
                            whileHover={{ scale: 1.4 }}
                            onClick={() => setSelected(selected === i ? null : i)}
                        >
                            {/* Glow ring on select */}
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1.8, opacity: 1 }}
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${planet.glow}40, transparent 70%)`,
                                        width: size * 2, height: size * 2,
                                        top: '50%', left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                            )}
                            <Planet3D planet={planet} size={size} />
                            {/* Name label */}
                            <div
                                className="absolute text-center whitespace-nowrap"
                                style={{
                                    top: size + 4,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: Math.max(size * 0.55, 8) + 'px',
                                    color: isSelected ? planet.glow : 'rgba(255,255,255,0.5)',
                                    fontWeight: isSelected ? 700 : 400,
                                    textShadow: isSelected ? `0 0 8px ${planet.glow}` : 'none',
                                    transition: 'color 0.3s',
                                }}
                            >
                                {planet.name}
                            </div>
                        </motion.div>
                    )
                })}

                {/* Ambient nebula */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse at 10% 50%, rgba(255,120,0,0.04) 0%, transparent 50%)',
                }} />
            </motion.div>

            {/* Planet detail panel */}
            <AnimatePresence mode="wait">
                {activePlanet && (
                    <motion.div
                        key={activePlanet.name}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className={`mt-8 rounded-3xl overflow-hidden relative bg-gradient-to-br ${activePlanet.bg}`}
                        style={{ border: `1px solid ${activePlanet.accent}30` }}
                    >
                        {/* Animated background glow */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{
                                background: `radial-gradient(ellipse at 20% 50%, ${activePlanet.accent}15 0%, transparent 60%)`,
                            }}
                        />

                        <div className="relative z-10 p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
                            {/* Left: planet + name */}
                            <div className="flex flex-col items-center md:items-start gap-6">
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 150 }}
                                    className="relative"
                                >
                                    {/* Outer glow */}
                                    <div
                                        className="absolute inset-0 rounded-full blur-2xl"
                                        style={{ background: activePlanet.accent, opacity: 0.25, transform: 'scale(1.5)' }}
                                    />
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        style={{ position: 'relative' }}
                                    >
                                        <Planet3D planet={activePlanet} size={120} />
                                    </motion.div>
                                </motion.div>

                                <div>
                                    <h3
                                        className="text-5xl font-black mb-2"
                                        style={{ color: activePlanet.accent, textShadow: `0 0 30px ${activePlanet.accent}60` }}
                                    >
                                        {activePlanet.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {activePlanet.facts.map(f => (
                                            <span
                                                key={f}
                                                className="text-xs font-mono px-3 py-1.5 rounded-full"
                                                style={{
                                                    background: `${activePlanet.accent}15`,
                                                    border: `1px solid ${activePlanet.accent}30`,
                                                    color: activePlanet.accent,
                                                }}
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: description */}
                            <div>
                                <p className="text-slate-200 text-lg leading-relaxed mb-6">{activePlanet.description}</p>

                                {/* Decorative data bars */}
                                <div className="space-y-3">
                                    {[
                                        { label: 'Distance from Sun', val: planets.indexOf(activePlanet) / 7 },
                                        { label: 'Relative Size', val: activePlanet.radius / 36 },
                                        { label: 'Orbital Speed', val: activePlanet.speed / 4.7 },
                                    ].map(bar => (
                                        <div key={bar.label}>
                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                <span>{bar.label}</span>
                                                <span style={{ color: activePlanet.accent }}>{Math.round(bar.val * 100)}%</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${bar.val * 100}%` }}
                                                    transition={{ duration: 1, ease: 'easeOut' }}
                                                    className="h-full rounded-full"
                                                    style={{ background: `linear-gradient(90deg, ${activePlanet.accent}60, ${activePlanet.accent})` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div
                            className="h-px w-full"
                            style={{ background: `linear-gradient(90deg, transparent, ${activePlanet.accent}60, transparent)` }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Planet grid — always visible below */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-8">
                {planets.map((planet, i) => (
                    <motion.button
                        key={planet.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.07 }}
                        whileHover={{ y: -4, scale: 1.05 }}
                        onClick={() => setSelected(selected === i ? null : i)}
                        className="glass-strong rounded-2xl p-4 flex flex-col items-center gap-3 relative overflow-hidden group"
                        style={{
                            border: `1px solid ${selected === i ? planet.accent : planet.color + '20'}`,
                            boxShadow: selected === i ? `0 0 20px ${planet.glow}40` : 'none',
                            transition: 'all 0.3s',
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `radial-gradient(circle at 50% 0%, ${planet.color}08, transparent 70%)` }}
                        />
                        <Planet3D planet={planet} size={36} />
                        <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                            {planet.name}
                        </span>
                    </motion.button>
                ))}
            </div>
        </section>
    )
}
