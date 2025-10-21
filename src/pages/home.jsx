import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router';
import Drawer from '../components/Drawer';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [limit, setLimit] = useState(0); // 0 = mostrar todas
  const [orden, setOrden] = useState('asc'); // 'asc' o 'desc'

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then((res) => res.json())
      .then((data) => {
        const ordenadas = data.sort((a, b) => a.current_price - b.current_price);
        setCoins(ordenadas);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const ordenarCoins = (tipo) => {
    const ordenadas = [...coins].sort((a, b) =>
      tipo === 'asc' ? a.current_price - b.current_price : b.current_price - a.current_price
    );
    setCoins(ordenadas);
    setOrden(tipo);
  };

  const coinsToShow = limit > 0 ? coins.slice(0, limit) : coins;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer limit={limit} onChangeLimit={setLimit} onOrdenar={ordenarCoins} orden={orden} />

      <Grid container spacing={3} sx={{ paddingRight: '240px' }}>
        {coinsToShow.map((coin) => (
          <Grid item xs={12} sm={6} md={4} key={coin.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 300, // altura fija para todas las tarjetas
              }}
            >
              <CardActionArea
                component={Link}
                to={`/detail/${coin.id}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  padding: 2,
                }}
              >
                <Box>
                  <CardMedia
                    component="img"
                    image={coin.image}
                    alt={coin.name}
                    sx={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      marginBottom: 2,
                    }}
                  />
                  <Typography variant="h6">{coin.name}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{coin.symbol}</Typography>
                </Box>
                <Typography sx={{ color: 'green', fontWeight: 'bold', mt: 1 }}>
                  {coin.current_price} usd
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
