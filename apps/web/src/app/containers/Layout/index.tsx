import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardNavbar } from './navbar';
import { DashboardSidebar } from './sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

const Layout = (props) => {
  // const { children } = props;

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {/* {children} */}
          <Outlet />
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => null} />
      <DashboardSidebar onClose={() => null} open={true} />
    </>
  );
};

export default Layout;