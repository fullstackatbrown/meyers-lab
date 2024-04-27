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
          DEFAULT: '#4E3629',
          main: '#4E3629',
          red: "#C00305",
          red_light: "#ED1C24",
          gold: "#FFC72C",
          gray: "#98A4AE"
        },
        secondary: {
          //TODO
        },
      },
      fontFamily: {
        'mp-caption': ['"minion-pro-caption"', 'serif'],
        'ms-black': ['"minion-std-black"', 'serif'],
        'mp-subhead': ['"minion-pro-subhead"', 'serif'],
        'mp-display': ['"minion-pro-display"', 'serif'],
        'mp': ['"minion-pro"', 'serif'],
        'circ-std': ['"circular-std"', 'sans-serif']
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
        md6: '1000px',
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

/* Original CSS code */

/* Define your original styles here */

/* tailwind.css.ts */

// @ts-ignore: Ignore TypeScript errors in this file as it's not TypeScript code
/* tailwind.css.ts */

// Check if we're in the browser environment
// if (typeof document !== 'undefined') {
//   // @ts-ignore: Ignore TypeScript errors in this file as it's not TypeScript code
//   const css = `
//     /* Define your original styles here */

//     @media only screen and (max-width: 768px) {
//       /* Adjust grid layout for small screens (1 item per row) */
//       .grid-cols-1 {
//         grid-template-columns: 1fr;
//       }
//     }

//     @media only screen and (min-width: 769px) and (max-width: 1023px) {
//       /* Adjust grid layout for medium screens (2 items per row) */
//       .grid-cols-1 {
//         grid-template-columns: 1fr 1fr;
//       }
//     }

//     @media only screen and (min-width: 1024px) {
//       /* Adjust grid layout for large screens (3 items per row) */
//       .grid-cols-1 {
//         grid-template-columns: 1fr 1fr 1fr;
//       }
//     }`;

//   // Inject the CSS into the document
//   const style = document.createElement('style');
//   style.textContent = css;
//   document.head.appendChild(style);
// }



