import { MessageBubble, MessageContainer } from './styles';
import { FC } from 'react';
import { MessageProps } from '../../types';

const Message: FC<MessageProps> = ({ text, isUser }) => {
  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubble $isUser={isUser}>{text}</MessageBubble>
    </MessageContainer>
  );
};

export default Message;
