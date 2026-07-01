import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Box, Typography, Container, useTheme } from '@mui/material';
import MediaCard from '../../cardProduct';

export default function SliderProducts({
  highlightTitle = "LICORES",
  title = "PARA TU FIN DE SEMANA",
  products = []
}) {
  const theme = useTheme();

  const displayProducts = products.length > 0 ? products : Array.from({ length: 10 });

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
          modules={[Navigation, Pagination, FreeMode]}
          freeMode={true}
          navigation={true}
          breakpoints={{
            [theme.breakpoints.values.xs]: {
              slidesPerView: 2.1,
              spaceBetween: 10,
            },
            [theme.breakpoints.values.sm]: {
              slidesPerView: 2.8,
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
              slidesPerView: 5.5,
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