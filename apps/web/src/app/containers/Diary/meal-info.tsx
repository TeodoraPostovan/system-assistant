import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import throttle from 'lodash/throttle';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as React from 'react';

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

export default function ({ meal, onChange }) {
  const [info, setInfo] = useState();

  useEffect(() => {
    (async () => {
      if (!meal) {
        return;
      }

      const info = await getInfo(meal);
      setInfo(info);
      onChange(info);
    })();
  }, [meal]);

  const getInfo = useCallback(async (params) => {
    const res = await axios.post(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      {
        query: params.food_name
      },
      {
        headers: {
          'x-app-id': 'ff9a3bdb',
          'x-app-key': '8bda8469b0cb3b9ac91ecb4e3e6d10af'
        }
      }
    );

    return res.data.foods[0];
  }, []);

  return info ? <Description key={meal.food_name} {...info} /> : null;
}

const nutrients = {
  nf_total_carbohydrate: {
    unit: 'g',
    name: 'Carbohydrate, by difference'
  },
  nf_protein: {
    unit: 'g',
    name: 'Protein'
  },
  nf_total_fat: {
    unit: 'g',
    name: 'Total lipid (fat)'
  },
  nf_saturated_fat: {
    unit: 'g',
    name: 'Fatty acids, total saturated'
  },
  nf_trans_fatty_acid: {
    unit: 'g',
    name: 'Fatty acids, total trans'
  },
  nf_sugars: {
    unit: 'g',
    name: 'Sugars, total'
  },
  nf_added_sugars: {
    unit: 'g',
    name: 'Sugars, added'
  },
  nf_dietary_fiber: {
    unit: 'g',
    name: 'Fiber, total dietary'
  },
  nf_cholesterol: {
    unit: 'mg',
    name: 'Cholesterol'
  },
  nf_potassium: {
    unit: 'mg',
    name: 'Potassium, K'
  },
  nf_sodium: {
    unit: 'mg',
    name: 'Sodium, Na'
  },
  nf_calcium_mg: {
    unit: 'mg',
    name: 'Calcium, Ca'
  },
  nf_vitamin_d_mcg: {
    unit: 'IU',
    name: 'Vitamin D'
  },
  nf_calories: {
    unit: 'kcal',
    name: 'Energy'
  }
};

function Description(props) {
  const chips = useMemo(() => {
    return Object.keys(nutrients)
      .filter((key) => !!props[key])
      .map((key) => {
        const text = `${nutrients[key].name}: ${props[key]} ${nutrients[key].unit}`;
        if (nutrients[key].name === 'Energy') {
          return (
            <ListItem key={text}>
              <Chip key={key} label={text} variant="filled" />
            </ListItem>
          );
        }
        return (
          <ListItem key={text}>
            <Chip key={text} label={text} variant="outlined" />
          </ListItem>
        );
      });
  }, [props]);

  return (
    <Card>
      <CardMedia component="img" height="auto" image={props.photo.highres} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.food_name}
        </Typography>
        {/* <Chip label="Chip Outlined" variant="outlined" /> */}

        <Typography variant="body2" color="text.secondary">
          {props.serving_unit}
        </Typography>
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
            boxShadow: 'none'
          }}
          component="ul"
        >
          {chips}
        </Paper>
      </CardContent>
    </Card>
  );
}
