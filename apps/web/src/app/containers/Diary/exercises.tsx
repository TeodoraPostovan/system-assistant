import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoltIcon from '@mui/icons-material/Bolt';
import { Box, Chip, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Fragment } from 'react';
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
    <Box>
      <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Your activity"
          variant="outlined"
          type="text"
          sx={{ minWidth: '400px' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {loading && <CircularProgress size={30} sx={{ marginLeft: '20px' }} />}
      </form>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
          boxShadow: 'none'
        }}
      >
        <ActivityItems items={exercises} />
      </Box>
    </Box>
  );
}

function ActivityItems(props) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {props.items.map((item) => {
        return (
          <Fragment key={item.name}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={item.photo.thumb} />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    {item.query}
                  </Typography>
                }
              />
              {item.duration_min && (
                <Chip icon={<AccessTimeIcon />} label={`${item.duration_min} minutes`} variant="outlined" />
              )}
              {item.nf_calories && (
                <Chip icon={<BoltIcon />} label={`Burned ${item.nf_calories} calories`} variant="outlined" />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        );
      })}
    </List>
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
