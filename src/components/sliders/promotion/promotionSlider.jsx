import { useState, useEffect } from 'react';
import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Box, Typography } from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_URL = import.meta.env.VITE_API_URL;

export default function PromotionSlider() {
  const theme = useTheme();
  const bp = theme.breakpoints.values;
  const [banners, setBanners] = useState([]);

useEffect(() => {
  fetch(`${API_URL}/api/promociones/banners`)
    .then(res => res.json())
    .then(data => {
      console.log('Banners recibidos:', data);  // ← agregar esto
      setBanners(data);
    })
    .catch(err => console.error('Error:', err));
}, []);

  if (banners.length === 0) return null;

  return (
    <Box
      sx={{
        bgcolor: 'ActiveText',
        width: '100%',
        aspectRatio: { xs: '16/9', sm: '3/1', lg: '3/1' },
        minHeight: { xs: '250px', sm: '350px', lg: '400px' },
        maxHeight: { lg: '450px' },
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
        loop={banners.length > 3}
        modules={[Navigation, Autoplay, Pagination]}
        effect='slide'
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          [bp.xs]: { slidesPerView: 1, slidesPerGroup: 1 },
          [bp.sm]: { slidesPerView: Math.min(2, banners.length), slidesPerGroup: 1 },
          [bp.lg]: { slidesPerView: Math.min(3, banners.length), slidesPerGroup: 1 },
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.idpromo}>
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src={banner.imagenurl}
                // alt={banner.descripcion}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: "cover",
                  objectPosition: "center center"
                }}
              />
              {/* {banner.tipo === 'combo' && (
                <Box sx={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  bgcolor: 'rgba(0,0,0,0.6)', color: 'white',
                  p: 1, textAlign: 'center'
                }}>
                  <Typography variant="body2" fontWeight="bold">{banner.descripcion}</Typography>
                  <Typography variant="caption">S/. {banner.precio}</Typography>
                </Box>
              )} */}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}