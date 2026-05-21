import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Github, Linkedin, Mail, MapPin } from 'lucide-react'

export default function Contact() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [sent, setSent] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSent(true)
        setTimeout(() => setSent(false), 3000)
        setForm({ name: '', email: '', message: '' })
    }

    const inputClass = `w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm
    placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/5
    transition-all duration-200 font-sans`

    return (
        <section id="contact" className="relative py-28 px-6">
            {/* Glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
            />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-4 block">
                        — Contact —
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                        Let's Build the{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Future
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto">
                        Have a project in mind? Let's connect and create something extraordinary together.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Reach Out</h3>

                        <div className="space-y-4 mb-10">
                            {[
                                { icon: Mail, label: 'Email', value: 'tanusree1308@gmail.com', color: '#a78bfa' },
                                { icon: MapPin, label: 'Location', value: 'India', color: '#38bdf8' },
                            ].map(item => {
                                const Icon = item.icon
                                return (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                                        >
                                            <Icon size={16} style={{ color: item.color }} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                                            <div className="text-slate-300 text-sm">{item.value}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Social links */}
                        <div className="flex gap-4">
                            <motion.a
                                href="https://github.com/Tanusree1308"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -3 }}
                                className="flex items-center gap-2 glass-strong px-5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white border border-white/8 hover:border-purple-500/40 transition-all duration-200"
                            >
                                <Github size={16} />
                                GitHub
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/gaddam-tanusree-a6758b349"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -3 }}
                                className="flex items-center gap-2 glass-strong px-5 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white border border-white/8 hover:border-cyan-500/40 transition-all duration-200"
                            >
                                <Linkedin size={16} />
                                LinkedIn
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="glass-strong rounded-2xl p-8 border border-white/8 space-y-5"
                            style={{ boxShadow: '0 0 60px rgba(139,92,246,0.06)' }}
                        >
                            <div>
                                <label className="text-xs text-slate-500 font-medium mb-2 block">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 font-medium mb-2 block">Email</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 font-medium mb-2 block">Message</label>
                                <textarea
                                    placeholder="Tell me about your project..."
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    required
                                    rows={5}
                                    className={inputClass}
                                    style={{ resize: 'none' }}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white relative overflow-hidden group"
                                style={{
                                    background: sent
                                        ? 'linear-gradient(135deg, #059669, #34d399)'
                                        : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                    boxShadow: sent
                                        ? '0 0 30px rgba(52,211,153,0.3)'
                                        : '0 0 30px rgba(139,92,246,0.3)',
                                    transition: 'background 0.4s, box-shadow 0.4s',
                                }}
                            >
                                <span>{sent ? '✓ Message Sent!' : 'Send Message'}</span>
                                {!sent && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
