import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { getProductById, getProductsByCategory, getProductsByBrand } from "../../hooks/API/servicesProducts";

import ProductImage from "./productImage";
import ProductInfo from "./productInfo";
import SliderProducts from "../../components/sliders/products/productsSlider";
import MainLayout from "../../layouts/mainLayout";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);

  useEffect(() => {
    setSimilarProducts([]);
    setBrandProducts([]);

    getProductById(id)
      .then(data => {
        setProduct(data);
        if (data) {
          if (data.idcategoria) {
            getProductsByCategory(data.idcategoria)
              .then(res => {
                setSimilarProducts(res.filter(p => Number(p.id) !== Number(data.id)));
              })
              .catch(err => console.error("Error al cargar productos similares:", err));
          }
          if (data.idmarca) {
            getProductsByBrand(data.idmarca)
              .then(res => {
                setBrandProducts(res.filter(p => Number(p.id) !== Number(data.id)));
              })
              .catch(err => console.error("Error al cargar productos de la marca:", err));
          }
        }
      })
      .catch(err => console.error("Error al cargar el producto:", err))
  }, [id]);

  if (!product) {
    return <Box sx={{ p: 4 }}>Cargando producto...</Box>;
  }

  return (
    <MainLayout>

      <Box sx={{
        display: 'flex', justifyContent: 'center', px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 },
      }}>
        <Grid container spacing={4} sx={{ maxWidth: 900, width: '100%', alignItems: 'center' }}>
          <ProductImage src={product.image} title={product.title} />
          <ProductInfo product={product} />
        </Grid>
      </Box>
      <Box sx={{ maxWidth: 'xl', mx: 'auto', mt: 1 }}>
        <SliderProducts highlightTitle="Productos" title="similares" products={similarProducts} />
        <SliderProducts highlightTitle={product.marca || product.brand} title="te ofrece" products={brandProducts} />
      </Box>
      <Box sx={{ height: '60px', display: { xs: 'block', sm: 'none' } }} />
    </MainLayout>
  );
}
