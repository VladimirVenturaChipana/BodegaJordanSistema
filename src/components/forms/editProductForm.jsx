import {
  Grid,
  TextField,
  InputAdornment,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel
} from "@mui/material";

export default function EditProductForm({
  openModal,
  setOpenModal,
  isEditMode,
  handleSaveProduct,
  formValues,
  handleInputChange,
  setFormValues
}) {
  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSaveProduct}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {isEditMode ? "Modificar Datos de Producto" : "Agregar Producto al Inventario"}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Nombre del Producto"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Marca"
                name="marca"
                value={formValues.marca}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Presentación / Unidad"
                name="unit"
                value={formValues.unit}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Precio Regular"
                name="price"
                type="number"
                value={formValues.price}
                onChange={handleInputChange}
                fullWidth
                required
                inputProps={{ step: "0.01" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">S/.</InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Descuento (Opcional)"
                name="discount"
                type="number"
                value={formValues.discount}
                onChange={handleInputChange}
                fullWidth
                placeholder="Ej: 10 para 10%"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="URL de la Imagen"
                name="image"
                value={formValues.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Código de Barras"
                name="codbar"
                value={formValues.codbar}
                onChange={handleInputChange}
                fullWidth
                disabled={isEditMode}
                helperText={isEditMode ? "El código de barras no puede modificarse" : ""}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="ID Categoría"
                name="idcategoria"
                type="number"
                value={formValues.idcategoria}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formValues.activo}
                    onChange={(e) => setFormValues({ ...formValues, activo: e.target.checked })}
                    color="primary"
                  />
                }
                label="Habilitar producto inmediatamente para clientes"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenModal(false)} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}