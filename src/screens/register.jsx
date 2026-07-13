import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Link,
  Grid,
  InputAdornment,
  IconButton
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ShoppingCart,
  CreditCard,
  LocalShipping
} from '@mui/icons-material';

// Componentes
import MainLayout from '../layouts/mainLayout';
// Asegúrate de que la ruta a CustomTextField sea la correcta
import CustomTextField from '../components/textField';

export default function RegisterCustomer() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 'lg', p: { xs: 10, sm: 3, md: 5 } }}>
        <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">

          {/* COLUMNA IZQUIERDA: Formulario */}
          <Grid item size={{ xs: 12, md: 7 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
              Regístrate y compra ahora
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              <Link href="#" underline="always" sx={{ color: 'primary.main', fontWeight: '500' }}>
                ¿Ya tienes una cuenta creada?
              </Link>
              {' '}Usa tu correo y contraseña para reconocerte en próximas compras.
            </Typography>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

              {/* Campos usando CustomTextField */}
              <Box>
                <Typography variant="body2" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 500 }}>Correo</Typography>
                <CustomTextField
                  placeholder="ejemplo@correo.com"
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 500 }}>Nombres</Typography>
                  <CustomTextField placeholder="Ingrese sus nombres" />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 500 }}>Apellidos</Typography>
                  <CustomTextField placeholder="Ingrese sus apellidos" />
                </Grid>
              </Grid>

              <Box>
                <Typography variant="body2" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 500 }}>Dirección</Typography>
                <CustomTextField placeholder="Ingrese una dirección" />
              </Box>

              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 500 }}>Teléfono</Typography>
                  <CustomTextField
                    placeholder="000-000-000"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+ 51 |</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 500 }}>Contraseña</Typography>
                  <CustomTextField
                    placeholder="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  borderRadius: '30px',
                  py: 1.5,
                  px: 6,
                  mt: 2,
                  width: { xs: '100%', sm: 'auto' },
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textTransform: 'none',
                }}
              >
                REGISTRATE
              </Button>
            </Box>
          </Grid>

          {/* COLUMNA DERECHA: Pasos de compra - se oculta en pantallas pequeñas */}
          <Grid item size={{ xs: 12, md: 5 }} sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}>
            <StepIcon
              number="1"
              text="CARRITO"
              icon={<ShoppingCart sx={{ fontSize: 50, color: 'primary.main' }} />}
            />
            <StepIcon
              number="2"
              text="PAGA"
              icon={<CreditCard sx={{ fontSize: 50, color: 'primary.main' }} />}
            />
            <StepIcon
              number="3"
              text="RECIBE PEDIDO"
              icon={<LocalShipping sx={{ fontSize: 50, color: 'primary.main' }} />}
            />
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}

// Componente auxiliar para renderizar los círculos de la derecha
function StepIcon({ number, text, icon }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{
        width: 110,
        height: 110,
        borderRadius: '50%',
        border: (theme) => `4px solid ${theme.palette.primary.main}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.08)',
          boxShadow: '0 4px 20px rgba(153, 0, 31, 0.25)',
        }
      }}>
        {icon}
        <Box sx={{
          position: 'absolute',
          bottom: -4,
          right: -4,
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          border: '3px solid white',
          fontSize: '1.1rem'
        }}>
          {number}
        </Box>
      </Box>
      <Typography sx={{ mt: 1.5, fontWeight: 'bold', color: 'primary.dark', letterSpacing: 0.5, fontSize: '1.1rem' }}>
        {number}. {text}
      </Typography>
    </Box>
  );
}