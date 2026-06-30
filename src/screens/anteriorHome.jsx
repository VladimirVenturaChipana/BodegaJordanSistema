import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import {
  Avatar, AppBar, Badge, Box, Menu, MenuItem, Button, IconButton,
  Toolbar, SvgIcon, Container, ListItemIcon, ListItemText,
} from "@mui/material";

import CardProduct from "../components/cardProduct";

const BANNERS_DATA = [
  { id: 1, image: "https://png.pngtree.com/png-clipart/20240121/original/pngtree-summer-promotional-drinks-yellow-fresh-mobile-horizontal-version-banner-png-image_14143650.png" },
  { id: 2, image: "https://catalogosmetro.metro.pe/catalogo-loncheras-y-snacks-febrero-2024/15/15_slide_1.jpg" },
  { id: 3, image: "https://image.isu.pub/200311172610-68bc37f9df57c0834870292a3f880670/jpg/page_1_social_preview.jpg" }
];

const PRODUCTS_DATA = Array.from({ length: 10 });

export default function Home() {

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            width: '100%',
            height: { xs: '200px', sm: '500px', md: '580px' },
            mb: 5,
            position: 'relative',
            '& .swiper-button-next, & .swiper-button-prev': {
              color: 'primary.main',
              transform: 'scale(0.8)',
              width: 40,
              height: 40,
              bgcolor: 'transparent',
              '&::after': { fontSize: '1.2rem', fontWeight: 'bold' }
            },
            '& .swiper-slide': {
              opacity: 0.4,
              transform: 'scale(0.95)',
              transition: 'all 0.4s ease',
              overflow: 'hidden',
            },
            '& .swiper-slide-active': {
              opacity: 1,
              transform: 'scale(1)',
              boxShadow: 3,
            },
            '& .swiper': {
              width: '100%',
              height: '100%',
            }
          }}
        >
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={false}
            centeredSlides={true}
            slidesPerView={1.25}
            spaceBetween={4}
            breakpoints={{
              600: { slidesPerView: 1.25, spaceBetween: 4 },
              1024: { slidesPerView: 1.25, spaceBetween: 4 }
            }}
          >
            {BANNERS_DATA.map((banner) => (
              <SwiperSlide key={banner.id}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${banner.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>

      <Container
        maxWidth='xl' sx={{ bgcolor: 'background.paper' }}
      >
        <Box
          component={Swiper}
          modules={[Navigation]}
          navigation={true}
          spaceBetween={16}
          slidesPerView={1}
          slidesPerGroup={1}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 12 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 5, spaceBetween: 16 }
          }}
          sx={{
            py: 2,
            width: '100%',
            '& .swiper-button-next, & .swiper-button-prev': {
              color: 'primary.main',
              transform: 'scale(1)',
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: 'transparent',
              '&::after': { fontSize: '1rem' }
            }
          }}
        >
          {PRODUCTS_DATA.map((_, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CardProduct />
              </Box>
            </SwiperSlide>
          ))}
        </Box>
      </Container>
    </Box >
  );
}