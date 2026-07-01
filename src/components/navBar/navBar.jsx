import {
  AppBar, Toolbar, Button, Box, IconButton,
  Badge, Avatar, Typography, BottomNavigation,
  BottomNavigationAction, Paper, useMediaQuery, useTheme
} from "@mui/material";
import { useState } from "react";
import SearchBar from "../searchBar";
import GenericMenu from "../menus";
import { KeyboardArrowDownIcon, HomeIcon, ShoppingCartIcon, LocalMallIcon } from "../../shared/icons";
import { AVATAR_OPTIONS, CATEGORIES_OPTIONS, socialNetworks } from "./navBarConstants";

export default function Navbar() {
  const [anchorCat, setAnchorCat] = useState(null);
  const [anchorAvatar, setAnchorAvatar] = useState(null);
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const handleCategoriesOpen = (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleCategoriesClose = () => {
    setAnchorCat(null);
  };

  const handleAvatarOpen = (event) => {
    setAnchorAvatar(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorAvatar(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, width: '100%' }}>

        {/* === GRUPO IZQUIERDO: Logo + Redes === */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: 'white',
            }}>
              BODEGA J.A
            </Typography>
          </Box>
          {/* Grupo botones redes */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {socialNetworks.map((network) => (
              <IconButton key={network.name} color="inherit" target="_blank" href={network.url}>
                <network.icon />
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* === GRUPO CENTRO: Barra de búsqueda === */}
        {/* Le damos flexGrow y un maxWidth generoso para que se vea bien centrado */}
        <Box sx={{ flexGrow: 1, maxWidth: '700px', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%' }}>
            <SearchBar />
          </Box>
        </Box>

        {/* === GRUPO DERECHO: Categorías + Avatar === */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Pestaña Categorias */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" onClick={handleCategoriesOpen} endIcon={<KeyboardArrowDownIcon />}>
              Categorías
            </Button>
            <GenericMenu
              anchorEl={anchorCat}
              open={Boolean(anchorCat)}
              onClose={handleCategoriesClose}
              items={CATEGORIES_OPTIONS}
              onItemClick={(item) => console.log(item)}
            />
          </Box>
          {/* Pestaña Avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isDesktop ? (
              <>
                <IconButton color="inherit" onClick={handleAvatarOpen}>
                  <Badge badgeContent={8} color="error">
                    <Avatar src="..." />
                  </Badge>
                </IconButton>
                <GenericMenu
                  anchorEl={anchorAvatar}
                  open={Boolean(anchorAvatar)}
                  onClose={handleAvatarClose}
                  items={AVATAR_OPTIONS}
                />
              </>
            ) : (
              <IconButton color="inherit" component="a" href="/product">
                <Avatar src="..." />
              </IconButton>
            )}
          </Box>
        </Box>

      </Toolbar>

      {/* === BOTTOM NAVIGATION === */}
      {/* Añadido zIndex: 1000 para que nada se le superponga */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'none' }, zIndex: 1000 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Inicio" href="/" icon={<HomeIcon />} />
          <BottomNavigationAction label="Carrito" icon={<ShoppingCartIcon />} />
          <BottomNavigationAction label="Compras" icon={<LocalMallIcon />} />
        </BottomNavigation>
      </Paper>
    </AppBar>
  );
}