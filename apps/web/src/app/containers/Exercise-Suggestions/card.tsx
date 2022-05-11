import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {
  Box,
  Button,
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
import MobileStepper from '@mui/material/MobileStepper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { BASE_IMG_URL } from '../../utils/utils';

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

export const ExerciseCard = ({ product, ...rest }) => {
  const [expanded, setExpanded] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = product.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const chipList = [
    {
      color: 'primary',
      icon: <CategoryIcon />,
      variant: 'outlined',
      label: product.category,
      key: 'category',
      size: 'small'
    },
    {
      color: 'primary',
      icon: <AccessibilityNewIcon />,
      variant: 'outlined',
      label: product.level,
      key: 'level',
      size: 'small'
    },
    {
      color: 'primary',
      icon: <FitnessCenterIcon />,
      variant: 'outlined',
      label: `Muscles: ${product.primaryMuscles.concat(product.secondaryMuscles).join(', ')}`,
      key: 'muscles',
      size: 'small'
    }
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
      <CardMedia component="div">
        <SwipeableViews axis={'x'} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
          {product.images.map((step, index) => {
            return Math.abs(activeStep - index) <= 2 ? (
              <Box
                key={step}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <Box
                  component="img"
                  sx={{
                    // minHeight: 255,
                    display: 'block',
                    // maxWidth: 400,
                    overflow: 'hidden'
                    // width: '100%'
                  }}
                  src={`${BASE_IMG_URL}/static/exercises/${step}`}
                  alt={step}
                />
              </Box>
            ) : null;
          })}
        </SwipeableViews>
        <MobileStepper
          sx={{
            backgroundColor: '#fff'
          }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {<KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {/* {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
              {<KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </CardMedia>
      <CardContent sx={{ py: 0 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Chips list={chipList} />
        <Collapse in={expanded} timeout="auto" collapsedSize="70px">
          {product.instructions &&
            product.instructions.map((text) => (
              <Typography key={text} variant="body2" color="text.secondary">
                {text}
              </Typography>
            ))}
        </Collapse>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      {/* <Divider /> */}
      <CardActions disableSpacing>
        {/* <IconButton aria-label="Open recipe" href={product.sourceUrl} target="_blank">
          <OpenInNewIcon />
        </IconButton> */}
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
