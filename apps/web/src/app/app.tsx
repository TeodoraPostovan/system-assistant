import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { api } from './api';
import { AppContext } from './state/state';

export function App({ children }) {
  const { setUserInfo } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const userInfo = await api.get('/user/me');
      // console.log(userInfo.data.user);
      if (userInfo?.data?.user) {
        setUserInfo(userInfo.data.user);
      }
    })();
  }, [location]);

  return children;
}

export default App;
