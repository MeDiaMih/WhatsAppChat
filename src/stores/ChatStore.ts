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
    });
    const { idInstance, apiTokenInstance } = authStore;

    this.idInstance = idInstance;
    this.apiTokenInstance = apiTokenInstance;
    this.loadRecipientPhoneNumber();
    this.loadChatList();
    this.loadMessages();
  }

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

    clearMessagesInStorage(phoneNumber);

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
      this.messages = loadMessagesFromStorage(this.recipientPhoneNumber);
    } else {
      this.messages = [];
    }
  };

  // Очищает все сообщения в текущем чате
  clearMessages = () => {
    this.messages = [];
  };

  // Очищает сообщения, если номер совпадает с активным чатом
  clearMessagesForNumber = (phoneNumber: string) => {
    if (this.recipientPhoneNumber === phoneNumber) {
      this.clearMessages();
    }
  };

  // Устанавливает нового собеседника, загружает его сообщения и добавляет в список чатов
  setRecipientPhoneNumber = (phoneNumber: string) => {
    if (this.recipientPhoneNumber !== phoneNumber) {
      if (this.recipientPhoneNumber) {
        this.clearMessagesForNumber(this.recipientPhoneNumber);
      }
      this.recipientPhoneNumber = phoneNumber;
      this.saveRecipientPhoneNumber(phoneNumber);
      this.loadMessages();
      this.addChat(phoneNumber);
    }
  };

  // Отправляет сообщение и сохраняет его в локальном хранилище
  sendMessage = async (text: string) => {
    try {
      this.messages.push({ text, isUser: true });
      saveMessagesToStorage(this.recipientPhoneNumber, this.messages);
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
      if (message) {
        this.messages.push({ text: message, isUser: false });
        saveMessagesToStorage(this.recipientPhoneNumber, this.messages);
      }
    } catch (error) {
      console.error('Ошибка при получении сообщения:', error);
    }
  };
}

export const chatStore = new ChatStore();
