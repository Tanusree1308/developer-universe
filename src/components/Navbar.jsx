import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, Search } from 'lucide-react'

const links = ['Home', 'Solar System', 'Galaxy', 'Contact']

const planets = [
    { name: 'Mercury', emoji: '🪨', id: 'mercury' },
    { name: 'Venus', emoji: '🌕', id: 'venus' },
    { name: 'Earth', emoji: '🌍', id: 'earth' },
    { name: 'Mars', emoji: '🔴', id: 'mars' },
    { name: 'Jupiter', emoji: '🟠', id: 'jupiter' },
    { name: 'Saturn', emoji: '🪐', id: 'saturn' },
    { name: 'Uranus', emoji: '🔵', id: 'uranus' },
    { name: 'Neptune', emoji: '💙', id: 'neptune' },
    { name: 'Sun', emoji: '☀️', id: 'intro' },
    { name: 'Solar System', emoji: '🌌', id: 'solarsystem' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [query, setQuery] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // focus input when search opens
    useEffect(() => {
        if (searchOpen) setTimeout(() => inputRef.current?.focus(), 80)
        else setQuery('')
    }, [searchOpen])

    // close on Escape
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setSearchOpen(false) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    const results = query.trim()
        ? planets.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        : []

    const scrollTo = (id) => {
        const map = { 'Solar System': 'solarsystem', 'Galaxy': 'galaxy' }
        const el = document.getElementById(map[id] || id.toLowerCase())
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setOpen(false)
    }

    const goTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setSearchOpen(false)
        setQuery('')
    }

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">

                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 cursor-pointer flex-shrink-0"
                        onClick={() => scrollTo('home')}
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}
                        >
                            <Zap size={16} className="text-white" />
                        </div>
                        <span
                            className="text-lg font-bold tracking-tight"
                            style={{ background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        >
                            Developer Universe
                        </span>
                    </motion.div>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <button
                                key={link}
                                onClick={() => scrollTo(link)}
                                className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                            </button>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Search button */}
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSearchOpen(true)}
                            className="flex items-center gap-2 px-3 py-2 rounded-full text-sm text-slate-400 hover:text-white transition-all duration-200 glass border border-white/8 hover:border-purple-500/40"
                        >
                            <Search size={14} />
                            <span className="hidden sm:inline text-xs">Search planets...</span>
                        </motion.button>

                        {/* Mobile toggle */}
                        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(!open)}>
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-4"
                        >
                            {links.map((link) => (
                                <button key={link} onClick={() => scrollTo(link)}
                                    className="text-slate-300 hover:text-white text-sm font-medium text-left transition-colors"
                                >
                                    {link}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* ── Search overlay ── */}
            <AnimatePresence>
                {searchOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
                            onClick={() => setSearchOpen(false)}
                        />

                        {/* Search panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.96 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] w-full max-w-lg px-4"
                        >
                            <div
                                className="rounded-2xl overflow-hidden"
                                style={{
                                    background: 'rgba(10,8,20,0.95)',
                                    border: '1px solid rgba(139,92,246,0.3)',
                                    boxShadow: '0 0 60px rgba(139,92,246,0.2), 0 30px 80px rgba(0,0,0,0.6)',
                                }}
                            >
                                {/* Input row */}
                                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                                    <Search size={16} className="text-purple-400 flex-shrink-0" />
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="Search planets, Sun, Solar System..."
                                        className="flex-1 bg-transparent text-white text-sm placeholder-slate-600 outline-none"
                                    />
                                    {query && (
                                        <button onClick={() => setQuery('')} className="text-slate-600 hover:text-white transition-colors">
                                            <X size={14} />
                                        </button>
                                    )}
                                    <kbd className="hidden sm:block text-xs text-slate-600 border border-white/10 rounded px-1.5 py-0.5 font-mono">ESC</kbd>
                                </div>

                                {/* Results */}
                                <div className="py-2 max-h-72 overflow-y-auto">
                                    {query.trim() === '' ? (
                                        // Default: show all planets
                                        <>
                                            <p className="text-xs text-slate-600 font-mono px-5 py-2 uppercase tracking-widest">All Planets</p>
                                            {planets.map(p => (
                                                <button
                                                    key={p.id}
                                                    onClick={() => goTo(p.id)}
                                                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left group"
                                                >
                                                    <span className="text-xl">{p.emoji}</span>
                                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors font-medium">{p.name}</span>
                                                    <span className="ml-auto text-xs text-slate-600 group-hover:text-slate-400 transition-colors">Jump →</span>
                                                </button>
                                            ))}
                                        </>
                                    ) : results.length > 0 ? (
                                        <>
                                            <p className="text-xs text-slate-600 font-mono px-5 py-2 uppercase tracking-widest">{results.length} result{results.length > 1 ? 's' : ''}</p>
                                            {results.map(p => (
                                                <button
                                                    key={p.id}
                                                    onClick={() => goTo(p.id)}
                                                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left group"
                                                >
                                                    <span className="text-xl">{p.emoji}</span>
                                                    <span className="text-sm text-white font-medium">{p.name}</span>
                                                    <span className="ml-auto text-xs text-slate-600 group-hover:text-slate-400 transition-colors">Jump →</span>
                                                </button>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="px-5 py-8 text-center">
                                            <p className="text-slate-500 text-sm">No planets found for "<span className="text-slate-400">{query}</span>"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
