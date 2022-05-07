import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function ({ formik }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <FormControl fullWidth error={Boolean(formik.touched.allergies && formik.errors.allergies)}>
          <InputLabel id="allergies-label">Which restrictions/allergies do you have?</InputLabel>
          <Select
            labelId="allergies-label"
            id="allergies"
            multiple
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.allergies}
            input={<OutlinedInput name="allergies" label="Which restrictions/allergies do you have?" />}
            renderValue={(selected) => selected.join(', ')}
            // MenuProps={MenuProps}
          >
            {restrictions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl fullWidth error={Boolean(formik.touched.diagnosis && formik.errors.diagnosis)}>
          <InputLabel id="diagnosis-label">Have you ever had any of the following conditions?</InputLabel>
          <Select
            labelId="diagnosis-label"
            id="diagnosis"
            multiple
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.diagnosis}
            input={<OutlinedInput name="diagnosis" label="Have you ever had any of the following conditions?" />}
            renderValue={(selected) => selected.join(', ')}
            // MenuProps={MenuProps}
          >
            {diagnosis.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const restrictions = [
  'Veganism',
  'Vegetarianism',
  'Pescetarianism',
  'Gluten-free',
  'Dairy-free',
  'Egg-free',
  'Peanut-free',
  'Other',
  'None'
];

const diagnosis = [
  'Diabetes',
  'High blood pressure',
  'High cholesterol',
  'Depression',
  'Eat disorders',
  'Heart condition',
  'Kidney disease',
  'Liver disease',
  'Other',
  'None'
];