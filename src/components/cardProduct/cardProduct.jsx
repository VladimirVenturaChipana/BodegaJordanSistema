import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, CardMedia, CardActions,
  Typography, IconButton, Box,
} from '@mui/material';
import { AddIcon } from '../../shared/icons';
import CardProductSkeleton from './cardProductSkeleton';

export default function MediaCard({ product, loading = false }) {
  const navigate = useNavigate();

  // Si está cargando, mostramos la estructura gris con Skeletons
  if (loading || !product) {
    return (
      <CardProductSkeleton />
    );
  }

  // Si ya hay producto, usamos los datos reales directamente del prop
  const handleProductClick = () => {
    navigate(`/product/${product.id || product.idproducto}`);
  };

  return (
    <Card elevation={2}>
      <CardMedia
        sx={{
          height: { xs: 150, sm: 200 },
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        image={product.image || product.imagenurl || "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
        title={product.title || product.nomart}
      />
      <CardContent>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textTransform: 'uppercase', fontWeight: 'bold', fontSize: { xs: '0.65rem', sm: '0.75rem' }, }} noWrap>
          {product.brand || product.marca}
        </Typography>
        <Typography variant="body2" sx={{
          fontWeight: 'medium',
          lineHeight: 1.2,
          my: 0.5,
          height: { xs: '2.2em', sm: '2.4em' },
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          fontSize: { xs: '0.8rem', sm: '0.875rem' },
        }}>
          {product.title || product.nomart}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
          {product.unit || 'Unidad'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', lineHeight: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            S/. {product.price || product.precio}
          </Typography>
          {product.discount ? (
            <Box sx={{
              bgcolor: 'error.main',
              color: 'error.contrastText',
              px: 0.5,
              py: 0.2,
              fontSize: { xs: '0.65rem', sm: '0.75rem' },
              fontWeight: 'bold',
              borderRadius: 1
            }}>
              {product.discount}
            </Box>
          ) : null}
        </Box>
      </CardContent>
      <CardActions>
        <IconButton
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}
          onClick={handleProductClick}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}