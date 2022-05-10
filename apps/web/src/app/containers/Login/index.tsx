import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, Grid, Link as LinkUI, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { api } from '../../api';
import { AppContext } from '../../state/state';

// import { Facebook as FacebookIcon } from '../icons/facebook';
// import { Google as GoogleIcon } from '../icons/google';

const Login = () => {
  // const router = useRouter();
  const navigate = useNavigate();
  const { setUserInfo } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required')
    }),
    onSubmit: async (value) => {
      try {
        const userData = await api.post('/auth/login', value);
        setUserInfo(userData.data.user);
        navigate('/');
      } catch (err) {
        console.log(err);
        formik.setFieldError('email', 'Invalid email or password');
        formik.setFieldError('password', 'Invalid email or password');
      }
    }
  });

  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="sm">
        {/* <Link to="/">
          <Button component="button" startIcon={<ArrowBackIcon fontSize="small" />}>
            Dashboard
          </Button>
        </Link> */}
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Sign in
            </Typography>
            {/* <Typography color="textSecondary" gutterBottom variant="body2">
              Sign in on the internal platform
            </Typography> */}
          </Box>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button
                color="info"
                fullWidth
                startIcon={<FacebookIcon />}
                onClick={formik.handleSubmit}
                size="large"
                variant="contained"
              >
                Login with Facebook
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                color="error"
                startIcon={<GoogleIcon />}
                onClick={formik.handleSubmit}
                size="large"
                variant="contained"
              >
                Login with Google
              </Button>
            </Grid>
          </Grid> */}
          {/* <Box
            sx={{
              pb: 1,
              pt: 3
            }}
          >
            <Typography align="center" color="textSecondary" variant="body1">
              or login with email address
            </Typography>
          </Box> */}
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In Now
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body2">
            Don&apos;t have an account?{' '}
            <LinkUI
              component={Link}
              to="/register"
              variant="subtitle2"
              underline="hover"
              sx={{
                cursor: 'pointer'
              }}
            >
              Sign Up
            </LinkUI>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
