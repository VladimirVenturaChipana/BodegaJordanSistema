import { useState } from 'react'
import { Box, Typography, Button, Rating, Grid, Snackbar, Alert } from "@mui/material";
import NumberField from "../../../components/numberField";
import { useCartStore, useAuthStore } from "../../../hooks/servicesStore";

import LoginModal from '../login/loginModal';

export default function ProductInfo({ product }) {

  const addToCart = useCartStore((state) => state.addToCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [review, setReview] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const hasDiscount = product.discount != null && Number(product.discount) > 0;
  const finalPrice = hasDiscount
    ? (Number(product.oldPrice) * (1 - Number(product.discount) / 100)).toFixed(2)
    : Number(product.price).toFixed(2);

  const hasCodbar = product.codbar != null;

  const handleAddToCart = () => {
    // LA INTERCEPCIÓN: Si no está logueado, le abrimos el modal y detenemos todo
    if (!isAuthenticated) {
      setOpenLogin(true);
      return;
    }

    // Si está logueado, el código sigue corriendo felizmente como antes:
    addToCart({ ...product, finalPrice }, quantity);
    // 3. Activamos el Snackbar al hacer clic
    setSnackbarOpen(true);
  };

  // 4. Función para cerrar el Snackbar después de unos segundos
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return; // Evita que se cierre si el usuario hace clic en otro lado de la pantalla por error
    }
    setSnackbarOpen(false);
  };

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
          onClick={handleAddToCart}
          sx={{
            flexGrow: 1,
            maxWidth: 220,
            height: 40
          }}
        >
          AGREGAR
        </Button>
      </Box>

      {/* 5. Agregamos el componente Snackbar al final */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Se cerrará solito en 3 segundos (3000 ms)
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Aparecerá centrado abajo
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled" // Le da un color sólido muy bonito
          sx={{ width: '100%' }}
        >
          ¡Agregaste {quantity} {quantity === 1 ? 'unidad' : 'unidades'} de {product.title} al carrito!
        </Alert>
      </Snackbar>

      {/* MODAL INYECTADO: Esperando ser llamado si el usuario da click sin loguearse */}
      <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />
    </Grid>
  )
}