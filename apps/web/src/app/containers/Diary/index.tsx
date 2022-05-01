import { Box, Card, CardContent, Container, Grid, IconButton, Typography } from '@mui/material';

import CurrentDatePicker from '../../components/CurrentDatePicker';
import Exercises from './exercises';
import Meals from './meals';

const MealsDiary = (props) => {
  return (
    <Card sx={{ width: '100%' }} {...props}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Meals log
        </Typography>

        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Meals />
        </Box>
      </CardContent>
    </Card>
  );
};

const ExerciseDiary = (props) => {
  return (
    <Card sx={{ width: '100%' }} {...props}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Exercise log
        </Typography>

        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Exercises />
        </Box>
      </CardContent>
    </Card>
  );
};

export default (props) => (
  <LayoutWrapper>
    <MealsDiary {...props}></MealsDiary>
    <ExerciseDiary {...props}></ExerciseDiary>
  </LayoutWrapper>
);

const LayoutWrapper = (props) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8
    }}
  >
    <Container maxWidth={false}>
      <Grid container spacing={0}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <CurrentDatePicker />
        </Grid>
        {props.children}
      </Grid>
    </Container>
  </Box>
);
