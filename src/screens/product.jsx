import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, IconButton, Button } from "@mui/material";
import { AddIcon, RemoveIcon, FavoriteBorderIcon, FavoriteIcon } from "../shared/icons";
import SliderProducts from "../components/sliders/products/productsSlider";
import MainLayout from "../layouts/mainLayout";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // AQUÍ es donde se debe hacer la llamada a la API o DB
    // Ejemplo:
    // fetch(`/api/products/${id}`)
    //   .then(res => res.json())
    //   .then(data => setProduct(data));

    console.log("Cargando producto con ID:", id);

    // Simulación de carga (borrar esto cuando conecten la API)
    setProduct({
      id: id,
      title: "SANTIAGO QUEIROLO BORGOÑA 750ML",
      brand: "Santiago Queirolo",
      image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
      discount: "-20%",
      code: "7758218195973",
      price: "14.40",
      oldPrice: "18.00"
    });
  }, [id]);

  if (!product) return <Box sx={{ p: 4 }}>Cargando producto...</Box>;

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 2, padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
            <img src={product.image} height="375px" style={{ width: '100%', objectFit: 'contain' }} alt={product.title} />
            <IconButton sx={{ position: 'absolute', top: 10, right: 10 }}>
              <FavoriteBorderIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.3rem' }}>
              {product.title}
            </Typography>
            <Typography sx={{ fontWeight: 'regular', fontSize: '0.9rem', mb: 1 }}>
              {product.brand}
            </Typography>
            <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Grid item>
                <Box sx={{ bgcolor: 'warning.main', px: 1, py: 0.5, fontWeight: 'bold' }}>
                  {product.discount}
                </Box>
              </Grid>
              <Grid item>
                <Typography variant="body2">Código: {product.code}</Typography>
              </Grid>
            </Grid>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography color="secondary" sx={{ fontWeight: 'bold' }}>Precio en oferta</Typography>
                <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>S/. {product.price}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Precio regular</Typography>
                <Typography sx={{ textDecoration: 'line-through' }}>S/. {product.oldPrice}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
              <IconButton size="small" sx={{ border: '1px solid gray' }}><RemoveIcon /></IconButton>
              <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
              <IconButton size="small" sx={{ border: '1px solid gray', bgcolor: 'warning.main' }}><AddIcon /></IconButton>

              <Button variant="contained" color="primary" sx={{ ml: 2, flexGrow: 1 }}>
                AGREGAR
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ maxWidth: 'xl', mx: 'auto', mt: 4, px: 2 }}>
        {/* Usamos mx: 'auto' y un ancho máximo similar al del producto para que se alineen */}

        <Box sx={{ mb: 4 }}>
          <SliderProducts highlightTitle="Productos" title="similares" />
        </Box>

        <Box sx={{ mb: 4 }}>
          <SliderProducts highlightTitle="[MARCA]" title="te ofrece" />
        </Box>
      </Box>
    </MainLayout>
  );
}