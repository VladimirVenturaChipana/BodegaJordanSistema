import React, { useState } from "react";
import {
  AppBar, Toolbar, Button, Box, IconButton,
  Badge, Avatar, Typography, useMediaQuery, useTheme
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import SearchBar from "../searchBar/searchBar";
import GenericMenu from "../menus";
import ElevationScroll from "./elevationScroll";
import ThemeToggler from "../themeToggler";
import BottomNav from "./bottomNavigation";
import LoginModal from '../../screens/login/loginModal'; // ¡A la cancha!
import { useCartStore, useAuthStore } from "../../hooks/servicesStore";
import { KeyboardArrowDownIcon } from "../../shared/icons";
// Cambiamos AVATAR_OPTIONS por getAvatarOptions
import { getAvatarOptions, CATEGORIES_OPTIONS, socialNetworks } from "./navBarConstants";

export default function Navbar() {
  const [anchorCat, setAnchorCat] = useState(null);
  const [anchorAvatar, setAnchorAvatar] = useState(null);
  const [mobileTab, setMobileTab] = useState(0);

  // 1. Estado para controlar el Modal del Login
  const [openLogin, setOpenLogin] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.length;

  const navigate = useNavigate();

  // 2. Generamos las opciones del avatar pasándole la función que abre el modal
  const avatarOptions = getAvatarOptions(() => setOpenLogin(true));

  // 3. Manejador inteligente para los clicks del menú del avatar
  const handleAvatarItemClick = (item) => {
    setAnchorAvatar(null); // Cierra el menú desplegable

    // Si la opción requiere login y el usuario NO está logueado:
    if (item.requiresAuth && !isAuthenticated) {
      setOpenLogin(true); // ¡Pum! Le abres el modal
      return; // Cortas la ejecución para que no viaje a la URL
    }

    // Si está logueado o la opción es pública, sigue normal:
    if (item.action) {
      item.action();
    } else if (item.url) {
      navigate(item.url);
    }
  };

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, width: '100%' }}>

            {/* LADO IZQUIERDO: Logo y Redes */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button onClick={() => navigate("/")}>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white' }}>
                    BODEGA J.A
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                {socialNetworks.map((network) => (
                  <IconButton key={network.name} color="inherit" target="_blank" href={network.url}>
                    <network.icon />
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* CENTRO: Buscador */}
            <Box sx={{ flexGrow: 1, maxWidth: '700px', display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%' }}>
                <SearchBar />
              </Box>
            </Box>

            {/* LADO DERECHO: Menús y Perfil */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                <Button color="inherit" onClick={(e) => setAnchorCat(e.currentTarget)} endIcon={<KeyboardArrowDownIcon />}>
                  Categorías
                </Button>
                <GenericMenu
                  anchorEl={anchorCat}
                  open={Boolean(anchorCat)}
                  onClose={() => setAnchorCat(null)}
                  items={CATEGORIES_OPTIONS}
                  onItemClick={(item) => navigate(item.url)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeToggler />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isDesktop ? (
                  <>
                    <IconButton color="inherit" onClick={(e) => setAnchorAvatar(e.currentTarget)}>
                      <Badge badgeContent={totalItems} color="error">
                        <Avatar src="..." />
                      </Badge>
                    </IconButton>
                    <GenericMenu
                      anchorEl={anchorAvatar}
                      open={Boolean(anchorAvatar)}
                      onClose={() => setAnchorAvatar(null)}
                      items={avatarOptions} // Pasamos el nuevo array dinámico
                      onItemClick={handleAvatarItemClick} // Usamos el nuevo manejador
                    />
                  </>
                ) : (
                  <IconButton color="inherit" component="a" href="/profile">
                    <Avatar src="..." />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />

      {/* Menú Móvil Modularizado */}
      <BottomNav value={mobileTab} onChange={(e, newValue) => setMobileTab(newValue)} />

      {/* 4. El Modal de Login inyectado en el árbol */}
      <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />
    </React.Fragment>
  );
}