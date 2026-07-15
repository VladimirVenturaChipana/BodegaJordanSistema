import { Box, useMediaQuery, useTheme } from '@mui/material';

export default function MobileBottomSpacer({ children }) {
  const theme = useTheme();
  // Evaluamos si estamos en pantalla pequeña (xs), igual que en tu BottomNav
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {children}
      {isMobile && (
        <Box sx={{ height: '60px', display: { xs: 'block', sm: 'none' } }} />
      )}
    </>
  );
}