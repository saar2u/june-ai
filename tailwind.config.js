/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-300
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // cyan-400
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // gray-900
        primary: {
          DEFAULT: "var(--color-primary)", // indigo-900
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // teal-700
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-100
          foreground: "var(--color-muted-foreground)", // gray-600
        },
        accent: {
          DEFAULT: "var(--color-accent)", // cyan-400
          foreground: "var(--color-accent-foreground)", // gray-900
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-900
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-900
        },
        success: {
          DEFAULT: "var(--color-success)", // green-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // orange-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Neural Depth Palette
        neural: {
          deep: "var(--color-neural-deep)", // indigo-900
          medium: "var(--color-neural-medium)", // indigo-600
          light: "var(--color-neural-light)", // indigo-400
        },
        quantum: {
          deep: "var(--color-quantum-deep)", // teal-700
          medium: "var(--color-quantum-medium)", // teal-600
          light: "var(--color-quantum-light)", // teal-300
        },
        energy: {
          bright: "var(--color-energy-bright)", // cyan-400
          medium: "var(--color-energy-medium)", // cyan-600
          soft: "var(--color-energy-soft)", // cyan-200
        },
        // Conversion CTA
        cta: {
          DEFAULT: "var(--color-cta)", // orange-700
          foreground: "var(--color-cta-foreground)", // white
        },
        // Text Hierarchy
        text: {
          primary: "var(--color-text-primary)", // gray-800
          secondary: "var(--color-text-secondary)", // gray-600
          tertiary: "var(--color-text-tertiary)", // gray-500
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)", // 12px
        md: "var(--radius-md)", // 8px
        sm: "var(--radius-sm)", // 4px
        xl: "var(--radius-xl)", // 16px
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }], // 40px
        'heading': ['2rem', { lineHeight: '1.25', fontWeight: '600' }], // 32px
        'subheading': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }], // 12px
      },
      spacing: {
        'golden-xs': 'var(--spacing-xs)', // 8px
        'golden-sm': 'var(--spacing-sm)', // 13px
        'golden-md': 'var(--spacing-md)', // 21px
        'golden-lg': 'var(--spacing-lg)', // 34px
        'golden-xl': 'var(--spacing-xl)', // 55px
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'soft': 'var(--shadow-soft)',
        'elevated': 'var(--shadow-elevated)',
        'neural': 'var(--shadow-neural)',
      },
      animation: {
        'neural-pulse': 'neural-pulse 2s infinite',
        'neural-flow': 'neural-flow 3s ease-in-out infinite',
        'morphing': 'morphing-path 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        'neural-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.95)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'neural-flow': {
          '0%': { 'stroke-dashoffset': '100' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        'morphing-path': {
          '0%, 100%': { d: 'path("M10,10 Q50,5 90,10 T170,10")' },
          '50%': { d: 'path("M10,10 Q50,25 90,10 T170,10")' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'neural': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      backdropBlur: {
        'neural': '20px',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      aspectRatio: {
        'golden': '1.618',
      },
      zIndex: {
        'modal': '1000',
        'dropdown': '100',
        'sticky': '10',
        'header': '50',
        'sidebar': '40',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}