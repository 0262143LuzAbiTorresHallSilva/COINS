import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Typography, Card, CardMedia, CircularProgress } from '@mui/material';

export default function Detail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar la moneda');
        return res.json();
      })
      .then(data => {
        setCoin(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Función para limpiar la descripción HTML
  const cleanDescription = (html) => {
    if (!html) return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!coin) return null;

  // Comparar precios para saber si subió o bajó
  const priceChange = coin.market_data?.price_change_24h;
  const priceCurrent = coin.market_data?.current_price?.usd;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          image={coin.image?.large}
          alt={coin.name}
          sx={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          {coin.name}
        </Typography>
        <Typography variant="h6" color={priceChange >= 0 ? 'green' : 'red'} gutterBottom>
          Precio actual: ${priceCurrent?.toLocaleString()} USD {priceChange >= 0 ? '📈' : '📉'}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
          {cleanDescription(coin.description?.en)}
        </Typography>
      </Card>
    </Box>
  );
}
