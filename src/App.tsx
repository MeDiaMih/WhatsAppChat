import { FC } from 'react';
import GlobalStyle from './styles/GlobalStyles';
import Chat from './components/Chat';
import { observer } from 'mobx-react-lite';
import Auth from './components/Auth';
import Loader from './components/Loader';
import { authStore } from './stores/AuthStore';

const App: FC = observer(() => {
  const { isAuthenticated, loading } = authStore;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <GlobalStyle />
      {isAuthenticated ? <Chat /> : <Auth />}
    </>
  );
});

export default App;
