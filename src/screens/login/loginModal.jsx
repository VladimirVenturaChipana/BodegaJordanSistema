import * as React from 'react';
import { Dialog, DialogContent, Typography, IconButton, Grid, Slide } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../assets/LogoBodegaJordan.png';
import LoginForm from '../../components/forms/loginForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal({ open, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} slots={{ transition: Transition }} keepMounted>
        <DialogContent
          sx={{
            width: { xs: '100%', sm: '380px', md: '400px', lg: '420px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Botón X para cerrar el modal */}
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 16, top: 16, color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
          <Grid container spacing={1} sx={{ width: '100%', px: { xs: 2, sm: 0 } }}>
            {/* Logo y Título */}
            <Grid size={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={Logo} alt="Logo Bodega Jordan" style={{ width: '160px', height: '160px' }} />
              <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 500, my: 1 }}>
                INICIAR SESIÓN
              </Typography>
            </Grid>
            {/* Formulario Modularizado */}
            <LoginForm handleClose={handleClose} />
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}