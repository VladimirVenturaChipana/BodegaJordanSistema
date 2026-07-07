import MainLayout from "../layouts/mainLayout";
import { useParams } from 'react-router-dom';
import AcordionFilter from "../components/acordion/acordionFilter";
import {
  Grid,
  Typography
} from "@mui/material";
import SidebarFiltros from "../components/sideBarFilters"

export default function Category() {
  const { categoryName } = useParams();

  return (
    <MainLayout>
      <Grid sx={{ maxWidth: 'xl', mx: 'auto', px: { xs: 2, sm: 4, md: 6 }, mt: 4 }} container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
            {categoryName} (100 productos) {/* Aqui va el numero de productos */}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ display: 'flex' }}>
          {/* Seccion de filtros */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <SidebarFiltros categoriaActual={categoryName} />
          </Grid>
          {/* Seccion de productos */}
          <Grid size={{ xs: 12, sm: 8, md: 9 }}>
            <Typography>Productos</Typography>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout >
  );
}


