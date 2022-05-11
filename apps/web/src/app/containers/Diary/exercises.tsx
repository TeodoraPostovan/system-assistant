import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoltIcon from '@mui/icons-material/Bolt';
import { Box, Card, CardContent, Chip, Grid, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useCallback, useContext, useState } from 'react';

import { AppContext } from '../../state/state';

export default function () {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { exercises, setExercises } = useContext(AppContext);

  const onSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();
      setLoading(true);
      const exercise = await fetchExercises(value);
      setExercises({
        ...exercise,
        query: value
      });
      setLoading(false);
    },
    [value, exercises]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Your activity"
          variant="outlined"
          type="text"
          sx={{ minWidth: '400px' }}
          value={value}
          helperText="What activity did you do? For example, 30 minutes run, or 1 hour yoga"
          onChange={(e) => setValue(e.target.value)}
        />
        {loading && <CircularProgress size={30} sx={{ marginLeft: '20px' }} />}
      </form>
      <ActivityItems items={exercises} />
    </Box>
  );
}

function ActivityItems(props) {
  const renderChips = (item) => [
    {
      color: 'primary',
      label: `${item.duration_min} minutes`,
      key: 'duration_min',
      icon: <AccessTimeIcon />,
      size: 'small',
      variant: 'outlined'
    },
    {
      color: 'primary',
      label: `Burned ${item.nf_calories} calories`,
      key: 'nf_calories',
      icon: <BoltIcon />,
      size: 'small',
      variant: 'outlined'
    }
  ];

  return (
    <Grid container spacing={2}>
      {props.items.map((item, i) => {
        return (
          <Grid item xs={3} key={item.name + i}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent sx={{ py: '16px', px: '12px' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.query}
                </Typography>
              </CardContent>
              <Chips list={renderChips(item)} />
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

async function fetchExercises(query: string) {
  const res = await axios.post(
    'https://trackapi.nutritionix.com/v2/natural/exercise',
    {
      query
    },
    {
      headers: {
        'x-app-id': 'ff9a3bdb',
        'x-app-key': '8bda8469b0cb3b9ac91ecb4e3e6d10af'
      }
    }
  );

  return res.data.exercises[0];
}

function Chips({ list }) {
  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }}>
      {list.map((data) => {
        const { key, ...rest } = data;
        return (
          <ListItem key={data.key} sx={{ padding: '4px', width: 'auto' }}>
            <Chip {...rest} />
          </ListItem>
        );
      })}
    </List>
  );
}
