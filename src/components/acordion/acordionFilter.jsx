import {
  Accordion, AccordionSummary,
  AccordionDetails, Typography, Checkbox,
  FormControlLabel, FormGroup, Box, Button
} from "@mui/material";
import { useState } from "react";
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from "../../shared/icons";

// 1. Recibimos selectedItems como prop
export default function AcordionFilter({ title, items = [], selectedItems = [], onChangeSelected }) {
  const [expanded, setExpanded] = useState(false);
  // 2. Eliminamos el estado local selectedItems y su useEffect
  const [sortBy, setSortBy] = useState("alphabetical");

  const handleCheckboxChange = (item) => {
    let updatedSelection;

    if (selectedItems.includes(item.label)) {
      updatedSelection = selectedItems.filter((i) => i !== item.label);
    } else {
      if (selectedItems.length >= 3) return;
      updatedSelection = [...selectedItems, item.label];
    }

    if (onChangeSelected) {
      onChangeSelected(updatedSelection);
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.label.localeCompare(b.label);
    } else {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.label.localeCompare(b.label);
    }
  });

  return (
    <Accordion
      expanded={expanded}
      onChange={(e, isExpanded) => setExpanded(isExpanded)}
      sx={(theme) => ({
        color: theme.palette.text.primary,
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[0],
        transition: theme.transitions.create(['background-color', 'box-shadow']),
        '&:hover': { boxShadow: theme.shadows[2] }
      })}
    >
      <AccordionSummary expandIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}>
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {items.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Ordenar por:
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button
                variant={sortBy === "alphabetical" ? "contained" : "outlined"}
                size="small"
                onClick={() => setSortBy("alphabetical")}
                sx={{ fontSize: '0.65rem', py: 0.1, px: 0.8, minWidth: 0 }}
              >
                A-Z
              </Button>
              <Button
                variant={sortBy === "count" ? "contained" : "outlined"}
                size="small"
                onClick={() => setSortBy("count")}
                sx={{ fontSize: '0.65rem', py: 0.1, px: 0.8, minWidth: 0 }}
              >
                Cant.
              </Button>
            </Box>
          </Box>
        )}

        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            maxHeight: '180px',
            overflowY: 'auto',
            overflowX: 'hidden',
            pr: 1,
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: '4px' }
          }}
        >
          {sortedItems.map((item, index) => {
            // 3. Evaluamos respecto al prop que viene del padre
            const isChecked = selectedItems.includes(item.label);
            const isDisabled = !isChecked && (item.disabled || selectedItems.length >= 3);

            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item)}
                    disabled={isDisabled}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{
                      fontSize: '0.85rem',
                      width: '180px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                    title={`${item.label} (${item.count})`}
                  >
                    {`${item.label} (${item.count})`}
                  </Typography>
                }
              />
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}