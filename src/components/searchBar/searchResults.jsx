import { Box, Paper, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

export const SearchResults = ({ results, loading, searchTerm, onSelect }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 10,
        maxHeight: '300px',
        overflowY: 'auto',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        mt: '1px'
      }}
    >
      <List disablePadding>
        {results.length > 0 ? (
          results.map((product) => (
            <ListItem key={product.id || product.idproducto} disablePadding>
              <ListItemButton onClick={() => onSelect(product)}>
                <ListItemText
                  primary={product.title || product.nomart || product.name || "Producto sin nombre"}
                  secondary={product.brand || product.marca || ""}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          !loading && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No se encontraron resultados para "{searchTerm}"
              </Typography>
            </Box>
          )
        )}
      </List>
    </Paper>
  );
};