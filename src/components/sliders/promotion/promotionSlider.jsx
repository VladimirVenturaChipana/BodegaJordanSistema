import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Box } from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BANNERS_DATA } from './promotionSliderConstants';

export default function PromotionSlider() {

  const theme = useTheme();
  const bp = theme.breakpoints.values;

  return (
    <Box
      sx={{
        // Quitamos el bgcolor: 'ActiveText' para evitar el fondo azul en los bordes
        bgcolor: 'transparent',
        width: '100%',
        // Ajustamos las proporciones asumiendo que tus imágenes son casi cuadradas
        // xs = 1 imagen (cuadrada), sm = 2 imágenes juntas, lg = 3 imágenes juntas
        aspectRatio: { xs: '1/1', sm: '2/1', lg: '3/1' },
        overflow: 'hidden',
        '& .swiper-pagination': {
          bottom: '10px',
        },
        '& .swiper-button-next, & .swiper-button-prev': {
          color: 'primary.main',
          transform: { xs: 'scale(0.7)', lg: 'scale(1)' },
        },
      }}
    >
      <Swiper
        style={{ width: '100%', height: '100%' }}
        speed={1000}
        loop={true}
        // Aseguramos que no haya espacio extra no deseado entre slides
        spaceBetween={0}
        modules={[Navigation, Autoplay, Pagination]}
        effect='slide'
        navigation
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          [bp.xs]: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          [bp.sm]: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          [bp.lg]: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {BANNERS_DATA.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.image}
              alt="Banner"
              style={{
                width: '100%',
                height: '100%',
                // Volvemos a cover, pero ahora el contenedor respeta la forma de tu imagen
                objectFit: "cover",
                objectPosition: "center center"
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};