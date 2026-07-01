import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import MainLayout from '../layouts/mainLayout';
import PromotionSlider from '../components/sliders/promotion/promotionSlider';
import SliderProducts from '../components/sliders/products/productsSlider';
import CategoryGrid from '../components/grids/categoryGrid';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [bebidas, setBebidas] = useState([]);
  const [licores, setLicores] = useState([]);
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    // Categoría 2 = BEBIDAS, 1 = LICORES (según tus datos)
    fetch(`${API_URL}/api/productos/categoria/2`)
      .then(res => res.json())
      .then(data => setBebidas(data));

    fetch(`${API_URL}/api/productos/categoria/1`)
      .then(res => res.json())
      .then(data => setLicores(data));
  }, []);

  return (
    <MainLayout>
      <PromotionSlider />
      <CategoryGrid />
      <SliderProducts highlightTitle='BEBIDAS' title='DEL MOMENTO' products={bebidas} />
      <SliderProducts highlightTitle='LICORES' title='PARA TU FIN DE SEMANA' products={licores} />
      <Box sx={{ height: '60px', display: { xs: 'block', sm: 'none' } }} />
    </MainLayout>
  );
}