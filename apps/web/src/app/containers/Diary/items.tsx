import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

export default function (props) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {props.items.map((item, i) => {
        return (
          <Fragment key={item.food_name + i}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={item.photo.thumb} />
              </ListItemAvatar>
              <ListItemText
                primary={item.food_name}
                secondary={
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    {item.serving_unit}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        );
      })}
    </List>
  );
}
