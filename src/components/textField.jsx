import { TextField } from '@mui/material';

export default function CustomTextField({ label, value, onChange, ...props }) {
  return (
    <TextField
      size="small"
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}