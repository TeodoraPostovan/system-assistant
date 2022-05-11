import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { useCallback, useContext } from 'react';

import { api } from '../../api';
import { AppContext } from '../../state/state';

const BASE_IMG_URL = 'http://localhost:3333';

export const AccountProfile = (props) => {
  const { userInfo, setUserInfo } = useContext(AppContext);

  const onFileChange = useCallback(async (ev) => {
    const file: File = (ev.target.files || [])[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);
    const {
      data: { path }
    } = await api.post('/user/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setUserInfo((prev) => ({ ...prev, avatar: path }));
  }, []);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={`${BASE_IMG_URL}${userInfo?.avatar}`}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {userInfo?.firstName} {userInfo?.lastName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Email: {userInfo?.email}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Role: {userInfo?.role}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text" component="label">
          Upload picture
          <input type="file" accept="image/*" name="photo" hidden onChange={onFileChange} />
        </Button>
      </CardActions>
    </Card>
  );
};
