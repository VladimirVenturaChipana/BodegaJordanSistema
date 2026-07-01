import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function MediaCard({ product }) {

  const p = product || {
    id: "1",
    brand: "MARCA",
    title: "PRODUCTO GENÉRICO 000000 OOOOOO 000000 000",
    unit: "UNIDAD",
    price: "XX.XX",
    oldPrice: "XX.XX",
    discount: "-20%"
  };

  const navigate = useNavigate();

  const handleProductClick = () => {
    // que abra la pagina de product con el id del producto
    window.location.href = `/product/${p.id}`;

  };

  return (
    <Card
      elevation={2}
      sx={{
        width: '100%',
        height: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardMedia
        sx={{
          // Reducimos la altura en móviles (xs) y la mantenemos en 200 para el resto
          height: { xs: 120, sm: 200 },
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}
        image={p.image || "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"}
        title={p.title}
      />
      <CardContent sx={{
        // Menos padding en móviles para ganar espacio
        p: { xs: 1.5, sm: 2 },
        minHeight: { xs: 130, sm: 160 },
        // Añadimos padding-bottom extra para que el texto no choque con el botón flotante
        pb: { xs: 6, sm: 7 }
      }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textTransform: 'uppercase', fontWeight: 'bold', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
          {p.brand}
        </Typography>
        <Typography variant="body2" sx={{
          fontWeight: 'medium',
          lineHeight: 1.2,
          my: 0.5,
          height: { xs: '2.2em', sm: '2.4em' }, // Ajuste sutil para el texto
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          fontSize: { xs: '0.8rem', sm: '0.875rem' }
        }}>
          {p.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
          {p.unit}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', lineHeight: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            S/. {p.price}
          </Typography>
          <Box sx={{
            bgcolor: 'warning.main',
            color: 'warning.contrastText',
            px: 0.5,
            py: 0.2,
            fontSize: { xs: '0.65rem', sm: '0.75rem' },
            fontWeight: 'bold',
            borderRadius: 1
          }}>
            {p.discount}
          </Box>
        </Box>
        <Typography variant="body2" color="text.disabled" sx={{ textDecoration: 'line-through', mt: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          S/. {p.oldPrice}
        </Typography>
      </CardContent>

      <IconButton
        sx={{
          position: 'absolute',
          bottom: { xs: 8, sm: 16 },
          right: { xs: 8, sm: 16 },
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          width: { xs: 32, sm: 36 },
          height: { xs: 32, sm: 36 },
          '&:hover': {
            bgcolor: 'primary.dark',
          }
        }}
        onClick={handleProductClick}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Card>
  );
}