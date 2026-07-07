import { Box, IconButton, Typography } from "@mui/material";
import { AddIcon, RemoveIcon } from "../shared/icons";
import { useState } from "react";

export default function NumberField() {

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      bgcolor: 'background.paper'
    }}>
      <IconButton onClick={handleDecrement} disabled={quantity <= 1} size="small" sx={{ p: 1 }}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 'medium', userSelect: 'none' }}>
        {quantity}
      </Typography>
      <IconButton onClick={handleIncrement} size="small" sx={{ p: 1 }}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}