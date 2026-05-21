import React, { useEffect, useRef } from 'react'

export default function CursorGlow() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const glowRef = useRef(null)
    const pos = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY }
            if (dotRef.current) {
                dotRef.current.style.left = e.clientX + 'px'
                dotRef.current.style.top = e.clientY + 'px'
            }
            if (glowRef.current) {
                glowRef.current.style.left = e.clientX + 'px'
                glowRef.current.style.top = e.clientY + 'px'
            }
        }

        const animate = () => {
            ring.current.x += (pos.current.x - ring.current.x) * 0.12
            ring.current.y += (pos.current.y - ring.current.y) * 0.12
            if (ringRef.current) {
                ringRef.current.style.left = ring.current.x + 'px'
                ringRef.current.style.top = ring.current.y + 'px'
            }
            requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', onMove)
        animate()
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="custom-cursor"
                style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="cursor-follower"
                style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998 }}
            />
            {/* Ambient glow */}
            <div
                ref={glowRef}
                style={{
                    position: 'fixed',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 9997,
                    transition: 'left 0.05s, top 0.05s',
                }}
            />
        </>
    )
}
