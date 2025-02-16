import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  background-color: #f0f0f0;
`;
export const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #e5ddd5;
`;
