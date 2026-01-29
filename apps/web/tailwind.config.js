module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        'bg-main': '#0B0B0F',
        'bg-card': '#14141A',
        gold: '#C9A24D',
        'text-muted': '#B3B3C2',
        'border-soft': 'rgba(255,255,255,0.08)',
      },
      borderRadius: {
        xl: '20px',
      },
      boxShadow: {
        glass: '0 0 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
