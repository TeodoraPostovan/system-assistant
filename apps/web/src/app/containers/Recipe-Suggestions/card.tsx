import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography
} from '@mui/material';
import { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export const RecipeCard = ({ product, ...rest }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const chipList = [
    ...product.cuisines.map((item) => {
      return {
        color: 'primary',
        variant: 'outlined',
        label: item,
        key: item,
        size: 'small'
      };
    }),
    ...product.diets.map((item) => {
      return {
        color: 'secondary',
        label: item,
        key: item,
        size: 'small'
      };
    }),
    product.readyInMinutes && {
      // color: 'secondary',
      label: `Ready in ${product.readyInMinutes} minutes`,
      icon: <AccessTimeIcon />,
      key: 'ready-in-minutes',
      size: 'small',
      variant: 'outlined'
    },
    product.nutrition?.weightPerServing?.amount && {
      label: `${product.nutrition.weightPerServing.amount} ${product.nutrition.weightPerServing.unit} per serving`,
      icon: <RestaurantIcon />,
      key: 'serving-size',
      size: 'small',
      variant: 'outlined'
    },
    ...product.nutrition.nutrients
      .filter((item) => ['Calories', 'Fat', 'Protein', 'Sugar', 'Fiber', 'Carbohydrates'].includes(item.name))
      .map((item) => {
        return {
          color: 'info',
          label: `${item.name}: ${item.amount} ${item.unit}`,
          variant: 'outlined',
          key: item.name,
          size: 'small'
        };
      })
  ].filter(Boolean);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardMedia component="img" height="250" image={product.image} alt="Paella dish" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Chips list={chipList} />
        <Collapse in={expanded} timeout="auto" collapsedSize="70px">
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: product.summary }}
          ></Typography>
        </Collapse>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <CardActions disableSpacing>
        <IconButton aria-label="Open recipe" href={product.sourceUrl} target="_blank">
          <OpenInNewIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

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
