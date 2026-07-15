import { useState } from 'react';
import { Box, Typography, Link, Grid } from "@mui/material";
import { PASOS_ICONOS } from './registerConstants';
import LoginModal from '../login/loginModal';
import MainLayout from '../../../layouts/mainLayout';
import StepIcon from './registerSteps';
import RegisterForm from '../../../components/forms/registerForm';

export default function RegisterCustomer() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MainLayout>
      <LoginModal open={open} handleClose={handleClose} />
      <Box sx={{ maxWidth: 'lg', mx: 'auto', minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', p: { xs: 3, sm: 5, md: 6 } }}>
        <Grid container spacing={{ xs: 2, md: 6 }} alignItems="center">
          <Grid item size={{ xs: 12, md: 8 }}>
            <Box sx={{ mb: { xs: 1, md: 2 } }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                Regístrate y compra ahora
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                <Link onClick={handleClickOpen} underline="always" sx={{ color: 'primary.main', fontWeight: '500', cursor: 'pointer' }}>
                  ¿Ya tienes una cuenta creada?
                </Link>
                {' '}Usa tu correo y contraseña para reconocerte en próximas compras.
              </Typography>
            </Box>

            {/* Llamada al componente modular */}
            <RegisterForm
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
            />

          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'row', md: 'column' }, gap: 3, alignItems: 'center', justifyContent: 'space-evenly' }}>
              {PASOS_ICONOS.map((paso) => (
                <StepIcon key={paso.number} number={paso.number} text={paso.text} icon={paso.icon} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: '60px', display: { xs: 'block', sm: 'none' } }} />
    </MainLayout>
  );
}