import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Box, Typography, Container } from '@mui/material';
import MediaCard from '../../cardProduct';

export default function SliderProducts({
  highlightTitle = "LICORES",
  title = "PARA TU FIN DE SEMANA",
  products = []
}) {
  // Si no hay productos, creamos 5 vacíos para mostrar el diseño
  const displayProducts = products.length > 0 ? products : Array.from({ length: 10 });

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%', py: 2, px: { xs: 2, md: 4 } }}>

        {/* Título a dos colores */}
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
          spaceBetween={16}
          freeMode={true}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2.2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
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