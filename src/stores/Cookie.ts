import Cookies from 'js-cookie';

const ID_INSTANCE_KEY = 'idInstance';
const API_TOKEN_INSTANCE_KEY = 'apiTokenInstance';

//Сохраняет учетные данные в cookies
export const saveCredentials = (
  idInstance: string,
  apiTokenInstance: string,
) => {
  Cookies.set(ID_INSTANCE_KEY, idInstance, { expires: 2 / 24 });
  Cookies.set(API_TOKEN_INSTANCE_KEY, apiTokenInstance, { expires: 2 / 24 });
};

//Загружает учетные данные из cookies
export const loadCredentials = () => {
  const idInstance = Cookies.get(ID_INSTANCE_KEY);
  const apiTokenInstance = Cookies.get(API_TOKEN_INSTANCE_KEY);

  return { idInstance, apiTokenInstance };
};

// Очищает учетные данные из cookies
export const clearCredentials = () => {
  Cookies.remove(ID_INSTANCE_KEY);
  Cookies.remove(API_TOKEN_INSTANCE_KEY);
};
