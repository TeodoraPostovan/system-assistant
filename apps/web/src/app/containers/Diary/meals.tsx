import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionActions, Box, Button, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';

import { api } from '../../api';
import { AppContext } from '../../state/state';
import ItemsList from './items';
import MealDialog from './meal-dialog';

export default function () {
  const [expanded, setExpanded] = useState<string | false>(false);
  // const [activeOption, setActiveOption] = useState('');
  const [dialogOpened, setDialogOpened] = useState('');
  const { meals, setMeals } = useContext(AppContext);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = (value: any) => {
    setDialogOpened('');
    console.log(dialogOpened, value);
    if (dialogOpened && value) {
      setMeals({ ...value, type: dialogOpened.toLowerCase() });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AccordionItem
        title="Breakfast"
        items={meals.breakfast}
        onChange={handleChange('Breakfast')}
        onClick={() => setDialogOpened('Breakfast')}
        active={expanded === 'Breakfast'}
      />
      <AccordionItem
        title="Lunch"
        items={meals.lunch}
        onChange={handleChange('Lunch')}
        active={expanded === 'Lunch'}
        onClick={() => setDialogOpened('Lunch')}
      />
      <AccordionItem
        title="Dinner"
        items={meals.dinner}
        onChange={handleChange('Dinner')}
        active={expanded === 'Dinner'}
        onClick={() => setDialogOpened('Dinner')}
      />
      <AccordionItem
        title="Snacks"
        items={meals.snacks}
        onChange={handleChange('Snacks')}
        active={expanded === 'Snacks'}
        onClick={() => setDialogOpened('Snacks')}
      />

      <MealDialog title="Add a meal" open={!!dialogOpened} onClose={handleClose} />
    </Box>
  );
}

function AccordionItem(props: any) {
  const { title, active, onChange, onClick, items } = props;
  const subtitle = items.length === 1 ? `${items.length} meal` : `${items.length} meals`;

  return (
    <Accordion expanded={active} onChange={onChange} sx={{ width: '100%' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{title}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ItemsList items={items} />
      </AccordionDetails>
      <AccordionActions>
        <Button variant="contained" onClick={onClick}>
          Add
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
