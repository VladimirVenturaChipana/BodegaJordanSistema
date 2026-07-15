import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../hooks/servicesStore';
import { Button, Typography, Box, IconButton, InputAdornment, Divider, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomTextField from '../textField';

export default function LoginForm({ handleClose }) {
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  if (error) console.error('Error:', error.message);
};

  const handleLogin = async () => {
    // Validaciones
    if (!email || !password) {
      setError('Completa todos los campos');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);  // "Email o contraseña incorrectos"
        return;
      }

      // Guardar cliente en localStorage
      localStorage.setItem('cliente', JSON.stringify(data.cliente));
      login(data.cliente); 
      handleClose();  // cerrar modal
      navigate('/');  // redirigir al home

    } catch (error) {
      setError('Error de conexión, intenta de nuevo');
    }
  };

  const handleGoToRegister = () => {
      handleClose();      // cierra el modal de login, si aplica
      navigate('/RegisterCustomer'); // ajusta la ruta según tu app
  };


  return (
    <Grid size={12} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mx: { xs: 0, sm: '5%' }, mt: 2 }} >
      <CustomTextField
        label="Correo"
        placeholder="Ingrese su correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomTextField
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }}
      />
      <Typography variant="caption"
        onClick={handleGoToRegister}
        sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 500, textAlign: 'right', '&:hover': { textDecoration: 'underline' } }}>
        ¿Olvidaste tu contraseña?
      </Typography>
      {error && (
        <Typography variant="caption" sx={{ color: 'error.main', textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
        INGRESAR
      </Button>
      <Divider>
        <Typography variant="caption" sx={{ color: 'text.secondary', px: 1 }}>o</Typography>
      </Divider>
      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', justifyContent: 'center' }}>
        ¿Eres nuevo?{' '}
        <Box
          component="span"
          onClick={handleGoToRegister}
          sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
          Regístrate
        </Box>
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        onClick={handleGoogleLogin}
        startIcon={<img src="https://www.google.com/favicon.ico" width="20" />}
      >
        Continuar con Google
      </Button>
    </Grid>
  );
}