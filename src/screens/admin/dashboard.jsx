import { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton, Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import { socialNetworks, menuItems } from "../../components/navBar/navBarConstants";
import NavBarAdmin from "../../components/navBar/navBarAdmin";

const drawerWidth = 250;

export default function Dashboard() {
  const [open, setOpen] = useState(false); // Empieza cerrado en móvil
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBarAdmin toggleDrawer={toggleDrawer} />

      <Drawer
        // Si es escritorio, es 'persistent', si es móvil es 'temporary' (flotante)
        variant={isDesktop ? "persistent" : "temporary"}
        open={isDesktop ? true : open} // En escritorio siempre abierto, en móvil depende del state
        onClose={() => setOpen(false)} // Cierra al hacer clic fuera en móvil
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon><item.icon /></ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ marginTop: 'auto', p: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            {socialNetworks.map((network) => (
              <IconButton key={network.name} target="_blank" href={network.url}>
                <network.icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4 }}>Bienvenido al Panel Admin, Bodega Jordan.</Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}