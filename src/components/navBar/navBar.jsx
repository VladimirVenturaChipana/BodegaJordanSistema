import { AppBar, Toolbar, Button, Box, IconButton, Badge, Avatar } from "@mui/material";

import { useState } from "react";

import SearchBar from "../searchBar";
import GenericMenu from "../menus";
import { KeyboardArrowDownIcon } from "../../shared/icons";
import { AVATAR_OPTIONS, CATEGORIES_OPTIONS, socialNetworks } from "./navBarConstants";

export default function Navbar() {

  const [anchorCat, setAnchorCat] = useState(null);
  const [anchorAvatar, setAnchorAvatar] = useState(null);

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
        {/* Grupo botones */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
          <IconButton color="inherit" onClick={handleAvatarOpen}>
            <Badge badgeContent={8} color="error" sx={{ '& .MuiBadge-badge': { boxShadow: (theme) => theme.shadows[2] } }}>
              <Avatar src="https://img.magnific.com/free-psd/3d-rendering-avatar_23-2150833544.jpg?semt=ais_hybrid&w=740&q=80" alt="User Profile" />
            </Badge>
          </IconButton>
          <GenericMenu
            anchorEl={anchorAvatar}
            open={Boolean(anchorAvatar)}
            onClose={handleAvatarClose}
            items={AVATAR_OPTIONS}
            onItemClick={(item) => console.log(item)}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}