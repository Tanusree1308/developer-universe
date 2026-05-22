import React, { useState, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import StarField from './components/StarField'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SolarSystem from './components/SolarSystem'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Journey from './components/Journey'

import Contact from './components/Contact'
import Footer from './components/Footer'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
    const [loaded, setLoaded] = useState(false)
    const handleLoadComplete = useCallback(() => setLoaded(true), [])

    return (
        <>
            <LoadingScreen onComplete={handleLoadComplete} />

            <AnimatePresence>
                {loaded && (
                    <motion.div
                        key="app"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative min-h-screen"
                        style={{ background: '#020408' }}
                    >
                        {/* Background */}
                        <StarField />

                        {/* Custom cursor */}
                        <CursorGlow />

                        {/* Content */}
                        <div className="relative z-10">
                            <Navbar />
                            <Hero />
                            <SolarSystem />
                            <Projects />
                            <Skills />
                            <Journey />
                            <Contact />
                            <Footer />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
