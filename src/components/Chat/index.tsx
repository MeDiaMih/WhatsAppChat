import { ChatContainer, MainContainer, MessageContainer } from './styles';
import Input from '../Input';
import Header from '../Header';
import Message from '../Message';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { chatStore } from '../../stores/ChatStore';
import ChatList from '../ChatList';

const Chat: FC = observer(() => {
  const { messages, receiveMessage } = chatStore;

  useEffect(() => {
    const interval = setInterval(async () => {
      await receiveMessage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainContainer>
      <ChatList />
      <ChatContainer>
        <Header />
        <MessageContainer>
          {messages.map(({ text, isUser }, index) => (
            <Message key={index} text={text} isUser={isUser} />
          ))}
        </MessageContainer>
        <Input />
      </ChatContainer>
    </MainContainer>
  );
});

export default Chat;
