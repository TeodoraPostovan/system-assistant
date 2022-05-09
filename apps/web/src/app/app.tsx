import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { api } from './api';
import { AppContext } from './state/state';

export function App({ children }) {
  const { setUserInfo } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await api.get('/user/me');
        setUserInfo(userInfo.data.user);
      } catch (error) {
        setUserInfo({} as any);
      }
    })();
  }, [location]);

  return children;
}

export default App;
