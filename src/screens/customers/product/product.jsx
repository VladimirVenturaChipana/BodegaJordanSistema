import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { getProductById, getProductsByCategory, getProductsByBrand } from "../../../hooks/API/servicesProducts";

import ProductImage from "./productImage";
import ProductInfo from "./productInfo";
import SliderProducts from "../../../components/sliders/products/productsSlider";
import MainLayout from "../../../layouts/mainLayout";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);

  const [loadingSliders, setLoadingSliders] = useState(true);

  useEffect(() => {
    setSimilarProducts([]);
    setBrandProducts([]);
    setLoadingSliders(true);

    const fetchProductData = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        if (data) {
          const reqCategory = data.idcategoria ? getProductsByCategory(data.idcategoria) : Promise.resolve([]);
          const reqBrand = data.idmarca ? getProductsByBrand(data.idmarca) : Promise.resolve([]);

          const [similares, marcas] = await Promise.all([reqCategory, reqBrand]);

          setSimilarProducts(similares.filter(p => Number(p.id) !== Number(data.id)));
          setBrandProducts(marcas.filter(p => Number(p.id) !== Number(data.id)));
        }
      } catch (err) {
        console.error("Error al cargar la información:", err);
      } finally {
        setLoadingSliders(false);
      }
    };

    fetchProductData();
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
        {/* Le pasamos el estado isLoading a tus sliders */}
        <SliderProducts
          highlightTitle="Productos"
          title="similares"
          products={similarProducts}
          isLoading={loadingSliders}
        />
        <SliderProducts
          highlightTitle={product.marca || product.brand || 'Esta marca'}
          title="te ofrece"
          products={brandProducts}
          isLoading={loadingSliders}
        />
      </Box>
    </MainLayout>
  );
}
