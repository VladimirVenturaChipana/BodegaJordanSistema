import { useState } from 'react'
import { Box, Typography, Button, Rating, Grid } from "@mui/material";
import NumberField from "../../components/numberField";

export default function ProductInfo({ product }) {

  const [review, setReview] = useState(2);
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.discount != null && Number(product.discount) > 0;
  const finalPrice = hasDiscount
    ? (Number(product.oldPrice) * (1 - Number(product.discount) / 100)).toFixed(2)
    : Number(product.price).toFixed(2);

  const hasCodbar = product.codbar != null;

  return (
    <Grid size={{ xs: 12, sm: 6 }} sx={{ px: { xs: 4, sm: 0 } }}>
      <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.3rem' }}>
        {product.title}
      </Typography>
      <Typography sx={{ fontWeight: 'regular', fontSize: '0.9rem', mb: 1 }}>
        {product.marca}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        {hasDiscount ? (
          <Box sx={{ bgcolor: 'warning.main', px: 1, py: 0.5, fontWeight: 'bold', display: 'inline-block' }}>
            -{product.discount}%
          </Box>
        ) : (
          <Box />
        )}
        <Typography variant="body2" color="text.secondary">
          {hasCodbar ? (`COD: ${product.codbar}`) : (
            <Typography color="text.secondary">
              Sin código de barras
            </Typography>
          )}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        {hasDiscount ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="secondary" sx={{ fontWeight: 'bold' }}>
                Precio en oferta
              </Typography>
              <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>
                S/. {finalPrice}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Precio regular</Typography>
              <Typography sx={{ textDecoration: 'line-through' }}>
                S/. {Number(product.oldPrice).toFixed(2)}
              </Typography>
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography color="secondary" sx={{ fontWeight: 'bold' }}>
              Precio
            </Typography>
            <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>
              S/. {Number(product.price).toFixed(2)}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, mb: 1 }}>
        <Rating
          value={review}
          onChange={(event, setNewReview) => setReview(setNewReview)}
          precision={0.5}
          size="large"
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          ({product.reviewsCount})
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: 'space-between' }}>
        <NumberField value={quantity} onChange={setQuantity} />
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
  )
}