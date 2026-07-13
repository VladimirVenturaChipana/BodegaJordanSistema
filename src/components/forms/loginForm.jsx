import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, IconButton, InputAdornment, Divider, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomTextField from '../textField';

export default function LoginForm({ handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoToRegister = () => {
    handleClose();
    navigate('/registerCustomer');
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
      <Button fullWidth variant="contained" color="primary">
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
    </Grid>
  );
}