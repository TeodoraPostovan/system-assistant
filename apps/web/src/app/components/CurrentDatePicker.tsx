import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid, IconButton, Typography } from '@mui/material';
import { format } from 'date-fns';
import { isToday } from 'date-fns/esm';
import { useContext } from 'react';

import { AppContext } from '../state/state';

export default function () {
  const { selectedDate, setPrevDay, setNextDay } = useContext(AppContext);
  let title = format(selectedDate, 'PPPP');
  if (isToday(selectedDate)) {
    title = `Today, ${title}`;
  }
  return (
    <Grid container spacing={0} sx={{ flex: 1, width: '100%' }}>
      <IconButton aria-label="delete" onClick={setPrevDay}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography color="textPrimary" gutterBottom variant="h5" sx={{ flexGrow: 1, textAlign: 'center' }}>
        {title}
      </Typography>
      <IconButton aria-label="delete" onClick={setNextDay}>
        <ChevronRightIcon />
      </IconButton>
    </Grid>
  );
}
