import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate'; // import 구문 사용

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        // 기본 폰트 설정: Pretendard
        sans: ['Pretendard', 'sans-serif'],

        // 다른 폰트들 설정
        SUITE: ['SUITE', 'sans-serif'],
        Agdasima: ['Agdasima', 'serif'],
        Tomorrow: ['Tomorrow', 'serif'],
        esamanru: ['esamanru', 'serif'],
      },
    },
  },
  plugins: [tailwindcssAnimate], // import한 값 사용
};

export default config;
