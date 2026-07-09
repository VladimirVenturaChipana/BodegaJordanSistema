import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { HomeIcon, ShoppingCartIcon, LocalMallIcon } from "../../shared/icons";

export default function BottomNav({ value, onChange }) {
    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: { xs: 'block', sm: 'none' },
                zIndex: 1000
            }}
            elevation={3}
        >
            <BottomNavigation showLabels value={value} onChange={onChange}>
                <BottomNavigationAction label="Inicio" href="/" icon={<HomeIcon />} />
                <BottomNavigationAction label="Carrito" href="/checkout" icon={<ShoppingCartIcon />} />
                <BottomNavigationAction label="Compras" href="/profile" icon={<LocalMallIcon />} />
            </BottomNavigation>
        </Paper>
    );
}