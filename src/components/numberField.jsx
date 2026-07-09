import { Box, IconButton, InputBase } from "@mui/material";
import { AddIcon, RemoveIcon } from "../shared/icons";

export default function NumberField({ value, onChange }) {

  const handleIncrement = () => {
    // Si el campo estaba vacío, asumimos que era 0 y sumamos 1
    const currentValue = value === '' ? 0 : Number(value);
    onChange(currentValue + 1);
  };

  const handleDecrement = () => {
    const currentValue = Number(value);
    onChange(currentValue > 1 ? currentValue - 1 : 1);
  };

  // Función para manejar cuando el usuario escribe
  const handleInputChange = (e) => {
    const val = e.target.value;

    // Permitir borrar todo (dejarlo temporalmente vacío mientras el usuario escribe)
    if (val === '') {
      onChange('');
      return;
    }

    // Validar que solo sean números positivos
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      onChange(num);
    }
  };

  // Si el usuario hace clic fuera y lo dejó vacío, lo regresamos a 1
  const handleBlur = () => {
    if (value === '' || isNaN(value) || value < 1) {
      onChange(1);
    }
  };

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      overflow: 'hidden',
      bgcolor: 'background.paper'
    }}>
      <IconButton
        onClick={handleDecrement}
        disabled={value <= 1 && value !== ''}
        sx={{
          p: 1.2,
          borderRadius: 0,
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          '&:hover': {
            bgcolor: 'secondary.dark',
          },
          '&.Mui-disabled': {
            bgcolor: 'action.disabledBackground',
          }
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      {/* Reemplazamos Typography por InputBase */}
      <InputBase
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          inputMode: 'numeric', // Muestra el teclado numérico en celulares
          pattern: '[0-9]*', // Evita que en móviles pongan símbolos
          style: {
            textAlign: 'center',
            fontWeight: 'bold',
            width: '48px'
          }
        }}
      />

      <IconButton
        onClick={handleIncrement}
        sx={{
          p: 1.2,
          borderRadius: 0,
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          '&:hover': {
            bgcolor: 'secondary.dark',
          }
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}