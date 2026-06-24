import { useState } from 'react';
import {
  Avatar,
  AppBar,
  Badge,
  Box,
  Menu,
  MenuItem,
  Button,
  IconButton,
  Toolbar,
  SvgIcon,
  Container,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SearchBar from "../components/searchBar";
import CardProduct from "../components/cardProduct";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LiquorIcon from '@mui/icons-material/Liquor';
import IceCreamIcon from '@mui/icons-material/IceCream';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const AVATAR_OPTIONS = [
  { text: "Iniciar sesión", icon: LoginIcon },
  { text: "Perfil", icon: PersonIcon },
  { text: "Mi carrito", icon: ShoppingCartIcon },
  { text: "Mis compras", icon: LocalMallIcon },
];

const CATEGORIES_OPTIONS = [
  {
    text: "Bebidas",
    icon: (props) => (
      <SvgIcon {...props} viewBox="0 0 48 48">
        <path d="M26 39V36.2L41 25V22.3H26V5.2H43V7.75H40V22.3H37.5V7.75H35V22.3H32.5V7.75H30V22.3H27.5V7.75H25V22.3H22.5V7.75H20V22.3H17.5V7.75H15V22.3H12.5V7.75H10V22.3H9V25L24 36.2V39H15V41H33V39H26Z" fill="currentColor" />
        <path d="M25 25.05H32.5V22.3H25V25.05Z" fill="currentColor" />
        <path d="M22.5 25.05H30V22.3H22.5V25.05Z" fill="currentColor" />
        <path d="M20 25.05H27.5V22.3H20V25.05Z" fill="currentColor" />
        <path d="M17.5 25.05H25V22.3H17.5V25.05Z" fill="currentColor" />
        <path d="M15 25.05H22.5V22.3H15V25.05Z" fill="currentColor" />
        <path d="M12.5 25.05H20V22.3H12.5V25.05Z" fill="currentColor" />
        <path d="M10 25.05H17.5V22.3H10V25.05Z" fill="currentColor" />
      </SvgIcon>
    )
  },
  { text: "Licores", icon: LiquorIcon },
  {
    text: "Snacks",
    icon: (props) => (
      <SvgIcon {...props} viewBox="0 0 48 48">
        <rect width="48" height="48" fill="lightgray" />
      </SvgIcon>
    )
  },
  {
    text: "Golosinas",
    icon: (props) => (
      <SvgIcon {...props} viewBox="0 0 48 48">
        <path d="M24.0135 44C21.2555 44 18.6638 43.475 16.2385 42.425C13.8128 41.375 11.6917 39.9417 9.875 38.125C8.05833 36.3083 6.625 34.1833 5.575 31.75C4.525 29.3167 4 26.7333 4 24C4 21.2333 4.525 18.6417 5.575 16.225C6.625 13.8083 8.05 11.6833 9.85 9.85001C11.65 8.01668 13.75 6.57501 16.15 5.52501C18.55 4.47501 21.0927 3.95001 23.778 3.95001C24.426 3.95001 25.0667 3.97501 25.7 4.02501C26.3333 4.07501 26.9667 4.16668 27.6 4.30001C27.4 5.63335 27.5083 6.94168 27.925 8.22501C28.3417 9.50835 28.9917 10.6417 29.875 11.625C30.7583 12.6083 31.8667 13.3583 33.2 13.875C34.5333 14.3917 36.0167 14.55 37.65 14.35C37.4167 16.45 37.7833 18.2667 38.75 19.8C39.7167 21.3333 41.45 22.2167 43.95 22.45C43.9833 22.75 44 23.05 44 23.35V24.2C44 26.9127 43.475 29.4683 42.425 31.867C41.375 34.2653 39.95 36.366 38.15 38.169C36.35 39.972 34.2333 41.3947 31.8 42.437C29.3667 43.479 26.7712 44 24.0135 44ZM21.006 20.1C21.8687 20.1 22.6 19.798 23.2 19.194C23.8 18.59 24.1 17.8567 24.1 16.994C24.1 16.1313 23.798 15.4 23.194 14.8C22.59 14.2 21.8567 13.9 20.994 13.9C20.1313 13.9 19.4 14.202 18.8 14.806C18.2 15.41 17.9 16.1433 17.9 17.006C17.9 17.8687 18.202 18.6 18.806 19.2C19.41 19.8 20.1433 20.1 21.006 20.1ZM17.006 30.1C17.8687 30.1 18.6 29.798 19.2 29.194C19.8 28.59 20.1 27.8567 20.1 26.994C20.1 26.1313 19.798 25.4 19.194 24.8C18.59 24.2 17.8567 23.9 16.994 23.9C16.1313 23.9 15.4 24.202 14.8 24.806C14.2 25.41 13.9 26.1433 13.9 27.006C13.9 27.8687 14.202 28.6 14.806 29.2C15.41 29.8 16.1433 30.1 17.006 30.1ZM30 32C30.5667 32 31.0417 31.8083 31.425 31.425C31.8083 31.0417 32 30.5667 32 30C32 29.4333 31.8083 28.9583 31.425 28.575C31.0417 28.1917 30.5667 28 30 28C29.4333 28 28.9583 28.1917 28.575 28.575C28.1917 28.9583 28 29.4333 28 30C28 30.5667 28.1917 31.0417 28.575 31.425C28.9583 31.8083 29.4333 32 30 32ZM24 41C28.7333 41 32.6667 39.4417 35.8 36.325C38.9333 33.2083 40.6833 29.3667 41.05 24.8C39.25 24.1333 37.7917 23.1417 36.675 21.825C35.5583 20.5083 34.8667 19 34.6 17.3C31.9 16.9333 29.625 15.7667 27.775 13.8C25.925 11.8333 24.8667 9.55001 24.6 6.95001C22.1333 6.85001 19.825 7.25001 17.675 8.15001C15.525 9.05001 13.6583 10.2833 12.075 11.85C10.4917 13.4167 9.25 15.2583 8.35 17.375C7.45 19.4917 7 21.7 7 24C7 28.7333 8.65 32.75 11.95 36.05C15.25 39.35 19.2667 41 24 41Z" fill="currentColor" />
      </SvgIcon>
    )
  },
  { text: "Helados", icon: IceCreamIcon },
];

const BANNERS_DATA = [
  { id: 1, image: "https://png.pngtree.com/png-clipart/20240121/original/pngtree-summer-promotional-drinks-yellow-fresh-mobile-horizontal-version-banner-png-image_14143650.png" },
  { id: 2, image: "https://catalogosmetro.metro.pe/catalogo-loncheras-y-snacks-febrero-2024/15/15_slide_1.jpg" },
  { id: 3, image: "https://image.isu.pub/200311172610-68bc37f9df57c0834870292a3f880670/jpg/page_1_social_preview.jpg" }
];

const PRODUCTS_DATA = Array.from({ length: 10 });

export default function Home() {
  const [anchorCat, setAnchorCat] = useState(null);
  const [anchorAvatar, setAnchorAvatar] = useState(null);

  const categoriesOpen = Boolean(anchorCat);
  const avatarOpen = Boolean(anchorAvatar);

  const handleCategoriesOpen = (event) => setAnchorCat(event.currentTarget);
  const handleCategoriesClose = () => setAnchorCat(null);

  const handleAvatarOpen = (event) => setAnchorAvatar(event.currentTarget);
  const handleAvatarClose = () => setAnchorAvatar(null);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" target="_blank" href="https://www.facebook.com/JCEV.TITO" sx={{ "&:hover": { bgcolor: "transparent" } }}>
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit">
              <SvgIcon viewBox="0 0 16 16">
                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
              </SvgIcon>
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, maxWidth: '500px' }}>
            <SearchBar />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" onClick={handleCategoriesOpen} endIcon={<KeyboardArrowDownIcon />}>
              Categorías
            </Button>
            <Menu
              id="categories-menu"
              anchorEl={anchorCat}
              open={categoriesOpen}
              onClose={handleCategoriesClose}
            >
              {CATEGORIES_OPTIONS.map((category) => {
                const IconComponent = category.icon;
                return (
                  <MenuItem key={category.text} onClick={handleCategoriesClose}>
                    <ListItemIcon>
                      <IconComponent fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{category.text}</ListItemText>
                  </MenuItem>
                );
              })}
            </Menu>

            <IconButton color="inherit" onClick={handleAvatarOpen}>
              <Badge badgeContent={8} color="error" sx={{ '& .MuiBadge-badge': { boxShadow: (theme) => theme.shadows[2] } }}>
                <Avatar src="https://img.magnific.com/free-psd/3d-rendering-avatar_23-2150833544.jpg?semt=ais_hybrid&w=740&q=80" alt="User Profile" />
              </Badge>
            </IconButton>
            <Menu
              id="options-menu"
              anchorEl={anchorAvatar}
              open={avatarOpen}
              onClose={handleAvatarClose}
            >
              {AVATAR_OPTIONS.map((option) => {
                const IconComponent = option.icon;
                return (
                  <MenuItem key={option.text} onClick={handleAvatarClose}>
                    <ListItemIcon>
                      <IconComponent fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{option.text}</ListItemText>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

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
            loop={true}
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