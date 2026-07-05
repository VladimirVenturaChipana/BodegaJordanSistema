import {
    Accordion, AccordionSummary,
    AccordionDetails, Typography, Checkbox
} from "@mui/material";
import { useState } from "react";
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from "../../shared/icons";

export default function AcordionFilter({ title, items = [] }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <Accordion expanded={expanded} onChange={(e, isExpanded) => setExpanded(isExpanded)} sx={(theme) => ({
            color: theme.palette.text.primary,
            bgcolor: theme.palette.background.paper,
            borderRadius: `${theme.shape.borderRadius * 8}px`,
            boxShadow: theme.shadows[0],
            transition: theme.transitions.create(['background-color', 'box-shadow']),
            '&:hover': {
                boxShadow: theme.shadows[2],
            }
        })}>
            <AccordionSummary expandIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    items.map((item, index) => (
                        <FormControlLabel
                            control={<Checkbox />}
                            label={item}
                        />
                    ))
                }
            </AccordionDetails>
        </Accordion>
    );
}
