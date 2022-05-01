import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export default function ({ formik }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <FormControl fullWidth error={Boolean(formik.touched.goal && formik.errors.goal)}>
          <InputLabel id="select-goal-label">Your goal</InputLabel>
          <Select
            labelId="select-goal-label"
            id="select-goal"
            name="goal"
            label="Your goal"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.goal}
          >
            <MenuItem value="lose">Lose weight</MenuItem>
            <MenuItem value="maintain">Maintain weight</MenuItem>
            <MenuItem value="gain">Gain weight</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControl fullWidth error={Boolean(formik.touched.gender && formik.errors.gender)}>
          <InputLabel id="select-gender-label">Gender</InputLabel>
          <Select
            labelId="select-gender-label"
            id="select-gender"
            name="gender"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.gender}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="unspecified">Prefer not to say</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          error={Boolean(formik.touched.age && formik.errors.age)}
          required
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.age}
          name="age"
          label="Age"
          fullWidth
          variant="standard"
          type="number"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          error={Boolean(formik.touched.weight && formik.errors.weight)}
          required
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.weight}
          name="weight"
          label="Weight (kg)"
          fullWidth
          variant="standard"
          type="number"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          error={Boolean(formik.touched.height && formik.errors.height)}
          required
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.height}
          name="height"
          label="Height (cm)"
          fullWidth
          variant="standard"
          type="number"
        />
      </Grid>
    </Grid>
  );
}
