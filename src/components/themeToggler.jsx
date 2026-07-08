import { useContext } from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { ThemeContext } from '../shared/themeContext';

export default function ThemeToggler() {
    const { isLight, toggleTheme } = useContext(ThemeContext);

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {isLight ? <DarkMode /> : <LightMode />}
        </IconButton>
    );
}