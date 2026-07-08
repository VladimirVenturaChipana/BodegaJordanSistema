import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { getProductById } from "../../hooks/API/servicesProducts";

import ProductImage from "./productImage";
import ProductInfo from "./productInfo";
import SliderProducts from "../../components/sliders/products/productsSlider";
import MainLayout from "../../layouts/mainLayout";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then(data => setProduct(data))
      .catch(err => console.error("Error al cargar el producto:", err))
  }, [id]);

  if (!product) {
    return <Box sx={{ p: 4 }}>Cargando producto...</Box>;
  }

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} sx={{ maxWidth: 900, width: '100%', alignItems: 'center' }}>
          <ProductImage src={product.image} title={product.title} />
          <ProductInfo product={product} />
        </Grid>
      </Box>
      <Box sx={{ maxWidth: 'xl', mx: 'auto', mt: 1 }}>
        <SliderProducts highlightTitle="Productos" title="similares" />
        <SliderProducts highlightTitle={product.brand} title="te ofrece" />
      </Box>
    </MainLayout>
  );
}