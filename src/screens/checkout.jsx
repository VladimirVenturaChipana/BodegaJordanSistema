import React from 'react';
import MainLayout from "../layouts/mainLayout";
import { Box, Grid, Typography, Checkbox, Button, Paper, Divider } from "@mui/material";
import { useCartStore } from "../hooks/servicesStore";
import NumberField from '../components/numberField';

export default function CheckOut() {
  // Consumimos el estado y las funciones de la store de Zustand
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalDescuentos = useCartStore((state) => state.getTotalDescuentos());
  const toggleItem = useCartStore((state) => state.toggleItem);

  const totalAPagar = subtotal - totalDescuentos;

  return (
    <MainLayout>
      <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 'xl', mx: 'auto' }}>
        <Grid container spacing={4}>

          {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>Mi carrito</Typography>

            <Box sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              {cart.length === 0 ? (
                <Typography sx={{ p: 3 }}>Tu carrito está vacío.</Typography>
              ) : (
                cart.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
                      <Checkbox
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        color="error"
                      />
                      <Box
                        component="img"
                        src={item.image || "placeholder.jpg"}
                        sx={{ width: 100, height: 100, objectFit: 'contain', bgcolor: '#f5f5f5' }}
                      />

                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.marca}</Typography>
                        <Typography variant="body2" color="text.secondary">Unidad</Typography>
                      </Box>

                      <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>
                            S/. {item.finalPrice}
                          </Typography>
                          {item.discount && (
                            <Typography sx={{ bgcolor: 'warning.main', px: 0.5, fontSize: '0.75rem', fontWeight: 'bold' }}>
                              -{item.discount}%
                            </Typography>
                          )}
                        </Box>

                        {item.discount && (
                          <Typography sx={{ textDecoration: 'line-through', color: 'text.secondary', fontSize: '0.85rem' }}>
                            S/. {Number(item.oldPrice).toFixed(2)}
                          </Typography>
                        )}

                        {/* Componente NumberField integrado */}
                        <NumberField
                          value={item.quantity}
                          onChange={(newValue) => updateQuantity(item.id, newValue)}
                        />
                      </Box>
                    </Box>
                    {index < cart.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </Box>
          </Grid>

          {/* COLUMNA DERECHA: RESUMEN */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>Resumen</Typography>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Productos ({cart.length})</Typography>
                <Typography>S/. {subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography>Descuentos</Typography>
                <Typography>- S/. {totalDescuentos.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography sx={{ fontWeight: 'bold' }}>Total a pagar</Typography>
                <Typography sx={{ fontWeight: 'bold', color: 'error.main', fontSize: '1.2rem' }}>
                  S/. {totalAPagar.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                CONTINUAR
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}