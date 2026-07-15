// (React, MUI)
import { useState, useEffect } from 'react';
import { Box } from "@mui/material";

// Componentes 
import MainLayout from '../../../layouts/mainLayout';
import PromotionSlider from '../../../components/sliders/promotion/promotionSlider';
import SliderProducts from '../../../components/sliders/products/productsSlider';
import CategoryGrid from '../../../components/grids/categoryGrid';

// Logica y constantes
import { HOME_SECTIONS } from './homeConstants';
import { getProductsByCategory } from '../../../hooks/API/servicesProducts';

export default function Home() {
  const [categoriesData, setCategoriesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const requests = HOME_SECTIONS.map(section => getProductsByCategory(section.id));
        const results = await Promise.all(requests);
        const dataMap = {};
        HOME_SECTIONS.forEach((section, index) => {
          dataMap[section.id] = results[index];
        });
        setCategoriesData(dataMap);
      } catch (err) {
        console.error("Error general cargando las categorías del Home:", err);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    loadData();
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
          isLoading={isLoading}
        />
      ))}
    </MainLayout>
  );
}