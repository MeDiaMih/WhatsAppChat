import styled from 'styled-components';

export const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  margin: 10px 0;
`;
export const MessageBubble = styled.div<{ $isUser: boolean }>`
  background-color: ${({ $isUser }) => ($isUser ? '#dcf8c6' : '#fff')};
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
`;
