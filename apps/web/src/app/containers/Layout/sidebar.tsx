import ChatIcon from '@mui/icons-material/Chat';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { Cog as CogIcon } from '../../icons/cog';
import { Lock as LockIcon } from '../../icons/lock';
import { Selector as SelectorIcon } from '../../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../../icons/shopping-bag';
import { User as UserIcon } from '../../icons/user';
import { UserAdd as UserAddIcon } from '../../icons/user-add';
import { Users as UsersIcon } from '../../icons/users';
import { XCircle as XCircleIcon } from '../../icons/x-circle';
import { AppContext } from '../../state/state';
import { Logo } from './logo';
import { NavItem } from './nav-item';

const items = [
  {
    href: '/',
    icon: <ChartBarIcon fontSize="small" />,
    title: 'Dashboard'
  },
  {
    href: '/account',
    icon: <UserIcon fontSize="small" />,
    title: 'Account'
  },
  {
    href: '/mydiary',
    icon: <ShoppingBagIcon fontSize="small" />,
    title: 'My diary'
  },
  {
    href: '/coaches',
    icon: <UsersIcon fontSize="small" />,
    title: 'Coaches'
  },
  {
    href: '/chat',
    icon: <ChatIcon fontSize="small" />,
    title: 'Chat'
  },
  {
    href: '/recipe-suggestions',
    icon: <RestaurantIcon fontSize="small" />,
    title: 'Recipes'
  },
  {
    href: '/exercise-suggestions',
    icon: <FitnessCenterIcon fontSize="small" />,
    title: 'Exercises'
  }
  // {
  //   href: '/settings',
  //   icon: <CogIcon fontSize="small" />,
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: <LockIcon fontSize="small" />,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: <UserAddIcon fontSize="small" />,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: <XCircleIcon fontSize="small" />,
  //   title: 'Error'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;

  const { userInfo } = useContext(AppContext);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div>
        <Box sx={{ p: 3 }}>
          <Link to="/">
            <Logo
              sx={{
                height: 42,
                width: 42
              }}
            />
          </Link>
        </Box>
        <Box sx={{ px: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: '11px',
              borderRadius: 1
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Assistant Dude
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Your goal : {userInfo?.surveyData?.goal}
              </Typography>
            </div>
            <SelectorIcon
              sx={{
                color: 'neutral.500',
                width: 14,
                height: 14
              }}
            />
          </Box>
        </Box>
      </div>
      <Divider
        sx={{
          borderColor: '#2D3748',
          my: 3
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        {items.map((item) => (
          <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
        ))}
      </Box>
      <Divider sx={{ borderColor: '#2D3748' }} />
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#111827',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#111827',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
