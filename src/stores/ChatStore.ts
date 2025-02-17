import { action, makeAutoObservable } from 'mobx';
import { ChatStoreState, Message } from '../types';
import { receiveMessageApi, sendMessageApi } from '../api/greenApi';
import {
  clearMessagesInStorage,
  loadChatListFromStorage,
  loadMessagesFromStorage,
  loadRecipientPhoneNumberFromStorage,
  saveChatListToStorage,
  saveMessagesToStorage,
  saveRecipientPhoneNumberToStorage,
} from './Storage';
import { authStore } from './AuthStore';

class ChatStore implements ChatStoreState {
  messages: Message[] = [];
  idInstance: string;
  apiTokenInstance: string;
  recipientPhoneNumber: string = '';
  chatList: string[] = [];

  constructor() {
    makeAutoObservable(this, {
      sendMessage: action,
      receiveMessage: action,
      clearMessages: action,
      setRecipientPhoneNumber: action,
      addChat: action,
      removeChat: action,
      updateCredentials: action,
      clearAllData: action,
    });
    const { idInstance, apiTokenInstance } = authStore;

    this.idInstance = idInstance;
    this.apiTokenInstance = apiTokenInstance;
    this.loadRecipientPhoneNumber();
    this.loadChatList();
    this.loadMessages();
  }

  // Обновляет учетные данные при смене аккаунта
  updateCredentials = () => {
    const { idInstance, apiTokenInstance } = authStore;
    this.idInstance = idInstance;
    this.apiTokenInstance = apiTokenInstance;
  };

  // Очищает все данные о чатах и сообщениях
  clearAllData = () => {
    this.messages = [];
    this.recipientPhoneNumber = '';
    this.chatList = [];
    this.saveRecipientPhoneNumber('');
    this.saveChatList();
  };

  // Загружает список чатов из локального хранилища
  loadChatList = () => {
    this.chatList = loadChatListFromStorage();
  };

  // Сохраняет список чатов в локальное хранилище
  saveChatList = () => {
    saveChatListToStorage(this.chatList);
  };

  // Добавляет новый чат в список, если его там нет
  addChat = (phoneNumber: string) => {
    if (!this.chatList.includes(phoneNumber)) {
      this.chatList.push(phoneNumber);
      this.saveChatList();
    }
  };

  // Удаляет чат из списка и очищает связанные с ним сообщения
  removeChat = (phoneNumber: string) => {
    this.chatList = this.chatList.filter((chat) => chat !== phoneNumber);
    this.saveChatList();

    clearMessagesInStorage(this.idInstance, this.apiTokenInstance, phoneNumber);

    if (this.recipientPhoneNumber === phoneNumber) {
      if (this.chatList.length > 0) {
        this.setRecipientPhoneNumber(this.chatList[0]);
      } else {
        this.recipientPhoneNumber = '';
        this.saveRecipientPhoneNumber('');
        this.messages = [];
      }
    }
  };

  // Переключает активный чат
  switchChat = (phoneNumber: string) => {
    this.setRecipientPhoneNumber(phoneNumber);
  };

  // Загружает номер текущего собеседника из хранилища
  loadRecipientPhoneNumber = () => {
    const savedPhoneNumber = loadRecipientPhoneNumberFromStorage();
    if (savedPhoneNumber) {
      this.recipientPhoneNumber = savedPhoneNumber;
    }
  };

  // Сохраняет номер текущего собеседника в хранилище
  saveRecipientPhoneNumber = (phoneNumber: string) => {
    saveRecipientPhoneNumberToStorage(phoneNumber);
  };

  // Загружает сообщения для текущего чата
  loadMessages = () => {
    if (this.recipientPhoneNumber) {
      this.messages = loadMessagesFromStorage(
        this.idInstance,
        this.apiTokenInstance,
        this.recipientPhoneNumber,
      );
    } else {
      this.messages = [];
    }
  };

  // Очищает все сообщения в текущем чате
  clearMessages = () => {
    this.messages = [];
  };

  // Устанавливает нового собеседника, загружает его сообщения и добавляет в список чатов
  setRecipientPhoneNumber = (phoneNumber: string) => {
    if (this.recipientPhoneNumber !== phoneNumber) {
      this.recipientPhoneNumber = phoneNumber;
      this.saveRecipientPhoneNumber(phoneNumber);
      this.loadMessages();
      this.addChat(phoneNumber);
    }
  };

  // Отправляет сообщение и сохраняет его в локальном хранилище
  sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const messageId = Date.now().toString();
    try {
      this.messages.push({ id: messageId, text, isUser: true });
      saveMessagesToStorage(
        this.idInstance,
        this.apiTokenInstance,
        this.recipientPhoneNumber,
        this.messages,
      );
      await sendMessageApi(
        this.idInstance,
        this.apiTokenInstance,
        this.recipientPhoneNumber,
        text,
      );
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  // Получает входящее сообщение и добавляет его в чат
  receiveMessage = async () => {
    try {
      const message = await receiveMessageApi(
        this.idInstance,
        this.apiTokenInstance,
      );
      if (message && message.text) {
        const messageId = message.id;
        const isDuplicate = this.messages.some((msg) => msg.id === messageId);

        if (!isDuplicate) {
          this.messages.push({
            id: messageId,
            text: message.text,
            isUser: false,
          });
          saveMessagesToStorage(
            this.idInstance,
            this.apiTokenInstance,
            this.recipientPhoneNumber,
            this.messages,
          );
        }
      }
    } catch (error) {
      console.error('Ошибка при получении сообщения:', error);
    }
  };
}

export const chatStore = new ChatStore();
