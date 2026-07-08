import { useState, useEffect, useRef } from 'react';
import {
  Box,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { searchProductsByName } from '../hooks/API/servicesProducts';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setIsOpen(false);
      setResults([]);
      return;
    }

    setLoading(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = await searchProductsByName(searchTerm);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>

      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          height: '44px',
          padding: theme.spacing(0, 2.5),
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: `${theme.shape.borderRadius * 8}px`,
          boxShadow: theme.shadows[0],
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-radius']),
          '&:hover': {
            boxShadow: theme.shadows[2],
          },
          ...(isOpen && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: theme.shadows[2],
          })
        })}
      >
        <SearchIcon sx={(theme) => ({ color: theme.palette.text.secondary })} />
        <InputBase
          placeholder="Busque sus artículos"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (searchTerm.trim().length > 0) setIsOpen(true);
          }}
          sx={(theme) => ({
            fontSize: '1rem',
            color: 'inherit',
            '& .MuiInputBase-input': {
              padding: theme.spacing(1, 0),
            }
          })}
        />
        {/* Pequeño indicador de carga dentro de la barra */}
        {loading && <CircularProgress size={20} color="inherit" />}
      </Box>

      {isOpen && searchTerm.length > 0 && (
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
                  <ListItemButton
                    onClick={() => {
                      setIsOpen(false);
                      setSearchTerm('');
                      const productId = product.id || product.idproducto;
                      navigate(`/product/${productId}`);
                    }}
                  >
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
      )}
    </Box>
  );
}