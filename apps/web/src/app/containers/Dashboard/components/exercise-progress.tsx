import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import { useContext } from 'react';

import { AppContext } from '../../../state/state';

export const ExerciseProgress = (props) => {
  const { dailyMetrics } = useContext(AppContext);

  const value = Math.min(Math.round(((dailyMetrics?.exerciseDuration || 0) * 100) / 60), 100);

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Exercise Progress
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {dailyMetrics?.exerciseDuration || 0} of 60 active minutes
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
          <LinearProgress value={value} variant="determinate" />
          <Typography color="textPrimary" variant="h4">
            {value}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
