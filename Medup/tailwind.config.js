/** @type {import('tailwindcss').Config} */
import { screens as _screens } from 'tailwindcss/defaultTheme';
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
    screens: {
        xs: '475px',
        ..._screens,
    },
    extend: {
        height: {
            100: '30rem',
        },
        colors: {
            main: '#183253',
            subMain: '#14919B',
            text: '#F2FAF8',
            border: '#E8EBEE',
            textGray: '#A0A0A0',
            dry: '#F8F9FA',
            greyed: '#F3F5F7',
        },
    },
};
export const plugins = [];
