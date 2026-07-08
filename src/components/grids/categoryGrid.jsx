import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Container } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL;

export default function CategoryGrid() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/productos/categorias`)
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Error cargando categorías:", err));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography
        sx={{
          mb: 4,
          fontWeight: 'bold',
          textAlign: 'center',
          // Controlamos el tamaño de la letra según la pantalla:
          fontSize: {
            xs: '1.6rem',   // Tamaño ideal para celulares (más compacto)
            sm: '2.2rem',   // Para tablets
            md: '2.8rem'    // Su tamaño original grande para laptops/PC
          }
        }}
      >
        NUESTROS PRODUCTOS
      </Typography>
      {/* 1. Reemplazamos el Grid container por un Box con Flexbox puro */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 1, sm: 3 },       // Espaciado controlado entre tarjetas
          justifyContent: 'center',    // ¡ESTO centrará perfectamente el elemento impar abajo!
        }}
      >
        {categorias.map((item) => (
          /* 2. Reemplazamos el Grid item por un Box con anchos calculados dinámicamente */
          <Box
            key={item.idcategoria}
            sx={{
              // Calculamos el ancho restándole el espacio del gap:
              // xs: 2 columnas (50%) | sm: 3 columnas (33.33%) | md: 5 columnas (20%)
              width: {
                xs: 'calc(50% - 8px)',
                sm: 'calc(33.33% - 16px)',
                md: 'calc(20% - 20px)'
              },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Paper
              elevation={3}
              sx={{
                aspectRatio: '1/1',
                width: '100%',
                maxWidth: { xs: 140, sm: '100%' }, // Mantenemos tu reducción de tamaño en celulares
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <img
                src={item.imagenurl || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'}
                alt={item.deslin}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Paper>
            <Typography
              variant="h5"
              sx={{
                mt: 1,
                textAlign: 'center',
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.25rem' } // Tu ajuste de letra para celular
              }}
            >
              {item.deslin}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}