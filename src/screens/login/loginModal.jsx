import { useState } from 'react';
import {
  Dialog, DialogContent, Button, Typography,
  Box, IconButton, InputAdornment, Divider
} from '@mui/material';
import { VisibilityIcon, VisibilityOffIcon } from '../../shared/icons.jsx';
import CustomTextField from '../../components/textField.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginModal({ open, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoToRegister = () => {
    handleClose();
    navigate('/registerCustomer');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: '0',
          minWidth: '1200px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header con fondo primary del theme */}
        <Box sx={(theme) => ({
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        })}>
          {/* Logo Circular */}
          <Box
            component="img"
            src="../../assets/LogoBodegaJordan.png"
            sx={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.3)',
              backgroundColor: 'white',
              objectFit: 'contain',
              mb: 1.5,
            }}
          />
          {/* Título */}
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            INICIAR SESIÓN
          </Typography>
        </Box>

        {/* Formulario */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          p: { xs: 3, sm: 4 },
          pt: { xs: 3, sm: 3.5 },
        }}>

          {/* Input Correo */}
          <Box sx={{ width: '100%', mb: 2.5 }}>
            <CustomTextField
              label="Correo"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          {/* Input Contraseña */}
          <Box sx={{ width: '100%', mb: 1 }}>
            <CustomTextField
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Olvidaste contraseña */}
          <Box sx={{ width: '100%', textAlign: 'right', mb: 3 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              ¿Olvidaste tu contraseña?
            </Typography>
          </Box>

          {/* Botón Ingresar */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '25px',
              padding: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'none',
              boxShadow: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-1px)',
              },
              mb: 2.5
            }}
          >
            INGRESAR
          </Button>

          {/* Separador */}
          <Divider sx={{ width: '100%', mb: 2.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', px: 1 }}>o</Typography>
          </Divider>

          {/* Footer de Registro */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ¿Eres nuevo?{' '}
            <Box
              component="span"
              onClick={handleGoToRegister}
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Regístrate
            </Box>
          </Typography>

        </Box>
      </DialogContent>
    </Dialog>
  );
}