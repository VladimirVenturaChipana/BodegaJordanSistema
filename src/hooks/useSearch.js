import { useState, useEffect } from 'react';
import { searchProductsByName } from './API/servicesProducts';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return { searchTerm, setSearchTerm, isOpen, setIsOpen, results, loading };
};