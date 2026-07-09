import { createTheme } from '@mui/material/styles';

// Estos son tus colores base. Sustituye los strings por los de Figma
const primaryColor = '#9D001B'; // <-- Pega aquí el color principal de Figma
const secondaryColor = '#cc9b08ff'; // <-- Pega aquí el color secundario de Figma

const themeOptions = {
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
    },
};

const lightTheme = createTheme({
    ...themeOptions,
    palette: {
        ...themeOptions.palette,
        mode: 'light',
    },
});

const darkTheme = createTheme({
    ...themeOptions,
    palette: {
        ...themeOptions.palette,
        mode: 'dark',
        primary: {
            // En modo oscuro, a veces es mejor un tono más claro para el primario
            main: '#bb0322ff',
        },
    },
});

export { lightTheme, darkTheme };