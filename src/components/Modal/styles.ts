import styled from 'styled-components';
import { Button } from '../ui/Button';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContent = styled.div`
  box-sizing: border-box;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #333;
`;

export const ModalInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Номер телефона',
})`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    outline: #075e54;
    border-color: #075e54;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const ModalButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
`;
