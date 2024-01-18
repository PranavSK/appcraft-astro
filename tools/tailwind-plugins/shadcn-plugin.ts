import plugin from 'tailwindcss/plugin'

export const shadcnPlugin = plugin(
  // Add css variable definitions to the base layer
  function ({ addBase }) {
    addBase({
      ':root': {
        '--accent': '240 4.8% 95.9%',
        '--accent-foreground': '240 5.9% 10%',
        '--background': '0 0% 100%',
        '--border': '240 5.9% 90%',
        '--card': '0 0% 100%',
        '--card-foreground': '240 10% 3.9%',
        '--destructive': '0 84.2% 60.2%',
        '--destructive-foreground': '0 0% 98%',
        '--error': '0 93% 94%',
        '--error-foreground': '0 84% 60%',
        '--foreground': '240 10% 3.9%',
        '--info': '204 94% 94%',
        '--info-foreground': '199 89% 48%',
        '--input': '240 5.9% 90%',
        '--muted': '240 4.8% 95.9%',
        '--muted-foreground': '240 3.8% 46.1%',
        '--popover': '0 0% 100%',
        '--popover-foreground': '240 10% 3.9%',
        '--primary': '240 5.9% 10%',
        '--primary-foreground': '0 0% 98%',
        '--radius': '0.5rem',
        '--ring': '240 5.9% 10%',
        '--secondary': '240 4.8% 95.9%',
        '--secondary-foreground': '240 5.9% 10%',
        '--success': '149 80% 90%',
        '--success-foreground': '160 84% 39%',
        '--warning': '48 96% 89%',
        '--warning-foreground': '25 95% 53%'
      },
      "[data-kb-theme='dark']": {
        '--accent': '240 3.7% 15.9%',
        '--accent-foreground': '0 0% 98%',
        '--background': '240 10% 3.9%',
        '--border': '240 3.7% 15.9%',
        '--card': '240 10% 3.9%',
        '--card-foreground': '0 0% 98%',
        '--destructive': '0 62.8% 30.6%',
        '--destructive-foreground': '0 0% 98%',
        '--error': '0 93% 94%',
        '--error-foreground': '0 84% 60%',
        '--foreground': '0 0% 98%',
        '--info': '204 94% 94%',
        '--info-foreground': '199 89% 48%',
        '--input': '240 3.7% 15.9%',
        '--muted': '240 3.7% 15.9%',
        '--muted-foreground': '240 5% 64.9%',
        '--popover': '240 10% 3.9%',
        '--popover-foreground': '0 0% 98%',
        '--primary': '0 0% 98%',
        '--primary-foreground': '240 5.9% 10%',
        '--radius': '0.5rem',
        '--ring': '240 4.9% 83.9%',
        '--secondary': '240 3.7% 15.9%',
        '--secondary-foreground': '0 0% 98%',
        '--success': '149 80% 90%',
        '--success-foreground': '160 84% 39%',
        '--warning': '48 96% 89%',
        '--warning-foreground': '25 95% 53%'
      }
    })

    addBase({
      '*': {
        'border-color': 'hsl(var(--border))'
      },
      body: {
        'background-color': 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        'font-feature-settings': `'rlig' 1,'calt' 1`
      }
    })
  },
  {
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px'
        }
      },
      extend: {
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'content-hide': 'content-hide 0.2s ease-out',
          'content-show': 'content-show 0.2s ease-out'
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)'
        },
        colors: {
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))'
          },
          background: 'hsl(var(--background))',
          border: 'hsl(var(--border))',
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))'
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))'
          },
          error: {
            DEFAULT: 'hsl(var(--error))',
            foreground: 'hsl(var(--error-foreground))'
          },
          foreground: 'hsl(var(--foreground))',
          info: {
            DEFAULT: 'hsl(var(--info))',
            foreground: 'hsl(var(--info-foreground))'
          },
          input: 'hsl(var(--input))',
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))'
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))'
          },
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))'
          },
          ring: 'hsl(var(--ring))',
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))'
          },
          success: {
            DEFAULT: 'hsl(var(--success))',
            foreground: 'hsl(var(--success-foreground))'
          },
          warning: {
            DEFAULT: 'hsl(var(--warning))',
            foreground: 'hsl(var(--warning-foreground))'
          }
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--kb-accordion-content-height)' }
          },
          'accordion-up': {
            from: { height: 'var(--kb-accordion-content-height)' },
            to: { height: '0' }
          },
          'content-hide': {
            from: { opacity: '1', transform: 'scale(1)' },
            to: { opacity: '0', transform: 'scale(0.96)' }
          },
          'content-show': {
            from: { opacity: '0', transform: 'scale(0.96)' },
            to: { opacity: '1', transform: 'scale(1)' }
          }
        }
      }
    }
  }

  // Extend the tailwind theme with the 'themable' utilities
)
