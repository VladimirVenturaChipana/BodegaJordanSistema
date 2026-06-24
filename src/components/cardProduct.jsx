import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function MediaCard() {
  return (
    <Card sx={{ width: 260, height: 'auto', borderRadius: 2, boxShadow: 2 }}>

      <CardMedia
        sx={{ height: 180, bgcolor: 'action.hover', backgroundSize: 'cover' }}
        image="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
        title="Producto"
      />

      <CardContent sx={{ p: 2, pb: 0 }}>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textTransform: 'uppercase', fontWeight: 'bold' }}>
          Marca
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: '600', lineHeight: 1.2, my: 0.5, height: '40px', textOverflow: 'ellipsis', maxLines: 2, overflow: 'hidden' }}>
          PRODUCTO GENÉRICO 000000 OOOOOO 000000 000
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 1 }}>
          UNIDAD
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', lineHeight: 1 }}>
            S/. XX.XX
          </Typography>

          <Box sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', px: 0.5, py: 0.2, borderRadius: 1, fontSize: '0.75rem', fontWeight: 'bold' }}>
            -20%
          </Box>
        </Box>

        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.disabled', mt: 0.5 }}>
          S/. XX.XX
        </Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, pt: 0 }}>
        <IconButton
          color="primary"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 40,
            height: 40,
            boxShadow: 1,
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}