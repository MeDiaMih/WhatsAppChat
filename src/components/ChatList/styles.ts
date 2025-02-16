import styled from 'styled-components';
import { Button } from '../ui/Button';

export const ChatListContainer = styled.div`
  box-sizing: border-box;
  width: 250px;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px 0;
  border-right: 1px solid #d1d1d1;
  display: flex;
  flex-direction: column;
`;

export const ChatListContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Title = styled.h2`
  font-size: 20px;
  color: #075e54;
  margin: 0;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  text-align: center;
`;

export const ChatListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 2px solid #e0e0e0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const Avatar = styled.div`
  margin-right: 10px;
  color: #075e54;
`;

export const ChatListButton = styled(Button)`
  margin: 10px;
  width: calc(100% - 20px);
`;

export const ExitButton = styled(Button)`
  background-color: #ff4444;
  margin: 0 10px;
`;
