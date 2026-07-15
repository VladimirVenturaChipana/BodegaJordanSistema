import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Button, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { AddIcon } from "../../shared/icons"; // Tu archivo de iconos compartidos
import { getMarcas, createMarca } from "../../hooks/API/servicesCatalog";

export default function AddOptions() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga inicial de datos usando tu servicio de Supabase[cite: 6]
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getMarcas();
      setMarcas(data);
    } catch (error) {
      console.error("Error al cargar marcas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMarca = async () => {
    const nuevaDescripcion = window.prompt("Ingresa el nombre de la nueva marca:");
    if (nuevaDescripcion) {
      try {
        await createMarca(nuevaDescripcion.toUpperCase());
        fetchData(); // Recarga los datos para refrescar la tabla
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    }
  };

  const handleEditMarca = (marca) => {
    // Aquí puedes disparar un modal para editar la marca, similar a lo que haces en addCatalog[cite: 2]
    console.log("Editar marca:", marca);
  };

  return (
    <Grid container spacing={3} sx={{ maxWidth: 'xl', mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, mt: 4 }}>
      {/* Encabezado Principal */}
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main', textTransform: 'uppercase', display: 'inline-block', borderBottom: '3px solid', pb: 0.5 }}>
          Nuevos Datos del Catálogo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Agrega nuevas marcas, unidades y categorías a tu catálogo digital.
        </Typography>
      </Grid>
      {/* Sección de Gestión de Marcas */}
      <Grid item size={{ xs: 12, md: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Marcas Registradas
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddMarca}
          >
            Añadir Marca
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 400, boxShadow: 2, borderRadius: 2 }}>
            <Table stickyHeader size="small" aria-label="tabla de marcas">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Marca</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marcas.map((marca) => (
                  <TableRow key={marca.idmarca} hover>
                    <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>{marca.idmarca}</TableCell>
                    <TableCell>{marca.descripcion}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      {/* Sección de Gestión de Categorias */}
      <Grid item size={{ xs: 12, md: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Categorias Registradas
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddMarca}
          >
            Añadir Marca
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 400, boxShadow: 2, borderRadius: 2 }}>
            <Table stickyHeader size="small" aria-label="tabla de marcas">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Marca</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marcas.map((marca) => (
                  <TableRow key={marca.idmarca} hover>
                    <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>{marca.idmarca}</TableCell>
                    <TableCell>{marca.descripcion}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      {/* Sección de Gestión de Presentación o Unidad */}
      <Grid item size={{ xs: 12, md: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Presentación o Unidad
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddMarca}
          >
            Añadir Marca
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 400, boxShadow: 2, borderRadius: 2 }}>
            <Table stickyHeader size="small" aria-label="tabla de marcas">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Marca</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marcas.map((marca) => (
                  <TableRow key={marca.idmarca} hover>
                    <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>{marca.idmarca}</TableCell>
                    <TableCell>{marca.descripcion}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
}