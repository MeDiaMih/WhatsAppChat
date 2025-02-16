import axios from 'axios';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';

const BASE_URL = 'https://1103.api.green-api.com';

export const sendMessageApi = async (
  idInstance: string,
  apiTokenInstance: string,
  recipientPhoneNumber: string,
  text: string,
): Promise<void> => {
  try {
    const formattedPhoneNumber = formatPhoneNumber(recipientPhoneNumber);

    const response = await axios.post(
      `${BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: `${formattedPhoneNumber}@c.us`,
        message: text,
      },
    );

    if (response.data && response.data.idMessage) {
      console.log('Сообщение успешно отправлено:', response.data.idMessage);
    } else {
      console.error('Ошибка при отправке сообщения:', response.data);
    }
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    throw error;
  }
};

export const receiveMessageApi = async (
  idInstance: string,
  apiTokenInstance: string,
): Promise<string> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
    );

    if (response.data && response.data.body) {
      const { typeWebhook, messageData } = response.data.body;

      if (
        typeWebhook === 'incomingMessageReceived' &&
        messageData &&
        messageData.textMessageData
      ) {
        const textMessage = messageData.textMessageData.textMessage;

        const receiptId = response.data.receiptId;

        await axios.delete(
          `${BASE_URL}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
        );

        return textMessage;
      }
    }
    return '';
  } catch (error) {
    console.error('Ошибка при получении сообщения:', error);
    throw error;
  }
};
