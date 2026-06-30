import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function MediaCard({ product }) {

  const p = product || {
    brand: "MARCA",
    title: "PRODUCTO GENÉRICO 000000 OOOOOO 000000 000",
    unit: "UNIDAD",
    price: "XX.XX",
    oldPrice: "XX.XX",
    discount: "-20%"
  };

  return (
    <Card
      elevation={2}
      sx={{
        width: '100%',
        height: 'auto',
        position: 'relative'
      }}
    >
      <CardMedia
        sx={{
          height: 200,
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}
        image={p.image || "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
        title={p.title}
      />
      <CardContent sx={{ p: 2, minHeight: 160 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>
          {p.brand}
        </Typography>
        <Typography variant="body2" sx={{
          fontWeight: 'medium',
          lineHeight: 1.2,
          my: 0.5,
          height: '2.4em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {p.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {p.unit}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
            S/. {p.price}
          </Typography>
          <Box sx={{
            bgcolor: 'warning.main',
            color: 'warning.contrastText',
            px: 0.5,
            py: 0.2,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {p.discount}
          </Box>
        </Box>
        <Typography variant="body2" color="text.disabled" sx={{ textDecoration: 'line-through', mt: 0.5 }}>
          S/. {p.oldPrice}
        </Typography>
      </CardContent>
      <IconButton
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          width: 36,
          height: 36,
          '&:hover': {
            bgcolor: 'primary.dark',
          }
        }}
      >
        <AddIcon />
      </IconButton>
    </Card>
  );
}