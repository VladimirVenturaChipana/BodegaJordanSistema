import { Box, Button, Grid, IconButton, InputAdornment } from "@mui/material";
import { VisibilityIcon, VisibilityOffIcon } from '../../shared/icons';
import CustomTextField from '../../components/textField';

export default function RegisterForm({ showPassword, handleClickShowPassword }) {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <Grid size={12}>
        <CustomTextField label="Correo" placeholder="ejemplo@correo.com" />
      </Grid>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <CustomTextField label="Nombres" placeholder="Ingrese sus nombres" />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <CustomTextField label="Apellidos" placeholder="Ingrese sus apellidos" />
        </Grid>
      </Grid>
      <Box>
        <CustomTextField label="Dirección" placeholder="Ingrese una dirección" />
      </Box>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            label="Teléfono"
            placeholder="000-000-000"
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
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ py: 1.5, px: 4, width: { xs: '100%', sm: 'auto' }, alignSelf: 'center', fontSize: '1rem', mt: 2 }}
      >
        REGISTRATE
      </Button>
    </Box>
  );
}