import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { VisibilityIcon, VisibilityOffIcon } from '../../shared/icons';
import CustomTextField from '../../components/textField';

export default function RegisterForm({ showPassword, handleClickShowPassword }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!nombre || !celular || !email || !password) {
      setError('Completa todos los campos obligatorios');
      return;
    }
    if (celular.length !== 9) {
      setError('El celular debe tener 9 dígitos');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clientes/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, celular, email, password, direccion })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      navigate('/'); // ojo: revisa que esta ruta exista en tu App.jsx (la tenías como /registerCustomer, así que verifica cómo se llama tu ruta de login)

    } catch (error) {
      setError('Error de conexión, intenta de nuevo');
    }
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <Grid size={12}>
        <CustomTextField
          label="Correo"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            label="Nombres"
            placeholder="Ingrese sus nombres"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            label="Apellidos"
            placeholder="Ingrese sus apellidos"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box>
        <CustomTextField
          label="Dirección"
          placeholder="Ingrese una dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </Box>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            label="Teléfono"
            placeholder="000-000-000"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ color: 'text.primary' }}>+ 51</Box>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            label="Contraseña"
            placeholder="Contraseña"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              },
            }}
          />
        </Grid>
      </Grid>

      {error && (
        <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleRegister}
        sx={{ py: 1.5, px: 4, width: { xs: '100%', sm: 'auto' }, alignSelf: 'center', fontSize: '1rem', mt: 2 }}
      >
        REGISTRATE
      </Button>
    </Box>
  );
}