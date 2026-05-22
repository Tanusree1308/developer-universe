import React, { useState, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import StarField from './components/StarField'
import CursorGlow from './components/CursorGlow'
import Intro from './components/Intro'
import PlanetSection from './components/PlanetSection'
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
                        className="relative"
                        style={{ background: '#020408' }}
                    >
                        <StarField />
                        <CursorGlow />
                        <div className="relative z-10">
                            <Intro />
                            <PlanetSection />
                            <Footer />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
