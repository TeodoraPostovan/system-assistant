import { Box, Container, Grid } from '@mui/material';

import CurrentDatePicker from '../../components/CurrentDatePicker';
import { CalorieTracker } from './components/calorie-tracker';
import { ExerciseProgress } from './components/exercise-progress';
import { Graph } from './components/graph';
import { WaterTracker } from './components/water-tracker';

const Dashboard = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8
    }}
  >
    <Container maxWidth={false}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <CurrentDatePicker />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xl={4} lg={6} sm={6} xs={12}>
          <CalorieTracker />
        </Grid>
        <Grid item xl={4} lg={6} sm={6} xs={12}>
          <WaterTracker />
        </Grid>
        <Grid item xl={4} lg={12} sm={12} xs={12}>
          <ExerciseProgress />
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Graph />
        </Grid>
        {/* <Grid item lg={4} md={6} xl={3} xs={12}>
          <TrafficByDevice sx={{ height: '100%' }} />
        </Grid> */}
      </Grid>
    </Container>
  </Box>
);

// Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
