import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Esto obliga al navegador a ir a las coordenadas (x: 0, y: 0)
        window.scrollTo(0, 0);
    }, [pathname]);

    return null; // No renderiza nada en pantalla
}