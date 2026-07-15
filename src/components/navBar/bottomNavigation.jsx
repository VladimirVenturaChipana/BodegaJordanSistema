import { Paper, BottomNavigation, BottomNavigationAction, Badge } from "@mui/material";
import { useState } from "react";
// 1. Importa useNavigate
import { useNavigate } from "react-router-dom";
import { HomeIcon, ShoppingCartIcon, LocalMallIcon } from "../../shared/icons";
import { useAuthStore } from "../../hooks/servicesStore";
import { useCartStore } from "../../hooks/servicesStore";
import LoginModal from '../../screens/customers/login/loginModal';

export default function BottomNav({ value, onChange }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [open, setOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.length;

  const handleProtectedAction = (e, path) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setOpen(true);
    } else {
      navigate(path);
    }
  };

  // 2. Inicializa el hook
  const navigate = useNavigate();

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
        {/* 4. Cambia los href por onClick con navigate */}
        <BottomNavigationAction
          label="Inicio"
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Carrito"
          onClick={(e) => handleProtectedAction(e, '/checkout')}
          icon={
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>}
        />
        <BottomNavigationAction
          label="Mis compras"
          onClick={(e) => handleProtectedAction(e, '/profile')}
          icon={<LocalMallIcon />}
        />
      </BottomNavigation>

      <LoginModal open={open} handleClose={() => setOpen(false)} />
    </Paper>
  );
}