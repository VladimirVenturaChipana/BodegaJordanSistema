import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Container } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL;

export default function CategoryGrid() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/productos/categorias`)
      .then(res => res.json())
      .then(data => setCategorias(data));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        NUESTROS PRODUCTOS
      </Typography>
      <Grid container spacing={3}>
        {categorias.map((item) => (
          <Grid key={item.idcategoria} size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper elevation={3} sx={{
              aspectRatio: '1/1', borderRadius: 3, overflow: 'hidden',
              cursor: 'pointer', transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              <img
                src={item.imagenurl || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'}
                alt={item.deslin}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Paper>
            <Typography variant="h5" sx={{ mt: 1, textAlign: 'center', fontWeight: 500 }}>
              {item.deslin}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}