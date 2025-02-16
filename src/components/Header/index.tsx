import {
  ExitButton,
  HeaderActions,
  HeaderContainer,
  HeaderContent,
  PhoneNumber,
  Title,
} from './styles';
import { FC } from 'react';
import { formatPhoneNumbersForDisplay } from '../../utils/formatPhoneNumber';
import { chatStore } from '../../stores/ChatStore';
import { observer } from 'mobx-react-lite';

const Header: FC = observer(() => {
  const { recipientPhoneNumber, removeChat } = chatStore;

  const handleDeleteChat = () => {
    if (recipientPhoneNumber) {
      removeChat(recipientPhoneNumber);
    }
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Title>WhatsApp Chat</Title>
          {recipientPhoneNumber && (
            <PhoneNumber>
              Номер: {formatPhoneNumbersForDisplay(recipientPhoneNumber)}
            </PhoneNumber>
          )}
        </HeaderContent>
        <HeaderActions>
          <ExitButton onClick={handleDeleteChat}>Удалить чат</ExitButton>
        </HeaderActions>
      </HeaderContainer>
    </>
  );
});

export default Header;
