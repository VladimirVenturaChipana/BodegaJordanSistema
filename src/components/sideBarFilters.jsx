import { useState, useEffect } from "react";
import { Box, Switch, FormControlLabel, Slider, Typography } from "@mui/material";
import AcordionFilter from "./acordion/acordionFilter";

export default function SidebarFiltros({ categoriaActual, allProducts = [], onFilterChange }) {
  // Constantes de estado que se enviarán a la API
  const [rangoPrecio, setRangoPrecio] = useState([0, 100]);
  const [absMinMaxPrice, setAbsMinMaxPrice] = useState([0, 100]);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [medidasSeleccionadas, setMedidasSeleccionadas] = useState([]);
  const [soloOfertas, setSoloOfertas] = useState(false);

  // Cada vez que cambie allProducts (la lista original de productos de la categoría)
  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      setRangoPrecio([0, 100]);
      setAbsMinMaxPrice([0, 100]);
      setMarcasSeleccionadas([]);
      setMedidasSeleccionadas([]);
      setSoloOfertas(false);
      return;
    }

    // Calcular el rango de precios absoluto
    const prices = allProducts.map(p => Number(p.price)).filter(price => !isNaN(price));
    const minVal = prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
    const maxVal = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 100;

    setAbsMinMaxPrice([minVal, maxVal]);
    setRangoPrecio([minVal, maxVal]);

    // Limpiar selecciones anteriores para la nueva categoría
    setMarcasSeleccionadas([]);
    setMedidasSeleccionadas([]);
    setSoloOfertas(false);
  }, [allProducts]);

  // CÁLCULO DINÁMICO DE FILTROS (FACET FILTERING)

  // 1. Filtrar productos para calcular las marcas disponibles (aplicando el filtro de presentación y precio)
  const productsForBrands = allProducts.filter(p => {
    if (medidasSeleccionadas.length > 0) {
      const u = (p.unit || "OTROS").toUpperCase();
      if (!medidasSeleccionadas.includes(u)) return false;
    }
    const price = Number(p.price);
    if (!isNaN(price) && (price < rangoPrecio[0] || price > rangoPrecio[1])) return false;
    if (soloOfertas) {
      const hasDiscount = p.discount != null && p.discount !== "" && p.discount !== 0 && p.discount !== "0";
      if (!hasDiscount) return false;
    }
    return true;
  });

  const brandCounts = {};
  // Aseguramos que las marcas actualmente seleccionadas siempre aparezcan (aunque tengan conteo 0)
  marcasSeleccionadas.forEach(b => {
    brandCounts[b] = 0;
  });
  productsForBrands.forEach(p => {
    const b = (p.marca || p.brand || "OTROS").toUpperCase();
    brandCounts[b] = (brandCounts[b] || 0) + 1;
  });
  const listaMarcas = Object.keys(brandCounts).map(b => ({
    label: b,
    count: brandCounts[b]
  }));

  // 2. Filtrar productos para calcular las presentaciones disponibles (aplicando el filtro de marcas y precio)
  const productsForPresentations = allProducts.filter(p => {
    if (marcasSeleccionadas.length > 0) {
      const b = (p.marca || p.brand || "OTROS").toUpperCase();
      if (!marcasSeleccionadas.includes(b)) return false;
    }
    const price = Number(p.price);
    if (!isNaN(price) && (price < rangoPrecio[0] || price > rangoPrecio[1])) return false;
    if (soloOfertas) {
      const hasDiscount = p.discount != null && p.discount !== "" && p.discount !== 0 && p.discount !== "0";
      if (!hasDiscount) return false;
    }
    return true;
  });

  const unitCounts = {};
  // Aseguramos que las presentaciones seleccionadas siempre aparezcan
  medidasSeleccionadas.forEach(u => {
    unitCounts[u] = 0;
  });
  productsForPresentations.forEach(p => {
    const u = (p.unit || "OTROS").toUpperCase();
    unitCounts[u] = (unitCounts[u] || 0) + 1;
  });
  const listaMedidas = Object.keys(unitCounts).map(u => ({
    label: u,
    count: unitCounts[u]
  }));

  // Función encargada de notificar al componente padre los filtros aplicados
  const aplicarFiltros = () => {
    if (onFilterChange) {
      onFilterChange({
        marcas: marcasSeleccionadas,
        presentaciones: medidasSeleccionadas,
        precioMin: rangoPrecio[0],
        precioMax: rangoPrecio[1],
        oferta: soloOfertas
      });
    }
  };

  // Disparar la búsqueda local cada vez que cambie un filtro
  useEffect(() => {
    aplicarFiltros();
  }, [rangoPrecio, marcasSeleccionadas, medidasSeleccionadas, soloOfertas]);

  return (
    <Box sx={{ width: '100%', display: "flex", flexDirection: "column", gap: 2, p: 2 }}>

      {/* SECCIÓN PRECIO */}
      <Box sx={{ px: 1 }}>
        <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Rango de Precio</Typography>
        <Slider
          value={rangoPrecio}
          onChange={(e, nuevoValor) => setRangoPrecio(nuevoValor)}
          valueLabelDisplay="auto"
          min={absMinMaxPrice[0]}
          max={absMinMaxPrice[1] === absMinMaxPrice[0] ? absMinMaxPrice[0] + 1 : absMinMaxPrice[1]}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary">Min: S/. {rangoPrecio[0]}</Typography>
          <Typography variant="caption" color="text.secondary">Max: S/. {rangoPrecio[1]}</Typography>
        </Box>
      </Box>

      {/* ACORDION MARCAS */}
      <AcordionFilter
        title="Marcas"
        items={listaMarcas}
        selectedItems={marcasSeleccionadas} // <-- Pasamos el estado
        onChangeSelected={(seleccionadas) => setMarcasSeleccionadas(seleccionadas)}
      />

      {/* ACORDION MEDIDAS */}
      <AcordionFilter
        title="Presentación"
        items={listaMedidas}
        selectedItems={medidasSeleccionadas} // <-- Pasamos el estado
        onChangeSelected={(seleccionadas) => setMedidasSeleccionadas(seleccionadas)}
      />

      {/* SWITCH DE OFERTAS */}
      <FormControlLabel
        control={
          <Switch
            checked={soloOfertas}
            onChange={(e) => setSoloOfertas(e.target.checked)}
          />
        }
        label="Solo en Promoción"
        sx={{ mt: 1, px: 1 }}
      />
    </Box>
  );
}

