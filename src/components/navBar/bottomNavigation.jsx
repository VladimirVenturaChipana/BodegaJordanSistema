import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { HomeIcon, ShoppingCartIcon, LocalMallIcon } from "../../shared/icons";
import { useAuthStore } from "../../hooks/servicesStore";
import LoginModal from '../../screens/login/loginModal'

export default function BottomNav({ value, onChange }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [open, setOpen] = useState(false);

  const handleProtectedAction = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setOpen(true);
    }
  };

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
        <BottomNavigationAction label="Carrito" href={isAuthenticated ? "/checkout" : undefined} onClick={handleProtectedAction} icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="Mis compras" href={isAuthenticated ? "/profile" : undefined} onClick={handleProtectedAction} icon={<LocalMallIcon />} />
      </BottomNavigation>

      <LoginModal open={open} handleClose={() => setOpen(false)} />
    </Paper>
  );
}