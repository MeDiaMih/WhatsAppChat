import { action, makeAutoObservable, runInAction } from 'mobx';
import { clearCredentials, loadCredentials, saveCredentials } from './Cookie';
import { AuthStoreState } from '../types';
import { receiveMessageApi } from '../api/greenApi';
import { validateCredentials } from '../utils/validateCredentials';
import { chatStore } from './ChatStore';

class AuthStore implements AuthStoreState {
  idInstance: string = '';
  apiTokenInstance: string = '';
  loading: boolean = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      initializeAuth: action,
      setCredentials: action,
      logout: action.bound,
    });

    this.initializeAuth();
  }

  // Проверяет, аутентифицирован ли пользователь
  get isAuthenticated() {
    return !!this.idInstance && !!this.apiTokenInstance;
  }

  // Инициализирует авторизацию, загружая учетные данные из хранилища
  initializeAuth = () => {
    try {
      const { idInstance, apiTokenInstance } = loadCredentials();

      if (idInstance && apiTokenInstance) {
        this.idInstance = idInstance;
        this.apiTokenInstance = apiTokenInstance;
      }
    } catch (error) {
      console.error('Ошибка при загрузке учетных данных:', error);
    } finally {
      this.loading = false;
    }
  };

  // Устанавливает учетные данные после проверки их корректности
  setCredentials = async (idInstance: string, apiTokenInstance: string) => {
    this.loading = true;
    this.error = null;

    try {
      if (!validateCredentials(idInstance, apiTokenInstance)) {
        this.error = 'Некорректные данные авторизации';
        return;
      }

      await receiveMessageApi(idInstance, apiTokenInstance);

      this.idInstance = idInstance;
      this.apiTokenInstance = apiTokenInstance;
      saveCredentials(idInstance, apiTokenInstance);

      chatStore.updateCredentials();
      chatStore.clearAllData();
    } catch (error) {
      this.error = 'Некорректные данные авторизации';
      throw error;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  // Выполняет выход пользователя, очищая учетные данные
  logout = () => {
    clearCredentials();
    this.idInstance = '';
    this.apiTokenInstance = '';

    chatStore.clearAllData();
  };
}

export const authStore = new AuthStore();
