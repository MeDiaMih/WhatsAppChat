import { FC, JSX, useEffect, useState } from 'react';
import {
  AuthContainer,
  AuthHeader,
  ErrorMessage,
  InfoContainer,
  Input,
} from './styles';
import { Button } from '../ui/Button';
import Loader from '../Loader';
import { authStore } from '../../stores/AuthStore';
import { observer } from 'mobx-react-lite';

const Auth: FC = observer((): JSX.Element => {
  const [id, setId] = useState('');
  const [apiToken, setApiToken] = useState('');
  const { loading, error, setCredentials, idInstance, apiTokenInstance } =
    authStore;

  useEffect(() => {
    if (idInstance && apiTokenInstance) {
      setId(idInstance);
      setApiToken(apiTokenInstance);
    }
  }, []);

  const handleLogin = async () => {
    try {
      await setCredentials(id, apiToken);
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  return (
    <AuthContainer>
      <InfoContainer>
        <AuthHeader>Авторизация</AuthHeader>
        <Input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="API Token"
          value={apiToken}
          onChange={(e) => setApiToken(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button onClick={handleLogin}>{loading ? <Loader /> : 'Вход'}</Button>
      </InfoContainer>
    </AuthContainer>
  );
});

export default Auth;
