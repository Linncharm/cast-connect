import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/[locale]/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function({ addBase }: { addBase: (styles: Record<string, any>) => void }) {
      addBase({
        // 为所有颜色相关的类添加过渡效果
        '*, ::before, ::after': {
          '--tw-transition-duration': '300ms',
          'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': 'var(--tw-transition-duration)',
        },
      });
    },
    function({ addUtilities }: { addUtilities: (styles: Record<string, any>) => void }) {
      addUtilities({
        '.custom-scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#A0AEC0 #EDF2F7', // 浅色模式下的滚动条颜色
        },
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: '#A0AEC0', // 浅色模式下的滚动条滑块颜色
          borderRadius: '4px',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          backgroundColor: '#EDF2F7', // 浅色模式下的滚动条轨道颜色
        },
        '.dark .custom-scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#4A5568 #1A202C', // 深色模式下的滚动条颜色
        },
        '.dark .custom-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: '#4A5568', // 深色模式下的滚动条滑块颜色
          borderRadius: '4px',
        },
        '.dark .custom-scrollbar::-webkit-scrollbar-track': {
          backgroundColor: '#1A202C', // 深色模式下的滚动条轨道颜色
        },
      });
    },
  ],
}
export default config