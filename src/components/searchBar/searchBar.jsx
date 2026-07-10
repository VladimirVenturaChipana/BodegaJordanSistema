import { useRef, useEffect } from 'react';
import { Box, InputBase, CircularProgress } from '@mui/material';
import { SearchIcon } from '../../shared/icons';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { SearchResults } from './searchResults';
import { searchContainerStyles } from './searchBarStyle';

export default function SearchBar() {
  const { searchTerm, setSearchTerm, isOpen, setIsOpen, results, loading } = useSearch();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

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
      <Box sx={(theme) => searchContainerStyles(theme, isOpen)}>
        <SearchIcon sx={{ color: 'text.secondary' }} />
        <InputBase
          placeholder="Busque sus artículos"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.trim().length > 0 && setIsOpen(true)}
          sx={{ fontSize: '1rem', color: 'inherit', '& .MuiInputBase-input': { py: 1 } }}
        />
        {loading && <CircularProgress size={20} color="inherit" />}
      </Box>
      {isOpen && searchTerm.length > 0 && (
        <SearchResults
          results={results}
          loading={loading}
          searchTerm={searchTerm}
          onSelect={(product) => {
            setIsOpen(false);
            setSearchTerm('');
            navigate(`/product/${product.id || product.idproducto}`);
          }}
        />
      )}
    </Box>
  );
}

