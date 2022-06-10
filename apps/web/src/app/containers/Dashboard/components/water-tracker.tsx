import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../../state/state';

const ProgressBoxContainer = styled.div`
  max-width: 70%;
  width: 100%;
  background-color: #a5d7fe;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  position: relative;
`;

const ProgressBox = styled.div<{ progress: number }>`
  background-color: #2196f3;
  position: absolute;
  width: 100%;
  bottom: 0;
  transition: 0.5s ease;

  ${({ progress }) => {
    return `height: ${progress}%`;
  }}
`;

const WaterDropContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const WaterTracker = (props) => {
  const { waterLog, saveWaterLog } = useContext(AppContext);

  const { quantity, cups } = waterLog || { quantity: 0, cups: 0 };

  const clickHandler = useCallback(
    (waterQuantity: number) => {
      saveWaterLog(waterQuantity);
    },
    [saveWaterLog, waterLog]
  );

  const progress = Math.min((quantity * 100) / 2000, 100);
  const liters = quantity / 1000;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...props}
    >
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textPrimary" variant="h4">
              Water Log
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56
              }}
            >
              <LocalDrinkIcon />
            </Avatar>
          </Grid>
        </Grid>

        <Box sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <WaterDropContainer>
                <SideInfoIcon />
                <Typography gutterBottom variant="subtitle1" component="span">
                  {cups}/10 cups
                </Typography>
              </WaterDropContainer>

              <WaterDropContainer>
                <WaterDropIcon />
                <Typography gutterBottom variant="subtitle1" component="span">
                  {liters}l/2.0l
                </Typography>
              </WaterDropContainer>
            </Box>

            <ProgressBoxContainer>
              <Box sx={{ zIndex: '1' }}>{progress}%</Box>
              <ProgressBox progress={progress} />
            </ProgressBoxContainer>
          </Box>
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions>
        <Button onClick={() => clickHandler(100)} variant="outlined">
          + 100ml
        </Button>
        <Button onClick={() => clickHandler(200)} variant="outlined">
          + 200ml
        </Button>
        <Button onClick={() => clickHandler(500)} variant="outlined">
          + 500ml
        </Button>
      </CardActions>
    </Card>
  );
};

function SideInfoIcon() {
  return (
    <svg viewBox="0 0 512 512">
      <path
        style={{ fill: '#a5d7fe' }}
        d="M443.873,5.28c-3.032-3.36-7.346-5.278-11.872-5.28h-352c-8.836-0.044-16.036,7.083-16.08,15.92
                      c-0.003,0.561,0.024,1.122,0.08,1.68l48,480c0.825,8.206,7.752,14.441,16,14.4h256c8.248,0.041,15.175-6.194,16-14.4l48-480
                      C448.458,13.091,446.954,8.603,443.873,5.28z"
      />
    </svg>
  );
}

function WaterDropIcon() {
  return (
    <svg viewBox="0 0 512 512">
      <path
        style={{ fill: '#2196F3' }}
        d="M256.2,0c-23.6,92.2-62.2,181.2-119.7,257.6c-55.9,61.4-44.9,167.8,20.5,219
                      c27.6,22.8,63.8,35.4,99.2,35.4s71.7-12.6,99.2-35.4c65.4-51.2,75.6-157.5,20.5-219C318.4,181.2,279.8,92.2,256.2,0z"
      />
      <path
        style={{ fill: '#2196F3' }}
        d="M257,19.7c-13.4,64.6-34.7,126.8-66.2,180.4c-30.7,42.5-25.2,115.8,11,151.2
                      c15,15.8,35.4,24.4,55.1,24.4s40.2-8.7,55.1-24.4c36.2-35.4,41.7-108.7,11-151.2C291.6,147.3,269.6,84.3,257,19.7z"
      />
    </svg>
  );
}
