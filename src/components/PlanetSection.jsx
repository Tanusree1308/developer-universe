import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const planets = [
  {
    name: 'Mercury',
    number: '01',
    tagline: 'The Swift Messenger',
    description: 'The smallest planet and closest to the Sun, Mercury races through space at 47 km/s — completing a full orbit in just 88 Earth days. Its surface is a barren, cratered wasteland with no atmosphere to hold heat, swinging from 430°C at noon to -180°C at midnight.',
    details: [
      { label: 'Distance from Sun', value: '57.9 million km' },
      { label: 'Orbital Period', value: '88 Earth days' },
      { label: 'Surface Temp', value: '-180°C to 430°C' },
      { label: 'Diameter', value: '4,879 km' },
      { label: 'Moons', value: 'None' },
      { label: 'Gravity', value: '3.7 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 30% 40%, #2a1a0a 0%, #0f0a05 50%, #050302 100%)',
    nebula: 'radial-gradient(ellipse at 70% 30%, rgba(180,120,60,0.12) 0%, transparent 60%)',
    accent: '#c8a060',
    glow: '#d4a870',
    planetGradient: 'radial-gradient(circle at 35% 30%, #d4c4a0, #a08060 40%, #6a5040 80%, #3a2820 100%)',
    ringColor: null,
    size: 110,
  },
  {
    name: 'Venus',
    number: '02',
    tagline: 'The Veiled Inferno',
    description: 'Shrouded in thick clouds of sulfuric acid, Venus is the hottest planet in the solar system despite not being the closest to the Sun. Its crushing atmosphere is 90 times denser than Earth\'s, and its surface glows orange-red from the intense heat. It rotates backwards, so the Sun rises in the west.',
    details: [
      { label: 'Distance from Sun', value: '108.2 million km' },
      { label: 'Orbital Period', value: '225 Earth days' },
      { label: 'Surface Temp', value: '465°C average' },
      { label: 'Diameter', value: '12,104 km' },
      { label: 'Moons', value: 'None' },
      { label: 'Gravity', value: '8.87 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 40% 50%, #1a0e00 0%, #0d0700 50%, #050300 100%)',
    nebula: 'radial-gradient(ellipse at 60% 40%, rgba(220,160,40,0.14) 0%, transparent 60%)',
    accent: '#e8b840',
    glow: '#f5cc60',
    planetGradient: 'radial-gradient(circle at 35% 30%, #f5e090, #d4a030 35%, #a07020 70%, #604010 100%)',
    ringColor: null,
    size: 160,
  },
  {
    name: 'Earth',
    number: '03',
    tagline: 'The Pale Blue Dot',
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
    nebula: 'radial-gradient(ellipse at 65% 35%, rgba(30,120,200,0.14) 0%, transparent 60%)',
    accent: '#4a9eff',
    glow: '#70b8ff',
    planetGradient: 'radial-gradient(circle at 35% 30%, #80c8ff, #2060c0 30%, #1a8040 55%, #0a4020 80%, #082030 100%)',
    ringColor: null,
    size: 165,
  },
  {
    name: 'Mars',
    number: '04',
    tagline: 'The Red Frontier',
    description: 'The Red Planet — humanity\'s next destination. Mars bears the scars of a violent past: Olympus Mons, the tallest volcano in the solar system at 22 km high, and Valles Marineris, a canyon system stretching 4,000 km. Ancient riverbeds hint that liquid water once flowed across its now-frozen surface.',
    details: [
      { label: 'Distance from Sun', value: '227.9 million km' },
      { label: 'Orbital Period', value: '687 Earth days' },
      { label: 'Surface Temp', value: '-125°C to 20°C' },
      { label: 'Diameter', value: '6,779 km' },
      { label: 'Moons', value: 'Phobos & Deimos' },
      { label: 'Gravity', value: '3.72 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 40% 45%, #1a0500 0%, #0d0200 50%, #050100 100%)',
    nebula: 'radial-gradient(ellipse at 60% 35%, rgba(200,60,20,0.15) 0%, transparent 60%)',
    accent: '#e05a2b',
    glow: '#ff7040',
    planetGradient: 'radial-gradient(circle at 35% 30%, #ff9060, #c04020 40%, #8b2500 75%, #4a1000 100%)',
    ringColor: null,
    size: 140,
  },
  {
    name: 'Jupiter',
    number: '05',
    tagline: 'The King of Planets',
    description: 'Jupiter is so massive it could swallow all other planets combined — twice over. Its iconic Great Red Spot is a storm larger than Earth that has raged for over 350 years. Jupiter\'s powerful gravity acts as a cosmic shield, deflecting asteroids and comets that might otherwise strike the inner planets.',
    details: [
      { label: 'Distance from Sun', value: '778.5 million km' },
      { label: 'Orbital Period', value: '12 Earth years' },
      { label: 'Surface Temp', value: '-110°C (cloud tops)' },
      { label: 'Diameter', value: '139,820 km' },
      { label: 'Moons', value: '95 known moons' },
      { label: 'Gravity', value: '24.79 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 35% 45%, #1a0e00 0%, #0d0800 50%, #050400 100%)',
    nebula: 'radial-gradient(ellipse at 65% 40%, rgba(200,140,40,0.14) 0%, transparent 60%)',
    accent: '#e8a040',
    glow: '#f0b860',
    planetGradient: 'radial-gradient(circle at 35% 30%, #f0d090, #c88030 30%, #a06020 55%, #804010 80%, #502000 100%)',
    ringColor: null,
    size: 220,
    bands: true,
  },
  {
    name: 'Saturn',
    number: '06',
    tagline: 'The Jewel of the Solar System',
    description: 'Saturn\'s magnificent ring system — made of billions of ice and rock particles — spans 282,000 km yet is only about 10 meters thick. This gas giant is so light it would float on water. Its moon Titan has a thick atmosphere and lakes of liquid methane, making it one of the most intriguing worlds for life.',
    details: [
      { label: 'Distance from Sun', value: '1.43 billion km' },
      { label: 'Orbital Period', value: '29 Earth years' },
      { label: 'Ring Span', value: '282,000 km wide' },
      { label: 'Diameter', value: '116,460 km' },
      { label: 'Moons', value: '146 known moons' },
      { label: 'Gravity', value: '10.44 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 40% 45%, #1a1500 0%, #0d0c00 50%, #050400 100%)',
    nebula: 'radial-gradient(ellipse at 60% 35%, rgba(220,200,100,0.12) 0%, transparent 60%)',
    accent: '#e8d080',
    glow: '#f0e090',
    planetGradient: 'radial-gradient(circle at 35% 30%, #f8f0c0, #d4b860 35%, #a08030 70%, #604800 100%)',
    ringColor: 'rgba(220,200,120,0.6)',
    size: 190,
  },
  {
    name: 'Uranus',
    number: '07',
    tagline: 'The Tilted Ice Giant',
    description: 'Uranus rolls through space on its side — tilted at 98 degrees, it essentially orbits the Sun like a spinning top knocked over. This ice giant\'s blue-green color comes from methane absorbing red light. Its extreme axial tilt means each pole experiences 42 years of continuous sunlight followed by 42 years of darkness.',
    details: [
      { label: 'Distance from Sun', value: '2.87 billion km' },
      { label: 'Orbital Period', value: '84 Earth years' },
      { label: 'Axial Tilt', value: '97.77 degrees' },
      { label: 'Diameter', value: '50,724 km' },
      { label: 'Moons', value: '28 known moons' },
      { label: 'Gravity', value: '8.69 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 35% 45%, #001a1a 0%, #000d0d 50%, #020408 100%)',
    nebula: 'radial-gradient(ellipse at 65% 35%, rgba(60,200,200,0.12) 0%, transparent 60%)',
    accent: '#60d8d8',
    glow: '#80e8e8',
    planetGradient: 'radial-gradient(circle at 35% 30%, #b0f0f0, #60c0c0 40%, #308080 75%, #104040 100%)',
    ringColor: 'rgba(100,220,220,0.4)',
    size: 170,
  },
  {
    name: 'Neptune',
    number: '08',
    tagline: 'The Windswept Abyss',
    description: 'The most distant planet, Neptune was discovered through mathematics before it was ever seen through a telescope. Its winds howl at 2,100 km/h — the fastest in the solar system. This deep blue ice giant radiates more heat than it receives from the Sun, suggesting a powerful internal heat source still unknown to science.',
    details: [
      { label: 'Distance from Sun', value: '4.5 billion km' },
      { label: 'Orbital Period', value: '165 Earth years' },
      { label: 'Wind Speed', value: '2,100 km/h' },
      { label: 'Diameter', value: '49,244 km' },
      { label: 'Moons', value: '16 known moons' },
      { label: 'Gravity', value: '11.15 m/s²' },
    ],
    bg: 'radial-gradient(ellipse at 40% 45%, #000a2a 0%, #000510 50%, #020408 100%)',
    nebula: 'radial-gradient(ellipse at 60% 35%, rgba(40,60,220,0.15) 0%, transparent 60%)',
    accent: '#4060e8',
    glow: '#6080ff',
    planetGradient: 'radial-gradient(circle at 35% 30%, #8090ff, #3050d0 35%, #1030a0 70%, #081060 100%)',
    ringColor: null,
    size: 165,
  },
]

function Planet3D({ planet }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: planet.size + 80, height: planet.size + 80 }}>
      {/* Outer glow */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: planet.size * 1.4,
          height: planet.size * 1.4,
          background: planet.glow,
          opacity: 0.18,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      />

      {/* Planet sphere */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="relative rounded-full"
        style={{
          width: planet.size,
          height: planet.size,
          background: planet.planetGradient,
          boxShadow: `0 0 ${planet.size * 0.5}px ${planet.glow}50, inset -${planet.size * 0.12}px -${planet.size * 0.12}px ${planet.size * 0.25}px rgba(0,0,0,0.7)`,
          flexShrink: 0,
        }}
      >
        {/* Specular highlight */}
        <div className="absolute rounded-full" style={{
          width: '38%', height: '32%', top: '12%', left: '16%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 100%)',
        }} />
        {/* Jupiter bands */}
        {planet.bands && (
          <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
            {[15, 28, 42, 55, 68, 80].map(top => (
              <div key={top} className="absolute w-full" style={{
                top: `${top}%`, height: '6%',
                background: 'rgba(160,80,20,0.5)',
              }} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Saturn ring */}
      {planet.ringColor && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: planet.size * 2.6,
            height: planet.size * 0.55,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotateX(72deg)',
            border: `${planet.size * 0.07}px solid ${planet.ringColor}`,
            borderRadius: '50%',
            boxShadow: `0 0 12px ${planet.glow}40`,
          }}
        />
      )}
    </div>
  )
}

function PlanetCard({ planet, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' })
  const isEven = index % 2 === 0

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: planet.bg }}
    >
      {/* Nebula overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: planet.nebula }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Number watermark */}
      <div
        className="absolute font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(120px, 20vw, 280px)',
          color: `${planet.accent}08`,
          top: '50%', left: isEven ? '-2%' : 'auto', right: isEven ? 'auto' : '-2%',
          transform: 'translateY(-50%)',
          lineHeight: 1,
        }}
      >
        {planet.number}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center py-24">

        {/* Planet visual */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -80 : 80, scale: 0.7 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isEven ? -80 : 80, scale: 0.7 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={`flex justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}
        >
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Planet3D planet={planet} />
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 80 : -80 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 80 : -80 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className={isEven ? 'md:order-2' : 'md:order-1'}
        >
          {/* Number + name */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono" style={{ color: planet.accent }}>{planet.number}</span>
            <div className="h-px flex-1 max-w-12" style={{ background: planet.accent, opacity: 0.4 }} />
          </div>

          <h2
            className="font-black mb-2 leading-none"
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              color: planet.accent,
              textShadow: `0 0 40px ${planet.glow}50`,
            }}
          >
            {planet.name}
          </h2>

          <p className="font-medium mb-6 text-lg" style={{ color: `${planet.accent}90` }}>
            {planet.tagline}
          </p>

          <p className="text-slate-300 text-base leading-relaxed mb-10 max-w-lg">
            {planet.description}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {planet.details.map(d => (
              <div
                key={d.label}
                className="rounded-xl p-3"
                style={{
                  background: `${planet.accent}08`,
                  border: `1px solid ${planet.accent}20`,
                }}
              >
                <div className="text-xs mb-1" style={{ color: `${planet.accent}70` }}>{d.label}</div>
                <div className="text-sm font-semibold text-white">{d.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${planet.accent}40, transparent)` }}
      />
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
