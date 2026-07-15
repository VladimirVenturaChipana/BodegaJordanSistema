import { TextField } from '@mui/material';

export default function CustomTextField({ label, value, onChange, ...props }) {
  return (
    <TextField
      size="medium"
      fullWidth
      variant='filled'
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}