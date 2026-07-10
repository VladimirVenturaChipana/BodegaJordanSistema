import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Container } from '@mui/material';
import { getCategories } from '../../hooks/API/servicesCategories';

export default function CategoryGrid() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategories()
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
          fontSize: {
            xs: '1.6rem',
            sm: '2.2rem',
            md: '2.8rem'
          }
        }}
      >
        NUESTROS PRODUCTOS
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 1, sm: 3 },
          justifyContent: 'center',
        }}
      >
        {categorias.map((item) => (
          <Box
            key={item.idcategoria}
            sx={{
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
                maxWidth: { xs: 130, sm: '80%' },
                borderRadius: 100,
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
                fontSize: { xs: '1rem', sm: '1.25rem' }
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