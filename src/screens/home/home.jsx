import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { HOME_SECTIONS } from './homeConstants';
import MainLayout from '../../layouts/mainLayout';
import PromotionSlider from '../../components/sliders/promotion/promotionSlider';
import SliderProducts from '../../components/sliders/products/productsSlider';
import CategoryGrid from '../../components/grids/categoryGrid';
import { getProductsByCategory } from '../../hooks/API/servicesProducts';

export default function Home() {
  const [categoriesData, setCategoriesData] = useState({});

  useEffect(() => {
    const requests = HOME_SECTIONS.map(section => getProductsByCategory(section.id));
    Promise.all(requests)
      .then(results => {
        const dataMap = {};
        HOME_SECTIONS.forEach((section, index) => {
          dataMap[section.id] = results[index];
        });
        setCategoriesData(dataMap);
      })
      .catch(err => console.error("Error general cargando las categorías del Home:", err));
  }, []);

  return (
    <MainLayout>
      <PromotionSlider />
      <CategoryGrid />
      {HOME_SECTIONS.map(section => (
        <SliderProducts
          key={section.id}
          highlightTitle={section.highlight}
          title={section.title}
          products={categoriesData[section.id] || []}
        />
      ))}
      <Box sx={{ height: '60px', display: { xs: 'block', sm: 'none' } }} />
    </MainLayout>
  );
}