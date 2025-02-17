import { Message } from '../types';

// Генерирует ключ для хранения сообщений по номеру телефона
const getMessageStorageKey = (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
) => `chatMessages_${idInstance}_${apiTokenInstance}_${phoneNumber}`;

// Загружает сообщения из хранилища для указанного номера телефона
export const loadMessagesFromStorage = (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
): Message[] => {
  const savedMessages = localStorage.getItem(
    getMessageStorageKey(idInstance, apiTokenInstance, phoneNumber),
  );
  return savedMessages ? (JSON.parse(savedMessages) as Message[]) : [];
};

// Сохраняет сообщения в хранилище для указанного номера телефона
export const saveMessagesToStorage = (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
  messages: Message[],
) => {
  localStorage.setItem(
    getMessageStorageKey(idInstance, apiTokenInstance, phoneNumber),
    JSON.stringify(messages),
  );
};

// Очищает сообщения из хранилища для указанного номера телефона
export const clearMessagesInStorage = (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
): void => {
  localStorage.removeItem(
    getMessageStorageKey(idInstance, apiTokenInstance, phoneNumber),
  );
};

// Загружает список чатов из хранилища
export const loadChatListFromStorage = (): string[] => {
  const savedChatList = localStorage.getItem('chatList');
  return savedChatList ? JSON.parse(savedChatList) : [];
};

// Сохраняет список чатов в хранилище
export const saveChatListToStorage = (chatList: string[]) => {
  localStorage.setItem('chatList', JSON.stringify(chatList));
};

// Загружает номер телефона получателя из хранилища
export const loadRecipientPhoneNumberFromStorage = (): string | null => {
  return localStorage.getItem('recipientPhoneNumber');
};

// Сохраняет номер телефона получателя в хранилище
export const saveRecipientPhoneNumberToStorage = (phoneNumber: string) => {
  localStorage.setItem('recipientPhoneNumber', phoneNumber);
};
