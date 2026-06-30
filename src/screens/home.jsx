import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PromotionSlider from '../components/sliders/promotionSlider';

import {
  Avatar, AppBar, Badge, Box, Menu, MenuItem, Button, IconButton,
  Toolbar, SvgIcon, Container, ListItemIcon, ListItemText,
  Typography,
} from "@mui/material";

const BANNERS_DATA = [
  { id: 1, image: "https://png.pngtree.com/png-clipart/20240121/original/pngtree-summer-promotional-drinks-yellow-fresh-mobile-horizontal-version-banner-png-image_14143650.png" },
  { id: 2, image: "https://catalogosmetro.metro.pe/catalogo-loncheras-y-snacks-febrero-2024/15/15_slide_1.jpg" },
  { id: 3, image: "https://image.isu.pub/200311172610-68bc37f9df57c0834870292a3f880670/jpg/page_1_social_preview.jpg" }
];

const PRODUCTS_DATA = Array.from({ length: 10 });


export default function Home() {

  return (
    <MainLayout>
      <PromotionSlider />
    </MainLayout>
  );
}

