import { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Button,
  Pagination, CircularProgress, Snackbar, Alert, IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SearchBar from "../../components/searchBar/searchBar";
import { AddIcon, VisibilityIcon, VisibilityOffIcon } from "../../shared/icons";
import MediaCard from "../../components/cardProduct/cardProduct";
import { getAllProducts } from "../../hooks/API/servicesProducts";
import EditProductForm from "../../components/forms/editProductForm";


export default function AddCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 60;

  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const initialFormState = {
    title: "",
    marca: "",
    price: "",
    discount: "",
    unit: "Unidad",
    image: "",
    codbar: "",
    idcategoria: "",
    activo: true
  };
  const [formValues, setFormValues] = useState(initialFormState);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error cargando el catálogo:", err);
      showNotification("Error de conexión al cargar catálogo.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = typeof e === "string" ? e : e?.target?.value || "";
    setSearchTerm(term);

    const filtered = products.filter(p => {
      const name = (p.title || p.nomart || "").toLowerCase();
      const brand = (p.brand || p.marca || "").toLowerCase();
      return name.includes(term.toLowerCase()) || brand.includes(term.toLowerCase());
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleOpenCreateModal = () => {
    setFormValues(initialFormState);
    setIsEditMode(false);
    setOpenModal(true);
  };

  const handleOpenEditModal = (product) => {
    setFormValues({
      title: product.title || product.nomart || "",
      marca: product.brand || product.marca || "",
      price: product.price || product.precio || "",
      discount: product.discount || "",
      unit: product.unit || "Unidad",
      image: product.image || product.imagenurl || "",
      codbar: product.codbar || "",
      idcategoria: product.idcategoria || "",
      activo: product.activo !== false && product.estado !== "inactivo" && product.estado !== 0
    });
    setSelectedProductId(product.id || product.idproducto);
    setIsEditMode(true);
    setOpenModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    const bodyPayload = {
      title: formValues.title,
      nomart: formValues.title,
      marca: formValues.marca,
      brand: formValues.marca,
      price: Number(formValues.price),
      precio: Number(formValues.price),
      discount: formValues.discount ? Number(formValues.discount) : 0,
      unit: formValues.unit,
      image: formValues.image,
      imagenurl: formValues.image,
      codbar: formValues.codbar,
      idcategoria: Number(formValues.idcategoria),
      activo: formValues.activo,
      estado: formValues.activo ? "activo" : "inactivo"
    };

    try {
      let response;
      if (isEditMode) {
        response = await fetch(`${API_URL}/api/productos/${selectedProductId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyPayload)
        });
      } else {
        response = await fetch(`${API_URL}/api/productos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyPayload)
        });
      }

      if (!response.ok) throw new Error("Error en la petición");

      showNotification(
        isEditMode ? "¡Producto actualizado con éxito!" : "¡Producto creado con éxito!",
        "success"
      );
      setOpenModal(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      mockLocalSave(bodyPayload);
    }
  };

  const handleToggleStatus = async (product) => {
    const pId = product.id || product.idproducto;
    const currentStatus = product.activo !== false && product.estado !== "inactivo" && product.estado !== 0;
    const nextStatus = !currentStatus;

    try {
      const response = await fetch(`${API_URL}/api/productos/${pId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          activo: nextStatus,
          estado: nextStatus ? "activo" : "inactivo"
        })
      });
      if (!response.ok) throw new Error();
      showNotification(`Producto ${nextStatus ? 'habilitado' : 'deshabilitado'} correctamente.`, "success");
      fetchProducts();
    } catch (err) {
      setProducts(prev => prev.map(p => {
        const id = p.id || p.idproducto;
        if (id === pId) {
          return { ...p, activo: nextStatus, estado: nextStatus ? "activo" : "inactivo" };
        }
        return p;
      }));
      setFilteredProducts(prev => prev.map(p => {
        const id = p.id || p.idproducto;
        if (id === pId) {
          return { ...p, activo: nextStatus, estado: nextStatus ? "activo" : "inactivo" };
        }
        return p;
      }));
      showNotification(`Estado alternado localmente (sin conexión a API).`, "warning");
    }
  };

  const mockLocalSave = (payload) => {
    if (isEditMode) {
      setProducts(prev => prev.map(p => ((p.id || p.idproducto) === selectedProductId ? { ...p, ...payload } : p)));
      setFilteredProducts(prev => prev.map(p => ((p.id || p.idproducto) === selectedProductId ? { ...p, ...payload } : p)));
    } else {
      const mockNewProduct = { ...payload, id: Date.now() };
      setProducts(prev => [mockNewProduct, ...prev]);
      setFilteredProducts(prev => [mockNewProduct, ...prev]);
    }
    setOpenModal(false);
    showNotification("Guardado localmente de forma temporal (Offline).", "info");
  };

  const showNotification = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Grid
      container
      spacing={3}
      sx={{ maxWidth: 'xl', mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, mt: 4 }}
    >
      <Grid size={{ xs: 12 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main', textTransform: 'uppercase', display: 'inline-block', borderBottom: '3px solid', pb: 0.5 }}>
          Agregar al Catálogo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Agrega, edita o deshabilita tus productos del catálogo digital.
        </Typography>
      </Grid>

      <Grid
        size={{ xs: 12 }}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mt: 1, mb: 2 }}
      >
        <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
          <SearchBar value={searchTerm} onChange={handleSearch} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateModal}
          sx={{ fontWeight: 'bold', height: '48px', px: 3 }}
        >
          Agregar
        </Button>
      </Grid>

      <Grid size={{ xs: 12 }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 2 }}>
            <CircularProgress color="primary" />
            <Typography color="text.secondary">Cargando inventario...</Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {paginatedProducts.map((product) => {
                const isInactive = product.activo === false || product.estado === 'inactivo' || product.estado === 0;

                return (
                  <Grid
                    key={product.id || product.idproducto}
                    size={{ xs: 6, sm: 4, lg: 3, xl: 2 }}
                    sx={{ display: 'flex' }}
                  >
                    <MediaCard
                      product={product}
                      showAdminFeatures={true}
                      customActions={
                        <>
                          <IconButton
                            color={isInactive ? "success" : "error"}
                            onClick={() => handleToggleStatus(product)}
                            size="small"
                            title={isInactive ? "Habilitar producto" : "Deshabilitar producto"}
                          >
                            {isInactive ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                          </IconButton>

                          <IconButton
                            sx={{
                              bgcolor: 'primary.main',
                              color: 'primary.contrastText',
                              '&:hover': {
                                bgcolor: 'primary.dark',
                              }
                            }}
                            onClick={() => handleOpenEditModal(product)}
                            size="small"
                            title="Editar producto"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </>
                      }
                    />
                  </Grid>
                );
              })}

              {!loading && paginatedProducts.length === 0 && (
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No se encontraron productos que coincidan con la búsqueda.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

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

      {/* Aquí inyectamos el nuevo componente del Modal */}
      <EditProductForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        isEditMode={isEditMode}
        handleSaveProduct={handleSaveProduct}
        formValues={formValues}
        handleInputChange={handleInputChange}
        setFormValues={setFormValues}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}