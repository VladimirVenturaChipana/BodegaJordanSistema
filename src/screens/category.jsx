import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Box, Pagination, CircularProgress } from "@mui/material";
import MainLayout from "../layouts/mainLayout";
import SidebarFiltros from "../components/sideBarFilters";
import MediaCard from "../components/cardProduct";
import { getCategoryProductsByName } from "../hooks/API/servicesProducts";

export default function Category() {
  const { categoryName } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 60;

  // Cargar productos de la categoría seleccionada
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    setAllProducts([]);
    setFilteredProducts([]);
    getCategoryProductsByName(categoryName)
      .then(data => {
        setAllProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar productos de la categoría:", err);
        setLoading(false);
      });
  }, [categoryName]);

  // Manejar el cambio de filtros desde el Sidebar
  const handleFilterChange = (filters) => {
    if (!allProducts || allProducts.length === 0) return;

    const filtered = allProducts.filter(p => {
      // 1. Filtrar por Marcas
      if (filters.marcas.length > 0) {
        const brand = (p.marca || p.brand || "OTROS").toUpperCase();
        if (!filters.marcas.includes(brand)) return false;
      }

      // 2. Filtrar por Presentación
      if (filters.presentaciones.length > 0) {
        const unit = (p.unit || "OTROS").toUpperCase();
        if (!filters.presentaciones.includes(unit)) return false;
      }

      // 3. Filtrar por Rango de Precio
      const price = Number(p.price);
      if (!isNaN(price)) {
        if (price < filters.precioMin || price > filters.precioMax) return false;
      }

      // 4. Filtrar por Solo Promoción / Oferta
      if (filters.oferta) {
        const hasDiscount = p.discount != null && p.discount !== "" && p.discount !== 0 && p.discount !== "0";
        if (!hasDiscount) return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reiniciar a la primera página cuando cambian los filtros
  };

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <MainLayout>
      <Grid sx={{ maxWidth: 'xl', mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, mt: 4 }} container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h4"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 900,
              color: 'primary.main',
              display: 'inline-block',
              borderBottom: '3px solid',
              pb: 0.5
            }}
          >
            {categoryName}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {loading ? "Cargando catálogo..." : `Se encontraron ${filteredProducts.length} productos`}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }} container spacing={3}>
          {/* Sección de filtros */}
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              position: { xs: 'static', md: 'sticky' },
              top: { xs: 'auto', md: '80px' },
              alignSelf: 'flex-start',
              maxHeight: { xs: 'auto', md: 'calc(100vh - 100px)' },
              overflowY: { xs: 'visible', md: 'auto' },
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '4px',
              }
            }}
          >
            <SidebarFiltros
              categoriaActual={categoryName}
              allProducts={allProducts}
              onFilterChange={handleFilterChange}
            />
          </Grid>

          {/* Sección de productos */}
          <Grid size={{ xs: 12, md: 9 }}>
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 2 }}>
                <CircularProgress color="primary" />
                <Typography color="text.secondary">Cargando productos de la categoría...</Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {paginatedProducts.map((product) => (
                    <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3 }}>
                      <MediaCard product={product} />
                    </Grid>
                  ))}

                  {!loading && paginatedProducts.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                          No se encontraron productos con los filtros seleccionados.
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>

                {/* Controles de Paginación */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(e, value) => {
                        setCurrentPage(value);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ height: '80px' }} />
    </MainLayout>
  );
}



