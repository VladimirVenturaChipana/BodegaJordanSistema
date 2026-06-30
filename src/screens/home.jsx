import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PromotionSlider from '../components/sliders/promotionSlider';
import CategoryGrid from '../components/grids/categoryGrid';

const PRODUCTS_DATA = Array.from({ length: 10 });


export default function Home() {

  return (
    <MainLayout>
      <PromotionSlider />
      <CategoryGrid />
    </MainLayout>
  );
}

