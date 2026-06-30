import { Grid, Paper, Typography, Box, Container } from '@mui/material';
import { CATEGORIES } from './categoryGridConstants';

export default function CategoryGrid() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        NUESTROS PRODUCTOS
      </Typography>
      <Grid container spacing={3}>
        {CATEGORIES.map((item) => (
          // Usando la sintaxis size={{ breakpoint: numero }}
          <Grid key={item.id} size={{ xs: 6, sm: 4, md: 2.4 }}>
            <Paper
              elevation={3}
              sx={{
                aspectRatio: '1/1',
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Paper>
            <Typography variant="h5" sx={{ mt: 1, textAlign: 'center', fontWeight: 500 }}>
              {item.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};