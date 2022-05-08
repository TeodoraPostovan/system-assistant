import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { api } from '../../api';
import { AppContext } from '../../state/state';
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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { setUserInfo } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const userInfo = await api.get('/user/me');
      if (userInfo?.data?.user) {
        setUserInfo(userInfo.data.user);
      }
    })();
  }, []);

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
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};

export default Layout;
