import React from 'react';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const itemData = [
  {
    img: 'https://www.clarin.com/img/2022/11/30/X5vJ94Omm_2000x1500__1.jpg',
    title: 'Dinero1',
  },
  {
    img: 'https://i.blogs.es/b3a45a/dineroefectivo/1366_2000.jpg',
    title: 'Dinero2',
  },
  {
    img: 'https://plus.unsplash.com/premium_photo-1681469490618-c24cc20bef1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVjaG8lMjBkaW5lcm98ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    title: 'Dinero3',
  },

];

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>
        Esto es una página de criptomonedas en cada una podrá visualizar sus características y sus valores.
      </p>
      <Box sx={{ width: 1000, height: 1080, overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar position="below" title={item.author} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}
