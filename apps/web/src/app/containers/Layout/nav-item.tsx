import { Box, Button, Link as LinkUI, ListItem } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;

  // const active = href ? router.pathname === href : false;
  const resolved = useResolvedPath(href);
  const active = useMatch({ path: resolved.pathname, end: true });
  // const active = true;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <LinkUI
        to={href}
        component={Link}
        underline="none"
        variant="button"
        sx={{
          flex: 1
        }}
      >
        <Button
          component="button"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.08)',
            borderRadius: 1,
            flexGrow: 1,
            color: active ? 'secondary.main' : '#9CA3AF',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : '#9CA3AF'
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            }
          }}
        >
          {title}
        </Button>
      </LinkUI>
    </ListItem>
  );
};
