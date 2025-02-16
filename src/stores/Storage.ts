import { Message } from '../types';

// Генерирует ключ для хранения сообщений по номеру телефона
const getMessageStorageKey = (phoneNumber: string) =>
  `chatMessages_${phoneNumber}`;

// Загружает сообщения из хранилища для указанного номера телефона
export const loadMessagesFromStorage = (phoneNumber: string): Message[] => {
  const savedMessages = localStorage.getItem(getMessageStorageKey(phoneNumber));
  return savedMessages ? (JSON.parse(savedMessages) as Message[]) : [];
};

// Сохраняет сообщения в хранилище для указанного номера телефона
export const saveMessagesToStorage = (
  phoneNumber: string,
  messages: Message[],
) => {
  localStorage.setItem(
    getMessageStorageKey(phoneNumber),
    JSON.stringify(messages),
  );
};

// Очищает сообщения из хранилища для указанного номера телефона
export const clearMessagesInStorage = (phoneNumber: string): void => {
  localStorage.removeItem(getMessageStorageKey(phoneNumber));
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
