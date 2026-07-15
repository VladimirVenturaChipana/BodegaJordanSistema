import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { Box, Typography, Container, useTheme } from '@mui/material';
import MediaCard from '../../cardProduct/cardProduct';

export default function SliderProducts({
  highlightTitle = "LICORES",
  title = "PARA TU FIN DE SEMANA",
  products = [],
  isLoading = true // <--- ¡Nueva prop! Por defecto en true
}) {

  const theme = useTheme();

  // Si ya terminó de cargar y no hay productos, NO renderizamos el slider.
  if (!isLoading && products.length === 0) {
    return null;
  }

  // Ahora controlamos los esqueletos basados en isLoading real
  const displayProducts = isLoading
    ? Array.from({ length: 8 })
    : products.slice(0, 8);

  return (
    <Container maxWidth="xl">
      <Box sx={{
        width: '100%',
        py: 2,
        px: { xs: 2, md: 4 },
        position: 'relative',
        '& .swiper': {
          px: { md: 3 },
        },
        '& .swiper-button-next, & .swiper-button-prev': {
          color: 'primary.main',
          display: { xs: 'none', md: 'flex' },
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        },
        '&:hover .swiper-button-next, &:hover .swiper-button-prev': {
          opacity: 1,
        }
      }}>

        <Typography variant="h5" sx={{ mb: 3, textTransform: 'uppercase' }}>
          <Box component="span" sx={{ color: 'primary.main', fontWeight: 900 }}>
            {highlightTitle}
          </Box>
          <Box component="span" sx={{ fontWeight: 900 }}>
            {' '}{title}
          </Box>
        </Typography>

        <Swiper
          modules={[Navigation]}
          navigation={true}
          breakpoints={{
            [theme.breakpoints.values.xs]: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            [theme.breakpoints.values.sm]: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            [theme.breakpoints.values.md]: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            [theme.breakpoints.values.lg]: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            [theme.breakpoints.values.xl]: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          style={{ paddingBottom: '1rem' }}
        >
          {displayProducts.map((product, index) => (
            <SwiperSlide key={product?.id || index}>
              <MediaCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}