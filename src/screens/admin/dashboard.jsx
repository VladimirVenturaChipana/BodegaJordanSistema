import { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton, Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import { socialNetworks, menuItems } from "../../components/navBar/navBarConstants";
import NavBarAdmin from "../../components/navBar/navBarAdmin";

import AddCatalog from './addCatalog'
import ActiveDeliveries from './activeDeliveries'
import RegisterEmployee from './registerEmployee'
import AddOptions from "./addOptions";

const drawerWidth = 250;

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  // 1. Nuevo estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState("Inicio");

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer = () => setOpen(!open);

  // 2. Función para renderizar el contenido dinámicamente según la pestaña
  const renderContent = () => {
    switch (activeTab) {
      case "Inicio":
        return (
          <Grid item xs={12} md={4}>
            {/* Mensaje original de tu código */}
            <Paper sx={{ p: 4 }}>Bienvenido al Panel Admin, Bodega Jordan.</Paper>
          </Grid>
        );
      case "Registrar Empleados":
        return <RegisterEmployee />;
      case "Ver Delivery Activos":
        return <ActiveDeliveries />;
      case "Agregar al Catálogo":
        return <AddCatalog />;
      case "Agregar opciones":
        return <AddOptions />;
      default:
        return (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4 }}>Bienvenido al Panel Admin, Bodega Jordan.</Paper>
          </Grid>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBarAdmin toggleDrawer={toggleDrawer} />

      <Drawer
        variant={isDesktop ? "persistent" : "temporary"}
        open={isDesktop ? true : open}
        onClose={() => setOpen(false)}
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
                {/* 3. Actualizar el estado al hacer clic y marcarlo visualmente como seleccionado */}
                <ListItemButton
                  selected={activeTab === item.text}
                  onClick={() => setActiveTab(item.text)}
                >
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
          {/* 4. Llamar a la función que renderiza el contenido dinámico */}
          {renderContent()}
        </Grid>
      </Box>
    </Box>
  );
}