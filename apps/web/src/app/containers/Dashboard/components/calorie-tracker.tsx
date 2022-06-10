/* eslint-disable simple-import-sort/imports */
import BreakfastDiningOutlinedIcon from '@mui/icons-material/BreakfastDiningOutlined';
import EggAltOutlinedIcon from '@mui/icons-material/EggAltOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import { Avatar, Box, Card, CardContent, Divider, Grid, LinearProgress, Typography, useTheme } from '@mui/material';
import { ArcElement, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext } from 'react';
import { AppContext } from '../../../state/state';

Chart.register(ArcElement);

export const CalorieTracker = (props) => {
  const theme = useTheme();

  const { userInfo, dailyMetrics } = useContext(AppContext);

  const data = {
    datasets: [
      {
        data: [dailyMetrics?.carbs, dailyMetrics?.protein, dailyMetrics?.fat],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['CARBS', 'PROTEIN', 'FAT']
  };

  const options = {
    // animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const nutritients = [
    {
      key: 'carbs',
      title: `${dailyMetrics?.carbs}/${dailyMetrics?.dailySuggestedCarbs}g`,
      value: Math.round((100 * dailyMetrics?.carbs) / dailyMetrics?.dailySuggestedCarbs),
      icon: BreakfastDiningOutlinedIcon,
      color: '#3F51B5'
    },
    {
      key: 'protein',
      title: `${dailyMetrics?.protein}/${dailyMetrics?.dailySuggestedProtein}g`,
      value: Math.round((100 * dailyMetrics?.protein) / dailyMetrics?.dailySuggestedProtein),
      icon: EggAltOutlinedIcon,
      color: '#E53935'
    },
    {
      key: 'fat',
      title: `${dailyMetrics?.fat}/${dailyMetrics?.dailySuggestedFat}g`,
      value: Math.round((100 * dailyMetrics?.fat) / dailyMetrics?.dailySuggestedFat),
      icon: OpacityOutlinedIcon,
      color: '#FB8C00'
    }
  ];

  if (!dailyMetrics) {
    return null;
  }

  const dailyCaloriesPercent = Math.min(
    Math.round((dailyMetrics.calories * 100) / dailyMetrics.dailySuggestedCalories),
    100
  );

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textPrimary" variant="h4">
              Daily Intake
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            >
              <LocalFireDepartmentTwoToneIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <Typography color="textPrimary" variant="h5">
            {dailyMetrics.calories} kcal/{dailyMetrics.dailySuggestedCalories} kcal
          </Typography>
          <LinearProgress value={dailyCaloriesPercent} variant="determinate" />
          <Typography color="textSecondary" variant="body1">
            {dailyCaloriesPercent}% of daily recommended calories consumed
          </Typography>
        </Box>
        <Box sx={{ m: 2 }}>
          <Divider variant="middle" />
        </Box>
        <Box sx={{ height: 300, position: 'relative' }}>
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {nutritients.map(({ color, icon: Icon, title, value, key }) => (
            <Box
              key={key}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
