import { useRef, useEffect } from 'react';
import { Box, InputBase, CircularProgress } from '@mui/material';
import { SearchIcon } from '../../shared/icons';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { SearchResults } from './searchResults';
import { searchContainerStyles } from './searchBarStyle';

export default function SearchBar({ value, onChange }) {
  const isControlled = value !== undefined && onChange !== undefined;

  const { searchTerm, setSearchTerm, isOpen, setIsOpen, results, loading } = useSearch();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (isControlled) return;

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isControlled, setIsOpen]);

  const currentSearchTerm = isControlled ? value : searchTerm;
  const handleInputChange = (e) => {
    if (isControlled) {
      onChange(e);
    } else {
      setSearchTerm(e.target.value);
    }
  };

  const handleFocus = () => {
    if (isControlled) return;
    if (currentSearchTerm.trim().length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
      <Box sx={(theme) => searchContainerStyles(theme, isControlled ? false : isOpen)}>
        <SearchIcon sx={{ color: 'text.secondary' }} />
        <InputBase
          placeholder="Busque sus artículos"
          fullWidth
          value={currentSearchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          sx={{ fontSize: '1rem', color: 'inherit', '& .MuiInputBase-input': { py: 1 } }}
        />
        {!isControlled && loading && <CircularProgress size={20} color="inherit" />}
      </Box>

      {!isControlled && isOpen && currentSearchTerm.length > 0 && (
        <SearchResults
          results={results}
          loading={loading}
          searchTerm={currentSearchTerm}
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