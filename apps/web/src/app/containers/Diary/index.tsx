import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Card, CardContent, Container, Grid, IconButton, Typography } from '@mui/material';

const Diary = (props) => (
  <Card sx={{ height: '100%', width: '100%' }} {...props}>
    <CardContent>
      {/* <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            BUDGET
          </Typography>
          <Typography color="textPrimary" variant="h4">
            $24k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid> */}

      <Grid container spacing={0} sx={{ flex: 1, width: '100%' }}>
        <IconButton aria-label="delete">
          <ChevronLeftIcon />
        </IconButton>
        {/* <Grid item lg={3} sm={3} xl={3} xs={3}>
        </Grid> */}
        content
        {/* <Grid item lg={12} sm={12} xl={12} xs={12}>
        </Grid> */}
        {/* <Grid item lg={3} sm={3} xl={3} xs={3}>
        </Grid> */}
        <IconButton aria-label="delete">
          <ChevronRightIcon />
        </IconButton>
      </Grid>

      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default (props) => (
  <LayoutWrapper>
    <Diary {...props}></Diary>
  </LayoutWrapper>
);

const LayoutWrapper = (props) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8
    }}
  >
    <Container maxWidth={false}>
      <Grid container spacing={0}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  </Box>
);
