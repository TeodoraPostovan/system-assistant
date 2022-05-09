import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { api } from '../../api';
import { ExerciseCard } from './card';

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(0);

  const perPage = 12;
  const count = Math.ceil(suggestions.length / perPage);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/exercise/recommendations');
      setSuggestions(data);
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
            Exercise suggestions
          </Typography>
          <Typography sx={{ m: 1 }} variant="subtitle1">
            Your personal recommendations based on the survey
          </Typography>
          <Grid container spacing={3}>
            {suggestions.slice(page * perPage, (page + 1) * perPage).map((product) => (
              <Grid item key={product._id} lg={4} md={6} xs={12}>
                <ExerciseCard product={product} />
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
