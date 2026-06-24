import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                height: '44px',
                padding: theme.spacing(0, 2.5),
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: `${theme.shape.borderRadius * 8}px`,

                boxShadow: theme.shadows[0],

                transition: theme.transitions.create(['background-color', 'box-shadow']),
                '&:hover': {
                    boxShadow: theme.shadows[2],
                }
            })}
        >
            <SearchIcon sx={(theme) => ({ color: theme.palette.text.secondary })} />
            <InputBase
                placeholder="Busque sus artículos"
                fullWidth
                sx={(theme) => ({
                    fontSize: '1rem',
                    color: 'inherit',
                    '& .MuiInputBase-input': {
                        padding: theme.spacing(1, 0),
                    }
                })}
            />
        </Box>
    );
}