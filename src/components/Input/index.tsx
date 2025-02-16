import { InputContainer, InputField } from './styles';
import { Button } from '../ui/Button';
import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { chatStore } from '../../stores/ChatStore';

const Input: FC = observer(() => {
  const { sendMessage } = chatStore;

  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage(message);
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <InputField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button onClick={handleSend}>Отправить</Button>
    </InputContainer>
  );
});

export default Input;
