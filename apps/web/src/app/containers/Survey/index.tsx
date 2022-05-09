import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import * as React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import { AppContext } from '../../state/state';
import ActivityLevel from './ActivityLevel';
import General from './General';
import HealthConditions from './HealthConditions';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Additional information', 'Health conditions', 'Activity level'];

function getStepContent(step: number, formik) {
  switch (step) {
    case 0:
      return <General formik={formik} />;
    case 1:
      return <HealthConditions formik={formik} />;
    case 2:
      return <ActivityLevel formik={formik} />;

    default:
      throw new Error('Unknown step');
  }
}

function sleep(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

export default function Checkout() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const { userInfo, setSurveyData } = React.useContext(AppContext);

  const handleNext = async (formik) => {
    if (activeStep === steps.length - 1) {
      // submit
      formik.submitForm();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = useCallback(
    async (values) => {
      const { email } = userInfo;
      console.log(userInfo);

      await api.post('/user/save-survey', {
        email,
        surveyData: values
      });
      // setSurveyData(values);

      navigate('/');
    },
    [userInfo]
  );

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Additional survey
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you!
            </Typography>
            <Typography variant="subtitle1">We will redirect yoy to the dashboard shortly</Typography>
          </React.Fragment>
        ) : (
          <Formik initialValues={formInitialValues} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <>
                  {getStepContent(activeStep, formik)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button variant="contained" onClick={() => handleNext(formik)} sx={{ mt: 3, ml: 1 }}>
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </Box>
                </>
              );
            }}
          </Formik>
        )}
      </Paper>
      <Copyright />
    </Container>
  );
}

const formInitialValues = {
  age: 0,
  gender: '',
  weight: 0,
  height: 0,
  goal: '',
  allergies: [],
  diets: [],
  diagnosis: [],
  activityLevel: '',
  experience: ''
};
