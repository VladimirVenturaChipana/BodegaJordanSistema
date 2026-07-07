import { useState, useEffect } from "react";
import { Box, Switch, FormControlLabel, Slider, Typography } from "@mui/material";
import AcordionFilter from "./acordion/acordionFilter"; // Tu componente

export default function SidebarFiltros({ categoriaActual }) {
  // 1. Constantes de estado que se enviarán a la API de JS
  const [rangoPrecio, setRangoPrecio] = useState([0, 100]); // Dinámico según la categoría
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [medidasSeleccionadas, setMedidasSeleccionadas] = useState([]);
  const [soloOfertas, setSoloOfertas] = useState(false);

  // Listas que traerás de tu API simuladas
  const [listaMarcas, setListaMarcas] = useState([]);
  const [listaMedidas, setListaMedidas] = useState([]);

  // Cada vez que cambie la categoría, limpiamos filtros y traemos los nuevos límites
  useEffect(() => {
    // Aquí llamarías a tu API pasándole la `categoriaActual`
    // Ejemplo ficticio:
    // const data = await obtenerFiltrosPorCategoria(categoriaActual);
    if (categoriaActual === "Licores") {
      setListaMarcas(["Jose Cuervo", "Cartavio", "Johnnie Walker", "Corona", "Pisco Portón"]);
      setListaMedidas(["Botella", "Lata", "Pack", "Vidrio"]);
      setRangoPrecio([10, 250]);
    } else if (categoriaActual === "Helados") {
      setListaMarcas(["D'Onofrio", "Zamboni", "Artika"]);
      setListaMedidas(["Unidades", "Bote", "Bolsita"]);
      setRangoPrecio([2, 40]);
    }

    // Limpiar selecciones anteriores
    setMarcasSeleccionadas([]);
    setMedidasSeleccionadas([]);
    setSoloOfertas(false);
  }, [categoriaActual]);

  // 2. Función encargada de armar el payload y disparar tu API de búsqueda externa
  const aplicarFiltros = () => {
    const filtrosPayload = {
      categoria: categoriaActual,
      precioMin: rangoPrecio[0],
      precioMax: rangoPrecio[1],
      marcas: marcasSeleccionadas, // Máximo 3 strings
      presentaciones: medidasSeleccionadas, // Máximo 3 strings
      oferta: soloOfertas
    };

    console.log("Enviando estos filtros a la API de JS:", filtrosPayload);
    // Aquí ejecutas tu archivo JS externo: miServicioAPI.buscarProductos(filtrosPayload);
  };

  // Disparar la búsqueda cada vez que cambie un filtro
  useEffect(() => {
    aplicarFiltros();
  }, [rangoPrecio, marcasSeleccionadas, medidasSeleccionadas, soloOfertas]);

  return (
    <Box sx={{ width: 280, display: "flex", flexDirection: "column", gap: 2, p: 2 }}>

      {/* SECCIÓN PRECIO */}
      <Box sx={{ px: 1 }}>
        <Typography gutterBottom>Rango de Precio</Typography>
        <Slider
          value={rangoPrecio}
          onChange={(e, nuevoValor) => setRangoPrecio(nuevoValor)}
          valueLabelDisplay="auto"
          min={0}
          max={300} // Esto puede ser dinámico
        />
      </Box>

      {/* ACORDION MARCAS */}
      <AcordionFilter
        title="Marcas"
        items={listaMarcas}
        onChangeSelected={(seleccionadas) => setMarcasSeleccionadas(seleccionadas)}
      />

      {/* ACORDION MEDIDAS (Tus agrupaciones del excel) */}
      <AcordionFilter
        title="Presentación"
        items={listaMedidas}
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