import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import { Avatar, Box, Card, CardContent, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../../state/state';
import exercises from '../../Diary/exercises';
import { Burn } from './ burn-calories';

export const ExerciseProgress = (props) => {
  const { dailyMetrics, exercise } = useContext(AppContext);

  const value = Math.min(Math.round(((dailyMetrics?.exerciseDuration || 0) * 100) / 60), 100);

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h4">
              Exercise Progress
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <Typography color="textPrimary" variant="h5">
            {dailyMetrics?.exerciseDuration || 0} of 60 active minutes
          </Typography>
          <LinearProgress value={value} variant="determinate" />
          <Typography color="textSecondary" variant="body1">
            {value}% of daily recommended minutes of activity
          </Typography>
        </Box>
        <Box sx={{ m: 2 }}>
          <Divider variant="middle" />
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
          <Link to="/mydiary">
            <Burn
              sx={{
                height: 42,
                width: 42
              }}
            />
          </Link>
          <Typography color="textPrimary" variant="body1">
            {dailyMetrics?.burnedCalories || 0} of burned calories today
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
