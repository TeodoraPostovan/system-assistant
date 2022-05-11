import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { DialogActions, DialogContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import MealAutocomplete from './meal-autocomplete';
import MealInfo from './meal-info';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface DialogProps {
  open: boolean;
  title: string;
  onClose: (value: string) => void;
}

export default function (props: DialogProps) {
  const { onClose, open } = props;
  const [meal, setMeal] = useState();
  const [mealInfo, setMealInfo] = useState();

  const handleClose = (ev?) => {
    onClose(ev);
    setMealInfo(null);
    console.log(ev);
  };

  useEffect(() => {
    (async () => {
      if (!meal) {
        return;
      }

      const info = await getInfo(meal);
      setMealInfo(info);
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

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <MealAutocomplete onChange={setMeal} />
        {mealInfo && <MealInfo meal={mealInfo} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => handleClose(mealInfo)}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

function A() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      {/* <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} /> */}
    </div>
  );
}
