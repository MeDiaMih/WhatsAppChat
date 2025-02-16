import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { chatStore } from '../../stores/ChatStore';
import {
  Avatar,
  ChatListButton,
  ChatListContainer,
  ChatListContent,
  ChatListItem,
  ExitButton,
  Title,
} from './styles';
import { formatPhoneNumbersForDisplay } from '../../utils/formatPhoneNumber';
import { FaUserCircle } from 'react-icons/fa';
import Modal from '../Modal';
import { authStore } from '../../stores/AuthStore';

const ChatList: FC = observer(() => {
  const { setRecipientPhoneNumber, chatList, switchChat } = chatStore;
  const { logout } = authStore;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNumber = () => {
    setIsModalOpen(true);
  };

  const handleSaveNumber = (phoneNumber: string) => {
    setRecipientPhoneNumber(phoneNumber);
    setIsModalOpen(false);
  };

  return (
    <>
      <ChatListContainer>
        <ChatListContent>
          <Title>Список чатов</Title>
          {chatList.map((phoneNumber, index) => (
            <ChatListItem key={index} onClick={() => switchChat(phoneNumber)}>
              <Avatar>
                <FaUserCircle size={35} />
              </Avatar>
              {formatPhoneNumbersForDisplay(phoneNumber)}
            </ChatListItem>
          ))}
          <ChatListButton onClick={handleAddNumber}>
            Добавить номер
          </ChatListButton>
        </ChatListContent>
        <ExitButton onClick={logout}>Выйти</ExitButton>
      </ChatListContainer>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNumber}
      />
    </>
  );
});

export default ChatList;
