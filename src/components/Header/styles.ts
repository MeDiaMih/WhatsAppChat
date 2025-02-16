import styled from 'styled-components';
import { Button } from '../ui/Button';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #075e54;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const Title = styled.h2`
  font-size: 18px;
  margin: 0;
`;

export const PhoneNumber = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

export const ExitButton = styled(Button)`
  background-color: #ff4444;
`;
