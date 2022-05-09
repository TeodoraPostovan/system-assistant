import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { api } from '../../api';
import { RecipeCard } from './card';

export default function Suggestions() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/recipe/recommendations');
      setRecipes(data);
    })();
  }, []);

  return (
    <Box component="main">
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <Typography sx={{ m: 1 }} variant="h4">
            Recipe suggestions
          </Typography>
          <Typography sx={{ m: 1 }} variant="subtitle1">
            Your personal recommendations based on the survey
          </Typography>
          <Grid container spacing={3}>
            {recipes.map((product) => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <RecipeCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
