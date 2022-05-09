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

export default function ({ formik }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <FormControl fullWidth error={Boolean(formik.touched.activityLevel && formik.errors.activityLevel)}>
          <InputLabel id="activity-level-label">How active are you?</InputLabel>
          <Select
            labelId="activity-level-label"
            id="activity-level"
            name="activityLevel"
            label="How active are you?"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.activityLevel}
          >
            <MenuItem value="sedentary">Sedentary</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="extremely_active">Extremely active</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControl fullWidth error={Boolean(formik.touched.experience && formik.errors.experience)}>
          <InputLabel id="experience-label">How experienced in training are you?</InputLabel>
          <Select
            labelId="experience-label"
            id="experience"
            name="experience"
            label="How experienced in training are you?"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.experience}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
