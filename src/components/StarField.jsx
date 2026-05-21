import React, { useEffect, useRef } from 'react'

export default function StarField() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationId
        let stars = []
        let shootingStars = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createStars = () => {
            stars = []
            for (let i = 0; i < 300; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 1.5 + 0.2,
                    alpha: Math.random(),
                    speed: Math.random() * 0.3 + 0.05,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinkleDir: Math.random() > 0.5 ? 1 : -1,
                })
            }
        }

        const spawnShootingStar = () => {
            if (Math.random() < 0.003) {
                shootingStars.push({
                    x: Math.random() * canvas.width * 0.7,
                    y: Math.random() * canvas.height * 0.4,
                    len: 0,
                    maxLen: Math.random() * 120 + 80,
                    speed: Math.random() * 8 + 6,
                    alpha: 1,
                    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
                })
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw nebula gradients
            const grad1 = ctx.createRadialGradient(
                canvas.width * 0.2, canvas.height * 0.3, 0,
                canvas.width * 0.2, canvas.height * 0.3, canvas.width * 0.4
            )
            grad1.addColorStop(0, 'rgba(120, 40, 200, 0.06)')
            grad1.addColorStop(1, 'transparent')
            ctx.fillStyle = grad1
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const grad2 = ctx.createRadialGradient(
                canvas.width * 0.8, canvas.height * 0.2, 0,
                canvas.width * 0.8, canvas.height * 0.2, canvas.width * 0.35
            )
            grad2.addColorStop(0, 'rgba(6, 182, 212, 0.05)')
            grad2.addColorStop(1, 'transparent')
            ctx.fillStyle = grad2
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const grad3 = ctx.createRadialGradient(
                canvas.width * 0.6, canvas.height * 0.8, 0,
                canvas.width * 0.6, canvas.height * 0.8, canvas.width * 0.3
            )
            grad3.addColorStop(0, 'rgba(236, 72, 153, 0.04)')
            grad3.addColorStop(1, 'transparent')
            ctx.fillStyle = grad3
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw stars
            stars.forEach(star => {
                star.alpha += star.twinkleSpeed * star.twinkleDir
                if (star.alpha >= 1) { star.alpha = 1; star.twinkleDir = -1 }
                if (star.alpha <= 0.1) { star.alpha = 0.1; star.twinkleDir = 1 }
                star.y -= star.speed * 0.1

                if (star.y < 0) {
                    star.y = canvas.height
                    star.x = Math.random() * canvas.width
                }

                ctx.beginPath()
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
                ctx.fill()
            })

            // Draw shooting stars
            spawnShootingStar()
            shootingStars = shootingStars.filter(s => s.alpha > 0)
            shootingStars.forEach(s => {
                s.len = Math.min(s.len + s.speed, s.maxLen)
                const dx = Math.cos(s.angle) * s.len
                const dy = Math.sin(s.angle) * s.len

                const grad = ctx.createLinearGradient(s.x, s.y, s.x + dx, s.y + dy)
                grad.addColorStop(0, `rgba(255, 255, 255, 0)`)
                grad.addColorStop(0.5, `rgba(200, 180, 255, ${s.alpha * 0.6})`)
                grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`)

                ctx.beginPath()
                ctx.moveTo(s.x, s.y)
                ctx.lineTo(s.x + dx, s.y + dy)
                ctx.strokeStyle = grad
                ctx.lineWidth = 1.5
                ctx.stroke()

                if (s.len >= s.maxLen) s.alpha -= 0.04
                s.x += Math.cos(s.angle) * s.speed * 0.5
                s.y += Math.sin(s.angle) * s.speed * 0.5
            })

            animationId = requestAnimationFrame(draw)
        }

        resize()
        createStars()
        draw()

        window.addEventListener('resize', () => { resize(); createStars() })
        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    )
}
