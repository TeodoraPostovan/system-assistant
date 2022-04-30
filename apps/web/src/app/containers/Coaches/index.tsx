import { Box, Container } from '@mui/material';

import { customers } from '../../__mocks__/customers';
import { CustomerListResults } from './list-results';
import { CustomerListToolbar } from './list-toolbar';

const Customers = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8
    }}
  >
    <Container maxWidth={false}>
      <CustomerListToolbar />
      <Box sx={{ mt: 3 }}>
        <CustomerListResults customers={customers} />
      </Box>
    </Container>
  </Box>
);

export default Customers;
