import React, { useRef, useEffect } from 'react'

export function MercuryEffect() {
    const ref = useRef(null)
    useEffect(() => {
        const c = ref.current; let id
        const init = () => {
            c.width = c.offsetWidth; c.height = c.offsetHeight
            const ctx = c.getContext('2d')
            const meteors = Array.from({ length: 40 }, () => ({
                x: Math.random() * c.width, y: Math.random() * c.height,
                vx: 3 + Math.random() * 5, vy: 2 + Math.random() * 4,
                len: 20 + Math.random() * 60, size: 0.5 + Math.random() * 1.5,
                opacity: 0.3 + Math.random() * 0.7,
            }))
            const draw = () => {
                ctx.clearRect(0, 0, c.width, c.height)
                meteors.forEach(m => {
                    const g = ctx.createLinearGradient(m.x, m.y, m.x - m.len, m.y - m.len * 0.6)
                    g.addColorStop(0, `rgba(255,220,140,${m.opacity})`); g.addColorStop(1, 'transparent')
                    ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.len, m.y - m.len * 0.6)
                    ctx.strokeStyle = g; ctx.lineWidth = m.size; ctx.stroke()
                    ctx.beginPath(); ctx.arc(m.x, m.y, m.size * 1.5, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(255,200,100,${m.opacity * 0.8})`; ctx.fill()
                    m.x += m.vx; m.y += m.vy
                    if (m.x > c.width + 80 || m.y > c.height + 80) { m.x = Math.random() * c.width * 0.5; m.y = -20 }
                })
                id = requestAnimationFrame(draw)
            }; draw()
        }
        setTimeout(init, 120)
        return () => cancelAnimationFrame(id)
    }, [])
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export function VenusEffect() {
    const ref = useRef(null)
    useEffect(() => {
        const c = ref.current; let id
        const init = () => {
            c.width = c.offsetWidth; c.height = c.offsetHeight
            const ctx = c.getContext('2d')
            const clouds = Array.from({ length: 18 }, () => ({
                x: Math.random() * c.width, y: Math.random() * c.height,
                w: 200 + Math.random() * 300, h: 40 + Math.random() * 80,
                vx: 0.4 + Math.random() * 0.8, opacity: 0.07 + Math.random() * 0.13,
                hue: 35 + Math.random() * 20,
            }))
            const draw = () => {
                ctx.clearRect(0, 0, c.width, c.height)
                clouds.forEach(cl => {
                    const g = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, cl.w / 2)
                    g.addColorStop(0, `hsla(${cl.hue},80%,55%,${cl.opacity * 1.5})`); g.addColorStop(1, 'transparent')
                    ctx.beginPath(); ctx.ellipse(cl.x, cl.y, cl.w / 2, cl.h / 2, 0, 0, Math.PI * 2)
                    ctx.fillStyle = g; ctx.fill()
                    cl.x += cl.vx; if (cl.x > c.width + cl.w) cl.x = -cl.w
                })
                id = requestAnimationFrame(draw)
            }; draw()
        }
        setTimeout(init, 120)
        return () => cancelAnimationFrame(id)
    }, [])
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export function EarthEffect() {
    const ref = useRef(null)
    useEffect(() => {
        const c = ref.current; let id
        const init = () => {
            c.width = c.offsetWidth; c.height = c.offsetHeight
            const ctx = c.getContext('2d')
            const clouds = Array.from({ length: 10 }, () => ({
                x: Math.random() * c.width, y: 40 + Math.random() * (c.height - 80),
                w: 150 + Math.random() * 250, h: 25 + Math.random() * 50,
                vx: 0.15 + Math.random() * 0.3, opacity: 0.07 + Math.random() * 0.1,
            }))
            let t = 0
            const draw = () => {
                ctx.clearRect(0, 0, c.width, c.height); t += 0.005
                for (let i = 0; i < 4; i++) {
                    const y = 60 + i * 40 + Math.sin(t + i) * 20
                    const g = ctx.createLinearGradient(0, y - 30, 0, y + 30)
                    g.addColorStop(0, 'transparent')
                    g.addColorStop(0.5, `rgba(${i % 2 === 0 ? '0,255,150' : '0,180,255'},${0.04 + Math.sin(t * 2 + i) * 0.02})`)
                    g.addColorStop(1, 'transparent')
                    ctx.fillStyle = g; ctx.fillRect(0, y - 30, c.width, 60)
                }
                clouds.forEach(cl => {
                    const g = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, cl.w / 2)
                    g.addColorStop(0, `rgba(200,230,255,${cl.opacity * 1.5})`); g.addColorStop(1, 'transparent')
                    ctx.beginPath(); ctx.ellipse(cl.x, cl.y, cl.w / 2, cl.h / 2, 0, 0, Math.PI * 2)
                    ctx.fillStyle = g; ctx.fill()
                    cl.x += cl.vx; if (cl.x > c.width + cl.w) cl.x = -cl.w
                })
                id = requestAnimationFrame(draw)
            }; draw()
        }
        setTimeout(init, 120)
        return () => cancelAnimationFrame(id)
    }, [])
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export function MarsEffect() {
    const ref = useRef(null)
    useEffect(() => {
        const c = ref.current; let id
        const init = () => {
            c.width = c.offsetWidth; c.height = c.offsetHeight
            const ctx = c.getContext('2d')
            const dust = Array.from({ length: 120 }, () => ({
                x: Math.random() * c.width, y: c.height * 0.3 + Math.random() * c.height * 0.7,
                vx: 2 + Math.random() * 5, vy: -0.3 - Math.random() * 1.5,
                size: 1 + Math.random() * 5, life: Math.random(),
                decay: 0.002 + Math.random() * 0.004, hue: 10 + Math.random() * 20,
            }))
            const draw = () => {
                ctx.clearRect(0, 0, c.width, c.height)
                const haze = ctx.createLinearGradient(0, c.height * 0.7, 0, c.height)
                haze.addColorStop(0, 'transparent'); haze.addColorStop(1, 'rgba(180,60,20,0.14)')
                ctx.fillStyle = haze; ctx.fillRect(0, 0, c.width, c.height)
                dust.forEach(p => {
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fillStyle = `hsla(${p.hue},70%,45%,${p.life * 0.65})`; ctx.fill()
                    p.x += p.vx; p.y += p.vy; p.life -= p.decay
                    if (p.life <= 0 || p.x > c.width + 10) { p.x = -10; p.y = c.height * 0.4 + Math.random() * c.height * 0.6; p.life = 0.6 + Math.random() * 0.4 }
                })
                id = requestAnimationFrame(draw)
            }; draw()
        }
        setTimeout(init, 120)
        return () => cancelAnimationFrame(id)
    }, [])
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export function JupiterEffect() {
    const ref = useRef(null)
    useEffect(() => {
        const c = ref.current; let id
        const init = () => {
            c.width = c.offsetWidth; c.height = c.offsetHeight
            const ctx = c.getContext('2d')
            let bolts = [], t = 0
            const branch = (x, y, angle, len, depth) => {
                if (depth === 0 || len < 5) return []
                const x2 = x + Math.cos(angle) * len; const y2 = y + Math.sin(angle) * len
                const segs = [{ x1: x, y1: y, x2, y2, depth }]
                if (Math.random() < 0.6) segs.push(...branch(x2, y2, angle + (Math.random() - 0.5) * 1.2, len * 0.6, depth - 1))
                if (Math.random() < 0.3) segs.push(...branch(x2, y2, angle + (Math.random() - 0.5) * 2, len * 0.4, depth - 1))
                return segs
            }
            const draw = () => {
                ctx.clearRect(0, 0, c.width, c.height); t++
                if (t % 35 === 0) {
                    const x = Math.random() * c.width; const y = Math.random() * c.height * 0.6
                    bolts.push({ segs: branch(x, y, Math.PI / 2 + (Math.random() - 0.5) * 0.8, 40 + Math.random() * 60, 5), life: 1 })
                }
                bolts = bolts.filter(b => b.life > 0)
                bolts.forEach(b => {
                    b.segs.forEach(s => {
                        ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2)
                        ctx.strokeStyle = `rgba(255,240,120,${b.life * (0.4 + s.depth * 0.15)})`; ctx.lineWidth = s.depth * 0.8; ctx.stroke()
                        ctx.strokeStyle = `rgba(200,180,255,${b.life * 0.15})`; ctx.lineWidth = s.depth * 3; ctx.stroke()
                    })
                    b.life -= 0.04
                })
                id = requestAnimationFrame(draw)
            }; draw()
        }
        setTimeout(init, 120)
        return () => cancelAnimationFrame(id)
    }, [])
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export function SaturnEffect() {
    const ref = useRef(null)
    useEffect(() => {
        const c = ref.current; let id
        const init = () => {
            c.width = c.offsetWidth; c.height = c.offsetHeight
            const ctx = c.getContext('2d')
            const ice = Array.from({ length: 100 }, () => ({
                x: Math.random() * c.width, y: Math.random() * c.height,
                vx: (Math.random() - 0.5) * 1.2, vy: 0.3 + Math.random() * 0.8,
                size: 1.5 + Math.random() * 4, opacity: 0.3 + Math.random() * 0.6,
                spin: Math.random() * Math.PI * 2, spinV: (Math.random() - 0.5) * 0.08,
            }))
            const draw = () => {
                ctx.clearRect(0, 0, c.width, c.height)
                ice.forEach(p => {
                    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.spin)
                    ctx.beginPath()
                    for (let i = 0; i < 6; i++) {
                        const a = (i / 6) * Math.PI * 2
                        i === 0 ? ctx.moveTo(Math.cos(a) * p.size, Math.sin(a) * p.size) : ctx.lineTo(Math.cos(a) * p.size, Math.sin(a) * p.size)
                    }
                    ctx.closePath()
                    ctx.fillStyle = `rgba(240,235,200,${p.opacity * 0.4})`; ctx.fill()
                    ctx.strokeStyle = `rgba(255,250,220,${p.opacity})`; ctx.lineWidth = 0.8; ctx.stroke()
                    ctx.restore()
                    p.x += p.vx; p.y += p.vy; p.spin += p.spinV
                    if (p.y > c.height + 10) { p.y = -10; p.x = Math.random() * c.width }
                })
                id = requestAnimationFrame(draw)
            }; draw()
        }
        setTimeout(init, 120)
        return () => cancelAnimationFrame(id)
    }, [])
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />
}

export function DiamondRainEffect({ color = '140,220,255' }) {
    const ref = useRef(null)
    useEffect(() => {
        const c = ref.current; let id
        const init = () => {
            c.width = c.offsetWidth; c.height = c.offsetHeight
            const ctx = c.getContext('2d')
            const diamonds = Array.from({ length: 80 }, () => ({
                x: Math.random() * c.width, y: Math.random() * c.height,
                vy: 1.5 + Math.random() * 3.5, vx: (Math.random() - 0.5) * 0.8,
                size: 4 + Math.random() * 9, opacity: 0.5 + Math.random() * 0.5,
                spin: Math.random() * Math.PI * 2, spinV: (Math.random() - 0.5) * 0.1,
            }))
            const drawD = (x, y, s, spin, op) => {
                ctx.save(); ctx.translate(x, y); ctx.rotate(spin)
                ctx.beginPath()
                ctx.moveTo(0, -s); ctx.lineTo(s * 0.55, -s * 0.2); ctx.lineTo(s * 0.55, s * 0.2)
                ctx.lineTo(0, s); ctx.lineTo(-s * 0.55, s * 0.2); ctx.lineTo(-s * 0.55, -s * 0.2)
                ctx.closePath()
                const g = ctx.createLinearGradient(-s, -s, s, s)
                g.addColorStop(0, `rgba(255,255,255,${op})`); g.addColorStop(0.3, `rgba(${color},${op * 0.9})`)
                g.addColorStop(0.7, `rgba(${color},${op * 0.5})`); g.addColorStop(1, `rgba(${color},${op * 0.2})`)
                ctx.fillStyle = g; ctx.fill()
                ctx.strokeStyle = `rgba(255,255,255,${op * 0.7})`; ctx.lineWidth = 0.6; ctx.stroke()
                ctx.beginPath(); ctx.arc(s * 0.1, -s * 0.2, s * 0.15, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${op * 0.8})`; ctx.fill()
                ctx.restore()
            }
            const draw = () => {
                ctx.clearRect(0, 0, c.width, c.height)
                diamonds.forEach(d => {
                    drawD(d.x, d.y, d.size, d.spin, d.opacity)
                    d.y += d.vy; d.x += d.vx; d.spin += d.spinV
                    if (d.y > c.height + 15) { d.y = -15; d.x = Math.random() * c.width }
                })
                id = requestAnimationFrame(draw)
            }; draw()
        }
        setTimeout(init, 120)
        return () => cancelAnimationFrame(id)
    }, [color])
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}
