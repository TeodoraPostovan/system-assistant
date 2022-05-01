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
import * as React from 'react';
import { useState } from 'react';

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
    console.log(ev);
  };

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <MealAutocomplete onChange={setMeal} />
        <MealInfo meal={meal} onChange={setMealInfo} />
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
