import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { api } from '../../api';
import { RecipeCard } from './card';

export default function Suggestions() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);

  const perPage = 12;
  const count = Math.ceil(recipes.length / perPage);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/recipe/recommendations');
      setRecipes(data);
    })();
  }, []);

  const onChange = useCallback((_, page: number) => {
    setPage(page - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            {recipes.slice(page * perPage, (page + 1) * perPage).map((product) => (
              <Grid item key={product.id} lg={3} md={6} xs={12}>
                <RecipeCard product={product} />
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            sx={{
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <Pagination count={count} page={page + 1} color="primary" onChange={onChange} />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
