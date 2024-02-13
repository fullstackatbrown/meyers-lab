import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          //TODO
        },
        secondary: {
          //TODO
        },
      },
      fontSize: {
        '4xl-responsive': 'calc(1.1vw + 22px)',
        '4.5xl-responsive': 'calc(1.1vw + 27px)',
        '5xl-responsive': 'calc(1.1vw + 32px)',
        '5.75xl-responsive': 'calc(1.1vw + 47px)',
        '6xl-responsive': 'calc(1.1vw + 55px)',
      },
      /* screens are breakpoints for media queries */
      screens: {
        sm2: '500px',
        sm3: '400px',
        sm4: '300px',
        sm5: '200px',
        md2: '800px',
        md3: '850px',
        md4: '900px',
        md5: '950px',
      },
      lineHeight: {
        'semi-tight': '1',
        'extra-tight': '0.75',
      }
    },
  },
  plugins: [],
};
export default config;
