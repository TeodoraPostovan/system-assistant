import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Checkbox, Container, FormHelperText, Link as LinkUI, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { api } from '../../api';
import { AppContext } from '../../state/state';

const Register = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      firstName: Yup.string().max(255).required('First name is required'),
      lastName: Yup.string().max(255).required('Last name is required'),
      password: Yup.string().max(255).required('Password is required'),
      policy: Yup.boolean().oneOf([true], 'This field must be checked')
    }),
    onSubmit: async (value) => {
      try {
        const userData = await api.post('/user/register', value);
        setUserInfo(userData.data.user);
        navigate('/');
      } catch (err) {
        console.log(err);
        formik.setFieldError('email', 'Email is already used');
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
        <Link to="/">
          <Button component="button" startIcon={<ArrowBackIcon fontSize="small" />}>
            Dashboard
          </Button>
        </Link>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Create a new account
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Use your email to create a new account
            </Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            fullWidth
            helperText={formik.touched.firstName && formik.errors.firstName}
            label="First Name"
            margin="normal"
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            fullWidth
            helperText={formik.touched.lastName && formik.errors.lastName}
            label="Last Name"
            margin="normal"
            name="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            variant="outlined"
          />
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
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1
            }}
          >
            <Checkbox checked={formik.values.policy} name="policy" onChange={formik.handleChange} />
            <Typography color="textSecondary" variant="body2">
              I have read the{' '}
              <LinkUI color="primary" underline="always" variant="subtitle2" component={Link} to="#">
                Terms and Conditions
              </LinkUI>
            </Typography>
          </Box>
          {Boolean(formik.touched.policy && formik.errors.policy) && (
            <FormHelperText error>{formik.errors.policy}</FormHelperText>
          )}
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign Up Now
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body2">
            Have an account?{' '}
            <LinkUI color="primary" underline="always" variant="subtitle2" component={Link} to="/login">
              Sign In
            </LinkUI>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
