import { Box, Typography, Button } from '@mui/material';
import { LocalMallIcon } from '../../../shared/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../layouts/mainLayout';

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Box sx={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '90vh', gap: 3, p: 4, textAlign: 'center'
      }}>
        <LocalMallIcon sx={{ fontSize: 80, color: 'success.main' }} />
        <Typography variant="h4" fontWeight="bold">
          ¡Pedido enviado!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
          Tu pedido fue enviado por WhatsApp. El trabajador de la bodega lo revisará
          y te confirmará en breve.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📱 Revisa tu WhatsApp para confirmar el pedido.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          SEGUIR COMPRANDO
        </Button>
      </Box>
    </MainLayout>
  );
}