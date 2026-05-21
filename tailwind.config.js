/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                space: {
                    950: '#020408',
                    900: '#050b14',
                    800: '#0a1628',
                    700: '#0f2040',
                },
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'spin-slower': 'spin 40s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'shooting-star': 'shootingStar 3s linear infinite',
                'twinkle': 'twinkle 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
                    '50%': { boxShadow: '0 0 60px rgba(139, 92, 246, 0.8)' },
                },
                shootingStar: {
                    '0%': { transform: 'translateX(-100px) translateY(-100px)', opacity: '1' },
                    '100%': { transform: 'translateX(400px) translateY(400px)', opacity: '0' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.2' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
