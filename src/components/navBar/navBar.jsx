import {
  AppBar, Toolbar, Button, Box, IconButton,
  Badge, Avatar, Typography, BottomNavigation,
  BottomNavigationAction, Paper, useMediaQuery, useTheme
}
  from "@mui/material";
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
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

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
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, width: '100%' }}>
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
        {/* Grupo botones */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {socialNetworks.map((network) => (
            <IconButton key={network.name} color="inherit" target="_blank" href={network.url}>
              <network.icon />
            </IconButton>
          ))}
        </Box>
        {/* Barra de búsqueda */}
        <Box sx={{ flexGrow: 1, maxWidth: '500px' }}>
          <SearchBar />
        </Box>
        {/* Pestaña Categorias */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <IconButton color="inherit" component="a" href="/profile">
              <Avatar src="..." />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', md: 'none' } }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
          <BottomNavigationAction label="Carrito" icon={<ShoppingCartIcon />} />
          <BottomNavigationAction label="Compras" icon={<LocalMallIcon />} />
        </BottomNavigation>
      </Paper>
    </AppBar>

  );
}