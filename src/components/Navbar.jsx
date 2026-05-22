import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const links = ['Home', 'Solar System', 'Galaxy', 'Contact']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => {
        const map = { 'Solar System': 'solarsystem', 'Galaxy': 'galaxy' }
        const el = document.getElementById(map[id] || id.toLowerCase())
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setOpen(false)
    }

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => scrollTo('home')}
                >
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                            boxShadow: '0 0 20px rgba(139,92,246,0.4)',
                        }}
                    >
                        <Zap size={16} className="text-white" />
                    </div>
                    <span
                        className="text-lg font-bold tracking-tight"
                        style={{
                            background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Tanusree.dev
                    </span>
                </motion.div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
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

                {/* Hire Me button */}
                <div className="hidden md:block">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollTo('contact')}
                        className="relative px-5 py-2 rounded-full text-sm font-semibold text-white overflow-hidden group"
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                            boxShadow: '0 0 20px rgba(139,92,246,0.4)',
                        }}
                    >
                        <span className="relative z-10">Hire Me</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.button>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden text-slate-400 hover:text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
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
                            <button
                                key={link}
                                onClick={() => scrollTo(link)}
                                className="text-slate-300 hover:text-white text-sm font-medium text-left transition-colors"
                            >
                                {link}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollTo('contact')}
                            className="text-sm font-semibold text-white px-4 py-2 rounded-full w-fit"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                        >
                            Hire Me
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
