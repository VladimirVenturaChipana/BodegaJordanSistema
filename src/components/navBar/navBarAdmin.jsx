import { AppBar, Toolbar, Typography, Box, Avatar, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggler from "../themeToggler";

export default function NavBarAdmin({ toggleDrawer }) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Botón visible solo en pantallas pequeñas */}
          <IconButton color="inherit" onClick={toggleDrawer} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            BODEGA JORDAN
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ThemeToggler />
          <Avatar src="/admin-avatar.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}