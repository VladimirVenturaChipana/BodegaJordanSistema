import { Box, Grid, IconButton } from '@mui/material';
import { FavoriteBorderIcon } from '../../../shared/icons';

export default function ProductImage({ src, title }) {
  return <Grid size={{ xs: 12, sm: 6 }} sx={{ position: 'relative' }}>
    <Box
      component="img"
      src={src}
      alt={title}
      sx={{
        width: '100%',
        height: { xs: 300, sm: 320, md: 375 },
        objectFit: 'contain',
        display: 'block',
      }}
    />
    <IconButton sx={{ position: 'absolute', top: 10, right: 10 }}>
      <FavoriteBorderIcon />
    </IconButton>
  </Grid>
}