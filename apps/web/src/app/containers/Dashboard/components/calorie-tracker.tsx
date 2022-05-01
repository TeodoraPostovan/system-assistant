/* eslint-disable simple-import-sort/imports */
import BreakfastDiningOutlinedIcon from '@mui/icons-material/BreakfastDiningOutlined';
import EggAltOutlinedIcon from '@mui/icons-material/EggAltOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import { Avatar, Box, Card, CardContent, Divider, Grid, LinearProgress, Typography, useTheme } from '@mui/material';
import { ArcElement, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement);

export const CalorieTracker = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [50, 20, 30],
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
      title: '106.5/213g',
      value: 50,
      icon: BreakfastDiningOutlinedIcon,
      color: '#3F51B5'
    },
    {
      title: '18/85g',
      value: 20,
      icon: EggAltOutlinedIcon,
      color: '#E53935'
    },
    {
      title: '17.1/57g',
      value: 30,
      icon: OpacityOutlinedIcon,
      color: '#FB8C00'
    }
  ];

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
            651.9 kcal/1705 kcal
          </Typography>
          <LinearProgress value={38} variant="determinate" />
          <Typography color="textSecondary" variant="body2">
            38% of daily recommended calories consumed
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
          {nutritients.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
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
