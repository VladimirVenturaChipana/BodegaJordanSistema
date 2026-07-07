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
  const [golosinas, setGolosinas] = useState([]);
  const [helados, setHelados] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/productos/categoria/2`)
      .then(res => res.json())
      .then(data => setBebidas(data));
    fetch(`${API_URL}/api/productos/categoria/1`)
      .then(res => res.json())
      .then(data => setLicores(data));
    fetch(`${API_URL}/api/productos/categoria/6`)
      .then(res => res.json())
      .then(data => setSnacks(data));
    fetch(`${API_URL}/api/productos/categoria/34`)
      .then(res => res.json())
      .then(data => setGolosinas(data));
    fetch(`${API_URL}/api/productos/categoria/52`)
      .then(res => res.json())
      .then(data => setHelados(data));
  }, []);

  return (
    <MainLayout>
      <PromotionSlider />
      <CategoryGrid />
      <SliderProducts highlightTitle='BEBIDAS' title='DEL MOMENTO' products={bebidas} />
      <SliderProducts highlightTitle='LICORES' title='PARA TU FIN DE SEMANA' products={licores} />
      <SliderProducts highlightTitle='SNACKS' title='PARA ACOMPAÑAR' products={snacks} />
      <SliderProducts highlightTitle='GOLOSINAS' title='PARA ENDULZAR TU DIA' products={golosinas} />
      <SliderProducts highlightTitle='HELADOS' title='EN ESTOS DIAS CALUROSOS' products={helados} />
      <Box sx={{ height: '60px', display: { xs: 'block', sm: 'none' } }} />
    </MainLayout>
  );
}