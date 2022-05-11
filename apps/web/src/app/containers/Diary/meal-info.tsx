import BoltIcon from '@mui/icons-material/Bolt';
import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

export default function ({ meal }) {
  return meal && <Description key={meal.food_name} {...meal} />;
}

const nutrients = {
  nf_calories: {
    unit: 'kcal',
    name: 'Energy'
  },
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
  }
};

function Description(props) {
  const chips = useMemo(() => {
    return Object.keys(nutrients)
      .filter((key) => !!props[key])
      .map((key) => {
        const label = `${nutrients[key].name}: ${props[key]} ${nutrients[key].unit}`;
        const chip: any = {
          color: 'primary',
          label,
          key,
          size: 'small',
          variant: 'outlined'
        };

        if (key === 'nf_calories') {
          chip.color = undefined;
          chip.icon = <BoltIcon />;
        }

        return chip;
      });
  }, [props]);

  return (
    <Card>
      <CardMedia component="img" height="255" image={props.photo.highres} sx={{ objectFit: 'contain' }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.food_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.serving_unit} {props.serving_weight_grams}g
        </Typography>
        <Chips list={chips} />
      </CardContent>
    </Card>
  );
}

function Chips({ list }) {
  return (
    <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
