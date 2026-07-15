import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from "../../layouts/mainLayout";
import { Box, Grid, Typography, Checkbox, Button, Paper, Divider, Modal, TextField, Alert } from "@mui/material";
import { useCartStore, useAuthStore } from "../../hooks/servicesStore";
import NumberField from '../../components/numberField';
import { generarMensajeWsp } from '../../hooks/API/servicesCheckout';

const API_URL = import.meta.env.VITE_API_URL;
const WSP_NUMBER = import.meta.env.VITE_WSP_NUMBER || '51922113500';  // Número de WhatsApp de la bodega

export default function CheckOut() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getCheckedItems = useCartStore((state) => state.getCheckedItems);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalDescuentos = useCartStore((state) => state.getTotalDescuentos());
  const cliente = useAuthStore((state) => state.user);
  const toggleItem = useCartStore((state) => state.toggleItem);

  const [modalOpen, setModalOpen] = useState(false);
  const [sinCuenta, setSinCuenta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Formulario para cliente sin cuenta
  const [formData, setFormData] = useState({
    nombre: '', celular: '', direccion: ''
  });

  const totalAPagar = subtotal - totalDescuentos;
  const itemsSeleccionados = cart.filter(item => item.checked);

  // Enviar pedido
  const enviarPedido = async (clienteData) => {
    setLoading(true);
    setError('');

    try {
      const items = itemsSeleccionados;

      if (items.length === 0) {
        setError('Selecciona al menos un producto');
        setLoading(false);
        return;
      }

      // 1. Registrar cliente si no tiene cuenta
      let clienteFinal = clienteData;
      if (!clienteData.idcliente) {
        const resCliente = await fetch(`${API_URL}/api/clientes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clienteData)
        });
        clienteFinal = await resCliente.json();
      }

      // 2. Registrar factura en BD
      await fetch(`${API_URL}/api/facturas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idcliente: clienteFinal.idcliente,
          idpago: 1,
          productos: items.map(item => ({
            idproducto: item.id,
            cantidad: item.quantity
          }))
        })
      });

      // 3. Generar mensaje y abrir WhatsApp
      const mensaje = generarMensajeWsp(clienteFinal, items, totalAPagar);
      const wspUrl = `https://wa.me/${WSP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
      window.open(wspUrl, '_blank');

      // 4. Limpiar carrito y redirigir
      clearCart();
      navigate('/confirmation');

    } catch (err) {
      setError('Error al procesar el pedido. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinuar = () => {
    if (itemsSeleccionados.length === 0) {
      setError('Selecciona al menos un producto para continuar');
      return;
    }
    if (cliente) {
      // Ya está logueado → enviar directo
      enviarPedido(cliente);
    } else {
      // No está logueado → mostrar modal
      setModalOpen(true);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 'xl', mx: 'auto' }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={4}>
          {/* COLUMNA IZQUIERDA */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>Mi carrito</Typography>
            <Box sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
              {cart.length === 0 ? (
                <Typography sx={{ p: 3 }}>Tu carrito está vacío.</Typography>
              ) : (
                cart.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
                      <Checkbox checked={item.checked} onChange={() => toggleItem(item.id)} color="error" />
                      <Box component="img" src={item.image || "placeholder.jpg"}
                        sx={{ width: 100, height: 100, objectFit: 'contain', bgcolor: '#f5f5f5' }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.marca}</Typography>
                        <Typography variant="body2" color="text.secondary">Unidad</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>
                          S/. {item.finalPrice}
                        </Typography>
                        <NumberField value={item.quantity} onChange={(newValue) => updateQuantity(item.id, newValue)} />
                      </Box>
                    </Box>
                    {index < cart.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </Box>
          </Grid>

          {/* COLUMNA DERECHA */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'medium' }}>Resumen</Typography>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Productos ({itemsSeleccionados.length})</Typography>
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
                disabled={loading}
                onClick={handleContinuar}
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                {loading ? 'PROCESANDO...' : 'CONTINUAR'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* MODAL: LOGIN O SIN CUENTA */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper', borderRadius: 2,
          p: 4, width: { xs: '90%', sm: 400 }
        }}>
          {!sinCuenta ? (
            // Opciones iniciales
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" fontWeight="bold">¿Cómo quieres continuar?</Typography>
              <Button variant="contained" fullWidth onClick={() => navigate('/login')}>
                INICIAR SESIÓN
              </Button>
              <Button variant="outlined" fullWidth onClick={() => setSinCuenta(true)}>
                CONTINUAR SIN CUENTA
              </Button>
            </Box>
          ) : (
            // Formulario sin cuenta
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" fontWeight="bold">Tus datos de entrega</Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                label="Nombre completo"
                fullWidth
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
              />
              <TextField
                label="Celular"
                fullWidth
                inputProps={{ maxLength: 9 }}
                value={formData.celular}
                onChange={e => setFormData({ ...formData, celular: e.target.value })}
              />
              <TextField
                label="Dirección de entrega"
                fullWidth
                value={formData.direccion}
                onChange={e => setFormData({ ...formData, direccion: e.target.value })}
              />
              <Button
                variant="contained"
                fullWidth
                disabled={loading}
                onClick={() => {
                  if (!formData.nombre || !formData.celular || !formData.direccion) {
                    setError('Completa todos los campos');
                    return;
                  }
                  if (formData.celular.length !== 9) {
                    setError('El celular debe tener 9 dígitos');
                    return;
                  }
                  enviarPedido({ ...formData, apellido: '' });
                }}
              >
                {loading ? 'ENVIANDO...' : 'ENVIAR PEDIDO POR WHATSAPP'}
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </MainLayout>
  );
}