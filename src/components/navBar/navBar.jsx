import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Badge, Avatar, Typography, useMediaQuery, useTheme } from "@mui/material";
import SearchBar from "../searchBar";
import GenericMenu from "../menus";
import ElevationScroll from "./elevationScroll";
import BottomNav from "./bottomNavigation";
import { KeyboardArrowDownIcon } from "../../shared/icons";
import { AVATAR_OPTIONS, CATEGORIES_OPTIONS, socialNetworks } from "./navBarConstants";

export default function Navbar() {
  const [anchorCat, setAnchorCat] = useState(null);
  const [anchorAvatar, setAnchorAvatar] = useState(null);
  const [mobileTab, setMobileTab] = useState(0);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, width: '100%' }}>
            {/* LADO IZQUIERDO: Logo y Redes */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button onClick={() => window.location.href = "/"}>
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
                  onItemClick={(item) => console.log(item)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isDesktop ? (
                  <>
                    <IconButton color="inherit" onClick={(e) => setAnchorAvatar(e.currentTarget)}>
                      <Badge badgeContent={8} color="error">
                        <Avatar src="..." />
                      </Badge>
                    </IconButton>
                    <GenericMenu
                      anchorEl={anchorAvatar}
                      open={Boolean(anchorAvatar)}
                      onClose={() => setAnchorAvatar(null)}
                      items={AVATAR_OPTIONS}
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
    </React.Fragment>
  );
}