import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, IconButton, Button, Rating } from "@mui/material";
import { AddIcon, RemoveIcon, FavoriteBorderIcon } from "../shared/icons";
import SliderProducts from "../components/sliders/products/productsSlider";
import MainLayout from "../layouts/mainLayout";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState(2);

  useEffect(() => {
    // TODO: Consumir API aquí -> fetch(`/api/products/${id}`).then(...)
    setProduct({
      id: id,
      title: "SANTIAGO QUEIROLO BORGOÑA 750ML",
      brand: "Santiago Queirolo",
      image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
      discount: "-20%",
      code: "7758218195973",
      price: "14.40",
      oldPrice: "18.00",
      rating: 4.5,
      reviewsCount: 12
    });
  }, [id]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (!product) return <Box sx={{ p: 4 }}>Cargando producto...</Box>;

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} sx={{ maxWidth: 900, width: '100%', alignItems: 'center' }}>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ position: 'relative' }}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: '100%',
                height: { xs: 300, sm: 320, md: 375 },
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <IconButton sx={{ position: 'absolute', top: 10, right: 10 }}>
              <FavoriteBorderIcon />
            </IconButton>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ px: { xs: 4, sm: 0 } }}>
            <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.3rem' }}>
              {product.title}
            </Typography>

            <Typography sx={{ fontWeight: 'regular', fontSize: '0.9rem', mb: 1 }}>
              {product.brand}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ bgcolor: 'warning.main', px: 1, py: 0.5, fontWeight: 'bold', display: 'inline-block' }}>
                {product.discount}
              </Box>
              <Typography variant="body2" color="text.secondary">{product.code}</Typography>
            </Box>

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

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, mb: 1 }}>
              <Rating
                value={review}
                onChange={(event, setNewReview) => setReview(setNewReview)}
                precision={0.5}
                size="large"
              />
              <Typography variant="body" color="text.secondary" sx={{ mt: 0.5 }}>
                ({product.reviewsCount} reseñas)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: 'space-between' }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper'
              }}>
                <IconButton onClick={handleDecrement} disabled={quantity <= 1} size="small" sx={{ p: 1 }}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 'medium', userSelect: 'none' }}>
                  {quantity}
                </Typography>
                <IconButton onClick={handleIncrement} size="small" sx={{ p: 1 }}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={() => console.log(`Añadiendo ${quantity} unidades de ${product.title} al carrito.`)}
                sx={{
                  flexGrow: 1,
                  maxWidth: 220,
                  height: 40
                }}
              >
                AGREGAR
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ maxWidth: 'xl', mx: 'auto', mt: 1 }}>
        <Box >
          <SliderProducts highlightTitle="Productos" title="similares" />
        </Box>
        <Box sx={{ mb: 6 }}>
          <SliderProducts highlightTitle={product.brand} title="te ofrece" />
        </Box>
      </Box>
    </MainLayout>
  );
}