module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        'bg-main': '#0B0B0F',
        'bg-card': '#14141A',
        'bg-glass': 'rgba(20,20,26,0.75)',
        gold: '#C9A24D',
        'gold-soft': 'rgba(201,162,77,0.35)',
        'text-main': '#FFFFFF',
        'text-muted': '#A1A1AA',
        'border-soft': 'rgba(255,255,255,0.08)',
      },
      borderRadius: {
        xl: '18px',
      },
      boxShadow: {
        glass: '0 20px 40px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
};
