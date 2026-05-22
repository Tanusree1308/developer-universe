import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// ── per-planet canvas effects ──────────────────────────────────────────────

function MercuryEffect() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    c.width = c.offsetWidth; c.height = c.offsetHeight
    let id, particles = []
    const spawn = () => {
      particles.push({ x: Math.random() * c.width, y: -10, vy: 1 + Math.random() * 2, size: 1 + Math.random() * 2, life: 1 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      if (Math.random() < 0.3) spawn()
      particles = particles.filter(p => p.life > 0)
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,160,80,${p.life * 0.6})`; ctx.fill()
        p.y += p.vy; p.life -= 0.008
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />
}

function VenusEffect() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    c.width = c.offsetWidth; c.height = c.offsetHeight
    let id, clouds = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      w: 120 + Math.random() * 200, h: 30 + Math.random() * 50,
      vx: 0.3 + Math.random() * 0.5, opacity: 0.04 + Math.random() * 0.08,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      clouds.forEach(cl => {
        const g = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, cl.w / 2)
        g.addColorStop(0, `rgba(220,180,60,${cl.opacity})`); g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.ellipse(cl.x, cl.y, cl.w / 2, cl.h / 2, 0, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
        cl.x += cl.vx; if (cl.x > c.width + cl.w) cl.x = -cl.w
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function EarthEffect() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    c.width = c.offsetWidth; c.height = c.offsetHeight
    let id, clouds = Array.from({ length: 8 }, () => ({
      x: Math.random() * c.width, y: 60 + Math.random() * (c.height - 120),
      w: 100 + Math.random() * 180, h: 20 + Math.random() * 40,
      vx: 0.2 + Math.random() * 0.4, opacity: 0.06 + Math.random() * 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      clouds.forEach(cl => {
        const g = ctx.createRadialGradient(cl.x, cl.y, 0, cl.x, cl.y, cl.w / 2)
        g.addColorStop(0, `rgba(180,220,255,${cl.opacity})`); g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.ellipse(cl.x, cl.y, cl.w / 2, cl.h / 2, 0, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
        cl.x += cl.vx; if (cl.x > c.width + cl.w) cl.x = -cl.w
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function MarsEffect() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    c.width = c.offsetWidth; c.height = c.offsetHeight
    let id, dust = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width, y: c.height * 0.6 + Math.random() * c.height * 0.4,
      vx: 1 + Math.random() * 3, vy: -0.5 - Math.random() * 1,
      size: 1 + Math.random() * 4, life: Math.random(), decay: 0.003 + Math.random() * 0.005,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      dust.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,80,30,${p.life * 0.5})`; ctx.fill()
        p.x += p.vx; p.y += p.vy; p.life -= p.decay
        if (p.life <= 0) { p.x = -10; p.y = c.height * 0.6 + Math.random() * c.height * 0.4; p.life = 0.8 + Math.random() * 0.2 }
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function JupiterEffect() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    c.width = c.offsetWidth; c.height = c.offsetHeight
    let id, bolts = [], t = 0
    const spawnBolt = () => {
      const x = Math.random() * c.width
      const y = Math.random() * c.height
      bolts.push({
        x, y, life: 1, branches: Array.from({ length: 3 + Math.floor(Math.random() * 4) }, (_, i) => {
          const a = (Math.random() - 0.5) * Math.PI
          const len = 20 + Math.random() * 60
          return { x2: x + Math.cos(a) * len, y2: y + Math.sin(a) * len }
        })
      })
    }
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      t++
      if (t % 40 === 0) spawnBolt()
      bolts = bolts.filter(b => b.life > 0)
      bolts.forEach(b => {
        b.branches.forEach(br => {
          ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(br.x2, br.y2)
          ctx.strokeStyle = `rgba(255,220,100,${b.life * 0.9})`; ctx.lineWidth = 1.5; ctx.stroke()
        })
        b.life -= 0.06
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function SaturnEffect() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    c.width = c.offsetWidth; c.height = c.offsetHeight
    let id, ice = Array.from({ length: 80 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.8, vy: 0.2 + Math.random() * 0.6,
      size: 1 + Math.random() * 3, opacity: 0.3 + Math.random() * 0.5,
      spin: Math.random() * Math.PI * 2, spinV: (Math.random() - 0.5) * 0.05,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      ice.forEach(p => {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.spin)
        ctx.fillStyle = `rgba(240,230,180,${p.opacity})`
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
        p.x += p.vx; p.y += p.vy; p.spin += p.spinV
        if (p.y > c.height) { p.y = -5; p.x = Math.random() * c.width }
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
}

function DiamondRainEffect({ color = '180,230,255' }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    c.width = c.offsetWidth; c.height = c.offsetHeight
    let id
    const diamonds = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vy: 1.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.5,
      size: 3 + Math.random() * 7,
      opacity: 0.4 + Math.random() * 0.6,
      spin: Math.random() * Math.PI * 2,
      spinV: (Math.random() - 0.5) * 0.08,
    }))
    const drawDiamond = (x, y, s, spin, op) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(spin)
      ctx.beginPath()
      ctx.moveTo(0, -s); ctx.lineTo(s * 0.6, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.6, 0)
      ctx.closePath()
      const g = ctx.createLinearGradient(-s, -s, s, s)
      g.addColorStop(0, `rgba(255,255,255,${op})`)
      g.addColorStop(0.4, `rgba(${color},${op * 0.9})`)
      g.addColorStop(1, `rgba(${color},${op * 0.3})`)
      ctx.fillStyle = g; ctx.fill()
      ctx.strokeStyle = `rgba(255,255,255,${op * 0.5})`; ctx.lineWidth = 0.5; ctx.stroke()
      ctx.restore()
    }
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      diamonds.forEach(d => {
        drawDiamond(d.x, d.y, d.size, d.spin, d.opacity)
        d.y += d.vy; d.x += d.vx; d.spin += d.spinV
        if (d.y > c.height + 10) { d.y = -10; d.x = Math.random() * c.width }
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(id)
  }, [color])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ── planet data ────────────────────────────────────────────────────────────

const planets = [
  {
    name: 'Mercury', number: '01', tagline: 'The Swift Messenger',
    effect: <MercuryEffect />,
    effectLabel: '☄️ Micrometeorite Showers',
    description: 'The smallest and fastest planet, Mercury races around the Sun in just 88 Earth days. With no atmosphere to trap heat, temperatures swing wildly — scorching at 430°C under the Sun, plunging to -180°C in the dark. Its surface is a scarred, cratered wasteland bombarded by micrometeorites.',
    details: [
      { label: 'Distance from Sun', value: '57.9 million km' },
      { label: 'Orbital Period', value: '88 Earth days' },
      { label: 'Surface Temp', value: '-180°C to 430°C' },
      { label: 'Diameter', value: '4,879 km' },
      { label: 'Moons', value: 'None' },
      { label: 'Gravity', value: '3.7 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 30% 40%, #1a0e04 0%, #0a0602 50%, #050302 100%)',
    nebula: 'radial-gradient(ellipse at 70% 30%, rgba(180,120,60,0.15) 0%, transparent 60%)',
    accent: '#c8a060', glow: '#d4b870',
    planetGradient: 'radial-gradient(circle at 35% 30%, #d4c4a0, #a08060 40%, #6a5040 80%, #3a2820 100%)',
    ringColor: null, size: 110,
  },
  {
    name: 'Venus', number: '02', tagline: 'The Veiled Inferno',
    effect: <VenusEffect />,
    effectLabel: '🌫️ Sulfuric Acid Clouds',
    description: 'Shrouded in thick clouds of sulfuric acid, Venus is the hottest planet despite not being closest to the Sun. Its crushing atmosphere is 90× denser than Earth\'s. The surface glows orange-red from intense heat. Strangely, Venus rotates backwards — the Sun rises in the west and sets in the east.',
    details: [
      { label: 'Distance from Sun', value: '108.2 million km' },
      { label: 'Orbital Period', value: '225 Earth days' },
      { label: 'Surface Temp', value: '465°C average' },
      { label: 'Diameter', value: '12,104 km' },
      { label: 'Moons', value: 'None' },
      { label: 'Gravity', value: '8.87 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 40% 50%, #1a0e00 0%, #0d0700 50%, #050300 100%)',
    nebula: 'radial-gradient(ellipse at 60% 40%, rgba(220,160,40,0.16) 0%, transparent 60%)',
    accent: '#e8b840', glow: '#f5cc60',
    planetGradient: 'radial-gradient(circle at 35% 30%, #f5e090, #d4a030 35%, #a07020 70%, #604010 100%)',
    ringColor: null, size: 160,
  },
  {
    name: 'Earth', number: '03', tagline: 'The Pale Blue Dot',
    effect: <EarthEffect />,
    effectLabel: '☁️ Living Atmosphere',
    description: 'Our home — the only world known to harbor life. Earth\'s perfect distance from the Sun, liquid water oceans, protective magnetic field, and oxygen-rich atmosphere create a rare cosmic sanctuary. From space, it appears as a fragile blue marble suspended in the infinite black void.',
    details: [
      { label: 'Distance from Sun', value: '149.6 million km' },
      { label: 'Orbital Period', value: '365.25 days' },
      { label: 'Surface Temp', value: '-88°C to 58°C' },
      { label: 'Diameter', value: '12,742 km' },
      { label: 'Moons', value: '1 (The Moon)' },
      { label: 'Gravity', value: '9.81 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 35% 45%, #001a2e 0%, #000d1a 50%, #020408 100%)',
    nebula: 'radial-gradient(ellipse at 65% 35%, rgba(30,120,200,0.16) 0%, transparent 60%)',
    accent: '#4a9eff', glow: '#70b8ff',
    planetGradient: 'radial-gradient(circle at 35% 30%, #80c8ff, #2060c0 30%, #1a8040 55%, #0a4020 80%, #082030 100%)',
    ringColor: null, size: 165,
  },
  {
    name: 'Mars', number: '04', tagline: 'The Red Frontier',
    effect: <MarsEffect />,
    effectLabel: '🌪️ Dust Storms',
    description: 'The Red Planet — humanity\'s next destination. Mars bears the scars of a violent past: Olympus Mons, the tallest volcano in the solar system at 22 km high, and Valles Marineris, a canyon stretching 4,000 km. Massive dust storms can engulf the entire planet for months at a time.',
    details: [
      { label: 'Distance from Sun', value: '227.9 million km' },
      { label: 'Orbital Period', value: '687 Earth days' },
      { label: 'Surface Temp', value: '-125°C to 20°C' },
      { label: 'Diameter', value: '6,779 km' },
      { label: 'Moons', value: 'Phobos & Deimos' },
      { label: 'Gravity', value: '3.72 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 40% 45%, #1a0500 0%, #0d0200 50%, #050100 100%)',
    nebula: 'radial-gradient(ellipse at 60% 35%, rgba(200,60,20,0.18) 0%, transparent 60%)',
    accent: '#e05a2b', glow: '#ff7040',
    planetGradient: 'radial-gradient(circle at 35% 30%, #ff9060, #c04020 40%, #8b2500 75%, #4a1000 100%)',
    ringColor: null, size: 140,
  },
  {
    name: 'Jupiter', number: '05', tagline: 'The King of Planets',
    effect: <JupiterEffect />,
    effectLabel: '⚡ Mega Lightning Storms',
    description: 'Jupiter is so massive it could swallow all other planets combined — twice over. Its Great Red Spot is a storm larger than Earth that has raged for over 350 years. Beneath the clouds, lightning bolts 1,000× more powerful than Earth\'s crackle through the atmosphere constantly.',
    details: [
      { label: 'Distance from Sun', value: '778.5 million km' },
      { label: 'Orbital Period', value: '12 Earth years' },
      { label: 'Cloud Top Temp', value: '-110°C' },
      { label: 'Diameter', value: '139,820 km' },
      { label: 'Moons', value: '95 known moons' },
      { label: 'Gravity', value: '24.79 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 35% 45%, #1a0e00 0%, #0d0800 50%, #050400 100%)',
    nebula: 'radial-gradient(ellipse at 65% 40%, rgba(200,140,40,0.16) 0%, transparent 60%)',
    accent: '#e8a040', glow: '#f0b860',
    planetGradient: 'radial-gradient(circle at 35% 30%, #f0d090, #c88030 30%, #a06020 55%, #804010 80%, #502000 100%)',
    ringColor: null, size: 220, bands: true,
  },
  {
    name: 'Saturn', number: '06', tagline: 'The Jewel of the Solar System',
    effect: <SaturnEffect />,
    effectLabel: '🧊 Ice Particle Rings',
    description: 'Saturn\'s magnificent ring system spans 282,000 km yet is only about 10 meters thick — made of billions of ice and rock particles. This gas giant is so light it would float on water. Its moon Titan has a thick atmosphere and lakes of liquid methane, making it one of the most intriguing worlds for life.',
    details: [
      { label: 'Distance from Sun', value: '1.43 billion km' },
      { label: 'Orbital Period', value: '29 Earth years' },
      { label: 'Ring Span', value: '282,000 km wide' },
      { label: 'Diameter', value: '116,460 km' },
      { label: 'Moons', value: '146 known moons' },
      { label: 'Gravity', value: '10.44 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 40% 45%, #1a1500 0%, #0d0c00 50%, #050400 100%)',
    nebula: 'radial-gradient(ellipse at 60% 35%, rgba(220,200,100,0.14) 0%, transparent 60%)',
    accent: '#e8d080', glow: '#f0e090',
    planetGradient: 'radial-gradient(circle at 35% 30%, #f8f0c0, #d4b860 35%, #a08030 70%, #604800 100%)',
    ringColor: 'rgba(220,200,120,0.6)', size: 190,
  },
  {
    name: 'Uranus', number: '07', tagline: 'The Tilted Ice Giant',
    effect: <DiamondRainEffect color="140,220,255" />,
    effectLabel: '💎 Diamond Rain',
    description: 'Deep inside Uranus, extreme pressure and heat compress carbon into diamonds that literally rain down through the interior. This ice giant rolls through space tilted at 98 degrees. Its blue-green color comes from methane absorbing red light. Each pole experiences 42 years of continuous sunlight, then 42 years of darkness.',
    details: [
      { label: 'Distance from Sun', value: '2.87 billion km' },
      { label: 'Orbital Period', value: '84 Earth years' },
      { label: 'Axial Tilt', value: '97.77 degrees' },
      { label: 'Diameter', value: '50,724 km' },
      { label: 'Moons', value: '28 known moons' },
      { label: 'Gravity', value: '8.69 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 35% 45%, #001a1a 0%, #000d0d 50%, #020408 100%)',
    nebula: 'radial-gradient(ellipse at 65% 35%, rgba(60,200,200,0.14) 0%, transparent 60%)',
    accent: '#60d8d8', glow: '#80e8e8',
    planetGradient: 'radial-gradient(circle at 35% 30%, #b0f0f0, #60c0c0 40%, #308080 75%, #104040 100%)',
    ringColor: 'rgba(100,220,220,0.4)', size: 170,
  },
  {
    name: 'Neptune', number: '08', tagline: 'The Windswept Abyss',
    effect: <DiamondRainEffect color="80,100,255" />,
    effectLabel: '💎 Diamond Rain & 2100 km/h Winds',
    description: 'The most distant planet, Neptune was discovered through mathematics before it was ever seen. Like Uranus, diamonds rain through its interior under crushing pressure. Its winds howl at 2,100 km/h — the fastest in the solar system. This deep blue world radiates more heat than it receives from the Sun.',
    details: [
      { label: 'Distance from Sun', value: '4.5 billion km' },
      { label: 'Orbital Period', value: '165 Earth years' },
      { label: 'Wind Speed', value: '2,100 km/h' },
      { label: 'Diameter', value: '49,244 km' },
      { label: 'Moons', value: '16 known moons' },
      { label: 'Gravity', value: '11.15 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 40% 45%, #000a2a 0%, #000510 50%, #020408 100%)',
    nebula: 'radial-gradient(ellipse at 60% 35%, rgba(40,60,220,0.18) 0%, transparent 60%)',
    accent: '#4060e8', glow: '#6080ff',
    planetGradient: 'radial-gradient(circle at 35% 30%, #8090ff, #3050d0 35%, #1030a0 70%, #081060 100%)',
    ringColor: null, size: 165,
  },
]

// ── 3D Planet sphere ───────────────────────────────────────────────────────

function Planet3D({ planet }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: planet.size + 100, height: planet.size + 100 }}>
      {/* Outer ambient glow */}
      <div className="absolute rounded-full" style={{
        width: planet.size * 1.8, height: planet.size * 1.8,
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        background: `radial-gradient(circle, ${planet.glow}20 0%, transparent 70%)`,
        filter: 'blur(20px)',
      }} />
      {/* Spinning planet */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="relative rounded-full"
        style={{
          width: planet.size, height: planet.size,
          background: planet.planetGradient,
          boxShadow: `0 0 ${planet.size * 0.5}px ${planet.glow}50, 0 0 ${planet.size}px ${planet.glow}15, inset -${planet.size * 0.12}px -${planet.size * 0.12}px ${planet.size * 0.25}px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Specular */}
        <div className="absolute rounded-full" style={{
          width: '38%', height: '32%', top: '12%', left: '16%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent 100%)',
        }} />
        {/* Jupiter bands */}
        {planet.bands && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {[12, 24, 36, 50, 62, 74, 86].map(top => (
              <div key={top} className="absolute w-full" style={{
                top: `${top}%`, height: '7%',
                background: top % 2 === 0 ? 'rgba(120,60,10,0.35)' : 'rgba(200,140,60,0.2)',
              }} />
            ))}
            {/* Great Red Spot */}
            <div className="absolute rounded-full" style={{
              width: '22%', height: '14%', top: '52%', left: '60%',
              background: 'radial-gradient(circle, rgba(200,60,20,0.8), rgba(160,40,10,0.4))',
            }} />
          </div>
        )}
      </motion.div>

      {/* Saturn ring */}
      {planet.ringColor && (
        <>
          <div className="absolute pointer-events-none" style={{
            width: planet.size * 2.8, height: planet.size * 0.6,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotateX(72deg)',
            border: `${planet.size * 0.06}px solid ${planet.ringColor}`,
            borderRadius: '50%',
            boxShadow: `0 0 15px ${planet.glow}40`,
          }} />
          <div className="absolute pointer-events-none" style={{
            width: planet.size * 2.2, height: planet.size * 0.45,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotateX(72deg)',
            border: `${planet.size * 0.04}px solid ${planet.ringColor.replace('0.6', '0.3').replace('0.4', '0.2')}`,
            borderRadius: '50%',
          }} />
        </>
      )}
    </div>
  )
}

// ── single planet full-screen section ─────────────────────────────────────

function PlanetCard({ planet, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px' })
  const isEven = index % 2 === 0

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: planet.bg }} id={planet.name.toLowerCase()}>
      {/* Nebula */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: planet.nebula }} />

      {/* Canvas effect */}
      {planet.effect}

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Number watermark */}
      <div className="absolute font-black select-none pointer-events-none" style={{
        fontSize: 'clamp(140px, 22vw, 320px)',
        color: `${planet.accent}06`,
        top: '50%', left: isEven ? '-1%' : 'auto', right: isEven ? 'auto' : '-1%',
        transform: 'translateY(-50%)', lineHeight: 1,
      }}>
        {planet.number}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center py-24 relative z-10">

        {/* Planet */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -100 : 100, scale: 0.6 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isEven ? -100 : 100, scale: 0.6 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`flex justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}
        >
          <motion.div animate={{ y: [-14, 14, -14] }} transition={{ duration: 5 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
            <Planet3D planet={planet} />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 100 : -100 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 100 : -100 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={isEven ? 'md:order-2' : 'md:order-1'}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono" style={{ color: planet.accent }}>{planet.number}</span>
            <div className="h-px w-10" style={{ background: planet.accent, opacity: 0.5 }} />
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: `${planet.accent}15`, color: planet.accent, border: `1px solid ${planet.accent}30` }}>
              {planet.effectLabel}
            </span>
          </div>

          <h2 className="font-black leading-none mb-2" style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            color: planet.accent,
            textShadow: `0 0 50px ${planet.glow}60`,
          }}>
            {planet.name}
          </h2>

          <p className="font-semibold mb-6 text-lg" style={{ color: `${planet.accent}80` }}>{planet.tagline}</p>

          <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-lg">{planet.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {planet.details.map(d => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + planet.details.indexOf(d) * 0.07 }}
                className="rounded-xl p-3"
                style={{ background: `${planet.accent}08`, border: `1px solid ${planet.accent}20` }}
              >
                <div className="text-xs mb-1" style={{ color: `${planet.accent}60` }}>{d.label}</div>
                <div className="text-sm font-semibold text-white">{d.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${planet.accent}50, transparent)` }} />
    </section>
  )
}

export default function PlanetSection() {
  return (
    <div>
      {planets.map((planet, i) => (
        <PlanetCard key={planet.name} planet={planet} index={i} />
      ))}
    </div>
  )
}
