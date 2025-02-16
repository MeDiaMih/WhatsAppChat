import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  padding: 20px;
`;

export const InputField = styled.input.attrs({
  type: 'text',
  placeholder: 'Сообщение',
})`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 14px;

  &:focus {
    outline: #075e54;
    border-color: #075e54;
  }
`;
