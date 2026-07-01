import { Box, Grid, Typography } from "@mui/material";

import MainLayout from "../layouts/mainLayout";
import ProductSlide from "../components/sliders/products/productsSlider";

export default function Product() {
  return (
    <MainLayout>
      <Box sx={{ maxWidth: 'lg', mt: 2, padding: 2, display: "flex", justifyContent: "center" }}>
        <Grid container spacing={3}>
          {/* Imagen del producto */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <img
              src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
              height="375px"
              style={{ width: '100%' }}
              alt="Producto"
            />
          </Grid>

          {/* Informacion del producto */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.3rem' }}>
                Santiago Queirolo Borgoña 750ML
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: 'regular', fontSize: '0.9rem' }}>
                Santiago Queirolo
              </Typography>
            </Grid>

            {/* Fila del descuento y código corregida */}
            <Grid
              container
              size={{ xs: 12 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // <--- Clave para separar los elementos a los extremos
                mt: 1 // Margen top opcional para separar del texto de arriba
              }}
            >
              {/* Quitamos los tamaños fijos (xs) para que tomen "auto" */}
              <Grid>
                <Box sx={{
                  bgcolor: 'warning.main',
                  color: 'warning.contrastText',
                  px: 1,
                  py: 0.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  -20%
                </Box>
              </Grid>

              <Grid>
                <Typography sx={{ textTransform: 'uppercase', fontWeight: 'regular', fontSize: '1rem' }}>
                  Código: 7758218195973
                </Typography>
              </Grid>
            </Grid>
            {/* Fin de fila corregida */}

          </Grid>
        </Grid>
      </Box>
      <Box sx={{ maxWidth: 'xl', mt: 2 }}>
        {/* Productos similares */}
        <ProductSlide highlightTitle="Productos" title="similares" />
        {/* Productos de la misma marca */}
        <ProductSlide highlightTitle="[MARCA]" title="te ofrece" />
      </Box>
    </MainLayout>
  );
}