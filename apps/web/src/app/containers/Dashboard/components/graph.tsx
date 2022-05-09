/* eslint-disable simple-import-sort/imports */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import fil from 'date-fns/esm/locale/fil/index.js';
import { zonedTimeToUtc } from 'date-fns-tz';
import { format } from 'date-fns';

import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { AppContext } from '../../../state/state';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Graph = (props) => {
  const theme = useTheme();

  const { weeklyMetrics } = useContext(AppContext);

  const labels = Object.keys(weeklyMetrics || {}).map((ts: string) => {
    return format(zonedTimeToUtc(+ts, 'UTC'), 'EEEE');
  });

  const dataPointsCalories = Object.keys(weeklyMetrics || {}).map((ts: string) => {
    return weeklyMetrics[ts].dailyMetrics.calories;
  });
  const dataPointsExerciseDuration = Object.keys(weeklyMetrics || {}).map((ts: string) => {
    return weeklyMetrics[ts].dailyMetrics.exerciseDuration;
  });

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        borderColor: '#3F51B5',
        lineTension: 0.5,
        borderRadius: 4,
        data: dataPointsCalories,
        label: 'Calories',
        yAxisID: 'y1'
      },
      {
        backgroundColor: '#10B981',
        borderColor: '#10B981',
        lineTension: 0.5,
        borderRadius: 4,
        data: dataPointsExerciseDuration,
        label: 'Exercise duration (minutes)',
        yAxisID: 'y2'
      }
    ],
    labels
  };

  const options = {
    cornerRadius: 20,
    layout: { padding: 0 },
    // legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    scales: {
      y1: {
        type: 'linear' as any,
        display: true,
        position: 'left' as any
      },
      y2: {
        type: 'linear' as any,
        display: true,
        position: 'right' as any,

        // grid line settings
        grid: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        }
      }
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        // action={
        //   <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
        //     This week
        //   </Button>
        // }
        titleTypographyProps={{ variant: 'h5' }}
        title="Last 7 days overview"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      ></Box>
    </Card>
  );
};
