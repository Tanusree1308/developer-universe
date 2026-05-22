import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'

const PLANETS = [
    { name: 'Mercury', id: 'mercury', emoji: '🪨' },
    { name: 'Venus', id: 'venus', emoji: '🌕' },
    { name: 'Earth', id: 'earth', emoji: '🌍' },
    { name: 'Mars', id: 'mars', emoji: '🔴' },
    { name: 'Jupiter', id: 'jupiter', emoji: '🟠' },
    { name: 'Saturn', id: 'saturn', emoji: '🪐' },
    { name: 'Uranus', id: 'uranus', emoji: '🔵' },
    { name: 'Neptune', id: 'neptune', emoji: '💙' },
]

function PlanetSearch() {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const inputRef = useRef(null)

    const results = query.trim()
        ? PLANETS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        : PLANETS

    const goTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setQuery(''); setOpen(false)
    }

    return (
        <div className="relative w-full max-w-md mx-auto mt-10">
            {/* Input */}
            <div
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: open ? '0 0 30px rgba(139,92,246,0.25)' : 'none',
                    transition: 'box-shadow 0.3s',
                }}
            >
                <Search size={16} className="text-purple-400 flex-shrink-0" />
                <input
                    ref={inputRef}
                    value={query}
                    onChange={e => { setQuery(e.target.value); setOpen(true) }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    placeholder="Search for a planet..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
                />
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50"
                        style={{
                            background: 'rgba(8,6,18,0.97)',
                            border: '1px solid rgba(139,92,246,0.25)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                        }}
                    >
                        {results.map(p => (
                            <button
                                key={p.id}
                                onMouseDown={() => goTo(p.id)}
                                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left group"
                            >
                                <span className="text-lg">{p.emoji}</span>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{p.name}</span>
                                <span className="ml-auto text-xs text-slate-600 group-hover:text-purple-400 transition-colors">Jump →</span>
                            </button>
                        ))}
                        {results.length === 0 && (
                            <div className="px-5 py-4 text-sm text-slate-500 text-center">No planet found</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Fire particle canvas
function FireCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = 400
        canvas.height = 400
        let particles = []
        let animId

        const spawn = () => {
            const angle = Math.random() * Math.PI * 2
            const dist = 55 + Math.random() * 10
            particles.push({
                x: 200 + Math.cos(angle) * dist,
                y: 200 + Math.sin(angle) * dist,
                vx: Math.cos(angle) * (0.5 + Math.random() * 1.5),
                vy: Math.sin(angle) * (0.5 + Math.random() * 1.5) - Math.random() * 2,
                life: 1,
                decay: 0.012 + Math.random() * 0.018,
                size: 3 + Math.random() * 8,
                hue: 20 + Math.random() * 40,
            })
        }

        const draw = () => {
            ctx.clearRect(0, 0, 400, 400)

            // Sun body
            const sunGrad = ctx.createRadialGradient(200, 200, 0, 200, 200, 60)
            sunGrad.addColorStop(0, '#fff7a0')
            sunGrad.addColorStop(0.3, '#ffcc00')
            sunGrad.addColorStop(0.7, '#ff8800')
            sunGrad.addColorStop(1, '#cc4400')
            ctx.beginPath()
            ctx.arc(200, 200, 60, 0, Math.PI * 2)
            ctx.fillStyle = sunGrad
            ctx.fill()

            // Corona glow
            const coronaGrad = ctx.createRadialGradient(200, 200, 55, 200, 200, 130)
            coronaGrad.addColorStop(0, 'rgba(255,180,0,0.25)')
            coronaGrad.addColorStop(0.5, 'rgba(255,100,0,0.08)')
            coronaGrad.addColorStop(1, 'transparent')
            ctx.beginPath()
            ctx.arc(200, 200, 130, 0, Math.PI * 2)
            ctx.fillStyle = coronaGrad
            ctx.fill()

            // Spawn fire
            for (let i = 0; i < 4; i++) spawn()

            // Draw & update particles
            particles = particles.filter(p => p.life > 0)
            particles.forEach(p => {
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
                grad.addColorStop(0, `hsla(${p.hue + 20}, 100%, 90%, ${p.life})`)
                grad.addColorStop(0.4, `hsla(${p.hue}, 100%, 60%, ${p.life * 0.8})`)
                grad.addColorStop(1, `hsla(${p.hue - 10}, 100%, 30%, 0)`)
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = grad
                ctx.fill()

                p.x += p.vx
                p.y += p.vy
                p.vy -= 0.04
                p.size *= 0.97
                p.life -= p.decay
            })

            // Solar flares
            const time = Date.now() / 1000
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2 + time * 0.2
                const len = 20 + Math.sin(time * 1.5 + i) * 15
                const x1 = 200 + Math.cos(a) * 62
                const y1 = 200 + Math.sin(a) * 62
                const x2 = 200 + Math.cos(a) * (62 + len)
                const y2 = 200 + Math.sin(a) * (62 + len)
                const flareGrad = ctx.createLinearGradient(x1, y1, x2, y2)
                flareGrad.addColorStop(0, `rgba(255,200,0,0.7)`)
                flareGrad.addColorStop(1, `rgba(255,80,0,0)`)
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.strokeStyle = flareGrad
                ctx.lineWidth = 3 + Math.sin(time * 2 + i) * 2
                ctx.lineCap = 'round'
                ctx.stroke()
            }

            animId = requestAnimationFrame(draw)
        }

        draw()
        return () => cancelAnimationFrame(animId)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ width: 300, height: 300 }}
            className="drop-shadow-[0_0_60px_rgba(255,150,0,0.6)]"
        />
    )
}

export default function Intro() {
    return (
        <section
            id="intro"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, #0d0520 0%, #020408 70%)' }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(120,40,200,0.12) 0%, transparent 55%)' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 70%, rgba(6,182,212,0.08) 0%, transparent 50%)' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 20%, rgba(236,72,153,0.06) 0%, transparent 45%)' }} />
            </div>

            {/* Orbiting rings around sun */}
            {[160, 210, 260].map((r, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-white/5"
                    style={{ width: r * 2, height: r * 2, top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotateX(70deg)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
                />
            ))}

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
                className="relative mb-12 z-10"
            >
                <FireCanvas />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.9 }}
                className="text-center px-6 max-w-3xl z-10"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-xs font-mono tracking-[0.3em] text-purple-400 uppercase mb-5"
                >
                    — Developer Universe —
                </motion.p>

                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                    <span className="text-white">Our </span>
                    <span style={{ background: 'linear-gradient(135deg, #ffcc00, #ff6600, #ff4488)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Solar System
                    </span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-4">
                    A star. Eight planets. Billions of years of cosmic history.
                </p>
                <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
                    Scroll down to journey through each world — from the scorched surface of Mercury to the frozen winds of Neptune.
                </p>

                <PlanetSearch />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 z-10"
            >
                <span className="text-xs font-mono tracking-widest">BEGIN THE JOURNEY</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    )
}
