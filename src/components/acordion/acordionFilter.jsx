import {
  Accordion, AccordionSummary,
  AccordionDetails, Typography, Checkbox,
  FormControlLabel, FormGroup
} from "@mui/material";
import { useState } from "react";
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from "../../shared/icons";

export default function AcordionFilter({ title, items = [], onChangeSelected }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    let updatedSelection;

    if (selectedItems.includes(item)) {
      updatedSelection = selectedItems.filter((i) => i !== item);
    } else {
      if (selectedItems.length >= 3) return;
      updatedSelection = [...selectedItems, item];
    }

    setSelectedItems(updatedSelection);

    if (onChangeSelected) {
      onChangeSelected(updatedSelection);
    }
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={(e, isExpanded) => setExpanded(isExpanded)}
      sx={(theme) => ({
        color: theme.palette.text.primary,
        bgcolor: theme.palette.background.paper,
        borderRadius: `${theme.shape.borderRadius * 8}px`,
        boxShadow: theme.shadows[0],
        transition: theme.transitions.create(['background-color', 'box-shadow']),
        '&:hover': { boxShadow: theme.shadows[2] }
      })}
    >
      <AccordionSummary expandIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}>
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* Usamos FormGroup para agrupar checkboxes verticalmente de forma correcta */}
        <FormGroup sx={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((item, index) => {
            const isChecked = selectedItems.includes(item);
            // Deshabilitar los no seleccionados si ya se llegó al límite de 3
            const isDisabled = !isChecked && selectedItems.length >= 3;

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
                label={item}
              />
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}