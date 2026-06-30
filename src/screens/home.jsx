import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PromotionSlider from '../components/sliders/promotion/promotionSlider';
import SliderProducts from '../components/sliders/products/productsSlider';
import CategoryGrid from '../components/grids/categoryGrid';

export default function Home() {

  return (
    <MainLayout>
      <PromotionSlider />
      <CategoryGrid />
      <SliderProducts highlightTitle='BEBIDAS' title='DEL MOMENTO' />
      <SliderProducts highlightTitle='LICORES' title='PARA TU FIN DE SEMANA' />
      <SliderProducts highlightTitle='SNACKS' title='PARA ACOMPAÑAR' />
    </MainLayout>
  );
}

