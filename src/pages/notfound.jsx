import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h1" component="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Lo sentimos, la página que buscas no existe.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = '/home')}
      >
        Volver al inicio
      </Button>
    </Box>
  );
}
