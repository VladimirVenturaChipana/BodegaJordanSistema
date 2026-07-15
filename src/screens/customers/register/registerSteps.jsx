import { Box, Typography } from "@mui/material";

export default function StepIcon({ number, text, icon: Icon }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{
        width: { xs: 100, sm: 120, md: 120 },
        height: { xs: 100, sm: 120, md: 120 },
        borderRadius: '50%',
        border: (theme) => `4px solid ${theme.palette.primary.main}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.08)',
        }
      }}>
        <Icon sx={{ fontSize: 50, color: 'primary.main' }} />
        <Box sx={{
          position: 'absolute',
          bottom: -4,
          right: -4,
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          border: '3px solid white',
          fontSize: '1.1rem'
        }}>
          {number}
        </Box>
      </Box>
      <Typography sx={{ mt: 1.5, fontWeight: 'bold', color: 'primary.main', letterSpacing: 0.5, fontSize: '1.1rem' }}>
        {number}. {text}
      </Typography>
    </Box>
  );
}