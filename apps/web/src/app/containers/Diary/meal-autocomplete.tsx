import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import throttle from 'lodash/throttle';
import { useEffect, useMemo, useState } from 'react';

interface Food {
  food_name: string;
  serving_unit: string;
  tag_name: string;
  serving_qty: number;
  common_type: null;
  tag_id: string;
  photo: {
    thumb: string;
  };
  locale: string;
}

export default function (props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Food[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value) {
      props.onChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const fetch = useMemo(
    () =>
      throttle(async (query: string, callback: (results?: any) => void) => {
        if (!query) {
          return callback([]);
        }

        const results = await axios.get('https://trackapi.nutritionix.com/v2/search/instant', {
          headers: {
            'x-app-id': 'ff9a3bdb',
            'x-app-key': '8bda8469b0cb3b9ac91ecb4e3e6d10af'
          },
          params: {
            query
          }
        });

        callback(results.data.common);
      }, 500),
    []
  );

  useEffect(() => {
    setLoading(true);
    fetch(inputValue, (results) => {
      setOptions(results);
      setLoading(false);
    });
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event: any, newValue: any) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.food_name === value.food_name}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.food_name)}
      options={options}
      loading={loading}
      value={value}
      inputValue={inputValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search meals"
          variant="filled"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      renderGroup={(props) => <List sx={{ width: '100%', bgcolor: 'background.paper' }}></List>}
      renderOption={(props, option) => (
        <ListItem alignItems="flex-start" {...props}>
          <ListItemAvatar>
            <Avatar alt={option.food_name} src={option.photo.thumb} />
          </ListItemAvatar>
          <ListItemText primary={option.food_name} />
        </ListItem>
      )}
    />
  );
}
