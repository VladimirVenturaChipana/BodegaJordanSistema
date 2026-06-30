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
        width: '100%',
        // Incrementé ligeramente los ratios para dar más "aire" vertical
        aspectRatio: { xs: '4/3', sm: '16/7', lg: '3/1' },
        // Aumenté el minHeight en todos los puntos para mayor presencia
        minHeight: { xs: '300px', sm: '450px', lg: '800px' },
        maxHeight: { lg: '800px' },
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
        speed={1000}
        loop={true}
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