import { ModalProps } from '../../types';
import React, { FC, useState } from 'react';
import {
  ModalButton,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalInput,
} from './styles';
import { Button } from '../ui/Button';

const Modal: FC<ModalProps> = ({ isOpen, onSave, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSave = () => {
    onSave(phoneNumber);
    setPhoneNumber('');
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Введите номер телефона</ModalHeader>
        <ModalInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <ModalFooter>
          <ModalButton onClick={onClose}>Отмена</ModalButton>
          <Button onClick={handleSave}>Сохранить</Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
